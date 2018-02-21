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
            app(user);
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

