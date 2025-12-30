import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const idUsuario = localStorage.getItem('idGlobal');

  if (idUsuario) return true;

  router.navigate(['']);
  return false;
};
