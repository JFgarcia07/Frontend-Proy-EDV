import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-gestion-empresa-desarrolladora',
  imports: [Header, HttpClientModule, RouterLink],
  templateUrl: './gestion-empresa-desarrolladora.html',
  styleUrl: './gestion-empresa-desarrolladora.css',
})
export class GestionEmpresaDesarrolladora implements OnInit{
  listaJuegos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerJuegos();
  }

  obtenerJuegos() {
    const urlBackend = 'http://localhost:8080/prueba/ListarJuegosEmpresaServlet';

    this.http.get<any[]>(urlBackend).subscribe({
      next: (datos) => {
        console.log('Juegos cargados:', datos);
        this.listaJuegos = datos;
      },
      error: (error) => {
        console.error('Error al cargar juegos:', error);
      }
    });
  }

}
