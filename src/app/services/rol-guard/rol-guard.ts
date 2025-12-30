import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);

  const rol = localStorage.getItem('idRol');    
  const allowed = route.data['roles'] as string[];

  if (!rol) {
    router.navigate(['']);
    return false;
  }

  if (allowed.includes(rol)) return true;

  alert('No tienes permisos para entrar aquí.');
  router.navigate(['/inicio']);
  return false;
};
