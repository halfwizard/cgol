function graph(g){
  var markup = '';
  g.forEach(function(a){
    markup += a.join('') + "<br />\n";
  });
  markup += '<br />';
  document.write(markup);
}

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
    return newRow;
  });
}

var next = input;

for(var i=0; i<4; i++) {
  var next = step(next);
}

graph(next);





