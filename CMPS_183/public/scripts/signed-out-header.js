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
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);
        }
    }
    firebase.auth().onAuthStateChanged(newLoginHappened);
}

function app(user) {
    // Sets the new href (URL) for the current window on login
    window.location.href = "homepage.html";

}

document.querySelector('#login-button')
  .addEventListener('click', function() {
        login();
  });

/*********** SET UP NAV BAR ***********/
const nav = document.querySelector('#navbar');

const addItems = () => {
    var largeNav = document.createElement('div');
    largeNav.setAttribute("class", "w3-bar w3-red w3-large");
    
    largeNav.innerHTML = '<div class="w3-left-align w3-card">';
    largeNav.innerHTML += '<a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>';
    largeNav.innerHTML += '<a href="index.html" class="w3-bar-item w3-button w3-padding-large w3-white">Home</a>';
    largeNav.innerHTML += '</div>';
    nav.appendChild(largeNav);
    
    var smallNav = document.createElement('div');
    smallNav.setAttribute("class", "w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large");
    smallNav.innerHTML = '<a href="index.html" class="w3-bar-item w3-button w3-padding-large">Home</a>';
    smallNav.setAttribute("id", "tinyNav");
    nav.appendChild(smallNav);
}

// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
    var x = document.getElementById("tinyNav");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

addItems();

