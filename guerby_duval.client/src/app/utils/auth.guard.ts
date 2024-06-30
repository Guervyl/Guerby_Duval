import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/login.service";
import { map, pipe, take, tap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.loginService.identification.pipe(take(1), map(l => !!l), map(isLogin => {
      if (!isLogin) {
        const id = this.loginService.autoLogin();

        return id !== null;
      }

      return isLogin;
    }), tap(isLogin => {
      if (!isLogin) {
        this.router.navigate(['/login']).then();
      }
    }))
  }
}
