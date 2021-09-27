import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdocsComponent } from './verdocs.component';

describe('VerdocsComponent', () => {
  let component: VerdocsComponent;
  let fixture: ComponentFixture<VerdocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
