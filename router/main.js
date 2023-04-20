const express = require('express')
const app = express()
const port = 3000;
const path = require('path'); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('./main');
});
app.get('/:search_keyword',function(req,res){
    res.render('./search_page');
});

app.listen(port);