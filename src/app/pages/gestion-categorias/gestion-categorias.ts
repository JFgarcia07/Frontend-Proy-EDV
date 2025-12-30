import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-gestion-categorias',
  imports: [Header, RouterLink],
  templateUrl: './gestion-categorias.html',
  styleUrl: './gestion-categorias.css',
})
export class GestionCategorias {
  categorias: any[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.cargarCategorias();
  }

  cargarCategorias(){

    const urlBackend = 'http://localhost:8080/prueba/ListarCategorias'

    this.http.get<any[]>(urlBackend).subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.log("Error al obtener las categorias");
      }
    })
  }

  confirmarEliminar(idCategoria: string): void {
    const ok = confirm('¿Seguro que deseas eliminar esta categoría? Esta acción no se puede deshacer.');
    if (!ok) return;

    this.eliminarCategoria(idCategoria);
  }

  eliminarCategoria(idCategoria: string): void {
    const urlEliminar = `http://localhost:8080/prueba/EliminarCategoria?id=${idCategoria}`;

    this.http.get(urlEliminar).subscribe({
      next: (next) => {
        alert('Categoría eliminada correctamente.');
        this.cargarCategorias(); 
      },
      error: (err) => {
        console.error(err);
        alert('No se pudo eliminar la categoría.');
      },
    });
  }
  


}
