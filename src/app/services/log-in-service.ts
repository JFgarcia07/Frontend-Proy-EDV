import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class LogInService {
  private apiUrl = 'http://localhost:8080/prueba/LogInServlet';

  constructor(private http: HttpClient) {}
 
  Auth(email: string, password: string) {
    return this.http.post(this.apiUrl, {
      email: email,
      password: password
    });
  } 

}
