import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatMatriculaComponent } from './format-matricula.component';

describe('FormatMatriculaComponent', () => {
  let component: FormatMatriculaComponent;
  let fixture: ComponentFixture<FormatMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatMatriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
