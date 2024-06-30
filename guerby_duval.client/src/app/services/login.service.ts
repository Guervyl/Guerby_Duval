import { Injectable } from '@angular/core';
import { LoginInterface } from '../models/login';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginSub: BehaviorSubject<LoginInterface | null>;

  identification: Observable<LoginInterface | null>;

  constructor() {
    this.loginSub = new BehaviorSubject<LoginInterface | null>(null);
    this.identification = this.loginSub.asObservable();
  }

  setIdentification(id: LoginInterface) {
    this.loginSub.next(id);

    localStorage.setItem('identification', JSON.stringify(id));
  }

  autoLogin() {
    const json = localStorage.getItem('identification');

    if (json !== null) {
      const id = JSON.parse(json) as LoginInterface;

      this.loginSub.next(id);
      return id;
    } else {
      this.loginSub.next(null);
      return null;
    }
  }

  deleteSession() {
    localStorage.removeItem('identification');
    this.loginSub.next(null);
  }
}
