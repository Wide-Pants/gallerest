const express = require('express')
const app = express()
const port = 3000;
const path = require('path'); 

app.use(express.static(path.join(__dirname, `/`)));
app.use(express.json());

app.get('/',function(req,res){
    const filePath = path.join(__dirname, `views`,'main.html'); // 경로 수정
    res.sendFile(filePath);
});
app.get('/search_keyword/*',function(req,res){
    const filePath = path.join(__dirname, `views`,'search_page.html'); // 경로 수정
    res.sendFile(filePath);
});

app.listen(port);