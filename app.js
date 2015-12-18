var http = require('http'),
    fs = require('fs');

function page(input){
  var page = '<!doctype html><html><head><meta charset="utf-8" /><title>Lights</title></head><body>'
           + '<script type="text/javascript">\n'
           + 'var input = ' + JSON.stringify(input) + ';\n'
           + fs.readFileSync('lights.js')
           + '</script></body></html>';
  return page;
}

http.createServer(function(req,res){
  var route = (req.url == "/sample") ? "./sample" : "input",
      input = fs.readFileSync(route,'utf8').replace(/\./g,'0').replace(/#/g,'1').split("\n").filter(s=>s.length>0).map(s=>s.split('').map(n=>+n));
  res.writeHead({'Content-type': "text/html"});
  res.end(page(input));
}).listen(3000,"127.0.0.1");
console.log("listening on 127.0.0.1:3000");
      