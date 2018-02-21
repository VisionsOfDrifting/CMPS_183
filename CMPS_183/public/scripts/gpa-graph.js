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

//This is ploty.js, you have to give it arrays.
var trace1 = {
  x: [1,2,3,4,5,6,7,8,9,10,11,12], 
  y: gpa, 
  mode: 'lines+markers', 
  name: 'spline',  
  text: ['Q1 Fall', 'Q2 Winter', 'Q3 Spring', 'Q4 Summer', 
         'Q5 Fall', 'Q6 Winter', 'Q7 Spring', 'Q8 Summer', 
         'Q9 Fall', 'Q10 Winter', 'Q11 Spring', 'Q12 Summer'],
  line: {shape: 'spline'}, 
  type: 'scatter'
};
var data = [trace1];
var layout = {
     xaxis: {
     title: 'Quarters'
   },
   yaxis: {
     title: 'GPA'
   },
   legend: {
     y: 0.5, 
     traceorder: 'reversed', 
     font: {size: 16}, 
     yref: 'paper'
   }
};
Plotly.newPlot('graph', data, layout);