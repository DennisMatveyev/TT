import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";

@Injectable()
export class HomeGuard implements CanActivate {

  constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
      if (localStorage.getItem('token')) {
        return true
      } else {
        this.router.navigate(['/']);
        return false
      }
    }
}
