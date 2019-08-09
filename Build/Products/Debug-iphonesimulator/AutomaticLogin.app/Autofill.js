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
    //fb username -  m_login_email,m_login_password, u_0_5
    //Rtst -> ws-credentials-username,ws-credentials-password,ws-credentials-submit

    var usernameInput = document.getElementById('ws-credentials-username');
    var passwordInput = document.getElementById('ws-credentials-password');
    var signInButton = document.getElementById('ws-credentials-submit');
    var otptokken = document.getElementById('ws-credentials-otpCode');
    if (signInButton == null) {
        return;
    }
    usernameInput.value = username;
    passwordInput.value = password;
    otptokken.value = 1234;
    signInButton.click();
    clearInterval(checkLogin);
}

//--------------------------------------------------------------------<<<<<<<<<<<
