//
//  NetReq.swift
//  AnonyNight
//
//  Created by 이송미 on 2018. 2. 7..
//  Copyright © 2018년 lsm. All rights reserved.
//

import Foundation
import Alamofire

class NetReq : NSObject {
    private var url:String?
    private var req_param:[String:Any] = [:]
    
    init(url:String, req_param:[String:Any]){
        self.url = url
        self.req_param = req_param
    }
    
    init(url:String){
        self.url = url
    }
    
    
    
}
