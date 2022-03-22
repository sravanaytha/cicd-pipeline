const ws = require('ws');
var readline = require('readline');
const chalk=require("chalk")
var colors = require('colors');
var term = require('terminal-kit').terminal
var inquirer=require("inquirer")
var rmcount=2
//const { read } = require('jimp');
var rooms=[]
var names=["room1","room2"]
var rl = readline.createInterface(
     process.stdin, process.stdout);
// const prompt = require('prompt-sync')();
    const url='ws://localhost:8088'
    let client;
    var uname=""
    var pass=""
   // var c=0;
    var ra=0
    var cf=0;
    var flag=0
    var p=""
    var choice=0
    
    read()
   
    const clicknature = ()=> {
        process.stdout.write('\x1Bc')
        console.log(chalk.green("enter room number from below"));
        if(names.includes('all'))
        {
            names=names.slice(0,-1)
        }
        return new Promise(resolve => {
            term.singleColumnMenu(names, function (error, response) {
                term('\n').eraseLineAfter.green(
                    resolve(response.selectedText)
                );
            })
        })
    }
    const click=()=>{
        return new Promise(resolve=>{
        
    
    })
    }
    //console.log("please enter the below credentials ")
const main=async()=>{
    client = new ws(url);
 //   console.log("chat started")
  
client.on("open", ()=>{
  //console.log("start here")
  c=0
  client.send("start")
});
client.onmessage=async(msg)=>{
    if(c==0){
        client.send(uname+" "+pass)
        c++;
        ra=293
    }
    if(msg.data.includes("gudauthenticated"))
    {
        rmcount=msg.data.split(" ")[1]
        names=(msg.data.split(" ")[2]).split(",")
        
        /*//console.log(rmcount)
        console.log(chalk.green("* * * * * * authenticated * * * * * *"))
        console.log(chalk.blue("enter the room number"))
        for(i=0;i<rmcount;i++){
            console.log(chalk.bgRed.green("\t\t",names[i],"\n"))
        }*/
       p=await clicknature();
      
      /*  await inquirer.prompt([{
        name:"select",
        type:"list",
        message:"choose your room",
        choices:names
    },
 ]).then((answer)=>{
     p=answer['select']
     choice=1;
    
 })*/

 //process.on('SIGINT', () => console.log('bye!'));
      
      console.log(p)
      client.send(p)
       process.stdout.write('\x1Bc')
       //await prompt.close()
      //process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
      //console.clear();
       console.log(chalk.green("chat started"))
        console.log(chalk.green("welcome ",uname,"to keus chat groups"))
        cf=1;
    }
   else if(msg.data=="not authenticated"){
    console.log(chalk.red.bold("you have entered the wrong credentials"))    
   console.log(chalk.red.bold("! ! ! ! ! ! not authenticated ! ! ! ! ! !"))
   //c=0;
   ra=0;
   conti=""
await getcontinue().then(data=>{
    conti=data;
})   
if(conti=="y"){
    await getuname().then(data=>{
        uname=data;
    })
    await getpwd().then(data=>{
        pass=data
    })
    
  main()
}
else{
   process.exit(1)
}
   }
    else{   
        if(msg.data!=""){
    console.log("\t\t",msg.data)
        }
       if(cf==1){
        rl.question(':', (age) => {
        
            client.send(age)
            });
           cf++;
       }
       else if(cf==2)
       {
        //process.stdout.write('\x1Bc'); 
        /*console.log(chalk.green("chat started"))
        console.log(chalk.green("welcome ",uname,"to keus chat groups"))*/
        cf=263;
        if(cf==263)
        {
            rl.question(':', (age) => {
        
                client.send(age)
                });
        }
       }
       else if(cf!=0 || cf==263){
        rl.question(':', (age) => {
        
            client.send(age)
            });
       }
    }
   // if()
    
}
}
function read(){
return new Promise(resolve=>{
rl.question(chalk.blue('enter username: '), function (name) {
    rl.question(chalk.cyan('enter password: '), function (pwd) {
        uname = name;
        pass = pwd;
        main();
        resolve("")
       
    });
  });
  
})
}
function getuname(){
   // console.log('...getuname')
    
    return new Promise((resolve, reject) => {
        rl.question("re-enter username", (input) => resolve(input) );
      });
}
function getpwd(){
    //console.log('...getpwd')
    return new Promise((resolve, reject) => {
        rl.question("re-enter password", (input) => resolve(input) );
      });
}

function getcontinue(){
    //console.log('...getpwd')
    return new Promise((resolve, reject) => {
        rl.question("press 'y' to continue 'n' to exit from app", (input) => resolve(input) );
      });
}