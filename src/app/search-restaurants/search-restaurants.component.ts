import { Component, OnInit, TemplateRef } from '@angular/core';
import { Claim, DiningTable, ReserveTable, Restaurant, RestaurantBranch } from '../models/restaurants.model';
import { AppSampleData } from '../shared/constants/temp-data';
import { RestaurantService } from '../service/restaurant.service';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReservationService } from '../service/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-search-restaurants',
  templateUrl: './search-restaurants.component.html',
  styleUrls: ['./search-restaurants.component.css']
})
export class SearchRestaurantsComponent implements OnInit {
  headingTitle = 'Search Restaurants';
  searchTerm: string = ''; // The search term entered by the user
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  userEmailId='';

  selectRestaurant!: Restaurant | undefined;

  filteredBranches: RestaurantBranch[] = []; // Holds the branches of the selected restaurant
  restaurantBranches: RestaurantBranch[] = [];
  selectedBranch: RestaurantBranch | null = null;

  selectedBranchId: number = -1;
  selectedRestaurantId: number = -1; // Holds the selected restaurant
  distinctReservationDays: string[] = [];
  branchDiningTables: DiningTable[] = [];
  bookingTables: DiningTable[] = [];
  selectedTable!: DiningTable;
  reservationSuccess = false;
  claims: Claim[] = [];
  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(private restaurantService: RestaurantService, private datePipe: DatePipe,
    private modalService: BsModalService, private reservationService: ReservationService,
    private toastr: ToastrService,
    private loginService: LoginService) {
    // this.restaurants = AppSampleData.restaurants;
    // this.restaurantBranches = AppSampleData.restaurantBranches;
    // this.filteredRestaurants = AppSampleData.restaurants;
  }

  ngOnInit(): void {
    this.loginService.claims$.subscribe((c) => {
      this.claims = c;      
    });
    this.getRestaurants();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  getRestaurants() {
    this.restaurantService.GetRestaurants().subscribe(s => {
      this.restaurants = s;
      this.filteredRestaurants = s;
      this.selectRestaurant = s[0];
      this.selectedRestaurantId = this.selectRestaurant.id;
      this.getRestaurantBranches();
    });
  }

  getRestaurantBranches() {
    this.restaurantService.GetRestaurantBranches(this.selectedRestaurantId).subscribe(s => {
      this.restaurantBranches = s;
      this.filterBranches(this.selectedRestaurantId);
    });
  }

  onBranchSelected(id: number) {
    this.bookingTables = [];
    this.getDiningTables();
  }

  getDiningTables() {
    this.restaurantService.GetDiningTablesByBranch(this.selectedBranchId).subscribe(s => {
      this.branchDiningTables = s;
      this.getDistinctReservationDays();
    });
  }

  onUserBookinginfoComplete(table: ReserveTable) {
    this.modalRef?.hide();
    this.toastr.info('We have sent your request','Initiated')
    this.reservationService.CreateReservation(table).subscribe(data => {
      this.toastr.success('Your reservation has been confirmed!','Success')
      this.reservationSuccess = true;
      this.reset();
    })
  };

  reset() {
    this.selectedRestaurantId = -1;
    this.selectedBranchId = -1;
    this.bookingTables=[];
    this.distinctReservationDays=[];
    this.selectRestaurant = undefined;
  }

  bookTable(table: DiningTable): void {
    // Implement the functionality for booking the selected table
    // You can handle the logic for booking here, such as showing a confirmation message or performing an API call.
    // For this example, we'll just log the selected table to the console.
    console.log('Selected Table:', table);
    this.selectedTable = table;
  }

  reservationDayClicked(day: string) {
    // Parse the input date string into a Date object
    const parsedDate = new Date(day);

    // Filter records by comparing the date values
    this.bookingTables = this.branchDiningTables.filter((f) => {
      const reservationDate = new Date(f.reservationDay);
      return (
        reservationDate.getFullYear() === parsedDate.getFullYear() &&
        reservationDate.getMonth() === parsedDate.getMonth() &&
        reservationDate.getDate() === parsedDate.getDate()
      );
    });
  }

  formatDate(inputDate: string): string {
    const datePipe = new DatePipe('en-US');

    // Parse the input date string into a Date object
    const parsedDate = new Date(inputDate);

    // Use DatePipe to format the date
    const formattedDate = datePipe.transform(parsedDate, 'MMMM d, y');

    // Convert day number to string with 'st', 'nd', 'rd', or 'th'
    const dayNumber = parsedDate.getDate();
    let daySuffix = '';
    if (dayNumber === 1 || dayNumber === 21 || dayNumber === 31) {
      daySuffix = 'st';
    } else if (dayNumber === 2 || dayNumber === 22) {
      daySuffix = 'nd';
    } else if (dayNumber === 3 || dayNumber === 23) {
      daySuffix = 'rd';
    }

    // Concatenate the formatted date with the day suffix
    return formattedDate ? formattedDate + daySuffix : '';
  }

  getDistinctReservationDays(): void {
    const uniqueReservationDays: string[] = [];

    this.branchDiningTables.forEach((reservation) => {
      const formattedDate = this.datePipe.transform(reservation.reservationDay, 'MM-dd-yyyy');
      if (formattedDate && !uniqueReservationDays.includes(formattedDate)) {
        uniqueReservationDays.push(formattedDate);
      }
    });

    this.distinctReservationDays = uniqueReservationDays;
  }

  // Function to filter branches based on the selected restaurant
  filterBranches(id: number): void {
    this.reservationSuccess = false;
    this.selectRestaurant = this.restaurants.find(f => f.id == id);
    this.filteredBranches = this.restaurantBranches.filter(
      (branch) => +branch.restaurantId === +id
    );
  }

  // Function to filter restaurants based on the search term
  filterRestaurants(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredRestaurants = this.restaurants; // If search term is empty, show all restaurants
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredRestaurants = this.restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTermLower) || // Filter by restaurant name
        restaurant.address.toLowerCase().includes(searchTermLower) // Filter by restaurant address
    );
  }

  checkInReservation(table: DiningTable){
    this.toastr.info('We have sent your check in request','Initiated')
    this.reservationService.UpdateReservation(table).subscribe(data => {
      this.toastr.success('You have checked in and now it is time enjoy your meal!','Success')
      this.reservationSuccess = true;
      this.reset();
    })
  }
}
