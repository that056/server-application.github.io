const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user');
const ConnectDb = 'mongodb+srv://wanx:Wanx12@tut-cluster.xh1qy7a.mongodb.net/UserData?retryWrites=true&w=majority'
const app = express();

mongoose.connect(ConnectDb)
.then((result)=> app.listen(3000,()=>
console.log('server is ready')
))
.catch((err)=>console.log(err))

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
res.render('index');

})
app.use(express.urlencoded({extended:true}));


app.get('/create',(req,res)=>{
    res.render('createAccount');
    
    })

    app.post('/create',async (req,res)=>{
        const loginUser=  await User.findOne(req.body)
        if(loginUser){
            res.render('AccountCreated');
        }
        else{
            const addUser = new User(req.body);
            addUser.save();
            console.log("User Saved");
            res.send('Account Created')
        }
      
        
        })

app.get('/login',(req,res)=>{
        res.render('login');
        
        
        })

app.post('/login',async (req,res)=>{
      const loginUser=  await User.findOne(req.body)
    console.log(loginUser);
      if(loginUser){
        res.render('ACcountDetails',{loginUser})
      }
      else{
        res.render('notfound')
      }
    })


app.use((req,res)=>{
res.send('page not found');
    })

