import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedProjectsComponent } from './rated-projects.component';

describe('RatedProjectsComponent', () => {
  let component: RatedProjectsComponent;
  let fixture: ComponentFixture<RatedProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
