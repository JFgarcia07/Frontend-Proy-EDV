import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-biblioteca',
  imports: [Header, HttpClientModule, RouterLink],
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.css',
})
export class Biblioteca {
  listaJuegos: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.obtenerJuegos();
  }

  obtenerJuegos() {
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

  confirmarInstalacion(idJuego: any) {
    const ok = confirm('¿Confirmas la instalacion del Juego?');
    if (!ok) return;

    this.instalarJuego(idJuego);
  }

  instalarJuego(idJuego: any) {
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


  validarComentar(idJuego: any) {
    const urlVerificar = `http://localhost:8080/prueba/SePuedeComentar?id=${idJuego}`;

    this.http.get<any>(urlVerificar).subscribe({
      next: (res) => {
        if (res.exito) {
          this.router.navigate(['/calificacion-comentario', idJuego]); 
        } else {
          alert(res.mensaje || 'No se puede comentar este juego.');
        }
      },
      error: (err) => {
        console.error(err);
        alert(err?.error?.mensaje || 'Error al verificar comentarios.');
      },
    });

  }
}
