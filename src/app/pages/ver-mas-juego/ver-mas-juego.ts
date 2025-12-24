import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-mas-juego',
  imports: [Header, CommonModule, RouterLink],
  templateUrl: './ver-mas-juego.html',
  styleUrl: './ver-mas-juego.css',
})
export class VerMasJuego {
  juego: any;

  constructor(private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(){
    const idJuego = this.route.snapshot.paramMap.get('idJuego');
    this.cargarInfoJuego(idJuego);
  }

  cargarInfoJuego(id: any){
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

}
