import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-confirmar-cadastro',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './confirmar-cadastro.html',
    styleUrl: './confirmar-cadastro.css',
})
export class ConfirmarCadastro {

    codigo = '';

    constructor(
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private router: Router
    ) { }

    async confirmar() {

        const usuario = await this.authService.getUsuarioLogado();

        if (!usuario) {

            alert('Usuário não encontrado.');

            this.router.navigate(['/']);

            return;
        }

        console.log('UID:', usuario.uid);
        console.log('Código digitado:', this.codigo);

        const confirmado = await this.usuarioService.confirmarUsuario(
            usuario.uid,
            this.codigo
        );

        if (!confirmado) {

            alert('Código inválido.');

            return;
        }

        alert('Cadastro confirmado com sucesso!');

        await this.authService.buscarPerfil();

        this.router.navigate(['/painel']);
    }

}