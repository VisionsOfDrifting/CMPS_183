<?php
/* User login process, checks if user exists and password is correct */
// Escape_string to protect against SQL injections. Very important if we actually were hosting online
$email = $mysqli->escape_string($_POST['email']);
$result = $mysqli->query("SELECT * FROM users WHERE email='$email'");
if( $result->num_rows == 0 ){ // User doesn't exist
   $_SESSION['message'] = "A user with that email does not yet exist! Please register!";
   header("location: error.php");
}else{ //User exists
   $user = $result->fetch_assoc();
   $sql = "UPDATE users SET active = 1 WHERE email='$email'";
   $mysqli->query($sql);
   if(password_verify($_POST['password'], $user['password'])){
       /*verify credentials*/
       $_SESSION['email'] = $user['email'];
       $_SESSION['name'] = $user['name'];
       $_SESSION['active'] = $user['active'];
       header("location: profile.php");
   }else{ /*display error*/
       $_SESSION['message'] = "You have entered wrong password, try again!";
       header("location: error.php");
   }
}
?>