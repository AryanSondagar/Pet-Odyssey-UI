import { ComponentFixture, TestBed } from '@angular/core/testing';
import 'src/test-setup';

import { TopThreeProductComponent } from './top-three-product.component';

describe('TopThreeProductComponent', () => {
  let component: TopThreeProductComponent;
  let fixture: ComponentFixture<TopThreeProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopThreeProductComponent]
    });
    fixture = TestBed.createComponent(TopThreeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
