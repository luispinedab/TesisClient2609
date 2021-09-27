import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccescitaComponent } from './succescita.component';

describe('SuccescitaComponent', () => {
  let component: SuccescitaComponent;
  let fixture: ComponentFixture<SuccescitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccescitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccescitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
