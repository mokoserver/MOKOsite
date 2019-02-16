import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchProductsModalComponent } from './watch-products-modal.component';

describe('WatchProductsModalComponent', () => {
  let component: WatchProductsModalComponent;
  let fixture: ComponentFixture<WatchProductsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchProductsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchProductsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
