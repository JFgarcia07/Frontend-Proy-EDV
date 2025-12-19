import { Routes } from '@angular/router';
import { LogIn } from './log-in/log-in';
import { Inicio } from './pages/inicio/inicio';
import { SignIn } from './pages/sign-in/sign-in';
import { Perfil } from './pages/perfil/perfil';
import { Billetera } from './pages/billetera/billetera';
import { GestionEmpresas } from './pages/gestion-empresas/gestion-empresas';
import { CrearEmpresa } from './pages/crear-empresa/crear-empresa';
import { RegistroUsuarioEmpresa } from './pages/registro-usuario-empresa/registro-usuario-empresa';
import { GestionEmpresaDesarrolladora } from './pages/gestion-empresa-desarrolladora/gestion-empresa-desarrolladora';
import { CrearVideojuego } from './pages/crear-videojuego/crear-videojuego';
import { ListaUsuariosEmpresa } from './pages/lista-usuarios-empresa/lista-usuarios-empresa';
import { EditarVideojuego } from './pages/editar-videojuego/editar-videojuego';

export const routes: Routes = [
    {path: '', component:LogIn},
    {path: 'inicio', component: Inicio},
    {path: 'signIn', component: SignIn},
    {path: 'perfil', component: Perfil},
    {path: 'billetera', component: Billetera},
    {path: 'gestion-empresa', component: GestionEmpresas},
    {path: 'crear-empresa', component: CrearEmpresa},
    {path: 'registro-usuario-empresa/:idEmpresa', component: RegistroUsuarioEmpresa},
    {path: 'gestion-empresa-desarrolladora', component: GestionEmpresaDesarrolladora},
    {path: 'crear-videojuego', component: CrearVideojuego},
    {path: 'lista-usuarios-empresa', component: ListaUsuariosEmpresa},
    {path: 'editar-videojuego/:idJuego', component: EditarVideojuego}
];

