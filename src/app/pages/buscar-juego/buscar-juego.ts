import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buscar-juego',
  imports: [Header, CommonModule, RouterLink],
  templateUrl: './buscar-juego.html',
  styleUrl: './buscar-juego.css',
})
export class BuscarJuego {
  entrada = '';

  mensaje = '';
  juego: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.entrada = (params['entrada'] ?? '').trim();

      if (!this.entrada) {
        this.mensaje = 'No se recibió texto de búsqueda.';
        this.juego = null;
        return;
      }

      this.buscar(this.entrada);
    });
  }

  buscar(id: any) {
    this.mensaje = '';
    this.juego = null;

    const url = `http://localhost:8080/prueba/BuscarJuegoPorTitulo?entrada=${id}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        if (res.exito && res.juego) {
          this.juego = res.juego;
        } else {
          this.juego = null;
          this.mensaje = res.mensaje ?? 'No se encontró ningún juego.';
        }
      },
      error: (err) => {
        this.mensaje = err?.error?.mensaje ?? 'Error al buscar.';
      }
    });
  }
}
