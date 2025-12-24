import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Header } from '../../components/header/header';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proceso-compra',
  imports: [Header, RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './proceso-compra.html',
  styleUrl: './proceso-compra.css',
})
export class ProcesoCompra {
  juego: any;
  comprado = false;
  exito: boolean | null = null;
  fechaCompra: string = ''

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idJuego');

    this.cargarInfoJuego(id);
  }

  cargarInfoJuego(id: any) {
    const urlBackend = `http://localhost:8080/prueba/TransaccionVenta?id=${id}`;

    this.http.get<any>(urlBackend).subscribe({
      next: (res) => {
        console.log('Datos del juego: ', res);
        this.juego = res.juego;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  comprar() {
    const idJuegoUrl = this.route.snapshot.paramMap.get('idJuego');
    const urlBackend = `http://localhost:8080/prueba/TransaccionVenta`;

    const ok = confirm('¿Confirmas la compra de este videojuego?');
    if (!ok) return;

    if (!this.fechaCompra) {
      alert('Debes seleccionar la fecha de compra.');
      return;
    }

    this.comprado = true;
    this.exito = null;

    const datosParaEnviar = {
      idJuego: idJuegoUrl,
      idEmpresa: this.juego.idEmpresa,
      fechaCompra: this.fechaCompra,
      precio: this.juego.precio
    };


    this.http.post<any>(urlBackend, datosParaEnviar).subscribe({
      next: (res) => {
        if (res.exito) {
          this.juego = res.juego;
          this.router.navigate(['/tienda']);
        } 
      },
      error: (err) => {
        alert(err?.error?.mensaje ?? 'Error de conexión con el servidor.');
        console.error(err);
        this.router.navigate(['/tienda']);
      },
    });
  }
}
