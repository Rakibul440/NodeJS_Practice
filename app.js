const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url==='/'){
        res.write('<html>');
        res.write('<head><title>Enter your message</title></head>');
        res.write('<body><form action="/sms" method="POST"><input type="text" name="sms"><button type="submit">Send Message</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === "/sms" && method === "POST"){
        //---
        const body = [];
        req.on('data',(chunk)=>{
            console.log('chank is :',chunk);
            body.push(chunk);
        })
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log('parsed body is : ',parsedBody);
            const sms = parsedBody.split('=')[1];
            fs.writeFileSync('sms.text',sms);
        })
        //---
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>First page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>');
    res.end();
});

server.listen(3000);