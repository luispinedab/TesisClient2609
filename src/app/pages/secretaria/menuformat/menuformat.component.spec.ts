import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuformatComponent } from './menuformat.component';

describe('MenuformatComponent', () => {
  let component: MenuformatComponent;
  let fixture: ComponentFixture<MenuformatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuformatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
