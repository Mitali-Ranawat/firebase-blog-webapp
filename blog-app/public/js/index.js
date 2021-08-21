var firebaseConfig = {
    apiKey: "AIzaSyC4y2gqwUKgJlKdAAyn5gxnQY5iiQvdkWw",
    authDomain: "fir-training-503a2.firebaseapp.com",
    projectId: "fir-training-503a2",
    storageBucket: "fir-training-503a2.appspot.com",
    messagingSenderId: "851111997507",
    appId: "1:851111997507:web:3f6f03070c30dadf1ce4f6",
    measurementId: "G-SLEWN475GG"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function(){

        var email = $("#email").val();
        var password = $("#password").val();

        if(email != "" && password !="") {
            var result = firebase.auth().signInWithEmailAndPassword(email, password);

            
            result.catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                window.alert("Message: " +errorMessage)
            });
        }
        else {
            window.alert("Please fill out all fields")
        }
    });

    $("#btn-logout").click(function(){
        firebase.auth().signOut();
    });
    

    $("#btn-signup").click(function(){

        var email = $("#email").val();
        var password = $("#password").val();
        var cpassword = $("#confirmpassword").val();

        if(email != "" && password !="" && cpassword != "") {
            if(password == cpassword){
                var result = firebase.auth().createUserWithEmailAndPassword(email, password);

            
                result.catch(function(error){
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log(errorCode);
                    window.alert("Message: " +errorMessage)
                });
            }
            else{
                window.alert("Password and Confirm Password should be same")
            }
        }
        else {
            window.alert("Please fill out all fields")
        }
    });

    $("#btn-resetPassword").click(function(){
         var auth = firebase.auth();
         var email = $("#email").val();

         if(email != ""){
            auth.sendPasswordResetEmail(email).then(function(){
                window.alert("Email has been sent, Please check and reset your password")
            }).catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                window.alert("Message: " +errorMessage)

            });
         }else {
             window.alert("Please enter your email id")
         }
    });

    $("#btn-update").click(function(){
        var phone = $("#phone").val();
        var bio = $("#bio").val();
        var fName = $("#firstName").val();
        var lName = $("#lastName").val();
        var country = $("#country").val();

        

        var rootRef = firebase.database().ref().child("Users");
    
        var userID = firebase.auth().currentUser.uid;
        var usersRef = rootRef.child(userID);

        if(fName!="" && lName!="" && phone!="" && country!="" && bio!=""){

            var userData = {
                "phone": phone,
                "bio": bio,
                "firstName": fName,
                "lastName": lName,
                "country": country
            };

            usersRef.set(userData, function(error){
                if(error){
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log(errorCode);
                    window.alert("Message: " +errorMessage)

                }else {
                    window.location.href = "main.html";
                }
            })

        } else {
            window.alert("Fill out all fields!")
        }
    });


function switchView(view) {
    $.get({
        url:view,
        cache:false,
    })
    .then(function(data){
        $("#container").html(data)
    });
}

let provider = new firebase.auth.GoogleAuthProvider();
$("#btn-login-google").click(function(){
    console.log("Clicked")
    firebase.auth().signInWithPopup(provider).then(function(result) {
        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            window.alert("Message: " +errorMessage)
        });
    });
    
        
});


