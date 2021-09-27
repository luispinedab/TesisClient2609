import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarfallasComponent } from './consultarfallas.component';

describe('ConsultarfallasComponent', () => {
  let component: ConsultarfallasComponent;
  let fixture: ComponentFixture<ConsultarfallasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarfallasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarfallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
