import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketsListComponent } from './buckets-list.component';

describe('BucketsListComponent', () => {
  let component: BucketsListComponent;
  let fixture: ComponentFixture<BucketsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucketsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
