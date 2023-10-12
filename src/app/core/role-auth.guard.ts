import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginService } from '../service/login.service';


@Injectable({
    providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {
    constructor( private loginService: LoginService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.loginService.claims$.pipe(
            take(1), // Take only the first emitted value, as it won't change
            map((claims) => {
                const isAdminClaim = claims.find(claim => claim.claim === 'extension_EmployeeRole');
                
                if (isAdminClaim && (isAdminClaim.value === 'Admin' || isAdminClaim.value === 'SuperAdmin')) {
                    return true; // User has the "Admin" role
                } else {
                    // Redirect to a forbidden page or handle it as needed
                    return false;
                }
            })
        );
    }
}
