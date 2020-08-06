var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
var token = ""

function login() {

  firebase.auth().signInWithPopup(provider).then(function (result) {
    console.log("starting...")
    // This gives you a Google Access Token. You can use it to access the Google API.
    token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    if (user) {
      // User is signed in.
      document.getElementById("login_div").style.display = "none";
      {
        document.getElementById("user_para").innerHTML = "Welcome " + user.displayName;
        document.getElementById("user_div").style.display = "block";
      }
    } else {
      // No user is signed in.
      document.getElementById("login_div").style.display = "block";

    }
    console.log(user)
  }).catch(function (error) {
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

function logout() {
  firebase.auth().signOut().then(function () {
    {
      // User is signed in.
      document.getElementById("login_div").style.display = "block";
      {
        document.getElementById("user_div").style.display = "none";
      }
    }
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });

}

function submit() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "requests": [
      {
        "appendCells": {
          "sheetId": 0, "rows": [{
            "values": [
              { "userEnteredValue": { 
                "stringValue": document.getElementById('target1').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('Urge1').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('target2').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('Urge2').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('target3').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('Urge3').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('Anxiety').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('Shame').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('Joy').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('Sadness').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('Anger').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('Pain').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('Pain').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('skills').value
              } }
              ,{ "userEnteredValue": { 
                "stringValue": document.getElementById('things').value
              } },
              { "userEnteredValue": { 
                "stringValue": document.getElementById('things').value
              } }
            ]
          }], "fields": "*"
        }
      }], "includeSpreadsheetInResponse": true, "responseIncludeGridData": true
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://sheets.googleapis.com/v4/spreadsheets/1cwBwaWzy06TVspyb-KdPWL1sQcXDHNapPGl40e9A6-E:batchUpdate", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


var rangeSlider = function(){
  var sliders = document.getElementsByClassName("range-slider"),
      ranges = document.getElementsByClassName("range-slider__range"),
      values = document.getElementsByClassName("range-slider__value");
    
  Array.from(sliders).forEach(function(slider){

    Array.from(values).forEach(function(value){
      var v = slider.childNodes[1].getAttribute('value');
      value.innerHTML = v ;
      console.log(v);
      console.log(slider.childNodes);
    });

    Array.from(ranges).forEach(function(range){
      range.addEventListener('change', function(){
      slider.childNodes[3].innerHTML = range.value;
      console.log(range.value);
    });
  });
  });
};

rangeSlider();