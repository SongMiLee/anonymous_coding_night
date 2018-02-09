//
//  LoginController.swift
//  AnonyNight
//
//  Created by 이송미 on 2018. 2. 7..
//  Copyright © 2018년 lsm. All rights reserved.
//

import Foundation
import UIKit
import Material

class LoginController : UIViewController, UITextFieldDelegate {
    
    @IBOutlet weak var userEmail: ErrorTextField!
    @IBOutlet weak var userPwd: TextField!
    
    @IBOutlet weak var loginBtn: UIButton!{
        didSet{
            loginBtn.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(login(sender:))))
        }
    }
    @IBOutlet weak var registerBtn: UIButton!{
        didSet{
            registerBtn.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(registerInfo(sender : ))))
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        userEmail.delegate = self
        userPwd.delegate = self
        
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide(_:)), name: .UIKeyboardWillHide, object: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow(_:)), name: .UIKeyboardWillShow, object: nil)
        
        self.view.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(endEdit)))
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @objc func login(sender : UITapGestureRecognizer){
        var param:[String:Any] = [:]
        if let user_email = userEmail.text, let user_pwd = userPwd.text{
            param = [
                "user_email" : user_email,
                "user_pwd"   : user_pwd,
            ]
        }
        
        
        
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let vc = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "MainController")
        
        appDelegate.window?.rootViewController = vc
        appDelegate.window?.makeKeyAndVisible()
    }
    
    @objc func registerInfo(sender:UITapGestureRecognizer){
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        
        let vc = UIStoryboard(name: "Login", bundle: nil).instantiateViewController(withIdentifier: "RegisterController")
        //self.present(vc, animated: true, completion: nil)
        //self.dismiss(animated: true, completion: nil)
        
        appDelegate.window?.rootViewController = vc
        appDelegate.window?.makeKeyAndVisible()
    }
    
    @objc func keyboardWillHide(_ sender:Notification){
        self.view.frame.origin.y = 0
    }
    
    @objc func keyboardWillShow(_ sender:Notification){
        self.view.frame.origin.y = -150
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
    
    @objc func endEdit() {
        userEmail.resignFirstResponder()
        userPwd.resignFirstResponder()
    }
}
