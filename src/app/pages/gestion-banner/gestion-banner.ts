import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-banner',
  imports: [Header, CommonModule, FormsModule],
  templateUrl: './gestion-banner.html',
  styleUrl: './gestion-banner.css',
})
export class GestionBanner {
  idJuego = '';
  imagenes: string[] = [];
  ordenInicial = 1;

  constructor(private http: HttpClient, private router: Router) { }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    this.imagenes = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => this.imagenes.push(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  guardarBanner() {
    if (this.imagenes.length === 0) {
      alert('Selecciona al menos una imagen.');
      return;
    }

    if (this.ordenInicial === null || this.ordenInicial === undefined || this.ordenInicial <= 0) {
      alert('Ingresa un orden inicial válido (mayor a 0).');
      return;
    }

    const url = 'http://localhost:8080/prueba/BannerServlet';

    this.imagenes.forEach((img, idx) => {
      const payload = {
        imagen: img,
        orden: this.ordenInicial + idx
      };

      this.http.post<any>(url, payload).subscribe({
        next: (res) => {
          alert(res?.mensaje ?? 'Imagen guardada.');
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          alert(err?.error?.mensaje ?? 'Error al guardar imagen.');
        }
      });
    });
  }
}
