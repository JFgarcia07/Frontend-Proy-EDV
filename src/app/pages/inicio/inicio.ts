import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-inicio',
  imports: [RouterOutlet, Header],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

}
