//
//  APIRequest.swift
//  AnonyNight
//
//  Created by 이송미 on 2018. 2. 7..
//  Copyright © 2018년 lsm. All rights reserved.
//

import Foundation
import Alamofire

class APIRequest : NSObject {
    private var url:String
    private var req_param:Parameters
    private var method:HTTPMethod
    
    init(url:String, parm:Parameters, method:HTTPMethod){
        self.url = url
        self.req_param = parm
        self.method = method
    }

    func request(success: @escaping(_ data:[String:Any])-> Void, fail: @escaping(_ error: Error?)-> Void) {
        Alamofire.request(url, method: method, parameters: req_param).responseJSON{ response in
            if response.result.isSuccess{
                success(response.value as! [String:Any])
            } else{
                fail(response.result.error)
            }
        }
    }
    
}
