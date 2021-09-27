import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablalogrosComponent } from './tablalogros.component';

describe('TablalogrosComponent', () => {
  let component: TablalogrosComponent;
  let fixture: ComponentFixture<TablalogrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablalogrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablalogrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
