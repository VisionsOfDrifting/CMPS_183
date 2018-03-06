// given a year, all of the children will report their associated GPA for each quarter
// i.e. Fall: 3.0, Winter: 4.2, etc.
function loadGraphData(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa");
    // gpa val to display at top
    var gpaVal = document.getElementById("gpainfo");
    var standing = document.getElementById("academicstanding");
    
    
    var quarterIndex = [];
    var i = 1;
    var text = [];
    var qDict = {};
    var qfinal = [];
    
    var coursecount = 0;
    
    // loop through all entries in the gpa db table for the given user and store vals for graph entries
    usersRef.once("value", function(year) {
        year.forEach(function(quarter) {
            quarter.forEach(function(gpa) {
                qDict["" + quarter.key + gpa.key] = gpa.val();
            });
            // copy over data based on entries in the dictionary
            for (j = 0; j < quarter.numChildren(); j++){
                if (a = qDict[quarter.key + "winter"]){
                    qfinal.push(a);
                    text.push("Winter " + quarter.key);
                    delete(qDict[quarter.key + "winter"]);

                } else if (a = qDict[quarter.key + "spring"]) {
                    qfinal.push(a);
                    text.push("Spring " + quarter.key);
                    delete(qDict[quarter.key + "spring"]);

                } else if (a = qDict[quarter.key + "summer"]) {
                    qfinal.push(a);
                    text.push("Summer " + quarter.key);
                    delete(qDict[quarter.key + "summer"]);

                } else if (a = qDict[quarter.key + "fall"]) {
                    qfinal.push(a);
                    text.push("Fall " + quarter.key);
                    delete(qDict[quarter.key + "fall"]);
                }
                quarterIndex.push(i++);
            }

            });
        // make graph with calculated information
        makeGraph(quarterIndex, qfinal, text);     
    });
    insertGPA();
    insertStanding();
}

function insertGPA(){
     const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa");
    usersRef.once("value", function(totgpa) {
        totgpa.forEach(function(child){
            if(child.key == "total"){
                var gpaVal = document.getElementById("gpainfo");
                gpaVal.innerHTML = "GPA: " + child.val();
            }
            console.log(child.key);
        })
        console.log(totgpa.val());
    })
}

function insertStanding(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa");
    usersRef.once("value", function(totgpa) {
        totgpa.forEach(function(child){
            if(child.key == "total"){
                var standing = document.getElementById("academicstanding");
                var academicstanding = "";
                if(child.val() < 2.0)
                    academicstanding = "Academic Probation";
                else if(child.val() >= 2.0)
                    academicstanding = "Good Standing";
                standing.innerHTML = "Academic Standing: " + academicstanding;
            }
        })
    })
}

// actual call to plotly with our data
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
         title: 'GPA',
           range: [0, 5]
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