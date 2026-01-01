import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterLink}  from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-juegos-recientes',
  imports: [Header, RouterLink],
  templateUrl: './juegos-recientes.html',
  styleUrl: './juegos-recientes.css',
})
export class JuegosRecientes {
  listaJuegos: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.obtnerJuegos();
  }

  obtnerJuegos(){
    const urlBackend = 'http://localhost:8080/prueba/ListarJuegoRecientes';

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
