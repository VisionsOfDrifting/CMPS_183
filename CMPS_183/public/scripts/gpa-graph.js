// given a year, all of the children will report their associated GPA for each quarter
// i.e. Fall: 3.0, Winter: 4.2, etc.
function loadGraphData(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa");
    
    var quarterIndex = [];
    var i = 0;
    var text = [];
    var qDict = {};
    var qfinal = [];
    
    // insert a 0,0 node to help scale the graph
    qfinal.push(i++);
    quarterIndex.push(0);
    text.push("Q0");
    
    
    usersRef.once("value", function(year) {
        year.forEach(function(quarter) {
            quarter.forEach(function(gpa) {
                qDict["" + quarter.key + gpa.key] = gpa.val();
            });
            // copy over data based on entries in the dictionary
            for (j = 0; j < quarter.numChildren(); j++){
                if (a = qDict[quarter.key + "winter"]){
                    qfinal.push(a);
                    text.push("Winter" + quarter.key);
                    delete(qDict[quarter.key + "winter"]);

                } else if (a = qDict[quarter.key + "spring"]) {
                    qfinal.push(a);
                    text.push("Spring" + quarter.key);
                    delete(qDict[quarter.key + "spring"]);

                } else if (a = qDict[quarter.key + "summer"]) {
                    qfinal.push(a);
                    text.push("Summer" + quarter.key);
                    delete(qDict[quarter.key + "summer"]);

                } else if (a = qDict[quarter.key + "fall"]) {
                    qfinal.push(a);
                    text.push("Fall" + quarter.key);
                    delete(qDict[quarter.key + "fall"]);
                }
                quarterIndex.push(i++);
            }

            });
        makeGraph(quarterIndex, qfinal, text);
    });
}

function makeGraph(x, quarterGPAs, markerInfo) {
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