import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot} from '@angular/router';
import { AuthenticationService } from '../services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authenticationService.isLoggedIn(url)) {
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}