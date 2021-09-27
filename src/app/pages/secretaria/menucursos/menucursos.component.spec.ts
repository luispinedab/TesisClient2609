import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenucursosComponent } from './menucursos.component';

describe('MenucursosComponent', () => {
  let component: MenucursosComponent;
  let fixture: ComponentFixture<MenucursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenucursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenucursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
