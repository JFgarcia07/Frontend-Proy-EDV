import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billetera',
  imports: [Header, FormsModule],
  templateUrl: './billetera.html',
  styleUrl: './billetera.css',
})
export class Billetera {
  idUsuario = '';
  montoIngresado = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(){
    this.idUsuario = localStorage.getItem('idGlobal') || '';
  }

  hacerRecarga() {
    if (this.montoIngresado <= 0) {
      alert("Por favor ingrese un valor mayor a cero");
      return;
    }

    const urlBackend = 'http://localhost:8080/prueba/BilleteraServlet';

    const body = new HttpParams()
      .set('id', this.idUsuario)
      .set('monto', this.montoIngresado)

    this.http.post(urlBackend, body, {responseType: 'text'}).subscribe({
      next: (respuesta) => {
        console.log('Respuesta del server: ', respuesta);
        alert('Recarga Exitosa');
        this.montoIngresado = 0;
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        console.error('Error', err);
        alert('Hubo un error al recargar la billetera');
      }
    })
  }
  
}
