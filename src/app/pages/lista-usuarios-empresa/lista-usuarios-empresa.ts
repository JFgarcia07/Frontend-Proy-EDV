import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-lista-usuarios-empresa',
  imports: [Header, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './lista-usuarios-empresa.html',
  styleUrl: './lista-usuarios-empresa.css',
})
export class ListaUsuariosEmpresa {
  usuariosEmpresa: any[] = [];
  cargando: boolean = true;
  idEmpresa: string | null = null;
  
  constructor(private http: HttpClient){}

  ngOnInit(){
    this.idEmpresa = localStorage.getItem("idEmpresa");
    
    this.cargarUsuariosEmpresa();
  }

  cargarUsuariosEmpresa(){

    const urlBackend = 'http://localhost:8080/prueba/ListarUsuarioEmpresa';

    this.http.get<any[]>(urlBackend).subscribe({
      next: (data) => {
        this.usuariosEmpresa = data;
        this.cargando = false;
      },
      error: () => {
        console.log("Error al obtener los usuarios de la empresa")
        this.cargando = false;
      }
    });
  }
}
