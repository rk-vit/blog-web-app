import express from 'express' ;
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const app = express();
const port = 3000;
var __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');
app.set('views',__dirname+ '/views');


app.get('/',(req,res)=>{
    res.render('index.ejs');
})
app.get('/newblog',(req,res)=>{
    res.render('newblog.ejs');
})
app.post('/login',(req,res)=>{
    if(req.body.emailid=="revanthkannam05@gmail.com" && req.body.pass == "srividhya@6456"){
        res.render('mainpage.ejs');
        
    }else{
        res.send('login Unsuccessful');
    }
})

app.get('/login',(req,res)=>{
    res.render('mainpage.ejs');
})
app.listen(port,()=>{
    console.log("Listening in port :-"+port);
})

app.post('/submit',(req,res)=>{
    const blogText = req.body.bloga;
    const filePath = __dirname + '/public/users/rk/rkblog.bin';
    fs.writeFile(filePath, blogText, (err) => {
        if (err){
            console.error('Error writing to file', err);
            res.send('Error saving blog');
        }else{
            res.send('Blog saved successfully');
        }
    });
})

