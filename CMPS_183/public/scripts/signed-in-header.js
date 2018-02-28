var userID;


/*********** INITIALIZE FIREBASE ***********/
var config = {
    apiKey: "AIzaSyA8rONNbHblA79IzG-gPhcuKmGuTfsdYA8",
    authDomain: "sluggrades-56116.firebaseapp.com",
    databaseURL: "https://sluggrades-56116.firebaseio.com",
    projectId: "sluggrades-56116",
    storageBucket: "sluggrades-56116.appspot.com",
    messagingSenderId: "575858364394"
};
firebase.initializeApp(config);

/*********** VERIFY LOGIN ***********/
function login() {
    function newLoginHappened(user) {
        if (user) {
            // user is signed in
            userID = app(user);
            //testDatabase();
        } else {
            window.location = 'index.html';
        }
    }
    firebase.auth().onAuthStateChanged(newLoginHappened);
}

function logout() {
    document.getElementById("clientName").style.visibility = "hidden";
    document.getElementById("clientPhoto").style.visibility = "hidden";
    firebase.auth().signOut();
}

function app(user) {
    document.getElementById("clientName").innerHTML = user.displayName;
    document.getElementById("clientPhoto").setAttribute("src", user.photoURL);
    document.getElementById("clientName").style.visibility = "visible";
    document.getElementById("clientPhoto").style.visibility = "visible";
    return user.uid;
}

window.onload = login;


/*********** SET UP NAV BAR ***********/
const nav = document.querySelector('#navbar');

const addItems = () => {
    var largeNav = document.createElement('div');
    largeNav.setAttribute("class", "w3-bar w3-red w3-large");
    
    largeNav.innerHTML = '<div class="w3-left-align w3-card">';
    largeNav.innerHTML += '<a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onclick="toggleMenu()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>';
    largeNav.innerHTML += '<a href="homepage.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Home</a>';
    largeNav.innerHTML += '<a href="courses.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Courses & Grades</a>';
    largeNav.innerHTML += '<a href="notes.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Notes</a>';
    largeNav.innerHTML += '<button onclick="logout();" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Logout</button>';
    largeNav.innerHTML += '</div>';
    
    // photo and name of user
    var clientInfo = document.createElement('div');
    clientInfo.setAttribute("class", "w3-right-align");
    clientInfo.setAttribute("id", "clientInfo");
    clientInfo.innerHTML = '<span class="w3-hide-small w3-padding-large w3-right-align" id="clientName" style="visibility:hidden"></span>';
    clientInfo.innerHTML += '<a href="profile.html"><img id="clientPhoto" src="" style="width:40px; height:40px; border-radius:50%; margin:5px; border:solid white; visibility:hidden"></a>';
    
    largeNav.appendChild(clientInfo);
    nav.appendChild(largeNav);

    var smallNav = document.createElement('div');
    smallNav.setAttribute("class", "w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large");
    smallNav.innerHTML = '<a href="homepage.html" class="w3-bar-item w3-button w3-padding-large">Home</a>';
    smallNav.innerHTML += '<a href="courses.html" class="w3-bar-item w3-button w3-padding-large">Courses & Grades</a>';
    smallNav.innerHTML += '<a href="notes.html" class="w3-bar-item w3-button w3-padding-large">Notes</a>';
    smallNav.innerHTML += '<button onclick="logout();" class="w3-bar-item w3-button w3-padding-large">Logout</button></div>';
    smallNav.setAttribute("id", "tinyNav");
    
    nav.appendChild(smallNav);
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleMenu() {
    var displayNav = document.getElementById("tinyNav");
    if (displayNav.className.indexOf("w3-show") == -1) {
        displayNav.className += " w3-show";
    } else { 
        displayNav.className = displayNav.className.replace(" w3-show", "");
    }
}

addItems();

/*********** Parse Function *****************/
document.getElementById('submissionButton').onchange = function(){
    var file = this.files[0];

    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(e){
        var marker = 0;
        var startRead = 0;
        var startSemester = 0;

        var semester = "";
        var subject = "";
        var number = "";
        var name = "";
        var grade = "";

        var count = 0;
        var toCount = 0;
        var fRun = true;
        var quarter = "";

        var stopCondition = 0;

        var beginUndergrad = 0;

        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
            var toCount = 0;
            var inputLine = lines[line].toString();

            if (inputLine.indexOf("Quarter") > 0) {
                // make sure we have data (this isn't the first run)
                if (!fRun) {
                    // Calculate a VERY rough GPA estimate for the quarter
                    var qGPA = creditCount / (courseCount * 5);
                    if (semester.includes("Fall")) {
                        insertFall(year, qGPA);
                    } else if (semester.includes("Winter")) {
                        insertWinter(year, qGPA);
                    } else if (semester.includes("Spring")) {
                        insertSpring(year, qGPA);
                    } else if (semester.includes("Summer")) {
                        insertSummer(year, qGPA);
                    }
                }
                
                count = 0;
                semester = inputLine.substring(65);
                semester = semester.substring(0, semester.indexOf('<'));
                console.log(semester);
                var year = semester.substr(0,4);
                var courseCount = 0;
                var creditCount = 0;
                startRead = 1;
                stopCondition = 0;
                fRun = false;
                if (semester.includes("Fall")) {
                    quarter = "Fall";
                } else if (semester.includes("Winter")) {
                    quarter = "Winter";
                } else if (semester.includes("Spring")) {
                    quarter = "Spring";
                } else if (semester.includes("Summer")) {
                    quarter = "Summer";
                }
            }
            if(inputLine.indexOf('Academic Standing Effective') > -1){
                startSemester = 0;
            }
            if(inputLine.indexOf('<tr class="c28">') == 0 || inputLine.indexOf('<tr class="c26">') == 0){
                marker = 1;
            }
            if(inputLine.indexOf('</tr>') == 0 && startSemester == 1) {
                marker = 0;
            }
            if(inputLine.indexOf('Term Honor:') > 1){
                startSemester = 0;
            }
            if(inputLine.indexOf('Term GPA') > 1){
                startSemester = 0;
            }
            if(marker == 1 && startRead == 1 && startSemester == 1 && stopCondition == 0){
                if(inputLine.indexOf("Repeated:") > -1){
                    count--;
                    toCount = 1;
                } else if(inputLine.indexOf("Repeated") > -1 || inputLine.indexOf("Repeat of") > -1){
                    count--;
                    count--;
                    toCount = 1;
                }
                if(count == 2){
                    subject = inputLine.substring(inputLine.indexOf('class="c11">') + 12);
                    subject = subject.substring(0, subject.indexOf('<'));
                    console.log(subject);

                    if(inputLine.indexOf("Term GPA") > -1){
                        stopCondition = 1;
                    }
                }
                if(count == 4){
                    number = inputLine.substring(inputLine.indexOf('class="c11">') + 12);
                    number = number.substring(0, number.indexOf('<'));
                    console.log(number);
                }
                if(count == 6){
                    name = inputLine.substring(inputLine.indexOf('class="c11">') + 12);
                    name = name.substring(0, name.indexOf('<'));
                    console.log(name);
                }
                if(count == 12){
                    grade = inputLine.substring(inputLine.indexOf('class="c11">') + 12);
                    grade = grade.substring(0, grade.indexOf('<'));
                    console.log(grade);
                    console.log(" ");
                    if (grade.includes("c58")) {
                        grade = "IP";
                    }
                    if (!grade.includes("W") && !grade.includes("IP")){
                        courseCount += 1;
                    }
                    // Calculate a VERY rough GPA estimate for the quarter
                    if (grade.includes("A")){
                        creditCount += 5 * 4;
                    } else if (grade.includes("B")){
                        creditCount += 5 * 3;
                    } else if (grade.includes("C")){
                        creditCount += 5 * 2;
                    } else if (grade.includes ("D")){
                        creditCount += 5;
                    }
                    
                    if (number != "") {
                        insertCourse(subject, number, name, grade, year, quarter);
                    }
                    

                    if(grade.indexOf('"top"') > -1){
                        startRead = 0;
                    }
                }
                if(count == 14){
                    count = -1;
                }
                if(toCount == 0){
                    count++;
                }
            }
            if(inputLine.indexOf("Beginning of") > -1){
                beginUndergrad = 1;
            }
            if(inputLine.indexOf("Points") > 0 && beginUndergrad == 1){
                startSemester = 1;
            }
            
        }
    };
};


