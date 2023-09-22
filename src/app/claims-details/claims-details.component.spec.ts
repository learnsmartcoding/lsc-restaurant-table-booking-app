import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsDetailsComponent } from './claims-details.component';

describe('ClaimsDetailsComponent', () => {
  let component: ClaimsDetailsComponent;
  let fixture: ComponentFixture<ClaimsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimsDetailsComponent]
    });
    fixture = TestBed.createComponent(ClaimsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
