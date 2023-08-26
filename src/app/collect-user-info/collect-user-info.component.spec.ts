import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectUserInfoComponent } from './collect-user-info.component';

describe('CollectUserInfoComponent', () => {
  let component: CollectUserInfoComponent;
  let fixture: ComponentFixture<CollectUserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectUserInfoComponent]
    });
    fixture = TestBed.createComponent(CollectUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
