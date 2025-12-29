import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calificacion-comentarios',
  imports: [Header, CommonModule, FormsModule],
  templateUrl: './calificacion-comentarios.html',
  styleUrl: './calificacion-comentarios.css',
})
export class CalificacionComentarios {
  juego: any;

  calificacion = 0;
  comentario = '';
  respuesta = '';
  respondiendoA: number | null = null;

  comentarios: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const idJuego = this.route.snapshot.paramMap.get('idJuego');
    if (!idJuego) {
      alert('No se encontró el id del juego en la URL');
      return;
    }
    this.cargarInfoJuego(idJuego);
    this.cargarComentarios(idJuego);
  }

  cargarInfoJuego(id: any) {
    const urlBackend = `http://localhost:8080/prueba/InfoJuegoPorID?id=${id}`;

    this.http.get<any>(urlBackend).subscribe({
      next: (res) => {
        this.juego = res.juego;
      },
      error: (err) => {
        console.log("Error al listar la info del juego", err);
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

  enviarComentario() {
    const idJuegoUrl = this.route.snapshot.paramMap.get('idJuego');

    const text = (this.comentario ?? '').trim();

    if (this.calificacion < 1 || this.calificacion > 5) {
      alert('Seleccione una calificacion');
      return;
    }

    if (text.length === 0) {
      alert('Escriba un comentario');
      return;
    }

    const payload = {
      idJuego: idJuegoUrl,
      calificacion: this.calificacion,
      comentario: text,
      comentarioPadre: 0,
    };

    const urlBackend = 'http://localhost:8080/prueba/CalificacionComentarioServlet';

    this.http.post<any>(urlBackend, payload).subscribe({
      next: (res) => {
        if (res?.exito) {
          this.calificacion = 0;
          this.comentario = '';
          this.cargarComentarios(this.juego.idJuego);
        }
      },
      error: (err) => {
        alert(err?.error?.mensaje ?? 'Error al enviar la reseña.');
      }
    });
  }

  iniciarRespuesta(idComentarioPadre: number) {
    this.respondiendoA = idComentarioPadre;
    this.respuesta = '';
  }

  cancelarRespuesta() {
    this.respondiendoA = null;
    this.respuesta = '';
  }

  enviarRespuesta() {
    const idJuegoUrl = this.route.snapshot.paramMap.get('idJuego');
    if (!this.juego || this.respondiendoA === null) return;

    const texto = (this.respuesta ?? '').trim();
    if (texto.length === 0) {
      alert('Escribe tu respuesta.');
      return;
    }

    const payload = {
      idJuego: idJuegoUrl,
      comentario: texto,
      comentarioPadre: this.respondiendoA
    };

    const urlBackend = 'http://localhost:8080/prueba/CalificacionComentarioServlet';

    this.http.post<any>(urlBackend, payload).subscribe({
      next: (res) => {
        alert(res?.mensaje ?? 'Respuesta enviada.');
        if (res?.exito) {
          this.cancelarRespuesta();
          this.cargarComentarios(this.juego.idJuego);
        }
      },
      error: (err) => {
        alert(err?.error?.mensaje ?? 'Error al enviar la respuesta.');
      },
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
