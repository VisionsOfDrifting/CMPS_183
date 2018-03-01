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