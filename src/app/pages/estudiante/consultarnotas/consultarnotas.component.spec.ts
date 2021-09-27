import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarnotasComponent } from './consultarnotas.component';

describe('ConsultarnotasComponent', () => {
  let component: ConsultarnotasComponent;
  let fixture: ComponentFixture<ConsultarnotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarnotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarnotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
