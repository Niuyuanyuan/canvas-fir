window.onload=function()
{
  var canvas=document.querySelector('#canvas');
  var ctx=canvas.getContext('2d');

  


  for(var i=0;i<15;i++)
  {
    var shux=39;
    ctx.beginPath();
    ctx.moveTo(27.5+shux*i,27);
    ctx.lineTo(27.5+shux*i,573);
    ctx.strokeStyle='blue';
    ctx.stroke();
  }
  for(var j=0;j<15;j++)
  {
    var heny=39;
    ctx.beginPath();
    ctx.moveTo(27,27.5+heny*j);
    ctx.lineTo(573,27.5+heny*j);
    ctx.strokeStyle='blue';
    ctx.stroke();
  }
 
  ctx.beginPath();
  ctx.arc(300.5,300.5,3,0,Math.PI*2);
  ctx.fill();

  var z=[144.5,456.5];
  for(var i=0;i<z.length;i++)
  {
    for(var j=0;j<z.length;j++)
    {
      ctx.beginPath();
      ctx.arc(z[i],z[j],3,0,Math.PI*2);
      ctx.fill();
    }
  }


//定义渐变色
  /*var lingrad=ctx.createLinearGradient(20,300,580,300);
  lingrad.addColorStop(0,'red');
  lingrad.addColorStop(0.2,'orange');
  lingrad.addColorStop(0.4,'yellow');
  lingrad.addColorStop(0.6,'green');
  lingrad.addColorStop(0.8,'blue');
  lingrad.addColorStop(1,'purple');

  ctx.lineWidth=6;
  ctx.lineCap='round';
  ctx.strokeStyle=lingrad;  
  ctx.fillStyle=lingrad;

//渐变线条
  ctx.beginPath();
  ctx.moveTo(0,300);
  ctx.lineTo(600,300);
  ctx.stroke();

//渐变矩形
  ctx.beginPath();
  ctx.fillRect(50,50,200,200);*/




    var luozi=function(x,y,color)
    {
      var zx=39*x+27.5;
      var zy=39*y+27.5;
      var black=ctx.createRadialGradient(zx,zy,1,zx,zy,18);
      black.addColorStop(0.1,'#555');
      black.addColorStop(1,'black');


      var white=ctx.createRadialGradient(zx,zy,1,zx,zy,18);
      white.addColorStop(0.1,'#fff');
      white.addColorStop(1,'#ddd');

      ctx.fillStyle=color?black:white;
      ctx.shadowOffsetX=5;
      ctx.shadowOffsetY=5;
      ctx.shadowBlur=10;
      ctx.shadowColor="rgba(0,0,0,0.5)";

      ctx.beginPath();
      ctx.arc(39*x+27.5,39*y+27.5,18,0,Math.PI*2);
      ctx.fill();
    }
    /*luozi(3,3,true);
    luozi(4,3,false);
    luozi(7,7,true);*/

    var qizi={};

    var  kai=true;
    canvas.onclick=function(e)
    {
      var x=Math.round((e.offsetX-27.5)/39);
      var y=Math.round((e.offsetY-27.5)/39);
     
     if(qizi[x+'_'+y]){return;}

      luozi(x,y,kai);
      qizi[x+'_'+y]=kai?'black':'white';
      kai=!kai;
      
      localStorage.data=JSON.stringify(qizi);//把qizi转换成字符串
    }

   if(localStorage.data)
   {
    qizi=JSON.parse(localStorage.data);//把localStorage.data转换成对象
    for(var i in qizi)
    {
      var x=i.split('_')[0];
      var y=i.split('_')[1];
      luozi(x,y,(qizi[i]=='black')?true:false);
    }
   }

   //在空白处双击然后清除数据
   canvas.ondblclick=function(e)
   {
    e.stopPropagation();
   }
   document.ondblclick=function()
   {
    localStorage.clear();
    location.reload();
   }


}