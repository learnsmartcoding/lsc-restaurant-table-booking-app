import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class SuperAdminAuthGuard implements CanActivate {
    constructor( private loginService: LoginService, private toastr: ToastrService,
        private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        return this.loginService.claims$.pipe(
            take(1), // Take only the first emitted value, as it won't change
            map((claims) => {
                const isAdminClaim = claims.find(claim => claim.claim === 'extension_EmployeeRole');

                if (isAdminClaim && isAdminClaim.value === 'SuperAdmin') {
                    return true; // User has the "Admin" role
                } else {
                    this.toastr.info("You do not have a Super Admin role to access this page","Access Denied")
                    // Redirect to the /home route
                    this.router.navigate(['/home']);
                    // Redirect to a forbidden page or handle it as needed
                    return false;
                }
            })
        );
    }
}
