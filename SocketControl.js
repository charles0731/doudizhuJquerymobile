  

function SocketControl (callbackfunc) {
    this.t2=0;
    this.t1=0;

   this.createWS = ()=>{
        this.loadProto();
        console.log("===websocket create ......");
        this.ws = new WebSocket("ws://192.168.2.111:8080/doudizhuGame/websocket");
         this.ws.onopen = () => {
            console.log("create the websocket ok .....");
         }
        this.ws.onmessage = (event) => { 
          this.t2 = new Date().getTime(); 

          console.log("websocket on message  ....."+event.data); 
          if(callbackfunc){
            callbackfunc(event.data,this.t2-this.t1);
          }
         }
        this.ws.onerror = (error) => { console.log("websocket on error  ....."); }
        this.ws.onclose = () => {console.log("websocket on close   ....."); }
         // ws = new WebSocket(this.props.url)
    };
  this.sendMessage = (data)=>{
     this.t1 = new Date().getTime(); 
  	console.log("send data ......"+ data );
  	this.ws.send( data);
  }

   
}

//var netsocket = new SocketControl();
//export netsocket;

