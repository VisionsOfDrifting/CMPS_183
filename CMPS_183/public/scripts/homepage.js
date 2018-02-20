/* Should really make this a function or something...
   var i;
   var max = 4.0;
   var gpa = [12]; //12 quarters of grades
   gpa[0] = 3.2;
   gpa[1] = 3.7;
   gpa[2] = 2.7;
   gpa[3] = 3.2;
   gpa[4] = 3.8;
   gpa[5] = 3.9;
   gpa[6] = 3.2;
   gpa[7] = 2.0;
   gpa[8] = 1.0;
   gpa[9] = 1.5;
   gpa[10] = 2.4;
   gpa[11] = 2.4;
   var x = 0;
   var y = gpa[0]; //start with first gpa
   var sum = gpa[0];
   var canvas = document.getElementById("myCanvas");
   var ctx = canvas.getContext("2d");  

   //gpa over time
   ctx.beginPath();
   ctx.strokeStyle = "#000000";
   for(i=1; i<gpa.length; i++)
   {
           ctx.moveTo(x, 280-(70*y));
           y = gpa[i];
           x += 29;
           ctx.lineTo(x, 280-(70*y));
           sum += gpa[i];
   }
   ctx.stroke();
   var averagegpa = sum/gpa.length;
   /*//axis labels
   ctx.font = '20pt Lato';
   ctx.fillText('Quarter', 160, 270);
   ctx.rotate(-Math.PI*2);
   ctx.fillText('GPA', 2, 200);
   //ctx.rotate(-Math.PI*2/(i*6));*/
   //average gpa line
   ctx.beginPath();
   ctx.strokeStyle = "#33cc33";
   ctx.moveTo(0, 280-(70*averagegpa));
   ctx.lineTo(440, 280-(70*averagegpa));
   ctx.stroke();

   //quarter tick marks
   ctx.beginPath();
   ctx.strokeStyle = "black";
   var next = 0;
   for(i=0; i<12; i++){
       ctx.moveTo(next, 280);
       ctx.lineTo(next, 275);
       next+=29;
       ctx.stroke();}
*/