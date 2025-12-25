import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegistroUsuarioEmpresa } from '../registro-usuario-empresa/registro-usuario-empresa';

@Component({
  selector: 'app-gestion-empresas',
  imports: [Header, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './gestion-empresas.html',
  styleUrl: './gestion-empresas.css',
})
export class GestionEmpresas {
  empresas: any[] = [];
  cargando: boolean = true;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(){ 

    const urlBackend = 'http://localhost:8080/prueba/ListarEmpresas';
    
    this.http.get<any[]>(urlBackend).subscribe({
      next: (data) => {
        this.empresas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.log("Error al obtener las empresas");
        this.cargando = false;
      }
    });
  }


  confirmarEliminacion(idEmpresa: any){
    const ok = confirm('¿Seguro que deseas eliminar la empresa?');
    if (!ok) return;
    
    this.eliminarEmpresa(idEmpresa);
  }

  eliminarEmpresa(idEmpresa: any){
    const urlEliminar = `http://localhost:8080/prueba/?id=${idEmpresa}`;

    this.http.get(urlEliminar).subscribe({
      next: (res) => {
        alert('Se ha eliminado la empresa');
      },
      error: (err) => {
        console.log(err);
        alert('No se pudo eliminar la empresa.');
      }
    });
  }

}
