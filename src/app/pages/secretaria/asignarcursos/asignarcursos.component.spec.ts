import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarcursosComponent } from './asignarcursos.component';

describe('AsignarcursosComponent', () => {
  let component: AsignarcursosComponent;
  let fixture: ComponentFixture<AsignarcursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarcursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarcursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
