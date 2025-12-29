import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { retry } from 'rxjs';

@Component({
  selector: 'app-gestion-empresa-desarrolladora',
  imports: [Header, HttpClientModule, RouterLink],
  templateUrl: './gestion-empresa-desarrolladora.html',
  styleUrl: './gestion-empresa-desarrolladora.css',
})
export class GestionEmpresaDesarrolladora implements OnInit {
  listaJuegos: any[] = [];

  constructor(private http: HttpClient) { }

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

  confirmarDesactivarComentariosJuego(id: any) {
    const ok = confirm('¿Seguro que deseas activar los comentaios del juego?');
    if (!ok) return;

    this.desactivarComentariosJuego(id);
  }

  desactivarComentariosJuego(id: any) {
    const urlDesactivar = `http://localhost:8080/prueba/DesactivarComentariosJuego?id=${id}`;

    this.http.get(urlDesactivar).subscribe({
      next: (res: any) => {
        alert(res.mensaje);
        console.log(res.exito);
        this.obtenerJuegos();
      },
      error: (err) => {
        alert(err?.error?.mensaje ?? 'Error interno en el servidor.');
      }
    });
  }

  confirmarDesactivarComentariosEmpresa() {
    const ok = confirm('¿Seguro que deseas activar los comentaios del juegos de la empresa?');
    if (!ok) return;

    this.desactivarComentariosEmpresa();
  }

  desactivarComentariosEmpresa() {
    const urlDesactivar = `http://localhost:8080/prueba/DesactivarComentariosEmpresa`;

    this.http.get(urlDesactivar).subscribe({
      next: (res: any) => {
        alert(res.mensaje);
        console.log(res.exito);
        this.obtenerJuegos();
      },
      error: (err) => {
        alert(err?.error?.mensaje ?? 'Error interno en el servidor.');
      }
    });
  }

}
