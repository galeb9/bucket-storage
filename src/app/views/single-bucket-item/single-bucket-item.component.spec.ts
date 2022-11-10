import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBucketItemComponent } from './single-bucket-item.component';

describe('SingleBucketItemComponent', () => {
  let component: SingleBucketItemComponent;
  let fixture: ComponentFixture<SingleBucketItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBucketItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleBucketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
