import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuinfoComponent } from './menuinfo.component';

describe('MenuinfoComponent', () => {
  let component: MenuinfoComponent;
  let fixture: ComponentFixture<MenuinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
