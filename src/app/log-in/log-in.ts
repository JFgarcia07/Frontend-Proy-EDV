import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogInService } from '../services/log-in-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})

export class LogIn {
  email = '';
  password = '';

  constructor(
    private  logInService: LogInService,
    private router: Router
  ) {}

  iniciarSesion() {
    this.logInService.Auth(this.email, this.password).subscribe({
      next: (respuesta: any) => {
        console.log(this.email)
        console.log(this.password)
        console.log('logIn ok: ', respuesta)

        if(respuesta.succes === true){

          localStorage.setItem('idGlobal', respuesta.idUsuario);
          localStorage.setItem('idRol', respuesta.idRol);
          localStorage.setItem('idEmpresa', respuesta.idEmpresa);

          console.log(localStorage.getItem('idEmpresa'))
          this.router.navigate(['/inicio']);
        } else {
          alert("Usuario o contraseña incorrectas");
        }
        
      },
      error: (err) => {
        console.log('Error: ', err)
        alert("Ha ocurrido un error al conectar al servidor");
      }
    })
  }
}
