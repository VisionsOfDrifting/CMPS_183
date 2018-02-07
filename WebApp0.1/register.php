<?php
/* Registration process, inserts user info into the database 
   and sends account confirmation email message */

// Set session variables to be used on profile.php page
$_SESSION['email'] = $_POST['email'];
$_SESSION['name'] = $_POST['name'];
// Escape all $_POST variables to protect against SQL injections
$name = $mysqli->escape_string($_POST['name']);
$email = $mysqli->escape_string($_POST['email']);
$password = $mysqli->escape_string(password_hash($_POST['password'], PASSWORD_BCRYPT));
/*Can potentially use $hash, md5, and bool password_verify ( string $password , string $hash )
  to properly check password requiremnets. However, this is unnecessary in our implementation.
$hash = $mysqli->escape_string( md5( rand(0,1000) ) );*/
      
// Check if user with that email already exists
$result = $mysqli->query("SELECT * FROM users WHERE email='$email'") or die($mysqli->error());

// We know user email exists if the rows returned are more than 0
if($result->num_rows > 0){
    $_SESSION['message'] = 'User with this email already exists!';
    header("location: error.php");
}else{ // Email doesn't already exist in a database, proceed
    $store = 1;
    // active is 0 by DEFAULT (no need to include it here) $hash would have to be stored as well
    $sql = "INSERT INTO users (name, email, password, active) " 
            . "VALUES ('$name','$email','$password',  '$store')";
    // Add user to the database
    if($mysqli->query($sql)){
        $_SESSION['message'] = 'You\'ve successfully registered!';
        header("location: successRegister.php"); 
    }else{
        $_SESSION['message'] = 'Your registration has failed!';
        header("location: error.php");
    }
}
?>