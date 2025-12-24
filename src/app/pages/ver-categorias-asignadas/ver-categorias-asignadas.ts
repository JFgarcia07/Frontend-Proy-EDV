import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-categorias-asignadas',
  imports: [Header, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './ver-categorias-asignadas.html',
  styleUrl: './ver-categorias-asignadas.css',
})
export class VerCategoriasAsignadas {
  listaCategoriasAprobadas: any[] = [];
 
  constructor(private http: HttpClient, private route: ActivatedRoute){}

  ngOnInit(){
     const idJuegoUrl = this.route.snapshot.paramMap.get('idJuego');

    this.cargarCategoriasAprobadas(idJuegoUrl);
  }

  cargarCategoriasAprobadas(idJuego: any){
    const urlBackend = `http://localhost:8080/prueba/CategoriasAprobadas?id=${idJuego}`;

    this.http.get<any[]>(urlBackend).subscribe({
      next: (data) => {
        this.listaCategoriasAprobadas = data;
      },
      error: () => {
        console.log("Error al obtener los usuarios de la empresa")
      }
    });
  }

}
