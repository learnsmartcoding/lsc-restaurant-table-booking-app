import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DiningTable, ReserveTable, Restaurant, RestaurantBranch } from '../models/restaurants.model';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class RestaurantService {
    private apiUrl: string;
    constructor(private http: HttpClient, private datePipe: DatePipe) {
        this.apiUrl = environment.apiUrl;
    }

    //   GetRestaurants(id: number): Observable<Restaurant> {
    //     const url = 
    //     return this.get<Product>(url);
    //   }

    CreateReservation(model: ReserveTable): Observable<any> {
        const url = `${this.apiUrl}/${environment.apiEndpoints.saveReservation}`;
        return this.http.post(url, model);
    }

    
    GetRestaurants(): Observable<Restaurant[]> {
        const url = `${this.apiUrl}/${environment.apiEndpoints.getRestaurants}`;
        return this.getArrary<Restaurant>(url);
    }

    GetRestaurantBranches(restaurantId: number): Observable<RestaurantBranch[]> {
        const url = `${this.apiUrl}/${environment.apiEndpoints.getRestaurantBranches}/${restaurantId}`;
        return this.getArrary<RestaurantBranch>(url);
    }

    GetDiningTablesByBranch(branchId: number): Observable<DiningTable[]> {
        const url = `${this.apiUrl}/${environment.apiEndpoints.getDiningTables}/${branchId}`;
        return this.getArrary<DiningTable>(url);
    }
    GetDiningTablesByBranchAndDate(branchId: number, reservationDay: Date = new Date()): Observable<DiningTable[]> {
        const currentDate = this.getCurrentDate(reservationDay);
        const url = `${this.apiUrl}/${environment.apiEndpoints.getDiningTables}/${branchId}/${currentDate}`;
        return this.getArrary<DiningTable>(url);
    }

    getCurrentDate(reservationDay: Date): string {
        return this.datePipe.transform(reservationDay, 'MM-dd-yyyy') || '';
    }



    private get<T>(url: string, options?: any): Observable<T> {
        return this.http
            .get(url, options)
            .pipe(map((res) => this.extractData<T>(res))) as Observable<T>;
    }
    private getArrary<T>(url: string, options?: any): Observable<T[]> {
        return this.http
            .get(url, options)
            .pipe(map((res) => this.extractData<T[]>(res))) as Observable<T[]>;
    }

    private extractData<T>(res: any) {
        if (res && (res.status < 200 || res.status >= 300)) {
            throw new Error('Bad response status: ' + res.status);
        }
        return (res || {}) as T;
    }
}
