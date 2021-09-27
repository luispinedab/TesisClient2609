import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaverobservacionesComponent } from './tablaverobservaciones.component';

describe('TablaverobservacionesComponent', () => {
  let component: TablaverobservacionesComponent;
  let fixture: ComponentFixture<TablaverobservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaverobservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaverobservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
