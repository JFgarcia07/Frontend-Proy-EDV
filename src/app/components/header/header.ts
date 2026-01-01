import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  idRol: String | null = '';
  entrada = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.idRol = localStorage.getItem('idRol');
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate([''])
  }

  buscar() {
    const text = (this.entrada ?? '').trim();
    if (!text) {
      alert('Escribe algo para buscar.');
      return;
    }

    this.router.navigate(['/buscar-juego'], { queryParams: { entrada: text } });
  }
}
