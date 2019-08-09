var timeoutSeconds = 30;

//----------------------------------------------------------->>>>>>>>>>>>
//code for autofilling

var username = "%@";
var password = "%@";



var checkLogin = setInterval(checkLoginFields, 1000);
setTimeout(function() {
           clearInterval(checkLogin);
           }, timeoutSeconds * 1000);

function checkLoginFields() {
    //fb username -  email,pass, u_0_a
    //Rtst -> ws-credentials-username,ws-credentials-password,ws-credentials-submit

    var usernameInput = document.getElementById('email');
    var passwordInput = document.getElementById('pass');
    var signInButton = document.getElementById('u_0_a');
//    var otptokken = document.getElementById('ws-credentials-otpCode');
    if (signInButton == null) {
        return;
    }
    usernameInput.value = username;
    passwordInput.value = password;
//    otptokken.value = 1234;
    signInButton.click();
    clearInterval(checkLogin);
}

//--------------------------------------------------------------------<<<<<<<<<<<
