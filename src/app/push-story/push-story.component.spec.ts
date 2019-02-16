import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushStoryComponent } from './push-story.component';

describe('PushStoryComponent', () => {
  let component: PushStoryComponent;
  let fixture: ComponentFixture<PushStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
