import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckByAdminComponent } from './check-by-admin.component';

describe('CheckByAdminComponent', () => {
  let component: CheckByAdminComponent;
  let fixture: ComponentFixture<CheckByAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckByAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
