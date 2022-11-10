import { Component } from '@angular/core';
import { BucketListItem } from 'src/app/BucketListItem';


@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.scss']
})
export class BucketListComponent {
  bucketsCount: number = 0;
  buckets: BucketListItem[] = [
    {
      name: "BestStorage",
      location: "Kranj"
    },
    {
      name: "Pics",
      location: "Ljubljana"
    }
  ]


  
}
