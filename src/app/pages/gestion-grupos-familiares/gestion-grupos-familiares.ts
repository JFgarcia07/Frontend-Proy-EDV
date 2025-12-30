import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-grupos-familiares',
  imports: [Header, HttpClientModule, RouterLink],
  templateUrl: './gestion-grupos-familiares.html',
  styleUrl: './gestion-grupos-familiares.css',
})
export class GestionGruposFamiliares {
grupos: any[] = [];
  
  constructor(private http: HttpClient){}

  ngOnInit(){
    this.obtenerGrupos();
  }

  obtenerGrupos(){
    const urlBackend = 'http://localhost:8080/prueba/ListarGrupos';

    this.http.get<any[]>(urlBackend).subscribe({
      next: (res) => {
        console.log('Grupos cargados', res);
        this.grupos = res ?? [];
      },
      error: (err) => {
        console.log('Error al cargar los grupos', err);
      }
    });
  }
}
