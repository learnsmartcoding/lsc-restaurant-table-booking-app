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
    saveReservation:'Restaurant'
  },
  cacheTimeInMinutes: 30,
};