import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hasError = '';
  isLoading = false;

  constructor(private apiService: ApiServiceService, private router: Router) {

  }

  login() {
    this.hasError = "";

    if (this.email.trim() !== '' || this.password.trim() !== '') {
      this.isLoading = true;

      this.apiService.login(this.email, this.password)
        .subscribe(
          response => {
            this.router.navigate(['/']).then();
            this.isLoading = false;
          },
          error => {
            if (error.status === 401) {
              this.hasError = "Credenciales invalidas.";
            } else {
              this.hasError = "Hubo un error.";
            }
            
            this.isLoading = false;
          }
        );
    }
  }
}
