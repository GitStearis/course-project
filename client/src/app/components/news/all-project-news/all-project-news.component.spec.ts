import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectNewsComponent } from './all-project-news.component';

describe('AllProjectNewsComponent', () => {
  let component: AllProjectNewsComponent;
  let fixture: ComponentFixture<AllProjectNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProjectNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProjectNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
