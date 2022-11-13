import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit{
  @Input('tabTitle') title: string = '';
  @Input() longTitle: string = '';
  @Input() active = false;
  @Input() longName:string = '';

  ngOnInit() {
    console.log(this.longTitle)
  }
}
