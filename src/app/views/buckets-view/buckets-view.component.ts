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

  locations: string[]= [ "Ljubljana", "Kranj", "Koper"];

  isCreateBucketOpen:boolean = false;
  bucketName:string = "";
  bucketLocation:string = "";

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
    }
  }

  openBucketItem (id: any) {
    this.router.navigateByUrl(`/single-bucket/${id}`);
  }
}