///*********** STORE DATABASE ITEMS ***********/
//function testDatabase() {
//    const ref = firebase.database().ref();
//    var misc = 5.0;
//    var year = 2019;
//    alert(userID);
//    
//    var usersRef = ref.child(userID);
//    usersRef.set({
//        gpa: {
//            2017: {
//                fall: misc,
//                winter: misc,
//                spring: 1.2,
//                summer: 3.5
//            },
//            2018: {
//                fall: 3.6,
//                winter: 2.1,
//                spring: 1.1,
//                summer: 4.0
//            },
//            year: {
//                fall: 0.1
//            }
//        }
//    });
//    var mRef = ref.child("" + userID + "/gpa/" + year);
//    mRef.set({
//        fall: misc
//    });
//}

/**** Use this for inserting a fall quarter GPA into the db ****/
function insertFall(year, gpa){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/" + year);
    usersRef.update({
        fall: gpa
    });
}

/**** Use this for inserting a fall quarter GPA into the db ****/
function insertSpring(year, gpa){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/" + year);
    usersRef.update({
        spring: gpa
    });
}

/**** Use this for inserting a fall quarter GPA into the db ****/
function insertWinter(year, gpa){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/" + year);
    usersRef.update({
        winter: gpa
    });
}

/**** Use this for inserting a fall quarter GPA into the db ****/
function insertSummer(year, gpa){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/gpa/" + year);
    usersRef.update({
        summer: gpa
    });
}

function insertCourse(dept, cnum, cname, grade, year, quarter){
    const ref = firebase.database().ref();
    var usersRef = ref.child("" + userID + "/courses/" + + year + "/" + quarter + "/" + dept + "/" + cnum);
    usersRef.update({
        name: cname,
        grade: grade
    });
}



//const preObject = document.getElementById('object');
//const dbRefObject = firebase.database().ref().child(userID/'gpa'/2017/'spring');
//dbRefObject.on('value', snap => console.log(snap.val()));