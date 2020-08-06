var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');


function login(){

  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log("starting...") 
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    if (user) {
      // User is signed in.
      document.getElementById("login_div").style.display = "none";
      {
        document.getElementById("user_para").innerHTML = "Welcome User : " + user.displayName;
        document.getElementById("user_div").style.display = "block";
      }
    } else {
      // No user is signed in.
      document.getElementById("login_div").style.display = "block";
  
    }
    console.log(user)
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log("error" + errorMessage) 
    // ...
  });
  console.log("finished...") 

}

function logout(){
  firebase.auth().signOut().then(function() {
     {
      // User is signed in.
      document.getElementById("login_div").style.display = "block";
      {
        document.getElementById("user_div").style.display = "none";
      }
    } 
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
  
}
