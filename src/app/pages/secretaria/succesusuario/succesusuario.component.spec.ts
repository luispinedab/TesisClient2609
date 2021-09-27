import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesusuarioComponent } from './succesusuario.component';

describe('SuccesusuarioComponent', () => {
  let component: SuccesusuarioComponent;
  let fixture: ComponentFixture<SuccesusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccesusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
