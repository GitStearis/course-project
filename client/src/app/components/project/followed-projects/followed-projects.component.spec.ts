import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedProjectsComponent } from './followed-projects.component';

describe('FollowedProjectsComponent', () => {
  let component: FollowedProjectsComponent;
  let fixture: ComponentFixture<FollowedProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowedProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
