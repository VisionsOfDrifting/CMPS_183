//alert('hey there');

//firebase.auth().onAuthStateChanged(loadData);

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

function getCourses(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses");
    var table = document.getElementById("courseTable");
    
    usersRef.once("value", function(snap) {
        console.log("courses taken:", snap.numChildren());
        snap.forEach(function(course) {
            var row = courseTable.insertRow(-1);
            console.log(course.val());
            course.forEach(function(item) {
                var cell = row.insertCell(-1);
                console.log(item.val());
                cell.innerHTML = item.val();
                
            })
            
        });
    });
}

function getParent(snapshot) {
  // You can get the reference (A Firebase object) from a snapshot
  // using .ref().
  var ref = snapshot.ref();
  // Now simply find the parent and return the name.
  return ref.parent().name().key();
}

function getCourseQuarters(year){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses/" + year);
    usersRef.once("value", function(snap) {
        console.log("quarters in the year:", snap.numChildren());
        snap.forEach(function(childSnapshot) {
            console.log(childSnapshot.val());
        });
    });
}

// use this to load the data for particular parts of the site
function loadCourseData() {
    if (document.getElementById('courses')) {
        getGPA(2017);
        getCourses();
        //alert(firebase.auth().currentUser.uid);
    }
}