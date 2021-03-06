import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationPageComponent } from './verification-page.component';

describe('VerificationPageComponent', () => {
  let component: VerificationPageComponent;
  let fixture: ComponentFixture<VerificationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
