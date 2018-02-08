//
//  extensionCALayer.swift
//  AnonyNight
//
//  Created by 이송미 on 2018. 2. 7..
//  Copyright © 2018년 lsm. All rights reserved.
//

import Foundation
import UIKit

extension CALayer{
    var borderUIWidth:CGFloat {
        set(width){
            self.borderWidth = width
        }
        get{
            return self.borderWidth
        }
    }
    
    var cornerUIRadius:CGFloat {
        set(corner) {
            self.cornerRadius = corner
        }
        get{
            return self.cornerRadius
        }
    }
    
    var borderUIColor:UIColor{
        set(color){
            self.borderColor = color.cgColor
        }
        
        get{
            return UIColor(cgColor: self.borderColor!)
        }
    }
}
