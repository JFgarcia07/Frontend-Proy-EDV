import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterLink}  from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tienda',
  imports: [Header, RouterLink],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css',
})
export class Tienda {
  listaJuegos: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.obtnerJuegos();
  }

  obtnerJuegos(){
    const urlBackend = 'http://localhost:8080/prueba/ListarJuegos';

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
