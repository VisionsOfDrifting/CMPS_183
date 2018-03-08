
// this function populates the table found in 'notes.html' with the
// values from the db
/* function getCourses(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses");
    var table = document.getElementById("courseTable");
	
	 usersRef.orderByChild("cnum").on("child_added", function(snap){
		 console.log("courses taken:", snap.val());
	} );
    
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
} */

// use this to load the data for particular parts of the site
function loadCourseData() {
    if (document.getElementById('courses')) {
		getCoursesNumber();
		getCoursesGPA();
    }
}


/*----------------------------------------------------------------------*/
function getCoursesNumber(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses");
    var table = document.getElementById("courseTable");
	
	var tableRows = table.getElementsByTagName('tr');
	var rowCount = tableRows.length;
	for(var x = rowCount -1; x>0; x--){
		table.deleteRow(x);
	}
	
	
	 usersRef.orderByChild("cnum").on("child_added", function(snap){
		var row = courseTable.insertRow(-1);
		var cell1 = row.insertCell(-1);
		var cell2 = row.insertCell(-1);
		var cell3 = row.insertCell(-1);
		var cell4 = row.insertCell(-1);
		var cell5 = row.insertCell(-1);
		var cell6 = row.insertCell(-1);
		cell1.innerHTML = snap.child("cnum").val();
		cell2.innerHTML = snap.child("dept").val();
		cell3.innerHTML = snap.child("grade").val();
		cell4.innerHTML = snap.child("name").val();
		cell5.innerHTML = snap.child("quarter").val();
		cell6.innerHTML = snap.child("year").val();
	
	
	} );
}
/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/
function getCoursesSubject(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses");
    var table = document.getElementById("courseTable");
	
	var tableRows = table.getElementsByTagName('tr');
	var rowCount = tableRows.length;
	for(var x = rowCount -1; x>0; x--){
		table.deleteRow(x);
	}
	
	 usersRef.orderByChild("dept").on("child_added", function(snap){
		var row = courseTable.insertRow(-1);
		var cell1 = row.insertCell(-1);
		var cell2 = row.insertCell(-1);
		var cell3 = row.insertCell(-1);
		var cell4 = row.insertCell(-1);
		var cell5 = row.insertCell(-1);
		var cell6 = row.insertCell(-1);
		cell1.innerHTML = snap.child("cnum").val();
		cell2.innerHTML = snap.child("dept").val();
		cell3.innerHTML = snap.child("grade").val();
		cell4.innerHTML = snap.child("name").val();
		cell5.innerHTML = snap.child("quarter").val();
		cell6.innerHTML = snap.child("year").val();
	} );
    
}
/*----------------------------------------------------------------------*/

