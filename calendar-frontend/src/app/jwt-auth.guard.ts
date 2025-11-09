import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const jwtAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('access_token'); // CHANGE TO LOCALSTORAGE
  if (!token) {
    return router.createUrlTree(['**']);
  }
  return true;
};
