var stuckLights = false,
    solid = true;

var canvas = document.querySelector('#game'),
    ctx = canvas.getContext('2d');

function draw(input) {
  var alpha = 5/steps;
  if(solid) ctx.clearRect(0, 0, canvas.width, canvas.height), alpha = 1;
  input.forEach(function(row,y,a){
    for(var x=0;x<row.length;x++) {
      if(row[x]) {
        var rgb = (row[x]==1) ? "255,255,0" : "255,0,0";
        ctx.fillStyle = "rgba(" + rgb + "," + alpha + ")";
        ctx.fillRect(x*4,y*4,4,4);
      }
    }
  });
}

function graph(g){
  var markup = '';
  g.forEach(function(a){
    markup += a.join('') + "<br />\n";
  });
  markup += '<br />';
  document.body.innerHTML = markup;
}

if(stuckLights) {
  input[0][0] = 1;
  input[0][input.length-1] = 1;
  input[input.length-1][0] = 1;
  input[input.length-1][input.length-1] = 1;
}

function step(input) {
  return input.map(function(row,y,a){
    var newRow = [];

    for(var x=0;x<row.length;x++) {
      var score = 0;
      for(var v=y-1;v<=y+1;v++) {
        for(var h=x-1;h<=x+1;h++) {
          if(!(v==y && h==x) && a[v]!=undefined && a[v][h]!=undefined && a[v][h]!=0) score++;
        }
      }
      if(a[y][x]!=0) {
        newRow.push((score >=2 && score <=3) ? 1 : 0);
      } else {
        newRow.push((score == 3) ? 2 : 0);
      }
    }
    if(stuckLights) {
      if(y==0 || y==a.length-1) {
        newRow[0] = 1;
        newRow[newRow.length-1] = 1;
      }
    }
    return newRow;
  });
}

var next = input;
draw(next);
var i = 1;
var interval = window.setInterval(function(){
  draw(next);
  next = step(next);
  i++;
  if(i>steps) clearInterval(interval), console.log(next.reduce((a,b)=>a+b.reduce((a,b)=>a+((b!=0)?1:0)),0));
},50);

var obj = document.querySelector('#game');
obj.addEventListener('mousedown',function(e){
  next[Math.floor(e.clientY/4)][Math.floor(e.clientX/4)] = 2;

  console.log(e.clientX,e.clientY)
});
//console.log(next.reduce((a,b)=>a+b.reduce((a,b)=>a+b),0));
