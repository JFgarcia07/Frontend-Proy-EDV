import { Component, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [Header, HttpClientModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  idUsuario: String = '';
  datosUsuario: any = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const idGuardado = localStorage.getItem('idGlobal');

    if (idGuardado) {
      this.idUsuario = idGuardado;

      this.cargarDatosPerfil(this.idUsuario);
    } 
  }

  cargarDatosPerfil(id: String) {
    const urlBackend = `http://localhost:8080/prueba/PerfilSevlet?id=${id}`;

    this.http.get(urlBackend).subscribe({
      next: (datos: any) => {
        console.log("Lo que llegó del servidor:", datos); 

        if (datos && datos.found) {
          this.datosUsuario = datos;
        }
       
        else if (datos && !datos.found) {
          console.error("Error del backend:", datos.message);
        }
        
        else {
          console.error("¡EL SERVIDOR RESPONDIÓ NULL! (Respuesta vacía)");
        }
      },
      error: (err) => console.error("Error al cargar el perfil", err)
    });
  }
}
