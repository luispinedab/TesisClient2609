import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarnotaComponent } from './registrarnota.component';

describe('RegistrarnotaComponent', () => {
  let component: RegistrarnotaComponent;
  let fixture: ComponentFixture<RegistrarnotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarnotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarnotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
