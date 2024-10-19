import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournaluserprofileComponent } from './journaluserprofile.component';

describe('JournaluserprofileComponent', () => {
  let component: JournaluserprofileComponent;
  let fixture: ComponentFixture<JournaluserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournaluserprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournaluserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
