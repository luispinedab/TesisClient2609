import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaconsultarnotasComponent } from './tablaconsultarnotas.component';

describe('TablaconsultarnotasComponent', () => {
  let component: TablaconsultarnotasComponent;
  let fixture: ComponentFixture<TablaconsultarnotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaconsultarnotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaconsultarnotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
