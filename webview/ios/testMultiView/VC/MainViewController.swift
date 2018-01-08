//
//  Main.swift
//  testMultiView
//
//  Created by 이송미 on 2018. 1. 5..
//  Copyright © 2018년 song.self. All rights reserved.
//

import Foundation
import UIKit
import WebKit

class MainViewController: UIViewController, WKUIDelegate{
    
    var webView: WKWebView!
    
    override func loadView() {
        let webConfiguration = WKWebViewConfiguration()
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        view = webView
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let myURL = URL(string:"https://peaceful-anony-night.herokuapp.com/")
        let myReq = URLRequest(url: myURL!)
        webView.load(myReq)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
