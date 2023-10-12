import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DiningTable, ReserveTable, Restaurant, RestaurantBranch , ReservationDetailsModel} from '../models/restaurants.model';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class ReservationService {
    private apiUrl: string;
    constructor(private http: HttpClient, private datePipe: DatePipe) {
        this.apiUrl = environment.apiUrl;
    }

      GetReservationDetails(): Observable<ReservationDetailsModel[]> {
        const url = `${this.apiUrl}/${environment.apiEndpoints.getReservationDetails}`;
        return this.getArrary<ReservationDetailsModel>(url);
      }

    CreateReservation(model: ReserveTable): Observable<any> {
        const url = `${this.apiUrl}/${environment.apiEndpoints.saveReservation}`;
        return this.http.post(url, model);
    }

    UpdateReservation(model: DiningTable): Observable<any> {
        const url = `${this.apiUrl}/${environment.apiEndpoints.updateReservation}`;
        return this.http.post(url, model);
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
