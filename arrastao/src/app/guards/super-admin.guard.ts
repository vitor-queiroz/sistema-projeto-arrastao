import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const superAdminGuard: CanActivateFn = async () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    // Aqui vai garantir que o perfil esteja carregado
    if (!authService.perfilUsuario) {
        await authService.buscarPerfil();
    }

    if (authService.isSuperAdmin()) {
        return true;
    }

    alert('Você não possui permissão para acessar esta página.');

    router.navigate(['/painel']);

    return false;
};