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
import { GestionCategorias } from './pages/gestion-categorias/gestion-categorias';
import { CrearCategoria } from './pages/crear-categoria/crear-categoria';
import { EditarCategoria } from './pages/editar-categoria/editar-categoria';
import { AsignarCategoria } from './pages/asignar-categoria/asignar-categoria';
import { PropuestasCategorias } from './pages/propuestas-categorias/propuestas-categorias';
import { VerCategoriasAsignadas } from './pages/ver-categorias-asignadas/ver-categorias-asignadas';
import { Tienda } from './pages/tienda/tienda';
import { VerMasJuego } from './pages/ver-mas-juego/ver-mas-juego';
import { ProcesoCompra } from './pages/proceso-compra/proceso-compra';
import { Biblioteca } from './pages/biblioteca/biblioteca';
import { GestionComision } from './pages/gestion-comision/gestion-comision';
import { EditarEmpresa } from './pages/editar-empresa/editar-empresa';
import { CalificacionComentarios } from './pages/calificacion-comentarios/calificacion-comentarios';

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
    {path: 'editar-videojuego/:idJuego', component: EditarVideojuego},
    {path: 'gestionar-categorias', component: GestionCategorias},
    {path: 'crear-categoria', component: CrearCategoria},
    {path: 'editar-categoria/:idCategoria', component: EditarCategoria},
    {path: 'asignar-categoria/:idJuego', component: AsignarCategoria},
    {path: 'propuestas-categorias', component: PropuestasCategorias},
    {path: 'ver-categorias-asignadas/:idJuego', component: VerCategoriasAsignadas},
    {path: 'tienda', component: Tienda},
    {path: 'ver-mas-juego/:idJuego', component: VerMasJuego},
    {path: 'proceso-venta/:idJuego', component: ProcesoCompra},
    {path: 'biblioteca', component: Biblioteca},
    {path: 'gestionar-comision', component: GestionComision},
    {path: 'editar-empresa/:idEmpresa', component: EditarEmpresa},
    {path: 'calificacion-comentario/:idJuego', component:CalificacionComentarios}
];

