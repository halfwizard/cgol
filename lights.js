function graph(g){
  var markup = '';
  g.forEach(function(a){
    markup += a.join('') + "<br />\n";
  });
  markup += '<br />';
  document.write(markup);
}

input[0][0] = 1;
input[0][input.length-1] = 1;
input[input.length-1][0] = 1;
input[input.length-1][input.length-1] = 1;

function step(input) {
  return input.map(function(row,y,a){
    var newRow = [];
  
    for(var x=0;x<row.length;x++) {
      var score = 0;
      for(var v=y-1;v<=y+1;v++) {
        for(var h=x-1;h<=x+1;h++) {
          if(!(v==y && h==x) && a[v]!=undefined && a[v][h]!=undefined && a[v][h]==1) score++;
        }
      }
      if(a[y][x]==1) {
        newRow.push((score >=2 && score <=3) ? 1 : 0);
      } else {
        newRow.push((score == 3) ? 1 : 0);
      }
    }
    if(y==0 || y==a.length-1) {
      newRow[0] = 1;
      newRow[newRow.length-1] = 1;
    }
    return newRow;
  });
}

var next = input;

for(var i=0; i<steps; i++) {
  var next = step(next);
}

console.log(next.reduce((a,b)=>a+b.reduce((a,b)=>a+b),0));
graph(next);





