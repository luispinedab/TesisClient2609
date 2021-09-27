import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenunotasComponent } from './menunotas.component';

describe('MenunotasComponent', () => {
  let component: MenunotasComponent;
  let fixture: ComponentFixture<MenunotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenunotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenunotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
