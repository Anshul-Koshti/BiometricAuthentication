//
//  ViewController.swift
//  AutomaticLogin
//
//  Created by Anshul Koshti on 7/4/19.
//  Copyright © 2019 Anshul Koshti. All rights reserved.
//

import UIKit
import WebKit
import LocalAuthentication

struct Credentials {
     var username: String
     var password: String
}

enum KeychainError: Error {
    case noPassword
    case unexpectedPasswordData
    case unhandledError(status: OSStatus)
}

class ViewController: UIViewController  {
    private var webview : WKWebView!
    var username : String!
    var password : String!
    let server = "https://www.facebook.com/"
    var count : Int = 0
    
    override func loadView() {
        let webconfiguration = WKWebViewConfiguration()
        let userContentController = WKUserContentController()
        userContentController.add(self , name: "callbackHandler")
        webconfiguration.userContentController = userContentController
        webview = WKWebView(frame: .zero, configuration: webconfiguration)
        webview.uiDelegate = self
        webview.navigationDelegate = self
        view = webview
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        let url = URL(string: self.server)
        let request = URLRequest(url: url!)
        webview.load(request)
    }

}

extension ViewController : WKUIDelegate,WKNavigationDelegate,WKScriptMessageHandler {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        DispatchQueue.global(qos: .background).async {
            let query: [String: Any] = [kSecClass as String: kSecClassInternetPassword,kSecAttrServer as String: self.server,kSecMatchLimit as String: kSecMatchLimitOne,kSecReturnAttributes as String: true,kSecUseOperationPrompt as String: "Access your password on the keychain",kSecReturnData as String: true]
            var item: CFTypeRef?
            let status = SecItemCopyMatching(query as CFDictionary, &item)
            if (status == errSecSuccess) {
                guard let existingItem = item as? [String : Any],let passwordData = existingItem[kSecValueData as String] as? Data,
                    let password = String(data: passwordData, encoding: String.Encoding.utf8),let account = existingItem[kSecAttrAccount as String] as? String
                    else {return}
                DispatchQueue.main.async {
                    guard let jsFile = Bundle.main.url(forResource: "Autofill", withExtension: "js") else { return}
                    do {
                        let injectJS = try String(contentsOf: jsFile)
                        let formatted = String(format: injectJS, "\(account)", "\(password)")
                        webView.evaluateJavaScript(formatted) { (value, error) in
                        }
                    } catch {}
                }
            }else{
                DispatchQueue.main.async {
                    guard let jsFile = Bundle.main.url(forResource: "Fetch", withExtension: "js") else {return}
                    do {
                        let injectJS = try String(contentsOf: jsFile)
                        let formatted = String(format: injectJS)
                        webView.evaluateJavaScript(formatted) { (value, error) in
                        }
                    } catch {}
                }
            }
        }
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "callbackHandler", let messageBody = message.body as? String {
            print(messageBody)
            let arr = messageBody.components(separatedBy: " ")
            self.username = arr[0]
            self.password = arr[1]
            if ((username != nil) && (password != nil)){
                let credentials =  Credentials(username: username, password: password)
                let account = credentials.username
                let password = credentials.password.data(using: String.Encoding.utf8)!
                self.username = account
                self.password = String(data: password, encoding: .utf8)
                let access = SecAccessControlCreateWithFlags(kCFAllocatorDefault,kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly,.userPresence,nil)
                let query: [String: Any] = [kSecClass as String: kSecClassInternetPassword,kSecAttrAccount as String: account,kSecAttrServer as String: server, kSecAttrAccessControl as String: access as Any,kSecUseAuthenticationContext as String: LAContext(),kSecValueData as String: password]
                let status = SecItemAdd(query as CFDictionary, nil)
                if (status != errSecSuccess) {
                    if let err = SecCopyErrorMessageString(status, nil) {
                        print("Write failed: \(err)")
                    }
                }
            }
        }
    }
}
