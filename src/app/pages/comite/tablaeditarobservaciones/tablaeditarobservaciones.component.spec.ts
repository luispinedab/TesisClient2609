import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaeditarobservacionesComponent } from './tablaeditarobservaciones.component';

describe('TablaeditarobservacionesComponent', () => {
  let component: TablaeditarobservacionesComponent;
  let fixture: ComponentFixture<TablaeditarobservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaeditarobservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaeditarobservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
