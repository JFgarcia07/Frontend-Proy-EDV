import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-biblioteca',
  imports: [Header, HttpClientModule, RouterLink],
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.css',
})
export class Biblioteca {
  listaJuegos: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.obtenerJuegos();
  }

  obtenerJuegos(){
    const urlBackend = 'http://localhost:8080/prueba/ListarBiblioteca';

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

  confirmarInstalacion(idJuego:any){
    const ok = confirm('¿Confirmas la instalacion del Juego?');
    if (!ok) return;

    this.instalarJuego(idJuego);
  }

  instalarJuego(idJuego: any){
    const urlInstalar = `http://localhost:8080/prueba/InstalarJuegoBiblioteca?id=${idJuego}`;

    this.http.get(urlInstalar).subscribe({
      next: (next) => {
        alert('Juego instalado correctamente.');
        this.obtenerJuegos();
      },
      error: (err) => {
        console.error(err);
        alert('No se pudo instalar el juego.');
      },
    });
  }
}
