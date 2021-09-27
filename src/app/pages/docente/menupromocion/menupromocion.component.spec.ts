import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenupromocionComponent } from './menupromocion.component';

describe('MenupromocionComponent', () => {
  let component: MenupromocionComponent;
  let fixture: ComponentFixture<MenupromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenupromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenupromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
