import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenudocumentosComponent } from './menudocumentos.component';

describe('MenudocumentosComponent', () => {
  let component: MenudocumentosComponent;
  let fixture: ComponentFixture<MenudocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenudocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenudocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
