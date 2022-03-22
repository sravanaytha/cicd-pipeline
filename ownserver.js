const WebSocketServer = require('ws');
const wss = new WebSocketServer.Server({ port: 8088 })
const fs=require("fs")
wsa={}
let counter = 0;
var room1=[]
var room2=[]
var rooms=[room1,room2]
var names=["room1","room2"]
//var names=[]
const fileContents = fs.readFileSync('./login_data.json', 'utf8');
  const udata = JSON.parse(fileContents)
wss.on('connection',(ws)=>{
    
    let auth=0;
    let rd=0;
    let ccs=0
    let flag=0
    console.log("new client connected");
    //console.log(udata)
    ws.on('message',(data)=>{
        let proceed=""
        console.log(data.toString())
        console.log(names)
        if(data.toString()=="start"){
            auth=0;
        console.log("start bit came to server")
          auth=293;
          ws.send(" cls")
        }
        else if(data.toString()=="startcc"){
            //ws.send(names);
            auth=392
        }
       else if(auth==293){
            var text=data.toString()
            let uname=text.split(" ")[0]
            let pwd=text.split(" ")[1]
            for (i = 0; i < 3; i++) {
                if (udata['users'][i][uname]==pwd) {
                    //console.log("jumbo",udata['users'][i][s[0]],s[1])
                    proceed="ok"
                    break;
                }
            }
            if(proceed=="ok"){
            ws.send("gudauthenticated "+rooms.length+" "+names)
                ws.id=counter++;
                ws.name=uname
                 wsa[ws.id]=ws
                 wsa[uname]=uname;
                rd=293;
               // auth=10;
            }
            
            else{
                ws.send("not authenticated")
               // rd=10;
            }
            auth=0;
            
        }
        else if(rd==293){
           console.log(data.toString())
           var ind=names.findIndex(rank => rank ===data.toString())+1
           console.log(ind)
           rooms[ind-1].push(ws.id)
           ws.room=ind
           rd=0
        }
        else if(auth==392){
            var num=data.toString().split(" ")[0];
            var temp=data.toString().split(" ")[0];
            ws.send(num+" "+names)
            console.log(temp)
            for(let i=-7;i<=num-8;i++){
                room$i=new Array()
                rooms.push(room$i);
            }
            ccs=1;
            auth=319
            
        }
        else if (auth==319)
        {
           // ws.room=data.toString();
            //ws.send(rooms.length)
            console.log(data.toString().split(" ")[0])
            console.log(typeof data.toString().split(" ")[1])
            names=(data.toString().split(" ")[1]).split(",")
           // console.log(names)
            if(data.toString().split(" ")[0]=="all")
            {
                  flag=1;
            }
            else{
            ws.room=names.findIndex(rank => rank ===data.toString().split(" ")[0])+1;
            console.log(names.findIndex(rank => rank ===data.toString().split(" ")[0])+1)
            }
            ws.name="cc"
            auth=361;
            
        }
        else if(auth==361){
            if(ws.room<=rooms.length)
            {
               
                Object.entries(wsa).forEach(([, s]) => {
               if(s.id!=ws.id && s.room==ws.room){
                    s.send(`${ws.name}`+":"+data.toString())
                    }
                }) 
            }
            else if(flag==1){
            Object.entries(wsa).forEach(([, s]) => {
                if(s.id!=ws.id ){
                s.send(`cc`+":"+data.toString())
                }
            })
        }
        }
        else{
        Object.entries(wsa).forEach(([, s]) => {
            if(s.id!=ws.id && s.room==ws.room){
            s.send(`${ws.name}`+":"+data.toString())
            }
        })
        console.log(data.toString())
    //  console.log(room3)
      
    }
    console.log(rooms,room1,room2)
    //console.log(wsa)
   
    
    ws.send("")
    
    })
})