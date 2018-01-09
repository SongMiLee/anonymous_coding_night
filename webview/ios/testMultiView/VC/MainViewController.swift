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

class MainViewController: UIViewController, WKNavigationDelegate{
    
    var webView: WKWebView!
    var indicator: UIActivityIndicatorView!
    override func loadView() {
        self.webView = WKWebView()
        self.webView.navigationDelegate = self
        self.webView.sizeToFit()
        self.view = webView
        
    }
    override func viewDidLoad() {
        super.viewDidLoad()
    
        //set Init url
        let myURL = URL(string:"https://peaceful-anony-night.herokuapp.com/")
        let myReq = URLRequest(url: myURL!)
        self.webView.load(myReq)
    }

    //navigation start
    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        indicator = UIActivityIndicatorView()
        indicator.color = UIColor(red: 95.0/255.0, green: 75.0/255.0, blue: 139.0/255.0, alpha: 1.0)
        indicator.frame = CGRect(x: view.frame.midX - 25, y: view.frame.midY - 25 , width: 50, height: 50)
        indicator.hidesWhenStopped = true
        indicator.startAnimating()
        
        self.view.addSubview(indicator)
        self.view.bringSubview(toFront: indicator)
        UIApplication.shared.isNetworkActivityIndicatorVisible = true
    }
    
    //navigation complete
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        self.indicator.removeFromSuperview()
        UIApplication.shared.isNetworkActivityIndicatorVisible = false
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
}
