import { Routes } from '@angular/router';
import { LogIn } from './log-in/log-in';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
    {path: '', component:LogIn},
    {path: 'inicio', component: Inicio}
];

