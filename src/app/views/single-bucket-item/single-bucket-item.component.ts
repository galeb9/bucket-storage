import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bucket, File } from 'src/app/Bucket';
import { BucketService } from '../../services/bucket.service'

@Component({
  selector: 'app-single-bucket-item',
  templateUrl: './single-bucket-item.component.html',
  styleUrls: ['./single-bucket-item.component.scss']
})
export class SingleBucketItemComponent implements OnInit, AfterContentInit {
  bucketID:any = null; 
  fileCount:number = 0; 
  buckets:Bucket[] = [];
  files:File[] = [];
  bucket:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bucketService: BucketService
  ) {}

  ngOnInit(): void {
      this.bucketID = this.getRouteID();
      this.getAllBuckets();

      setTimeout(() => {
        this.findRouteBucket(this.bucketID);
      }, 1000);
  }

  ngAfterContentInit(): void {
    // this.findRouteBucket(this.bucketID)
  }

  getRouteID () {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  getAllBuckets() {
    this.bucketService.getBuckets().subscribe((buckets) => this.buckets = buckets);
  }

  findRouteBucket(id:any) {
    this.bucket = this.buckets.find((bucket) => bucket.id == id);
    if(this.bucket.files) {
      this.files = this.bucket.files; 
      this.fileCount = this.files.length;
    } 
  }
  
  calculateSize (size:number) {
    size = Math.floor(size);
    return size > 1000 ? Math.floor(size / 1000) + "MB" : size + "KB";
  }
}
