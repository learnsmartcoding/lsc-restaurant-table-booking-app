export interface Restaurant{
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    imageUrl?: string;
  }

  export interface RestaurantBranch {
    id: number;
    restaurantId: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    imageUrl: string;
  }

  export interface DiningTable{
    branchId: number;
    reservationDay: Date;
    tableName: string;
    capacity: number;
    mealType: string;
    tableStatus: string;
    timeSlotId: number;
    userEmailId:string;
  }

  export interface CheckInDiningTable{
    branchId: number;
    reservationDay: Date;        
    tableStatus: string;
    timeSlotId: number;    
    userEmailId: string;
  }

  export interface ReserveTable{
    userId?:string;
    firstName:string;
    lastName: string;
    emailId:string;
    phoneNumber:string;
    timeSlotId:number;
    reservationDate:Date;
    reservationStatus:string;
  }

  export interface Claim{
    claim:string;
    value:string;
    description:string;
  }
  // reservation-details.model.ts
export interface ReservationDetailsModel {
  name: string;
  restaurantBranchName: string;
  address: string;
  phone: string;
  tableName: string;
  capacity: number;
  reservationDate: Date;
  mealType: string;
  tableStatus: string;
  reservationStatus: string;
  firstName: string;
  lastName: string;
  email: string;
}
