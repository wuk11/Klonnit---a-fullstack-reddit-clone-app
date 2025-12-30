import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageRandomComponent } from './front-page-random.component';

describe('FrontPageRandomComponent', () => {
  let component: FrontPageRandomComponent;
  let fixture: ComponentFixture<FrontPageRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontPageRandomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontPageRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
