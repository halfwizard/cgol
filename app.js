var http = require('http'),
    fs = require('fs');

function page(input,steps){
  var page = '<!doctype html><html><head><meta charset="utf-8" /><title>Lights</title>'
           + '<style>body{color:#ffd; background:#006;} </style>'
           + '</head><body><canvas id="game" width="400" height="400"></canvas>'
           + '<script type="text/javascript">\n'
           + 'var steps = ' + steps + ';\n'
           + 'var input = ' + JSON.stringify(input) + ';\n'
           + fs.readFileSync('lights.js')
           + '</script></body></html>';
  return page;
}

http.createServer(function(req,res){
  res.writeHead({'Content-type': "text/html"});
  var route = req.url.match((/(\w+):(\d+)/));
  if(route) {
    var input = fs.readFileSync(route[1],'utf8').replace(/\./g,'0').replace(/#/g,'1').split("\n").filter(s=>s.length>0).map(s=>s.split('').map(n=>+n)),
        steps = route[2];
    //res.end(JSON.stringify(route));
    res.end(page(input,steps));
  } else {
    res.end('invalid input');
  }
}).listen(3000,"127.0.0.1");
console.log("listening on 127.0.0.1:3000");
      