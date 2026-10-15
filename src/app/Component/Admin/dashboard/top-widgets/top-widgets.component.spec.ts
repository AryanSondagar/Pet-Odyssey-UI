import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import 'src/test-setup';

import { TopWidgetsComponent } from './top-widgets.component';

describe('TopWidgetsComponent', () => {
  let component: TopWidgetsComponent;
  let fixture: ComponentFixture<TopWidgetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopWidgetsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(TopWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
