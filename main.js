const http = require('http');
const https = require('https');
const PORT = 3000;

http.createServer()
.listen(PORT)
.on('error'
, err => console.error(err))
.on('request'
, handler);

function handler(req, res) {
    if (req.method === 'GET') {
    res.writeHead(200,'OK', {'Content-Type': 'text/html;charset=utf-8'});
    res.write('<form type = text name = test method = post><input type= text name= text><button type = submit>sumbit</button></form>');
    res.end();
    }
    if (req.method === 'POST') {
        let data = '',
            key = 'trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df';
            url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=',
            lang = 'lang=ru-en';
        req.on('data', chunk => data += chunk);
        req.on('end', () => {
                let yData = '';
                https.get(`${url}${key}&${data}&${lang}`, (response) => {
                    response.on('data', chunk => {
                        yData += chunk;
                    });
                    response.on('end', () => {
                        yData = JSON.parse(yData);
                        res.writeHead(200,'OK', {'Content-Type': 'text/html;charset=utf-8'});
                        res.write(yData.text.toString());
                        res.end();
                });
            });
        })    ;
    }
}