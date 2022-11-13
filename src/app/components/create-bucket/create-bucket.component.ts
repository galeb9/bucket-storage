import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-bucket',
  templateUrl: './create-bucket.component.html',
  styleUrls: ['./create-bucket.component.scss']
})
export class CreateBucketComponent {
  @Input() warningMessage: string = "";
  @Output() createBucket:EventEmitter<any> = new EventEmitter<any>();

  locations: string[]= [ "Ljubljana", "Kranj", "Koper"];
  name: string = "";
  location: string ="";

  createNewBucket () {
    this.createBucket.emit({
      name: this.name,
      location: this.location
    })
  }
}
