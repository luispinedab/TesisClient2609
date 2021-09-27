import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablafallasComponent } from './tablafallas.component';

describe('TablafallasComponent', () => {
  let component: TablafallasComponent;
  let fixture: ComponentFixture<TablafallasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablafallasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablafallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
