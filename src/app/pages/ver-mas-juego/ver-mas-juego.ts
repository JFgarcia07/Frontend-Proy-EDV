import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-mas-juego',
  imports: [Header, CommonModule],
  templateUrl: './ver-mas-juego.html',
  styleUrl: './ver-mas-juego.css',
})
export class VerMasJuego {
  juego: any;
  comentarios: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const idJuego = this.route.snapshot.paramMap.get('idJuego');
    this.cargarInfoJuego(idJuego);
    this.cargarComentarios(idJuego);
  }

  cargarInfoJuego(id: any) {
    const urlBackend = `http://localhost:8080/prueba/InfoJuegoPorID?id=${id}`;

    this.http.get<any>(urlBackend).subscribe({
      next: (res) => {
        console.log("RESPUETA BE: ", res)
        this.juego = res.juego;
      },
      error: (err) => {
        console.log("Error al listar la info del juego");
      }
    });
  }

  cargarComentarios(id: any) {
    const urlBackend = `http://localhost:8080/prueba/CalificacionComentarioServlet?id=${id}`;

    this.http.get<any>(urlBackend).subscribe({
      next: (res) => {
        const lista = res ?? [];
        this.comentarios = this.construirHilo(lista);
      },
      error: (err) => {
        console.log("Error al listar los comentarios", err);
      }
    });
  }

   private construirHilo(lista: any[]): any[] {
    for (const c of lista) {
      c.respuestas = [];
    }

    const map = new Map<number, any>();
    for (const c of lista) {
      map.set(c.idComentario, c);
    }

    const roots: any[] = [];

    for (const c of lista) {
      const padreId = c.comentarioPadre;

      if (!padreId || padreId === 0) {
        roots.push(c);
      } else {
        const padre = map.get(padreId);

        if (padre) {
          padre.respuestas.push(c);
        } else {
          roots.push(c);
        }
      }
    }

    return roots;
  }

}
