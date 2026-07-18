import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Painel } from './pages/painel/painel';
import { Documentos } from './pages/documentos/documentos';
import { Usuarios } from './pages/usuarios/usuarios';
import { Configuracoes } from './pages/configuracoes/configuracoes';


export const routes: Routes = [
    {
        path: '',
        component: Login,
        pathMatch: 'full'  /*Para o Angular entender cada tela ex: /painel /usuarios... */
        //AuthGuard mais pra frente
    },

    {
        path: '',
        component: Layout,
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
            },
            {
                path: 'configuracoes',
                component: Configuracoes,
            },
        ],
    },

    { /* --------------Aqui qualquer rota inválida volta p/ login*/
        path: '**',
        redirectTo: '',
    },
];
