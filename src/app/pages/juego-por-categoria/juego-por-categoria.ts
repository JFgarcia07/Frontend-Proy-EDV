import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-juego-por-categoria',
  imports: [Header, CommonModule, FormsModule, RouterLink],
  templateUrl: './juego-por-categoria.html',
  styleUrl: './juego-por-categoria.css',
})
export class JuegoPorCategoria {
  categorias: any[] = [];
  juegos: any[] = [];
  idCategoriaSeleccionada: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    const url = 'http://localhost:8080/prueba/ListarCategorias'; 
    this.http.get<any[]>(url).subscribe({
      next: (res) => this.categorias = res ?? [],
      error: () => console.log('Error al cargar categorías'),
    });
  }

  onCategoriaChange() {
    const url = `http://localhost:8080/prueba/ListarJuegoCategoria?id=${this.idCategoriaSeleccionada}`;
    this.http.get<any[]>(url).subscribe({
      next: (res) => this.juegos = res ?? [],
      error: () => console.log('Error al cargar juegos por categoría'),
    });
  }
}
