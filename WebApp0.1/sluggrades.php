<?php 
/* Main page with two forms: sign up and log in */
require 'db.php';
session_start();

$query = "SELECT first_name, last_name  FROM users WHERE active= 1";
$temp = "";
if ($result = $mysqli->query($query)) {
   /* fetch object array */
   while ($row = $result->fetch_row()) {
       $temp =  $row[0]. ' ' .$row[1];
   }/* free result set */
    $result->close();
}?>

<!DOCTYPE html>
<html>
<title>Slug Grades</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
    
/* Full-width input fields */
input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
/* Center the image and position the close button */
.imgcontainer {
    text-align: center;
    position: relative;
}
.container {
    padding: 16px;
}
span.psw {
    float: right;
    padding-top: 16px;
}
/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    padding-top: 60px;
}
/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    width: 45%; /* Could be more or less, depending on screen size */
}
/* The Close Button (x) */
.close {
    position: absolute;
    right: 25px;
    top: 0;
    color: #000;
    font-size: 35px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: red;
    cursor: pointer;
}
/* Add Zoom Animation */
.animate {
    -webkit-animation: animatezoom 0.6s;
    animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
    from {-webkit-transform: scale(0)} 
    to {-webkit-transform: scale(1)}
}
@keyframes animatezoom {
    from {transform: scale(0)} 
    to {transform: scale(1)}
}
/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
    span.psw {
       display: block;
       float: none;
    }
    .cancelbtn {
       width: 100%;
    }
}
<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(isset($_POST['login'])){ //user logging in
        require 'login.php';
    }else(isset($_POST['register'])){ //user registering
        require 'register.php';
    }
}
?>
body,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif}
.w3-bar,h1,button {font-family: "Montserrat", sans-serif}
.fa-graduation-cap,.fa-bar-chart, .fa-file-text, .fa-users {font-size:200px}
</style>
<body>

<!-- Navbar -->
<div class="w3-top">
  <div class="w3-bar w3-red w3-card w3-left-align w3-large">
    <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
    <a href="#" class="w3-bar-item w3-button w3-padding-large w3-white">Home</a>
    <a href="profile.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">My Profile</a>
    <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 2</a>
    <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 3</a>
    <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Link 4</a>
  </div>

  <!-- Navbar on small screens -->
  <div id="navDemo" class="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
    <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 1</a>
    <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 2</a>
    <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 3</a>
    <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 4</a>
  </div>
</div>

<!-- Header -->
<header class="w3-container w3-yellow w3-center" style="padding:128px 16px">
  <h1 class="w3-margin w3-jumbo">SLUG GRADES</h1>
  <p class="w3-xlarge">GRADE MANAGEMENT</p>
  <button class="w3-button w3-black w3-padding-large w3-large w3-margin-top" 
          onclick="document.getElementById('login').style.display='block'" 
          style="width:auto;">
     login</button>
  <button class="w3-button w3-black w3-padding-large w3-large w3-margin-top w3-margin-left"
          onclick="document.getElementById('signup').style.display='block'" style="width:auto;">
     signup</button>
</header>  

<!-- Login Pop-up -->
<div id="login" class="modal">
  <form class="modal-content animate" action="/login.php">
    <div class="imgcontainer">
      <span onclick="document.getElementById('login').style.display='none'" 
            class="close" title="Close Modal">&times;<br></span>
    </div>
    <div class="container">
      <h1>Welcome Back!</h1>
      <label><b>Please Enter Your UCSC Email</b></label>
      <input type="email" placeholder="Ex: stslug@ucsc.edu " name="email" required>
      <label><b>Please Enter Your Password</b></label>
      <input type="password" placeholder="Ex: Slug's_rule_snail's_Dr00l!" name="psw" required>
      <div class="w3-center">
      <button type="submit" class="w3-center w3-button w3-black w3-padding-large w3-large w3-margin-top">
         Login</button>
          </div>
        <br>
      <label>
        <input type="checkbox" checked="checked"> Remember Me!
      </label>
    </div>
    <div class="container" style="background-color:#f1f1f1">
      <button type="button" onclick="document.getElementById('login').style.display='none'" 
              class="cancelbtn w3-button w3-black w3-padding-large w3-small w3-margin-top" 
              style="width:auto;">Cancel</button>
      <span class="psw"> <a href="#">Forgot password?</a></span>
      <!-- <p class="forgot"><a href="forgot.php">Forgot Password?</a></p> -->
    </div>
  </form>
</div>

