import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookATableComponent } from './book-a-table.component';

describe('BookATableComponent', () => {
  let component: BookATableComponent;
  let fixture: ComponentFixture<BookATableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookATableComponent]
    });
    fixture = TestBed.createComponent(BookATableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
