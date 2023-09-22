import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Claim, DiningTable, ReserveTable } from '../models/restaurants.model';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-collect-user-info',
  templateUrl: './collect-user-info.component.html',
  styleUrls: ['./collect-user-info.component.css']
})
export class CollectUserInfoComponent {
  userForm!: FormGroup;
  @Input() selectedTable!: DiningTable;
  @Output() onUserBookinginfoComplete = new EventEmitter<ReserveTable>();
  claims: Claim[] = [];

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.initForm();
    this.loginService.claims$.subscribe((c) => {
      this.claims = c;
      console.log(JSON.stringify(this.claims));
      this.initForm();
    });
  }

  private initForm() {

    const firstName = this.claims.length ? this.claims.filter(f => f.claim === 'given_name')[0].value || '' : '';
    const lastName = this.claims.length ? this.claims.filter(f => f.claim === 'family_name')[0].value || '' : '';
    const email = this.claims.length ? this.claims.filter(f => f.claim === 'emails')[0].value[0] || '' : '';
    this.userForm = this.formBuilder.group({
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      emailId: [email, [Validators.required, Validators.email]],
      phoneNumber: ['9876542140', [Validators.required, Validators.pattern(/^\d{10}$/)]],
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
