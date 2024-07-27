import express from 'express' ;
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { title } from 'process';
import { time } from 'console';
import methodOverride from 'method-override';
const app = express();
const port = 3000;
var __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');
app.set('views',__dirname+ '/views');

app.use(methodOverride('_method'));
app.use(methodOverride('_func'));


app.get('/',(req,res)=>{
    res.render('index.ejs');
})
app.get('/newblog',(req,res)=>{
    res.render('newblog.ejs');
})
app.get('/myblogs',(req,res)=>{
    const filePath = __dirname + '/public/users/blogdata.txt';
    var posts;
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            console.error(err);
        }else{
            posts = JSON.parse(data);
            console.log(posts)
            res.render('myblogs.ejs',{post:posts});
        }
    })
    
})
app.post('/login',(req,res)=>{
    if(req.body.emailid=="revanthkannam05@gmail.com" && req.body.pass == "srividhya@6456"){
       res.redirect('/login')
        
    }else{
        res.send('login Unsuccessful');
    }

})

app.get('/login',(req,res)=>{
    const filePath = __dirname + '/public/users/blogdata.txt';
    var posts;
    fs.readFile(filePath,'utf-8',(err,data)=>{
    if(err){
        console.error(err);
    }else{
        posts = JSON.parse(data);
        console.log(posts);
        res.render('mainpage.ejs',{post:posts});
    }
    })
})
app.listen(port,()=>{
    console.log("Listening in port :-"+port);
})

app.get('/read',(req,res)=>{
    const filePath = __dirname + '/public/users/blogdata.txt';
    var posts;
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            console.error(err);
        }else{
            posts = JSON.parse(data);
        }
        console.log(posts);
        res.send(posts)
    })
})



app.put('/edit',(req,res)=>{
    res.send(req.body.postid);

})
app.delete('/delete',(req,res)=>{
    res.send(req.body.postid);
})



app.post('/newblog',(req,res)=>{
    const blogText = req.body.bloga;
    const filePath = __dirname + '/public/users/blogdata.txt';
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            console.error(err);
        }else{
            var posts = JSON.parse(data);
            console.log(posts);
            const new_post = {
                user_id : "rk__2005__",
                post_id : posts.length + 1,
                author: req.body.author,
                title: req.body.title,
                Text: req.body.blogtext,
                date: new Date()
            }
            posts.push(new_post);
            fs.writeFile(filePath, JSON.stringify(posts) , (err) => {
                if (err){
                    console.error('Error writing to file', err);
                    res.send(err);
                }else{
                    res.redirect('/login')
                }
            });
        }
    })

    
})

