import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bucket } from 'src/app/Bucket';
import { BucketService } from '../../services/bucket.service'

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.scss']
})
export class BucketListComponent implements OnInit {
  buckets:Bucket[] = [];

  locations: string[]= [ "Ljubljana", "Kranj", "Koper"];

  bucketsCount:number = this.buckets.length;
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

  createNewBucket () {
    const randomNum = Math.floor(Math.random() * 1000)
    if(this.bucketName && this.bucketLocation) {
      this.buckets.push(
        {
          name: this.bucketName,
          location: this.bucketLocation,
          id: randomNum,
          storageSize: 0
        })
        console.log(randomNum)
    }
    this.closeCreateBucket();
  }

  openBucketItem (id: any) {
    // console.log(`going to: /bucket-list/${id}`)
    this.router.navigateByUrl(`/single-bucket/${id}`);
  }
}
