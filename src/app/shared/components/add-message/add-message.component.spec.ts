import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessageComponent } from './add-message.component';

describe('AddMessageComponent', () => {
  let component: AddMessageComponent;
  let fixture: ComponentFixture<AddMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
