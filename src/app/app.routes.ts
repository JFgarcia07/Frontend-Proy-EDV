import { Routes } from '@angular/router';
import { LogIn } from './log-in/log-in';
import { Inicio } from './pages/inicio/inicio';
import { SignIn } from './pages/sign-in/sign-in';

export const routes: Routes = [
    {path: '', component:LogIn},
    {path: 'inicio', component: Inicio},
    {path: 'signIn', component: SignIn}
];

