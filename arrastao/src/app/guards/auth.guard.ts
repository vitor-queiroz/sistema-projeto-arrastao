import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const usuario = await authService.getUsuarioLogado();

    if (usuario) {

        return true;

    }

    return router.createUrlTree(['/']);

};