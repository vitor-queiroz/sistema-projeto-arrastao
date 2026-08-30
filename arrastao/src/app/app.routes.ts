import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Painel } from './pages/painel/painel';
import { Documentos } from './pages/documentos/documentos';
import { Usuarios } from './pages/usuarios/usuarios';
import { Configuracoes } from './pages/configuracoes/configuracoes';

import { authGuard } from './guards/auth.guard';
import { superAdminGuard } from './guards/super-admin.guard';
import { Funcionarios } from './pages/funcionarios/funcionarios';

import { ConfirmarCadastro } from './pages/confirmar-cadastro/confirmar-cadastro';

export const routes: Routes = [
    {
        path: '',
        component: Login,
        pathMatch: 'full'  /*Para o Angular entender cada tela ex: /painel /usuarios... */
        //AuthGuard mais pra frente
    },

    {
        path: 'confirmar-cadastro',
        component: ConfirmarCadastro
    },

    {
        path: '',
        component: Layout,
        canActivate: [authGuard],
        children: [
            {
                path: 'painel',
                component: Painel,
            },
            {
                path: 'documentos',
                component: Documentos,
            },
            {
                path: 'usuarios',
                component: Usuarios,
                canActivate: [superAdminGuard]
            },
            {
                path: 'configuracoes',
                component: Configuracoes,
                canActivate: [superAdminGuard]
            },
            {
                path: 'funcionarios',
                component: Funcionarios,
            }
        ],
    },

    { /* --------------Aqui qualquer rota inválida volta p/ login*/
        path: '**',
        redirectTo: '',
    },
];
