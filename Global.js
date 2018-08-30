window.util={};

var mapPokerByIdVal = util.mapPokerByIdVal = function(val  )
{
 // val ： 牌值，也就是大小，由于在斗地主规则中除大小王外，2最大，A其次，
 // 所以这里并不完全按照数值排大小，A是14，2是15，小王16，大王17。其它牌自己的数值就是大小；
							
	switch(val)
	{
	case 14: return 'A';break;
	case 15: return '2';break;
	case 16: return '小王';break;
	case 17: return '大王';break;
	case 13: return 'K';break;
	case 12: return 'Q';break;
	case 11: return 'J';break;
	default:
		return val;
	}

}

var updateGameInScore = util.updateGameInScore = function(score,times ,meili)
{
//回填其他的数据，比如三个玩家的信息还有底分和倍数
	if(times)$("span[data-custom=gameRoom_basicTimes]").text(times);
	if(score)$("span[data-custom=gameRoom_basicScore]").text(score);
	if(meili)$("span[data-custom=meili_value]").text(meili);
	// //三个玩家的信息

}

//更新三个玩家的牌信息，还有多少张牌
var updatePlayerCardInfo  = util.updatePlayerCardInfo  = function(cardInfo)
{
	$("td[data-custom=gameRoom_cardCounter_1]").text('');
	$("td[data-custom=gameRoom_cardCounter_2]").text('');
	$("td[data-custom=gameRoom_cardCounter_3]").text('');
	if(cardInfo)
	{
		for(let m =0;m<cardInfo.length;m++)
		{
			let playerObjct = cardInfo[m];
			let position = playerObjct.position;
			if(!playerObjct)continue;
			$("td[data-custom=gameRoom_cardCounter_"+position+"]").text(playerObjct.cardNum);
		}
	}
}
var showGameInPanel  = util.showGameInPanel = function(pokerList)
{


	//对扑克进行排序，然后根据当前的的模式 自动拆牌还是不拆牌，放入到现实界面中
	if(pokerList)
	{
		//添加一些属性，便于兼容ailogic
		 let newpokerList = util.getAiLogicPokerList(pokerList);
		console.log("--pokerlist size:",newpokerList.length);
		 
		window.PLAYER_CARD_INFO.isLandlord = false;//默认在没有抢地主到时候都不是地主
		window.PLAYER_CARD_INFO.cardList = newpokerList;

		util.showPokerViewByModel(window.curGameUsingModel,window.PLAYER_CARD_INFO);
	}
}

