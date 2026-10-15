import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import 'src/test-setup';

import { OpenDialogComponent } from './open-dialog.component';

describe('OpenDialogComponent', () => {
  let component: OpenDialogComponent;
  let fixture: ComponentFixture<OpenDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenDialogComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(OpenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
