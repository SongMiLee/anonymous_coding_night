//
//  FeedController.swift
//  AnonyNight
//
//  Created by 이송미 on 2018. 2. 8..
//  Copyright © 2018년 lsm. All rights reserved.
//

import Foundation
import UIKit

class FeedController: UIViewController, UITableViewDelegate {
    let testFeedText = ["test1", "test2"]
    let testFeedDate = ["2018-02-01", "2018-02-02"]
    
    @IBOutlet weak var feedTable: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        feedTable.dataSource = self
        feedTable.delegate = self
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

extension FeedController : UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.testFeedDate.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = feedTable.dequeueReusableCell(withIdentifier: "FeedCellController", for: indexPath) as! FeedCellController
        
        cell.feedText.text = testFeedText[indexPath.row]
        cell.feedDate.text = testFeedDate[indexPath.row]
        
        return cell
    }
    
    
}
