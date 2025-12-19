import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  idRol: String | null = '';

  constructor(private router: Router){}

  ngOnInit(): void {
    this.idRol = localStorage.getItem('idRol');
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate([''])
  }
}
