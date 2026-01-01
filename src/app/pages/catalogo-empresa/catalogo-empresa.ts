import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogo-empresa',
  imports: [Header, HttpClientModule, RouterLink],
  templateUrl: './catalogo-empresa.html',
  styleUrl: './catalogo-empresa.css',
})
export class CatalogoEmpresa {

  listaJuegos: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idEmpresa = this.route.snapshot.paramMap.get('idEmpresa');

    this.obtenerJuegos(idEmpresa);
  }

  obtenerJuegos(idEmpresa: any) {
    const urlBackend = `http://localhost:8080/prueba/ListarJuegosEmpresaServlet?idEmpresa=${idEmpresa}`;

    this.http.get<any[]>(urlBackend).subscribe({
      next: (datos) => {
        console.log('Juegos cargados:', datos);
        this.listaJuegos = datos ?? [];
      },
      error: (error) => {
        console.error('Error al cargar juegos:', error);
      }
    });
  }


}
