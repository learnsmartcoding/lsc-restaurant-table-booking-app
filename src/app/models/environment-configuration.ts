export interface EnvironmentConfiguration {
    env_name: string;
    production: boolean;
    apiUrl: string;
    apiEndpoints: {
        getRestaurants: string;
        getRestaurantBranches: string;
        getDiningTables: string;
        saveReservation: string;
        updateReservation: string;
        getReservationDetails: string;
    },
    adb2cConfig: {
        clientId: string;
        readScopeUrl: string;
        writeScopeUrl: string;
        apiEndpointUrl: string;
    }
    cacheTimeInMinutes: number;
}