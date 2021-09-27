import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablanotasComponent } from './tablanotas.component';

describe('TablanotasComponent', () => {
  let component: TablanotasComponent;
  let fixture: ComponentFixture<TablanotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablanotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablanotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
