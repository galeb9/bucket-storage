import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bucket, File } from 'src/app/Bucket';
import { BucketService } from '../../services/bucket.service'
@Component({
  selector: 'app-single-bucket-item',
  templateUrl: './single-bucket-item.component.html',
  styleUrls: ['./single-bucket-item.component.scss']
})
export class SingleBucketItemComponent implements OnInit {
  fileCount:number = 0; 
  bucketID:any = null; 
  isPopupOpen:boolean = false;
  popupText:string = "";
  warningMessage:string = ""; 
  buckets:Bucket[] = [];
  files:File[] = [];
  bucket:any;
  selectedFile:any;
  activeCondition:any;
  bucketSize:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private bucketService: BucketService
  ) {}

  ngOnInit(): void {
      this.getRouteID();
      this.getAllBuckets();
  }

  getRouteID () {
    this.bucketID = this.activatedRoute.snapshot.paramMap.get('id');
  }

  getAllBuckets() {
    this.bucketService.getBuckets().subscribe((buckets) => {
      this.buckets = buckets;
      this.findRouteBucket(this.bucketID);
      this.getBucketSize();
    });
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
  }

  deleteFile () {
    this.files = this.files.filter(file => file !== this.selectedFile)
    this.bucket.files = this.files;
    this.bucketService.deleteFile(this.bucketID, this.bucket).subscribe(() => console.log("File deleted"));
    this.selectedFile = null;
    this.closePopup()
  }

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
      this.bucketService.uploadFile(this.bucketID, this.bucket).subscribe(() => console.log("File upload"));
    }
  }

  getBucketSize () {
    if(this.bucket.files.length > 0) {
      this.bucket.storageSize = this.bucket.files.map((el:File) => +el.size).reduce((total:number, value:number) => total += value)
    }
    this.bucketSize = this.bucket.storageSize
  }
}
