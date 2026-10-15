import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import 'src/test-setup';

import { AdminAdoptionComponent } from './admin-adoption.component';

describe('AdminAdoptionComponent', () => {
  let component: AdminAdoptionComponent;
  let fixture: ComponentFixture<AdminAdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAdoptionComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
