import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DiningTable, ReserveTable } from '../models/restaurants.model';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-collect-user-info',
  templateUrl: './collect-user-info.component.html',
  styleUrls: ['./collect-user-info.component.css']
})
export class CollectUserInfoComponent {
  userForm!: FormGroup;
  @Input() selectedTable!:DiningTable;
  @Output() onUserBookinginfoComplete=new EventEmitter<ReserveTable>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      timeSlotId: [this.selectedTable.timeSlotId, Validators.required],
      reservationDate: [this.selectedTable.reservationDay, Validators.required],
      reservationStatus: ['Booked'] // You can set a default value if needed
    });
  }

  onSubmit() {
    
    if (this.userForm.valid) {
      const reserveTable: ReserveTable = this.userForm.value;
      this.onUserBookinginfoComplete.emit(reserveTable);      
    } else {
      // Show error messages or perform other actions for invalid form
    }
  }
}