function getCoursesGrade(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses");
    var table = document.getElementById("courseTable");
	
	var tableRows = table.getElementsByTagName('tr');
	var rowCount = tableRows.length;
	for(var x = rowCount -1; x>0; x--){
		table.deleteRow(x);
	}
	
	 usersRef.orderByChild("grade").on("child_added", function(snap){
		var row = courseTable.insertRow(-1);
		var cell1 = row.insertCell(-1);
		var cell2 = row.insertCell(-1);
		var cell3 = row.insertCell(-1);
		var cell4 = row.insertCell(-1);
		var cell5 = row.insertCell(-1);
		var cell6 = row.insertCell(-1);
		cell1.innerHTML = snap.child("cnum").val();
		cell2.innerHTML = snap.child("dept").val();
		cell3.innerHTML = snap.child("grade").val();
		cell4.innerHTML = snap.child("name").val();
		cell5.innerHTML = snap.child("quarter").val();
		cell6.innerHTML = snap.child("year").val();
	} );
    
}
/*----------------------------------------------------------------------*/
function getCoursesName(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses");
    var table = document.getElementById("courseTable");
	
	var tableRows = table.getElementsByTagName('tr');
	var rowCount = tableRows.length;
	for(var x = rowCount -1; x>0; x--){
		table.deleteRow(x);
	}
	
	 usersRef.orderByChild("name").on("child_added", function(snap){
		var row = courseTable.insertRow(-1);
		var cell1 = row.insertCell(-1);
		var cell2 = row.insertCell(-1);
		var cell3 = row.insertCell(-1);
		var cell4 = row.insertCell(-1);
		var cell5 = row.insertCell(-1);
		var cell6 = row.insertCell(-1);
		cell1.innerHTML = snap.child("cnum").val();
		cell2.innerHTML = snap.child("dept").val();
		cell3.innerHTML = snap.child("grade").val();
		cell4.innerHTML = snap.child("name").val();
		cell5.innerHTML = snap.child("quarter").val();
		cell6.innerHTML = snap.child("year").val();
	} );
    
}
/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/
function getCoursesQuarter(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses");
    var table = document.getElementById("courseTable");
	
	var tableRows = table.getElementsByTagName('tr');
	var rowCount = tableRows.length;
	for(var x = rowCount -1; x>0; x--){
		table.deleteRow(x);
	}
	
	 usersRef.orderByChild("quarter").on("child_added", function(snap){
		var row = courseTable.insertRow(-1);
		var cell1 = row.insertCell(-1);
		var cell2 = row.insertCell(-1);
		var cell3 = row.insertCell(-1);
		var cell4 = row.insertCell(-1);
		var cell5 = row.insertCell(-1);
		var cell6 = row.insertCell(-1);
		cell1.innerHTML = snap.child("cnum").val();
		cell2.innerHTML = snap.child("dept").val();
		cell3.innerHTML = snap.child("grade").val();
		cell4.innerHTML = snap.child("name").val();
		cell5.innerHTML = snap.child("quarter").val();
		cell6.innerHTML = snap.child("year").val();
	} );
    
}
/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/
function getCoursesYear(){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses");
    var table = document.getElementById("courseTable");
	
	var tableRows = table.getElementsByTagName('tr');
	var rowCount = tableRows.length;
	for(var x = rowCount -1; x>0; x--){
		table.deleteRow(x);
	}
	
	 usersRef.orderByChild("year").on("child_added", function(snap){
		var row = courseTable.insertRow(-1);
		var cell1 = row.insertCell(-1);
		var cell2 = row.insertCell(-1);
		var cell3 = row.insertCell(-1);
		var cell4 = row.insertCell(-1);
		var cell5 = row.insertCell(-1);
		var cell6 = row.insertCell(-1);
		cell1.innerHTML = snap.child("cnum").val();
		cell2.innerHTML = snap.child("dept").val();
		cell3.innerHTML = snap.child("grade").val();
		cell4.innerHTML = snap.child("name").val();
		cell5.innerHTML = snap.child("quarter").val();
		cell6.innerHTML = snap.child("year").val();
	} );
    
}
/*----------------------------------------------------------------------*/
 // this function populates the table found in 'notes.html' with the
// values from the db
function getCoursesGPA(){
    const reff = firebase.database().ref();
    var usersReff = reff.child("" + userID + "/gpa");
    var tablee = document.getElementById("gpaTable");
	
	
	 usersReff.on("child_added", function(snap){
		var row = tablee.insertRow(-1);
		var cell1 = row.insertCell(-1);
		var cell2 = row.insertCell(-1);
		var cell3 = row.insertCell(-1);
		var cell4 = row.insertCell(-1);
		var cell5 = row.insertCell(-1);
		if(snap.key != "total")
			cell1.innerHTML = snap.key;
		cell2.innerHTML = snap.child("winter").val();
		cell3.innerHTML = snap.child("spring").val();
		cell4.innerHTML = snap.child("summer").val();
		cell5.innerHTML = snap.child("fall").val();
	} );
	
    
   /*  usersReff.once("value", function(snapp) {
        console.log("courses taken:", snapp.numChildren());
        snapp.forEach(function(course) {
            var roww = gpaTable.insertRow(-1);
			var cel = roww.insertCell(-1);
			if(course.key != "total")
				cel.innerHTML = course.key;
            course.forEach(function(item) {
                var celll = roww.insertCell(-1);
				var strVal = "" + item.val();
                celll.innerHTML = strVal.substring(0,4);
            })
            
        });
    }); */
}

// use this to load the data for particular parts of the site
