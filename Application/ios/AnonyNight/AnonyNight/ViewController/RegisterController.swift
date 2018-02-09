//
//  RegisterController.swift
//  AnonyNight
//
//  Created by 이송미 on 2018. 2. 7..
//  Copyright © 2018년 lsm. All rights reserved.
//

import Foundation
import UIKit
class RegisterController : UIViewController, UITextFieldDelegate{
    @IBOutlet weak var userText: UITextField!
    @IBOutlet weak var userEmail: UITextField!
    @IBOutlet weak var userPwd: UITextField!
    @IBOutlet weak var registerBtn: UIButton!{
        didSet{
            registerBtn.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(registerInfo(_:))))
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        userText.delegate = self
        userEmail.delegate = self
        userPwd.delegate = self
        
        
        //키보드 사라지고 보이는 행동을 notification에 등록
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow(_:)), name: .UIKeyboardWillShow, object: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide(_:)), name: .UIKeyboardWillHide, object: nil)
        
        //뷰 터치 시 텍스트가 전부 사라지게 하는 행동
        self.view.addGestureRecognizer(UITapGestureRecognizer(target: self, action: #selector(endEdit)))
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    //키보드가 보일 시 화면의 뷰가 올라감
    @objc func keyboardWillShow(_ sender:Notification){
        self.view.frame.origin.y = -150
    }
    
    //키보드가 사라질 시 뷰가 원래되로 돌아옴
    @objc func keyboardWillHide(_ sender:Notification){
        self.view.frame.origin.y = 0
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
    
    @objc func endEdit(){
        userText.resignFirstResponder()
        userEmail.resignFirstResponder()
        userPwd.resignFirstResponder()
    }
    
    @objc func registerInfo(_ sender:UITapGestureRecognizer){
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let vc = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "MainController")
        
        appDelegate.window?.rootViewController = vc
        appDelegate.window?.makeKeyAndVisible()
    }
}
