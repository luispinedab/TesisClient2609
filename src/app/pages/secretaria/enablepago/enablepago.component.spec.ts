import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnablepagoComponent } from './enablepago.component';

describe('EnablepagoComponent', () => {
  let component: EnablepagoComponent;
  let fixture: ComponentFixture<EnablepagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnablepagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnablepagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
