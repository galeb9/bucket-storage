import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bucket } from 'src/app/Bucket';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input() bucket:any;

  formatBytes(bytes:number, decimal:number = 0) {
    const marker = 1024;
    const kiloBytes = marker;
    const megaBytes = marker * marker; 
    const gigaBytes = marker * marker * marker;

    if(decimal > 0) {
      if(bytes < kiloBytes) return bytes + " Bytes";
      else if(bytes < megaBytes) return(bytes / kiloBytes).toFixed(decimal) + " KB";
      else if(bytes < gigaBytes) return(bytes / megaBytes).toFixed(decimal) + " MB";
      else return(bytes / gigaBytes).toFixed(decimal) + " GB";

    } else {
        if(bytes < kiloBytes) return bytes + " Bytes";
        else if(bytes < megaBytes) return Math.round(bytes / kiloBytes) + " KB";
        else if(bytes < gigaBytes) return Math.round(bytes / megaBytes) + " MB";
        else return Math.round(bytes / gigaBytes) + " GB";
    }
  }
}