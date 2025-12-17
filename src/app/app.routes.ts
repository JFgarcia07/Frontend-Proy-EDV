import { Routes } from '@angular/router';
import { LogIn } from './log-in/log-in';
import { Inicio } from './pages/inicio/inicio';
import { SignIn } from './pages/sign-in/sign-in';
import { Perfil } from './pages/perfil/perfil';
import { Billetera } from './pages/billetera/billetera';
import { GestionEmpresas } from './pages/gestion-empresas/gestion-empresas';
import { CrearEmpresa } from './pages/crear-empresa/crear-empresa';
import { RegistroUsuarioEmpresa } from './pages/registro-usuario-empresa/registro-usuario-empresa';

export const routes: Routes = [
    {path: '', component:LogIn},
    {path: 'inicio', component: Inicio},
    {path: 'signIn', component: SignIn},
    {path: 'perfil', component: Perfil},
    {path: 'billetera', component: Billetera},
    {path: 'gestion-empresa', component: GestionEmpresas},
    {path: 'crear-empresa', component: CrearEmpresa},
    {path: 'registro-usuario-empresa/:idEmpresa', component: RegistroUsuarioEmpresa}
];

