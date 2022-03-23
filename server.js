var express= require("express")
var fs=require("fs")
var bodyParser = require("body-parser")
var app= express()
var flag=0
var register=0
var soc_name=""
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.get("/",(req,res)=>{
  res.sendFile(__dirname + '/register.html');
})
app.post("/signup",(req,res)=>{
  //console.log(req)
  var name=req.body.name
  var pwd=req.body.pwd
  console.log(name,pwd)
  const fileContents = fs.readFileSync("./user.json", "utf8");
              const udata = JSON.parse(fileContents);
              console.log(udata["table"].length);
              for (let i = 0; i <= udata["table"].length - 1; i++) {
                if (
                  udata["table"][i]["uname"] == name &&
                  udata["table"][i]["password"] == pwd
                ) {
                  
                  register = 1;
                  break;
                }
                
              }
 if(register==0){
              fs.readFile("user.json", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      var obj = JSON.parse(data);
      obj.table.push({
        uname: name,
        password:pwd,
      });

      let json = JSON.stringify(obj);
      fs.writeFile("user.json", json, () => {});
    }
  });
  
  res.sendFile(__dirname + '/login.html')
}
else{
  res.send("<h1> user already exists</h1> <br/>")
  setTimeout(function () {
   // res.sendFile(__dirname + '/register.html')
}, 5000); 
  //
  console.log("user already exists")

}

  

})

app.get("/login",(req,res)=>{
    res.sendFile(__dirname + '/login.html')
})
app.get("/login.html",(req,res)=>{
  res.sendFile(__dirname + '/login.html')
})
app.get("/register.html",(req,res)=>{
  res.sendFile(__dirname + '/register.html')
})
app.get("/register",(req,res)=>{
  res.sendFile(__dirname + '/register.html')
})
// login route for post
app.post("/login",(req,res)=>{
  //console.log(req)
  var name=req.body.name
  var pwd=req.body.pwd
  console.log(name,pwd)
  const fileContents = fs.readFileSync("./user.json", "utf8");
            const udata = JSON.parse(fileContents);
            console.log(udata["table"].length);
            for (let i = 0; i <= udata["table"].length - 1; i++) {
              if (
                udata["table"][i]["uname"] == name &&
                udata["table"][i]["password"] ==pwd
              ) {
                flag = 1;
                break;
              }
            }
            console.log(flag);
            
            if (flag == 1) {
              console.log("correct");
              soc_name=name;
              flag=0;
              res.sendFile(__dirname+"/chat.html")
            }
            else{
              console.log("incorrect")
              res.send("<h1>detail are incorrect</h1>")
            }
  
})

//chat logic
const WebSocketServer = require('ws');
const wss = new WebSocketServer.Server({ port: 8088 })
var clients = {}
var counter=0
/*server.listen(8080,()=>{
    console.log("server listening at 8080")
})*/

wss.on("connection",socket=>{
    console.log("new client connected")
    socket.id=counter++;
    socket.name=soc_name;
    clients[socket.id]=socket
    //console.log(clients)
    socket.on('message', (msg) => {
        console.log(msg.toString())
        Object.entries(clients).forEach(([, s]) => {
            if(s.id!=socket.id ){
            
                s.send(socket.name+":"+msg.toString())
            }
            else{
              s.send("self-socket:"+msg.toString())
            }
        });
     
    })
})



app.listen(8080,()=>{
  console.log("server listening at 8080 port")
})