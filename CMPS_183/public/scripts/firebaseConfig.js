(function() {
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8rONNbHblA79IzG-gPhcuKmGuTfsdYA8",
    authDomain: "sluggrades-56116.firebaseapp.com",
    databaseURL: "https://sluggrades-56116.firebaseio.com",
    projectId: "sluggrades-56116",
    storageBucket: "sluggrades-56116.appspot.com",
    messagingSenderId: "575858364394"
  };
  firebase.initializeApp(config);
}());

function login(){
   var email = document.getElementByID('Lemail').value;
   var password = document.getElementByID('Lpsw').value;
   login_user(email, password);
   //window.location.href = "homepage.html"; //change page to profile //really should be profile.html
}

function login_user(email, password){
   var user = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
   //Handle Errors here
   var errorCode = error.code;
   var errorMessage = error.message;
   window.alert("Error : " + errorMessage); //This may be un-necessary
});

function logout(){
  firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function(user) {
   if(user) { // User signed in.
      /* We'll have to add this back in later, must set these fields I think...
      document.getElementById("clientName").innerHTML = user.displayName;
      document.getElementById("clientPhoto").setAttribute("src", user.photoURL);
      document.getElementById("clientName").style.visibility = "visible";
      document.getElementById("clientPhoto").style.visibility = "visible";*/
      
      window.location.href = "homepage.html";
   }else { // User signed out
      /* We'll have to add this back in later, must set these fields I think...
      document.getElementById("clientName").style.visibility = "hidden";
      document.getElementById("clientPhoto").style.visibility = "hidden";*/
      
      window.location = 'index.html';
   }
});