var getAiLogicPokerList = util.getAiLogicPokerList = function(pokerlist){
	pokerlist.forEach(function (element, index) {
			//  val ： 牌值，也就是大小，由于在斗地主规则中除大小王外，2最大，A其次，所以这里并不完全按照数值排大小，A是14，2是15，小王16，大王17。其它牌自己的数值就是大小；
			// type : 花色，虽然说在斗地主中没有花色大小问题，但是为了手牌美观，一般都会把同等大小的牌按照一定的顺序（黑桃-红心-草花-方块）来排列。
					 	if(element && element.num)
					 	{   let en = element.num;

					 		if(en>=1&& en<=13)
					 		{
						 		element.val=2+parseInt(element.num);
						 		console.log("convert ",en,"\t ->",element.val )
						 		element.type = element.color;
					 		}else if (en==14){
					 			let et = element.color;
					 			if(et==5){//小王
								element.val= 16;
							 		console.log("convert xiaowang ",en,"\t ->",element.val )
							 		element.type = element.color;
					 			}else if(et==6){//小王
								element.val= 17;
							 		console.log("convert dawang",en,"\t ->",element.val )
							 		element.type = element.color;
					 			}
						 		
					 		}

					 		// console.log("type",element.type," val:",element.val);
					 	}
			});

	return pokerlist;
}
//===========
var showPokerViewByModel = util.showPokerViewByModel = function(model,playerObj)
{

//如果是自动拆牌模式
    		  if( model === gameModel.AutoSplitCardModel)
    		   {
        			window.cardsLogicObj = new AILogic(playerObj);
  					// kingBomb:[],
		      		// bomb:[],
		      		// three:[],
		      		// plane:[],
		      		// progression:[],
		      		// progressionPairs:[]
		      		// one:[],
		      		// pairs:[]
        			Card_TYPE_MAP.kingbomb = cardsLogicObj._kingBomb;//'wang炸
        			Card_TYPE_MAP.bomb = cardsLogicObj._bomb;//'炸弹
        			Card_TYPE_MAP.three = cardsLogicObj._three;//三根
        			Card_TYPE_MAP.plane = cardsLogicObj._plane;//飞机
        			Card_TYPE_MAP.progression = cardsLogicObj._progression;//'顺子'
        			Card_TYPE_MAP.progressionPairs = cardsLogicObj._progressionPairs;//'连对
        			Card_TYPE_MAP.one = cardsLogicObj._one;//单
        			Card_TYPE_MAP.pairs = cardsLogicObj._pairs;//对
        			// 按照顺序显示在列表中，优先的是王炸，炸弹。。。
        			console.info('王炸');
				    console.info( Card_TYPE_MAP.kingbomb );
				    console.info('炸弹');
				    console.info(Card_TYPE_MAP.bomb);
				    console.info('三根');
				    console.info(Card_TYPE_MAP.three);
				    console.info('飞机');
				    console.info(Card_TYPE_MAP.plane);
				    console.info('顺子');
				    console.info(Card_TYPE_MAP.progression);
				    console.info('连对');
				    console.info(Card_TYPE_MAP.progressionPairs );
				    console.info('单牌');
				    console.info(Card_TYPE_MAP.one);
				    console.info('对子');
				    console.info(Card_TYPE_MAP.pairs);
        			  let node_cardType_html = "<li><table  style=\"width: 100%;\"><tr><td style=\"width: 80%\" data-custom=simple></td> <td><a   class=splitCard_outCardBtn><img src=\"./images/chupaiBtn.png\"></a></td>			</tr></table></li>";
					$("#gameInPage_ChaiPai").empty();
        			if(Card_TYPE_MAP.kingbomb && Card_TYPE_MAP.kingbomb.length >0)
        			{
        				let simplenode = $(node_cardType_html).clone();
        				simplenode.find("td[data-custom=simple]").attr("data-custom","kingbomb_0");
        				$("#gameInPage_ChaiPai").append("<li><table  ><tr><td>王炸</td></tr></table></li>");
        			}
     				
					if(Card_TYPE_MAP.bomb && Card_TYPE_MAP.bomb.length >0)
        			{
        				
        				for (let i=0;i<Card_TYPE_MAP.bomb.length ;i++)
        				{
        					 let simplenode = $(node_cardType_html).clone();
        					 let pokerVal = Card_TYPE_MAP.bomb[i].val;
        				    let node =simplenode.find("td[data-custom=simple]").attr("data-custom","bomb_"+i);
        					 pokerVal =  util.mapPokerByIdVal(pokerVal);
        					node.html(pokerVal+"的炸弹")
        					$("#gameInPage_ChaiPai").append(simplenode)

        				}
        			}

        			// threePairs// 三根
        			 if(Card_TYPE_MAP.three && Card_TYPE_MAP.three.length >0)
        			{
        				 
        				for (let i=0;i<Card_TYPE_MAP.three.length ;i++)
        				{
        					let simplenode = $(node_cardType_html).clone();
        				    let node =simplenode.find("td[data-custom=simple]");
        				    node.attr("data-custom","three_"+i)
        				    // let cardList  = Card_TYPE_MAP.three[i].cardList;

        				 
        				    let cardVal  = Card_TYPE_MAP.three[i].val;
							cardVal =  util.mapPokerByIdVal(cardVal);
        				    node.html("三张 "+cardVal+"");
        					$("#gameInPage_ChaiPai").append(simplenode)

        				}
        			}
        			//飞机
        			 if(Card_TYPE_MAP.plane && Card_TYPE_MAP.plane.length >0)
        			{
        				 
        				for (let i=0;i<Card_TYPE_MAP.plane.length ;i++)
        				{
        					let simplenode = $(node_cardType_html).clone();
        				    let node =simplenode.find("td[data-custom=simple]");
        				    node.attr("data-custom","plane_"+i);
        				     let cardList  = Card_TYPE_MAP.plane[i].cardList;

        				    if(cardList)
        				    {
        				    	let pokerStr = '';

        				    	for(let cindex =cardList.length-1;cindex>=0;cindex-- )
        				    	{
        				    		let card = cardList[cindex];

        				    		let cardVal =  util.mapPokerByIdVal(card.val);
        				    		pokerStr+= cardVal+"&nbsp;"
        				    	}
								node.html(pokerStr+"的飞机");
        				    }
        				    // let pokerVal = Card_TYPE_MAP.plane[i].val;
        				    // node.html(pokerVal+"的飞机");
        					$("#gameInPage_ChaiPai").append(simplenode)

        				}
        			}
        			//progression 顺子
        			 if(Card_TYPE_MAP.progression && Card_TYPE_MAP.progression.length >0)
        			{
        				 
        				    
        				for (let i=0;i<Card_TYPE_MAP.progression.length ;i++)
        				{
        					let simplenode = $(node_cardType_html).clone();
        				    let node =simplenode.find("td[data-custom=simple]");
        				     node.attr("data-custom","progression_"+i);
        				   
        				    let cardList  = Card_TYPE_MAP.progression[i].cardList;

        				    if(cardList)
        				    {
        				    	let pokerStr = '';
        				    	for(let cindex =cardList.length-1;cindex>=0;cindex--)
        				    	{
        				    		let card = cardList[cindex];
        				    		let cardVal =  util.mapPokerByIdVal(card.val);
        				    		pokerStr+= cardVal+"&nbsp;"
        				    	}
								node.html(pokerStr+" 的顺子");
        				    }
        		 	
        					$("#gameInPage_ChaiPai").append(simplenode)
        				}
        				
        			}
        			//progressionPairs
        			 if(Card_TYPE_MAP.progressionPairs && Card_TYPE_MAP.progressionPairs.length >0)
        			{
        				 
        				for (let i=0;i<Card_TYPE_MAP.progressionPairs.length ;i++)
        				{
        					let simplenode = $(node_cardType_html).clone();
        				    let node =simplenode.find("td[data-custom=simple]");
        				    node.attr("data-custom","progressionPairs_"+i)
        				    // let pokerVal = Card_TYPE_MAP.progressionPairs[i].val;
    				        let cardList  = Card_TYPE_MAP.progressionPairs[i].cardList;

        				    if(cardList)
        				    {
        				    	let pokerStr = '';
        				    	for(let cindex =cardList.length-1;cindex>=0;cindex-- )
        				    	{
        				    		let card = cardList[cindex];
        				    		let cardVal =  util.mapPokerByIdVal(card.val);
        				    		pokerStr+=cardVal+"&nbsp;"
        				    	}
								node.html(pokerStr+" 的连对");
        				    }
        				    
        					$("#gameInPage_ChaiPai").append(simplenode)

        				}
        			}
        			//singles
        			if(Card_TYPE_MAP.one && Card_TYPE_MAP.one.length >0)
        			{
        				    let simplenode = $(node_cardType_html).clone();
        				    let node =simplenode.find("td[data-custom=simple]");
        				    node.attr("data-custom","singles_");
        				    let nodeText = '';
        				for (let i=0;i<Card_TYPE_MAP.one.length ;i++)
        				{
        				    console.log("Card_TYPE_MAP.one[i]",Card_TYPE_MAP.one[i].val);
        				    let v = Card_TYPE_MAP.one[i].val;
        				    let cardVal =  util.mapPokerByIdVal( v);
        				    nodeText+= cardVal+"&nbsp;"

        				}
        				node.html(nodeText);
        			
        				$("#gameInPage_ChaiPai").append( simplenode )
        			}
					//pairs
        			if(Card_TYPE_MAP.pairs && Card_TYPE_MAP.pairs.length >0)
        			{
        				 
        				for (let i=0;i<Card_TYPE_MAP.pairs.length ;i++)
        				{
        					let simplenode = $(node_cardType_html).clone();
        				    let node =simplenode.find("td[data-custom=simple]");
        				    node.attr("data-custom","pairs_"+i)
        				    let pokerVal = Card_TYPE_MAP.pairs[i].val;
        				    let cardVal =  util.mapPokerByIdVal( pokerVal);
        				    node.html("对 "+cardVal);
        					$("#gameInPage_ChaiPai").append(simplenode)

        				}
        			}


    		}//end of chaipai model
		//如果不是自动拆牌模式
		else if(model === gameModel.NonSplitCardModel )
		{
			$("td[data-custom=ReadyOutCards]").empty();
			//先对扑克排序
			let pokerList  =window.PLAYER_CARD_INFO.cardList;
			let pokerSortList = pokerList.sort(function(a, b) {
				return a.num-b.num;
				
			});
			// <tr>
			// <td>3<a href=""><img src="./images/checkboxbtn.png"></a></td>
			let tableNode = $("table[data-custom=poker_buchaipai]");
			// console.log('==='+tableNode.html());
			tableNode.empty();
			if(pokerSortList&&pokerSortList.length>0)
			{
				let lines =Math.floor(pokerSortList.length/4) +(pokerSortList.length%4==0?0:1);
				console.log("lines = ",lines);
				let htmlTxt = '';
				for(let k=0;k<lines*4;k++)
				{

					if(k%4 == 0){
						// console.log("---<tr>");
						htmlTxt+='<tr>';
					}
					if(k<pokerSortList.length)
					{
						let pokerObj = pokerSortList[k];
						if(!pokerObj)continue;
						// console.log("---<td >"+pokerObj.num+"</td>");
						htmlTxt+=  "<td data-custom="+pokerObj.color+"_"+pokerObj.num+">"+util.mapPokerByIdVal(pokerObj.val)+"<a href=\"javascript:void(0)\" ><img data-custom-status=0 class=NonSplitCard_checkbox src=\"./images/checkboxbtn2.png\"></a></td>";	
														// }else {
					// htmlTxt+= '<td >'+pokerObj.num+'</td>';
						// 
					}else {
						// console.log("---<td ></td>");
						htmlTxt+='<td >&nbsp;</td>';
					}
					if(k%4 == 3){
						htmlTxt+='</tr>';
						// console.log("---</tr>");
					}
					// console.log("--------k=",k);

				}
				tableNode.append(htmlTxt);
				//console.log(tableNode.html());
			}//

		}//end chaipai
}


