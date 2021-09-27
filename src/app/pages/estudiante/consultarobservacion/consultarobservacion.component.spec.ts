import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarobservacionComponent } from './consultarobservacion.component';

describe('ConsultarobservacionComponent', () => {
  let component: ConsultarobservacionComponent;
  let fixture: ComponentFixture<ConsultarobservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarobservacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarobservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
