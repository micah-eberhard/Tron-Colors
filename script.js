window.onload = function(){

  var height = 24;
  var width = 48;
  var cHeight = 16;
  var cWidth = 48;
  var cSize = '.2rem';
  var gridStr = '';
  var paintBox = document.getElementById('mainColors');
  var colorPicker = document.getElementById('colorPicker');
  var playerColors = document.getElementById('playerColors');
  var colorDisplay = document.getElementById('colorDisplay');

  var currColor = 'red';
  var loc = {
    box:document.getElementsByClassName('box 0-0'),
    name:'Player 1',
    x:0,
    y:0,
    color:'#961717'
  };
  var loc2 ={
    box:document.getElementsByClassName('box 23-47'),
    name:'Player 2',
    x:width-1,
    y:height-1,
    color:'#179683'
  };

  for(var i = 0; i < height; i++)
  {
    gridStr += '<div class="row'+ i +'">';
    for(var j = 0; j < width; j++)
    {
          gridStr += '<div class="box '+ i +'-'+j+'"></div>';
    }
  }
  paintBox.innerHTML = gridStr;

  gridStr = '';
  var inv = cHeight;
  for(var i = 0; i < cHeight; i++)
  {
    gridStr += '<div class="row'+ i +'">';
    for(var j = 0; j < cWidth; j++)
    {

        var hexString = Math.floor(i).toString(16) + Math.floor(i).toString(16);
        hexString = hexString + Math.floor(j/3).toString(16) + Math.floor(j/3).toString(16);
        hexString = hexString + Math.floor(inv-i).toString(16) + Math.floor(inv-i).toString(16);
        gridStr += '<div class="cbox '+ i +'-'+j+'" style="background-color:#'+hexString+'"></div>';
    }
    gridStr += '</div>';
  }
  colorPicker.innerHTML = gridStr;

  paintBox.addEventListener('click', function(event){
    var tar = event.target;
    if(tar.className.substring(0,3) == 'box'){
      tar.style.backgroundColor = currColor;
    }
  });

  colorPicker.addEventListener('click', function(event){
    var tar = event.target;
    if(tar.className.substring(0,4) == 'cbox')
      currColor = tar.style.backgroundColor;
      colorDisplay.style.backgroundColor = currColor;
  });
  playerColors.addEventListener('click', function(event){
    var tar = event.target;
    console.log(tar);
    if(tar.className.substring(2) == 'Lock')
      {
        var player = tar.className.substring(0,2);
        console.log(player);
        if(player == 'p1'){
          loc.color = currColor;
          loc.box[0].style.backgroundColor = currColor;
          tar.style.backgroundColor = currColor;
        }
        if(player == 'p2'){
          loc2.color = currColor;
          loc2.box[0].style.backgroundColor = currColor;
          tar.style.backgroundColor = currColor;
        }
      }
  });

  window.addEventListener('keypress', function(event){
    var press = String.fromCharCode(event.charCode);
    var locString = '';
    var currLoc = '';

    if(press ==='i' || press ==='j' || press ==='k' || press ==='l')
    {
      locString = loc2.box[0].className.substring(4).split('-');
      currLoc = loc2;
      currColor = loc2.color;
    }
    else if (press ==='w' || press ==='s' || press ==='a' || press ==='d')
    {
      currLoc = loc;
      locString = loc.box[0].className.substring(4).split('-');
      currColor = loc.color;
    }
    console.log(locString);
    var x = parseInt(locString[0]);
    var y = parseInt(locString[1]);
    console.log(x + ' ' + y);
    var boxStr = 'box '+x+'-'+y;

    if((press ==='w' || press ==='i') && x != '0'){
      x = x - 1;
      boxStr = 'box '+x+'-'+y;
      currLoc.box = document.getElementsByClassName(boxStr);
      if(currLoc.box[0].style.backgroundColor !== '')
      {
        alert(currLoc.name + " Hit a wall and LOSES!");
      }
      currLoc.box[0].style.backgroundColor = currColor;
      }
    if((press ==='a' || press ==='j') && y != '0'){
      y = y - 1;
      boxStr = 'box '+x+'-'+y;
      currLoc.box = document.getElementsByClassName(boxStr);
      if(currLoc.box[0].style.backgroundColor !== '')
      {
        alert(currLoc.name + " Hit a wall and LOSES!");
      }
      currLoc.box[0].style.backgroundColor = currColor;
    }
    if((press ==='s' || press ==='k') && x < height-1){
      x = x + 1;
      boxStr = 'box '+x+'-'+y;
      currLoc.box = document.getElementsByClassName(boxStr);
      console.log(currLoc.box[0].style.backgroundColor);
      if(currLoc.box[0].style.backgroundColor !== '')
      {
        alert(currLoc.name + " Hit a wall and LOSES!");
      }
      currLoc.box[0].style.backgroundColor = currColor;
    }
    if((press ==='d' || press ==='l') && y < width-1){
      y = y + 1;
      boxStr = 'box '+x+'-'+y;
      currLoc.box = document.getElementsByClassName(boxStr);
      if(currLoc.box[0].style.backgroundColor !== '')
      {
        alert(currLoc.name + " Hit a wall and LOSES!");
      }
      currLoc.box[0].style.backgroundColor = currColor;
    }
  });

  function getNames()
  {
    var person = prompt("Player 1, Enter Your Name!", "Player 1");
    loc.name = person;
    document.getElementById('p1Btn').innerText = loc.name;
    person = prompt("Player 2, Enter Your Name!", "Player 2");
    loc2.name = person;
    document.getElementById('p2Btn').innerText = loc2.name;
  }



  getNames();
};
