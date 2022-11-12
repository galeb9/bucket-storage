import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-bucket',
  templateUrl: './create-bucket.component.html',
  styleUrls: ['./create-bucket.component.scss']
})
export class CreateBucketComponent {
  @Output() createBucket:EventEmitter<any> = new EventEmitter<string>();

  locations: string[]= [ "Ljubljana", "Kranj", "Koper"];
  name: string = "";
  location: string ="";

  createNewBucket () {
    const data = 
    this.createBucket.emit({
      name: this.name,
      location: this.location
    })
  }
}
