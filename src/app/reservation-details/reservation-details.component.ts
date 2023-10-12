import { Component } from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { ReservationDetailsModel } from '../models/restaurants.model';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent {
  reservationDetails: ReservationDetailsModel[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    // Fetch reservation details from your service
    this.reservationService.GetReservationDetails().subscribe(details => {
      this.reservationDetails = details;
    });
  }
}
