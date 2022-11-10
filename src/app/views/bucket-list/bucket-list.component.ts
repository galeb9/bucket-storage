import { Component } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { BucketListItem } from 'src/app/BucketListItem';


@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.scss']
})
export class BucketListComponent {
  buckets:BucketListItem[] = [
    { name: "BestStorage", location: "Kranj" }, 
    { name: "Pics", location: "Ljubljana" } 
  ]
  locations: string[]= [ "Ljubljana", "Kranj", "Koper"];

  bucketsCount:number = this.buckets.length;
  isCreateBucketOpen:boolean = false;
  bucketName:string = "";
  bucketLocation:string = "";

  openCreateBucket () {
    this.isCreateBucketOpen = true;
  }

  closeCreateBucket () {
    this.isCreateBucketOpen = false;
  }

  createNewBucket () {
    const newBucket = {
      name: this.bucketName,
      location: this.bucketLocation
    };
    this.buckets.push(newBucket);
    this.closeCreateBucket();
  }
}
