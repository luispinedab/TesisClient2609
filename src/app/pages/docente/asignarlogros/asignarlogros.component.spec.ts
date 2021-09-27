import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarlogrosComponent } from './asignarlogros.component';

describe('AsignarlogrosComponent', () => {
  let component: AsignarlogrosComponent;
  let fixture: ComponentFixture<AsignarlogrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarlogrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarlogrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
