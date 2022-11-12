import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bucket, File } from 'src/app/Bucket';
import { BucketService } from '../../services/bucket.service'
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

import { HttpClient } from '@angular/common/http';


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
  bucketSize:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private bucketService: BucketService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
      this.bucketID = this.getRouteID();
      this.getAllBuckets();
      setTimeout(() => {
        this.findRouteBucket(this.bucketID);
        this.getBucketSize();
      }, 1000);
  }

  ngAfterContentInit(): void {
    // this.findRouteBucket(this.bucketID)
    this.formatDate("Thu Jan 8 2022 12:26:51 GMT+0100 (Central European Standard Time)")
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

  deselectFile() {
    this.selectedFile = null
  }

  // calculateSize (size:number) {
  //   size = Math.floor(size);
  //   return size > 1000 ? Math.floor(size / 1000) + "MB" 
  //     : size > 1000 ? Math.floor(size / 1000) + "MB" : size + "KB";
  // }

  formatBytes(bytes:number, decimal:number = 0) {
    const marker = 1024; // Change to 1000 if required
    const kiloBytes = marker; // One Kilobyte is 1024 bytes
    const megaBytes = marker * marker; // One MB is 1024 KB
    const gigaBytes = marker * marker * marker; // One GB is 1024 MB

    if(decimal > 0) {
      if(bytes < kiloBytes) return bytes + " Bytes";
      else if(bytes < megaBytes) return(bytes / kiloBytes).toFixed(decimal) + " KB";
      else if(bytes < gigaBytes) return(bytes / megaBytes).toFixed(decimal) + " MB";
      else return(bytes / gigaBytes).toFixed(decimal) + " GB";
      // if(bytes < kiloBytes) return bytes + " Bytes";
      // else if(bytes < megaBytes) return Number.isInteger(bytes / kiloBytes) ? (bytes / kiloBytes) + "KB" : (bytes / kiloBytes).toFixed(decimal) + " KB";
      // else if(bytes < gigaBytes) return Number.isInteger(bytes / megaBytes) ? (bytes / megaBytes) + "MB" : (bytes / megaBytes).toFixed(decimal) + " MB";
      // else return Number.isInteger(bytes / megaBytes) ? (bytes / gigaBytes) + "GB" : (bytes / gigaBytes).toFixed(decimal) + " GB";
    } else {
        if(bytes < kiloBytes) return bytes + " Bytes";
        else if(bytes < megaBytes) return Math.round(bytes / kiloBytes) + " KB";
        else if(bytes < gigaBytes) return Math.round(bytes / megaBytes) + " MB";
        else return Math.round(bytes / gigaBytes) + " GB";
    }


  }

  formatDetailsBytes(bytes:number) {
    const marker = 1024; // Change to 1000 if required
    const kiloBytes = marker; // One Kilobyte is 1024 bytes
    const megaBytes = marker * marker; // One MB is 1024 KB
    const gigaBytes = marker * marker * marker; // One GB is 1024 MB

    if(bytes < kiloBytes) return bytes + " Bytes";
    else if(bytes < megaBytes) return Math.round(bytes / kiloBytes).toFixed() + " KB";
    else if(bytes < gigaBytes) return Math.round(bytes / megaBytes) + " MB";
    else return Math.round(bytes / gigaBytes) + " GB";
  }

  addZeros(item:string) {
    return item.length < 2 ? item.padStart(2, '0') : item
  }

  formatDate (item:string) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    item = item + "";
    const date = item.split(" ");

    const month = this.addZeros(String(months.findIndex((item:string) => date[1] === item) + 1));
    const day = this.addZeros(date[2]);
    const year = this.addZeros(date[3]);

    return `${day}.${month}.${year}`;
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

    if(this.activeCondition !== this.selectedFile) this.selectedFile = null
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  deleteBtn() {
    this.activeCondition === this.selectedFile ? this.deleteFile() : this.deleteBucket()
  }

  deleteBucket () {
    this.closePopup()
    this.bucketService.deleteBucket(this.bucket).subscribe(() => this.route.navigateByUrl("/"));
    console.log("Bucket deleted")
  }

  deleteFile () {
    this.files = this.files.filter(file => file !== this.selectedFile)
    this.bucket.files = this.files;
    this.bucketService.deleteFile(this.bucketID, this.bucket).subscribe(() => console.log("File deleted"));
    this.selectedFile = null;
    this.closePopup()
  }

  // upload file

  uploadFile(event: any) {
    this.warningMessage = ""
    this.deselectFile();

    const file = event.target.files[0];
    const date = this.formatDate(file.lastModifiedDate)
    if(file) {
      const newFile = {
        name: file.name,
        lastModified: date,
        size: file.size
      }
      this.files.push(newFile)
      this.getBucketSize()

      this.bucketService.uploadFile(this.bucketID, this.bucket).subscribe(() => console.log("File uploaded"));
    }
  }

  // Deatils
  getBucketSize (newFileSize:number = 0) {
    this.bucketSize = this.files.map(el => +el.size).reduce((total, value) => total += value)
    // update bucket size if new files are uploaded
    // this.bucketSize = this.bucket.storageSize + newFileSize
  }
}
