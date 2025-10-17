// const http = require('http');
const express = require('express');
const app = express();
const fs = require('fs');
const port = 5000;

app.use(express.json());

app.use((req, res, next)=> {
    console.log('Request Received');
    next();
});

app.get('/', (req, res)=>{
    res.send('Hello Express!');
});

app.get('/hai', (req, res) => {
    res.send('Hello World and Hai')
});

app.get('/write', (req, res)=> {
    fs.writeFile('file.txt', 'Hello World Siva!', ()=>{
        res.send('File Writted successfully');
    });

});

app.get('/read', (req, res)=> {
    fs.readFile('file.txt', 'utf8', (err, data)=>{
        res.send(data);
    });
});

// http.createServer((req, res)=>{
//     res.write('Hello World Http');
// }).listen(port);
  
app.listen(port, () => {
    console.log(`Local Node App Listening on port ${port}`)
});

