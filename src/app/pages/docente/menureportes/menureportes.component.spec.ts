import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenureportesComponent } from './menureportes.component';

describe('MenureportesComponent', () => {
  let component: MenureportesComponent;
  let fixture: ComponentFixture<MenureportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenureportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenureportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
