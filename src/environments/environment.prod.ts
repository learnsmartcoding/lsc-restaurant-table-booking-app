import { EnvironmentConfiguration } from "../app/models/environment-configuration";


const serverUrl='https://lsc-table-booking-app-api.azurewebsites.net/api';


// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'prod',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    getRestaurants:'Restaurant/restaurants',
    getRestaurantBranches:'Restaurant/branches',
    getDiningTables:'Restaurant/diningtables',
    updateReservation:'Reservation/CheckIn',
    saveReservation:'Restaurant',
    getReservationDetails:'Reservation/getreservations'
  },
  adb2cConfig: {
    clientId: '5c0e7370-f833-4cb1-a9c1-ad683586adac',
    readScopeUrl: 'https://learnsmartcoding.onmicrosoft.com/restaurant/prod/api/Booking.Read',
    writeScopeUrl: 'https://learnsmartcoding.onmicrosoft.com/restaurant/prod/api/Booking.Write',
    apiEndpointUrl: 'https://lsc-table-booking-app-api.azurewebsites.net/api/Reservation'
  },
  cacheTimeInMinutes: 30,
};