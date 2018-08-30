window.musicUtil={};

var playAudioEffect = musicUtil.playAudioEffect = function(effectSrc  )
{
	if(effectSrc)
	{
		// var audioEle = $("#audio")[0];
		// audioEle.play();	//播放
		// audioEle.pause();	//暂停
		 let audioObj = $("#backgroud_effect")[0];
		 if( audioObj)
		 {
		 audioObj.src = effectSrc;
		 audioObj.play() 	
		 }

	}

}
 
