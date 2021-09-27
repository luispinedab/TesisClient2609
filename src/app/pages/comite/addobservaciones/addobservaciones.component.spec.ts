import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddobservacionesComponent } from './addobservaciones.component';

describe('AddobservacionesComponent', () => {
  let component: AddobservacionesComponent;
  let fixture: ComponentFixture<AddobservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddobservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddobservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
