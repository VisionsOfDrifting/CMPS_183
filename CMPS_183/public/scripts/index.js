//Could potentially change all 'var' to 'const'... its a style thing
//Not sure how but verification and password reset can fit in here
function register(){
   //gets register elements
   var name = document.getElementByID('Rname').value;
   var email = document.getElementByID('Remail').value;
   var password = document.getElementByID('Rpsw').value;
   var pswCheck = document.getElementByID('RpswCheck').value;
   
   /* Save for debbuging. Think about how to break flow of control.*/
   try{
      if (password != RpswCheck){
         throw "Passwords do not match.\n\nPlease re-enter your password.";
      } //Similarly you can use Regex to match "*@ucsc.edu" emails
      
      var ucscEmailPattern = /.*@ucsc\.edu$/;
      if (!ucscEmailPattern.test(email)){
         throw "You did not enter an email ending in @ucsc.edu \n\nPlease enter a ucsc email.";
      }  //It is necessary to encapsulate the rest of the funtion in the try. 
      
      var user = create_user(email, password); //Returns promise of a user
      createNewUserEntry(user.uid, name); //For modularity pass to a function
      
      alert("You have succesfully registered!");
      //window.location.href = "homepage.html"; //change page to profile //really should be profile.html
   }catch{ 
      alert(err); 
   }
}

function create_user(email, password){
   var newUser = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
   //Handle Errors here
   var errorCode = error.code;
   var errorMessage = error.message;
   window.alert("Error : " + errorMessage); //This may be un-necessary
   return newUser;
});
   
//if we really have to we can replace uid with email
function createNewUserEntry(uid, name){ //userID is a unique hash it is the key 
   var transRef = firebase.database().ref('transcripts'); //refernece to the collection transcripts
   var data = {
         name: name,
         academicStanding: null,
         gpa: null
      }
   transRef.child(uid).set(data); //sets child of trascripts to 'uid' with list 'data'
   //hopefully this works
}
