const http = require('http');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    console.log(req.url);
    if (url ==='/'){
        res.write("<html>");
        res.write("<head><title>Node Js</title></head>");
        res.write('<body><form action="/sms" method="POST"><input type="text"></input><button type="submit">Send</button></form></body>');
        res.write("</html>");
        return res.end();
    }
    if(url==='/sms' && method === 'POST'){
        res.setHeader('Location','/');
        res.statusCode=302;   ////For Redirecting An Webpage
        // res.write("<html>");
        // res.write("<head><title>Node Js</title></head>");
        // res.write('<body><h1>Hey Rakibul</h1></body>');
        // res.write("</html>");
        return res.end();
    }
});

server.listen(3000);