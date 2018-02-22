function getPicture(type, source) {
   navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: type,
      sourceType: source
   });

   function onSuccess(imageData) {
      var image = document.getElementById('mImg');
      image.style.display = 'block';
      image.src = "data:image/jpeg;base64," + imageData;
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }
 }

 function doContactPicker() {
     navigator.contacts.pickContact(function(contact){
         console.log('The following contact has been selected:' + JSON.stringify(contact));
         //Build a simple string to display the Contact - would be better in Handlebars
         var s = "";
         s += "<h2>"+getName(contact)+"</h2>";

         if(contact.emails && contact.emails.length) {
             s+= "Email: "+contact.emails[0].value+"<br/>";
         }

         if(contact.phoneNumbers && contact.phoneNumbers.length) {
             s+= "Phone: "+contact.phoneNumbers[0].value+"<br/>";
         }

         if(contact.photos && contact.photos.length) {
             s+= "<p><img src='"+contact.photos[0].value+"'></p>";
         }

         alert(s);
     },function(err){
         console.log('Error2: ' + err);
     });
 }

 /*
 Handles iOS not returning displayName or returning null/""
 */
 function getName(c) {
     var name = c.displayName;
     if(!name || name === "") {
         if(c.name.formatted) return c.name.formatted;
         if(c.name.givenName && c.name.familyName) return c.name.givenName +" "+c.name.familyName;
         return "Nameless";
     }
     return name;
 }

function kakao(){
  var usr = document.getElementById('user');
  KakaoTalk.login(
      function (result) {
        console.log('Successful login!');
        console.log(result);

        usr.innerHTML = result.nickname;
      },
      function (message) {
        console.log('Error logging in');
        console.log(message);
        usr.innerHTML = message;
      }
  );
}

function google(){
  var provider = new firebase.auth.GoogleAuthProvider();
  var usr = document.getElementById('user');
  firebase.auth().signInWithRedirect(provider).then(function(){
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        usr.innerHTML = user.displayName;
        // ...
      }
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      usr.innerHTML = error;
      console.log("Error2 : "+error.code+" "+error.message);
    });
  }).catch(function(error){
    console.log("Error2 : "+error.code+" "+error.message);
  });
}
