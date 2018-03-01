// given a year, all of the children will report their associated GPA for each quarter
// i.e. Fall: 3.0, Winter: 4.2, etc.
function loadGraphData(){
    const ref = firebase.database().ref();
    var quarterGPAs = [];
    var quarterIndex = [];
    var i = 0;
    var numQuarters = 0;
    var fall, spring, winter, summer;
    var max = 4.0;
    quarterGPAs.push(i++);
    quarterIndex.push(0);
    var text = [];
    var quarters = ["Winter", "Spring", "Summer", "Fall"];
    var usersRef = ref.child("" + userID + "/gpa");
    var dict = {};
    
    usersRef.once("value", function(year) {
        console.log("initial data loaded!", year.numChildren());
        year.forEach(function(quarter) {
            console.log(quarter.val());
            quarter.forEach(function(gpa) {
                console.log(gpa.key + " " + quarter.key);
                quarterGPAs.push(gpa.val());
                text.push(quarter.key + " " + gpa.key);
                quarterIndex.push(i++);
            });
            // now we have all "4" quarters loaded if they took all 4 quarters in that year
        });
        makeGraph(quarterIndex, quarterGPAs, text);
    });
}

function makeGraph(x, quarterGPAs, markerInfo) {
    //console.log(x);
    var trace1 = {
      x: x, 
      y: quarterGPAs, 
      mode: 'lines+markers', 
      name: 'spline',  
      text: markerInfo,
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
}