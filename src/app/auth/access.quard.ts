import {inject} from '@angular/core';
import {AuthService} from './auth-service';
import {Router} from '@angular/router';

export const canActivate = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn || inject(Router).createUrlTree(['/login']);
};
