import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-empresas',
  imports: [Header, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './lista-empresas.html',
  styleUrl: './lista-empresas.css',
})
export class ListaEmpresas {
  empresas: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(){ 

    const urlBackend = 'http://localhost:8080/prueba/ListarEmpresas';
    
    this.http.get<any[]>(urlBackend).subscribe({
      next: (data) => {
        this.empresas = data;
      },
      error: (err) => {
        console.log("Error al obtener las empresas");
      }
    });
  }

}
