import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { LoginInterface } from '../models/login';
import { LoginService } from './login.service';
import { TareaInterface } from '../models/tarea';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = environment.apiLink;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  login(email: string, password: string): Observable<LoginInterface> {
    const body = {
      email: email,
      password: password
    };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(map(l => l as LoginInterface), tap((l) => {
      this.loginService.setIdentification(l);
    }));
  }

  fetchTareas(): Observable<TareaInterface[]> {
    return this.http.get(`${this.apiUrl}/tareas`).pipe(map(t => t as TareaInterface[]));
  }

  deleteTarea(tarea: TareaInterface): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tareas/${tarea.id}`);
  }

  createTarea(tarea: TareaInterface): Observable<TareaInterface> {
    return this.http.post(`${this.apiUrl}/tareas`, tarea).pipe(map(t => t as TareaInterface));
  }

  editTarea(tarea: TareaInterface): Observable<any> {
    return this.http.put(`${this.apiUrl}/tareas/${tarea.id}`, tarea);
  }
}
