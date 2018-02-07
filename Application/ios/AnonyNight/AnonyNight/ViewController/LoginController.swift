//
//  LoginController.swift
//  AnonyNight
//
//  Created by 이송미 on 2018. 2. 7..
//  Copyright © 2018년 lsm. All rights reserved.
//

import Foundation
import UIKit

class LoginController : UIViewController {
    @IBOutlet weak var userEmail: UITextField!
    @IBOutlet weak var loginSection: UIView!
    @IBOutlet weak var userPwd: UITextField!
    
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
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @objc func login(sender : UITapGestureRecognizer){
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let vc = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "MainController")
        
        appDelegate.window?.rootViewController = vc
        appDelegate.window?.makeKeyAndVisible()
    }
    
    @objc func registerInfo(sender:UITapGestureRecognizer){
        let vc = UIStoryboard(name: "Login", bundle: nil).instantiateViewController(withIdentifier: "RegisterController")
        self.present(vc, animated: true, completion: nil)
        self.dismiss(animated: true, completion: nil)
    }
    
    func keyboardWillShowOrHide(notification: Notification){
        
    }
}
