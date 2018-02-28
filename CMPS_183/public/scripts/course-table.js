// given a year, all of the children will report their associated GPA for each quarter
// i.e. Fall: 3.0, Winter: 4.2, etc.
function getGPA(year){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/" + year);
    usersRef.once("value", function(snap) {
        console.log("initial data loaded!", snap.numChildren());
        snap.forEach(function(childSnapshot) {
            console.log(childSnapshot.val());
        });
    });
}

// this function populates the table found in 'notes.html' with the
// values from the db
function getCourses(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses");
    var table = document.getElementById("courseTable");
    
    usersRef.once("value", function(snap) {
        console.log("courses taken:", snap.numChildren());
        snap.forEach(function(course) {
            var row = courseTable.insertRow(-1);
            course.forEach(function(item) {
                var cell = row.insertCell(-1);
                cell.innerHTML = item.val();
            })
            
        });
    });
}

// use this to load the data for particular parts of the site
function loadCourseData() {
    if (document.getElementById('courses')) {
        getCourses();
    }
}