import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-propuestas-categorias',
  imports: [Header, CommonModule],
  templateUrl: './propuestas-categorias.html',
  styleUrl: './propuestas-categorias.css',
})
export class PropuestasCategorias {
  propuestas: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cargarPropuestas();
  }

  cargarPropuestas() {
    const urlBackend = 'http://localhost:8080/prueba/ListarPropuestasCategoria';

    this.http.get<any[]>(urlBackend).subscribe({
      next: (data) => {
        this.propuestas = data;
      },
      error: (err) => {
        console.log("EROR AL CARGAR LAS PROPUESTA");
      }
    });
  }

  confirmarAceptacion(idJuego: string, idCategoria: string): void {
    const ok = confirm('¿Seguro que deseas aceptar esta categoría para este juego?');
    if (!ok) return;
    this.aceptarPropuesta(idJuego, idCategoria);
  }

  confirmarRechazo(idJuego: string, idCategoria: string): void {
    const ok = confirm('¿Seguro que deseas rechazar esta categoría para este juego?');
    if (!ok) return;
    this.rechazarPropuesta(idJuego, idCategoria);
  }

  aceptarPropuesta(idJuego: string, idCategoria: string) {
    const urlAceptar = `http://localhost:8080/prueba/AceptarPropuesta?idJuego=${idJuego}&idCategoria=${idCategoria}`;

    this.http.get(urlAceptar).subscribe({
      next: (res) => {
        console.log('Respueta ' , res);
        alert('Se ha aceptado la peticion de categoria para el juego');
        this.cargarPropuestas();
      },
      error: (err) => {
        console.log(err);
        alert('No se pudo aceptar la propuesta de la categoría.');
      }
    });
  }

  rechazarPropuesta(idJuego: string, idCategoria: string){
    const urlRechazar = `http://localhost:8080/prueba/RechazarPropuesta?idJuego=${idJuego}&idCategoria=${idCategoria}`;

    this.http.get(urlRechazar).subscribe({
      next: (next) => {
        alert('Se ha rechazado la peticion de categoria para el juego');
        this.cargarPropuestas();
      },
      error: (err) => {
        console.log(err);
        alert('No se pudo rechazar la propuesta de la categoría.');
      }
    });
  }
}
