import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'src/test-setup';

import { AdoptComponent } from './adopt.component';

describe('AdoptComponent', () => {
  let component: AdoptComponent;
  let fixture: ComponentFixture<AdoptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdoptComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