//

var showRoomInfo = util.showRoomInfo = function (roominfo) 
{

	//得到玩家的状态
		let roomObj = roominfo;
    	let playerList = roomObj.playerList;
    	window.PlayersArray=playerList.slice(0, playerList.length);

    	console.log("window.PlayersArray= ",window.PlayersArray);
    	let readyPersonCount=0;
    	let curPersonsInRoom = playerList.length;
    	for(let idx=1;idx<=3;idx++)
    	{
    	  var jqueryObj =$("li[data-custom=RoomInfo_"+idx+"] ");
    	  if(idx>playerList.length)
    	  {
    	  	jqueryObj.hide();//没有的就做了隐藏
    	  }else {
    	  	//找到对应的位置的玩家
    	  	jqueryObj.show();
    	  	let player = playerList.find((element)=>{return element.position == (idx)  });
    	  	if(!player){
    	  		console.log('player is null......');
    	  		continue;
    	  	}
    	  	// let po = window.PlayersArray.find((element)=>{return element.userId == player.userId  });
    	  	// if(!po )
    	  	// {
    	  	// 	//如果没有找到这个player那么就是第一次
    	  	// window.PlayersArray.push(player);
    	  	// console.log('window.PlayersArray=',window.PlayersArray);
    	  	// }else {
    	  	// 	console.log('已经存在的obj',window.PlayersArray);
    	  	// }
    	
    	  	let status = player.prepare;
    	  	let name = player.userName;
    	  	let userid = player.userId;
    	  	let roleInfo = player.job;//角色信息表示是地主还是农民
    	  	$("p[data-custom=position_name_"+idx+"]").empty().text(name);
    	  	//把数据填充下
    	  	//状态是0表示没有准备好 1 准备好
    	  		if(status == '1')
        	  	{
        	  		 
					 jqueryObj.find("div[data-custom=PlayerStatus_"+idx+"]").empty().append('已准备');
	  				 readyPersonCount++;
  				}else {
  					if(userid == LocalPlayerInfo.playerId)
	  				{ 
	  					jqueryObj.find("div[data-custom=PlayerStatus_"+idx+"]").empty().append('<button style=\" background-color: green;color:white;text-shadow: none; \" class="ui-btn ui-btn-inline\" data-custom=readyGame>准备</button>');
					    // LocalPlayerInfo.playerRole = roleInfo;
					    // LocalPlayerInfo.playerName = name;
					    // LocalPlayerInfo.playerId = userid;
					    // LocalPlayerInfo.positionId = player.position;
						util.initUserInfo(player);
					}else{
						jqueryObj.find("div[data-custom=PlayerStatus_"+idx+"]").empty().append('没准备');
					}
  				}
    	  }
    	}//end of for

		
    	let posId = LocalPlayerInfo.positionId;

    	//统计到准备好的人数，如果三个人都准备好了，地主就可以显示开始按钮了
    	if(readyPersonCount == 3 && LocalPlayerInfo.positionId == 1)
    	{
 			$("div[data-custom=PlayerStatus_1").empty().append('<a href=\"#gameInPage\"><button style=\" background-color: green;color:white;text-shadow: none;\" class="ui-btn ui-btn-inline\" data-custom=startGame>开始</button></a>');

		// $("li[data-custom=RoomInfo_"+posId+"] div[data-custom=PlayerStatus_"+posId+"]").empty().append('<a href=\"#gameInPage\"><button style=\" background-color:#B90CE8;color:white;  text-shadow: none;\"  class=\"ui-btn ui-btn-inline\" >开始</button></a>');
    	}

    	if(readyPersonCount == 3 )
    	{
    		$("td[data-custom=RoomStatus]").empty().val("准备好了");
    		
    	}


}

