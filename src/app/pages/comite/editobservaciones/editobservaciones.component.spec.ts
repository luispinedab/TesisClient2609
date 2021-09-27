import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditobservacionesComponent } from './editobservaciones.component';

describe('EditobservacionesComponent', () => {
  let component: EditobservacionesComponent;
  let fixture: ComponentFixture<EditobservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditobservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditobservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
