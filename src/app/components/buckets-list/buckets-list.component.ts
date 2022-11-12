import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bucket } from 'src/app/Bucket';

@Component({
  selector: 'app-buckets-list',
  templateUrl: './buckets-list.component.html',
  styleUrls: ['./buckets-list.component.scss']
})
export class BucketsListComponent {
  @Input() buckets: Bucket[] = [];
  @Output() openBucket:EventEmitter<any> = new EventEmitter<any>();

  openBucketItem(bucketID: any) {
    this.openBucket.emit(bucketID)
  }
}
