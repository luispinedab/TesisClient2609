import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerobservacionesComponent } from './verobservaciones.component';

describe('VerobservacionesComponent', () => {
  let component: VerobservacionesComponent;
  let fixture: ComponentFixture<VerobservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerobservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerobservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