<script>
// Get the modal
var modal = document.getElementById('login');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>
<!-- Signup Pop-up -->
<div id="signup" class="modal">
  <form class="modal-content animate" action="/register.php">
    <div class="imgcontainer">
      <span onclick="document.getElementById('signup').style.display='none'" 
            class="close" title="Close Modal">&times;<br></span>
    </div>
    <div class="container">
      <h1>Signup For Free!</h1>
      <label><b>Please Enter Your Full Name</b></label>
      <input type="text" placeholder="Ex: Sammy the Slug" name="name" required>
      <label><b>Please Enter Your UCSC Email</b></label>
      <input type="email" placeholder="Ex: stslug@ucsc.edu " name="email" required>
      <label><b>Please Enter Your Password</b></label>
      <input type="password" placeholder="Create Your Password" name="psw" required>
      <label><b>Please Verify Your Password</b></label>
      <input type="password" placeholder="Re-Enter Your Password" name="pswCheck" required>
      <div class="w3-center">
      <button type="submit" 
              class="w3-center w3-button w3-black w3-padding-large w3-large w3-margin-top">
         Register</button>
          </div>
        <br>
      <label>
          <input type="checkbox" checked="checked"> I agree to the <a href="terms.html">terms and conditions</a>.
      </label>
    </div>
    <div class="container" style="background-color:#f1f1f1">
      <button type="button" onclick="document.getElementById('signup').style.display='none'"
              class="cancelbtn w3-button w3-black w3-padding-large w3-small w3-margin-top" 
              style="width:auto;">Cancel</button>
    </div>
  </form>
</div>

<script>
// Get the modal
var modal = document.getElementById('signup');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>

<!-- First Grid -->
<div class="w3-row-padding w3-padding-64 w3-container">
  <div class="w3-content">
    <div class="w3-twothird">
      <h1>Submit Grades Online</h1>
      <h5 class="w3-padding-32">Upload a copy of your unofficial transcript and we will record, 
         analyze, and store the information for you. </h5>
      <p class="w3-text-grey">Save time by allowing our tool to analyze your transcript without
         you having to type in and manually record each and every grade. We give you the chance 
         to verify the data displayed, but also keep your transcript on our secure database. We
         will also keep a copy of your transcript as part of your user profile, and anyone with 
         permission can download and verify the data entry without extra back-and-forth from you. 
         This allows you to share with any campus organizations or affiliates with the click of a 
         button while also keeping your private information in your control.</p>
     </div>
    <div class="w3-third w3-center">
      <i class="fa fa-file-text w3-padding-64 w3-text-red"></i>
    </div>
  </div>
</div>

<!-- Second Grid -->
<div class="w3-row-padding w3-light-grey w3-padding-64 w3-container">
  <div class="w3-content">
    <div class="w3-third w3-center">
      <i class="fa fa-users w3-padding-64 w3-text-red w3-margin-right"></i>
    </div>

    <div class="w3-twothird">
      <h1>Share Progress With Campus Organizations</h1>
      <h5 class="w3-padding-32">Can add text here</h5>

      <p class="w3-text-grey">Can add text here</p>
    </div>
  </div>
</div>
    
<!-- Third Grid -->
<div class="w3-row-padding w3-padding-64 w3-container">
  <div class="w3-content">
    <div class="w3-twothird">
      <h1>Track Graduation Status</h1>
      <h5 class="w3-padding-32">Can add text here</h5>

      <p class="w3-text-grey">Can add text here</p>
    </div>

    <div class="w3-third w3-center">
      <i class="fa fa-graduation-cap w3-padding-64 w3-text-red"></i>
    </div>
  </div>
</div>
    
<!-- Fourth Grid -->
<div class="w3-row-padding w3-light-grey w3-padding-64 w3-container">
  <div class="w3-content">
    <div class="w3-third w3-center">
      <i class="fa fa-bar-chart w3-padding-64 w3-text-red w3-margin-right"></i>
    </div>

    <div class="w3-twothird">
      <h1>Analyze Grade Trends</h1>
      <h5 class="w3-padding-32">Can add text here</h5>

      <p class="w3-text-grey">Can add text here</p>
    </div>
  </div>
</div>

<div class="w3-container w3-black w3-center w3-opacity w3-padding-64">
    <h1 class="w3-margin w3-xlarge">Quote of the day: Could a coder code if a coder could code code?</h1>
    <!-- I like this. Maybe we can make a hashtable with quotes that cycle on refresh... -->
</div>

<!-- Footer -->
<footer class="w3-container w3-padding-64 w3-center w3-opacity">  
  <div class="w3-xlarge w3-padding-32">
    <i class="fa fa-facebook-official w3-hover-opacity"></i>
    <i class="fa fa-instagram w3-hover-opacity"></i>
    <i class="fa fa-snapchat w3-hover-opacity"></i>
    <i class="fa fa-pinterest-p w3-hover-opacity"></i>
    <i class="fa fa-twitter w3-hover-opacity"></i>
    <i class="fa fa-linkedin w3-hover-opacity"></i>
 </div>
</footer>

<script>
// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}
</script>

</body>
</html>