var initUserInfo  = util.initUserInfo = function(player)
{
	if(!player)return ;
	let status = player.prepare;
  	let name = player.userName;
  	let userid = player.userid;
  	if(!userid)userid = player.userId;
  	let roleInfo = player.job;//角色信息表示是地主还是农民

	if(userid == LocalPlayerInfo.playerId)
		{ 
		LocalPlayerInfo.playerRole = roleInfo;
	    LocalPlayerInfo.playerName = name;
	    LocalPlayerInfo.playerId = userid;
	    LocalPlayerInfo.positionId = player.position;
		
		}
}

//下面两个是数组的操作，一个是找到index下标，另外一个是删除某个对象
util.getIndexWithArr = function (_arr,_obj) {
    var len = _arr.length;
    for(var i = 0; i < len; i++)
    {
        if(_arr[i].color==_obj.color&&_arr[i].num == _obj.num)
        {
            return parseInt(i);
        }
    }
    return -1;
};
 
// js中“==”可以判断是否是同一对象

// 删除指定对象：

util.removeObjWithArr = function (_arr,_obj) {
    var length = _arr.length;
    for(var i = 0; i < length; i++)
    {
        if(_arr[i].color==_obj.color&&_arr[i].num == _obj.num)
        {
        	console.log('remove :',_obj);
            if(i == 0)
            {
                _arr.shift(); //删除并返回数组的第一个元素
                return;
            }
            else if(i == length-1)
            {
                _arr.pop();  //删除并返回数组的最后一个元素
                return;
            }
            else
            {
                _arr.splice(i,1); //删除下标为i的元素
                return;
            }
        }
    }
};

util.judgePoker =function(selfReadyPokerlist,preReadyPokerlist)
{
	let prePlayerReadyCards = util.getAiLogicPokerList(preReadyPokerlist);//需要foreach的转换
	var pretype = G.gameRule.typeJudge(prePlayerReadyCards);//对上家的牌型判断，
	//判定自己的牌型
	let selfReadyCard = util.getAiLogicPokerList(selfReadyPokerlist);
	var selftype = G.gameRule.typeJudge(selfReadyCard);//对上家的牌型判断，
	if(!selftype || !pretype )return false;
	// 王炸大过任何牌
    //炸弹可大其他牌型
    //同牌型大
    if(selftype.cardKind === G.gameRule.KING_BOMB
        || (selftype.cardKind === G.gameRule.BOMB && pretype.cardKind != G.gameRule.BOMB)
        || (selftype.cardKind === pretype.cardKind && selftype.size === pretype.size && selftype.val > pretype.val)){
        
    	//这是允许出的牌
 		return true;
    }else return false;

}
