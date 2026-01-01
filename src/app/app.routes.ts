import { Routes } from '@angular/router';
import { authGuard } from './services/auth-guard/auth-guard';
import { roleGuard } from './services/rol-guard/rol-guard';

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
import { GestionGruposFamiliares } from './pages/gestion-grupos-familiares/gestion-grupos-familiares';
import { CrearGrupo } from './pages/crear-grupo/crear-grupo';
import { VerGrupoFamiliar } from './pages/ver-grupo-familiar/ver-grupo-familiar';
import { GestionBanner } from './pages/gestion-banner/gestion-banner';
import { JuegosGratis } from './pages/juegos-gratis/juegos-gratis';
import { JuegosRecientes } from './pages/juegos-recientes/juegos-recientes';
import { BuscarJuego } from './pages/buscar-juego/buscar-juego';
import { ListaEmpresas } from './pages/lista-empresas/lista-empresas';
import { CatalogoEmpresa } from './pages/catalogo-empresa/catalogo-empresa';
import { JuegoPorCategoria } from './pages/juego-por-categoria/juego-por-categoria';

export const routes: Routes = [
  { path: '', component: LogIn },          
  { path: 'signIn', component: SignIn },  

  { path: 'inicio', component: Inicio, canActivate: [authGuard] },
  { path: 'perfil', component: Perfil, canActivate: [authGuard] },
  { path: 'billetera', component: Billetera, canActivate: [authGuard] },

  { path: 'gestion-empresa', component: GestionEmpresas, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']} },
  { path: 'crear-empresa', component: CrearEmpresa, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']} },
  { path: 'registro-usuario-empresa/:idEmpresa', component: RegistroUsuarioEmpresa, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']}  },

  { path: 'gestion-empresa-desarrolladora', component: GestionEmpresaDesarrolladora, canActivate: [authGuard, roleGuard], data: { roles: ['EMPRE']} },
  { path: 'crear-videojuego', component: CrearVideojuego, canActivate: [authGuard, roleGuard], data: { roles: ['EMPRE']} },
  { path: 'lista-usuarios-empresa', component: ListaUsuariosEmpresa, canActivate: [authGuard, roleGuard], data: { roles: ['EMPRE']} },
  { path: 'editar-videojuego/:idJuego', component: EditarVideojuego, canActivate: [authGuard, roleGuard], data: { roles: ['EMPRE']} },

  { path: 'gestionar-categorias', component: GestionCategorias, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']} },
  { path: 'crear-categoria', component: CrearCategoria, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']} },
  { path: 'editar-categoria/:idCategoria', component: EditarCategoria, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']}},
  { path: 'asignar-categoria/:idJuego', component: AsignarCategoria, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']} },
  { path: 'propuestas-categorias', component: PropuestasCategorias, canActivate: [authGuard] },
  { path: 'ver-categorias-asignadas/:idJuego', component: VerCategoriasAsignadas, canActivate: [authGuard, roleGuard], data: { roles: ['EMPRE']} },

  { path: 'tienda', component: Tienda, canActivate: [authGuard] },
  { path: 'ver-mas-juego/:idJuego', component: VerMasJuego, canActivate: [authGuard] },
  { path: 'proceso-venta/:idJuego', component: ProcesoCompra, canActivate: [authGuard] },

  { path: 'biblioteca', component: Biblioteca, canActivate: [authGuard] },
  { path: 'gestionar-comision', component: GestionComision, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']} },
  { path: 'editar-empresa/:idEmpresa', component: EditarEmpresa, canActivate: [authGuard, roleGuard], data: { roles: ['EMPRE']} },
  { path: 'calificacion-comentario/:idJuego', component: CalificacionComentarios, canActivate: [authGuard] },

  { path: 'gestion-grupos-familiares', component: GestionGruposFamiliares, canActivate: [authGuard] },
  { path: 'crear-grupo', component: CrearGrupo, canActivate: [authGuard] },
  { path: 'ver-grupo-familiar/:idGrupo', component: VerGrupoFamiliar, canActivate: [authGuard] },
  { path: 'gestion-banner', component:GestionBanner, canActivate: [authGuard, roleGuard], data: { roles: ['ADMIN']}},

  {path: 'juegos-gratis', component: JuegosGratis, canActivate: [authGuard]},
  {path: 'juegos-recientes', component: JuegosRecientes, canActivate: [authGuard]},
  {path: 'buscar-juego', component: BuscarJuego, canActivate: [authGuard]},
  {path: 'lista-empresas', component:ListaEmpresas, canActivate: [authGuard]},

  {path: 'catalogo-empresa/:idEmpresa', component: CatalogoEmpresa, canActivate: [authGuard]},
  {path: 'juegos-por-categoria', component: JuegoPorCategoria, canActivate: [authGuard]}
];
