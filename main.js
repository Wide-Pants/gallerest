const http = require('http');
const express = require('express')
const cors = require('cors');

const app = express()
const server = http.createServer(app);

const port = 3000;
const path = require('path');

require("dotenv").config();

app.use(express.static(path.join(__dirname, `/frontend`)));
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173','http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions));

app.get('/getImages/:keyword/:page', async (req, res) => {
    const keyword = req.params.keyword;
    const page = req.params.page;

    console.log("is working" + keyword);
    if (keyword == undefined) { res.status(401); return; }

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    var client_id = process.env.NAVER_API_USER;
    var client_secret = process.env.NAVER_API_PASSWORD;

    console.log(client_id, client_secret);
    try {
        const response = await fetch(`https://openapi.naver.com/v1/search/image?query=${keyword}&display=16&start=${1+16*page}&sort=sim&filter=large`,
            {
                headers: {
                    'X-Naver-Client-Id': client_id,
                    'X-Naver-Client-Secret': client_secret,
                    ...corsHeaders
                }
            });

        if (!response.ok) {
            res.status(response.status).end();
            console.log('error:' + response.status);
            return;
        }

        const body = await response.json();
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(body));
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).end();
    }
})   

app.get('*', function (req, res) {
    const filePath = path.join(__dirname, `frontend`, 'index.html'); // 경로 수정
    res.sendFile(filePath);
});

server.listen(port);