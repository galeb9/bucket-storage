import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bucket, File } from 'src/app/Bucket';
import { BucketService } from '../../services/bucket.service'

import { faFileLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-single-bucket-item',
  templateUrl: './single-bucket-item.component.html',
  styleUrls: ['./single-bucket-item.component.scss']
})
export class SingleBucketItemComponent implements OnInit, AfterContentInit {
  faFileLines = faFileLines;
  bucketID:any = null; 
  fileCount:number = 0; 
  buckets:Bucket[] = [];
  files:File[] = [];
  bucket:any;
  warningMessage:string = ""; 
  popupText:string = "";
  isPopupOpen:boolean = false;
  selectedFile:any;
  activeCondition:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
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
  
  selectFile(file: File) {
    this.selectedFile = file;
    console.log(this.selectedFile)
  } 

  calculateSize (size:number) {
    size = Math.floor(size);
    return size > 1000 ? Math.floor(size / 1000) + "MB" : size + "KB";
  }

  openPopup(condition:any) {
    this.activeCondition = condition;
    let fileText = this.selectedFile ?  `Would you like to delete file ${this.selectedFile.name}?` : ""
    let bucketText = `Would you like to delete bucket ${this.bucket.name}?`;

    if(this.activeCondition) {
      this.isPopupOpen = true; 
      this.warningMessage = "";
      this.popupText = this.selectedFile ? fileText : bucketText
    } else {
      this.warningMessage = "No file selected. Please select one!"
    }
    this.selectedFile = null;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  deleteBtn() {
    this.activeCondition === this.selectedFile ? this.deleteFile() : this.deleteBucket()
  }

  deleteFile () {
    this.closePopup()
    console.log("File deleted")
  }

  deleteBucket () {
    this.closePopup()
    this.bucketService.deleteBucket(this.bucket).subscribe(() => this.route.navigateByUrl("/"));
    console.log("Bucket deleted")
  }
  
}
