import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventMessage, AuthenticationResult, InteractionStatus, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { createClaimsTable } from '../claim-utils';
import { Claim } from '../models/restaurants.model';


@Injectable({ providedIn: 'root' })
export class LoginService {
    // Use BehaviorSubject to provide an observable for claims availability
    private claimsSubject = new BehaviorSubject<Claim[]>([]);
    claims$ = this.claimsSubject.asObservable();

    loginDisplay = false;
    displayedColumns: string[] = ['claim', 'value', 'description'];

    constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService) {
        this.getClaims(undefined);
        this.msalBroadcastService.msalSubject$
        .pipe(
            filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        )
        .subscribe((result: EventMessage) => {
            const payload = result.payload as AuthenticationResult;
            this.authService.instance.setActiveAccount(payload.account);
        });

    this.msalBroadcastService.inProgress$
        .pipe(
            filter((status: InteractionStatus) => status === InteractionStatus.None)
        )
        .subscribe(() => {
            this.setLoginDisplay();
            const claims = this.authService.instance.getActiveAccount()?.idTokenClaims;
            this.getClaims(claims);
        });
     }

   
    setLoginDisplay() {
        this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    }

    getClaims(claims: any) {
        
        if (claims) {
            const claimsTable = createClaimsTable(claims);
            this.claimsSubject.next([...claimsTable]);
        } else {
            this.claimsSubject.next([]); // No claims available
        }
    }
}
