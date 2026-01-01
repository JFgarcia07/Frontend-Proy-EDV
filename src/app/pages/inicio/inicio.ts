import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  imports: [Header, HttpClientModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  banners: string[] = [];
  listaJuegos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarBanner();
    this.obtnerJuegos();
  }

  cargarBanner() {
    const url = 'http://localhost:8080/prueba/ListarImagenesBanner';

    this.http.get<any[]>(url).subscribe({
      next: (res) => {
        console.log('BANNER RES:', res);
        this.banners = (res ?? []).map(x => x.imagen);
      },
      error: (err) => console.log('Error al cargar banner', err)
    });
  }

  obtnerJuegos(){
    const urlBackend = 'http://localhost:8080/prueba/ListarJuegosRecomendados';

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
