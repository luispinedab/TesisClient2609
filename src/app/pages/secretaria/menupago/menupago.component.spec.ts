import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenupagoComponent } from './menupago.component';

describe('MenupagoComponent', () => {
  let component: MenupagoComponent;
  let fixture: ComponentFixture<MenupagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenupagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenupagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
