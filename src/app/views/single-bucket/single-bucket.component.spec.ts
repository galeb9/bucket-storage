import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBucketComponent } from './single-bucket.component';

describe('SingleBucketComponent', () => {
  let component: SingleBucketComponent;
  let fixture: ComponentFixture<SingleBucketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBucketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
