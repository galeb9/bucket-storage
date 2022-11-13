import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bucket } from 'src/app/Bucket';
import { BucketService } from '../../services/bucket.service'

@Component({
  selector: 'app-buckets-view',
  templateUrl: './buckets-view.component.html',
  styleUrls: ['./buckets-view.component.scss']
})
export class BucketsViewComponent implements OnInit {
  buckets:Bucket[] = [];
  warningMessage:string = ""; 
  bucketName:string = "";
  bucketLocation:string = "";
  isCreateBucketOpen:boolean = false;

  constructor(private router: Router, private bucketService: BucketService) {}

  ngOnInit () {
    this.bucketService.getBuckets().subscribe((buckets) => this.buckets = buckets)
  }

  openCreateBucket () {
    this.isCreateBucketOpen = true;
  }

  closeCreateBucket () {
    this.isCreateBucketOpen = false;
  }

  createNewBucket (data:any) {
    this.warningMessage = ""
    this.bucketName = data.name;
    this.bucketLocation = data.location;
    console.log("New data: ", this.bucketName, this.bucketLocation)
    const randomNum = Math.floor(Math.random() * 1000);
    if(this.bucketName && this.bucketLocation) {
      const newBucket = {
        name: this.bucketName,
        location: this.bucketLocation,
        id: randomNum,
        storageSize: 0,
        files: []
      }
      this.bucketService.createBucket(newBucket).subscribe(() => this.buckets.push(newBucket))
      console.log(randomNum);
      this.closeCreateBucket();
    } else{ 
      this.warningMessage = "Please choose a name and location for the new bucket" 
    }
  }

  openBucketItem (id: any) {
    this.router.navigateByUrl(`/single-bucket/${id}`);
  }
}
