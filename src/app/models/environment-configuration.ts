export interface EnvironmentConfiguration {
    env_name: string;
    production: boolean;
    apiUrl: string;    
    apiEndpoints: {        
        getRestaurants:string;
        getRestaurantBranches:string;
        getDiningTables:string;
        saveReservation:string;
        updateReservation:string;
    },
    cacheTimeInMinutes: number;
}