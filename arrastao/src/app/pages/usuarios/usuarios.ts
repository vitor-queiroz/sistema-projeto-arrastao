import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {

  usuarios: any[] = [];
  usuarioEditando: any = null;

  nomeEditando = '';
  tipoEditando = '';

  constructor(private usuarioService: UsuarioService, private authService: AuthService) { }

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  async carregarUsuarios() {

    this.usuarios = await this.usuarioService.listarUsuarios();
  }

  iniciarEdicao(usuario: any) {

    this.usuarioEditando = usuario;

    this.nomeEditando = usuario.nome;
    this.tipoEditando = usuario.tipo;

  }

  cancelarEdicao() {
    this.usuarioEditando = null;

  }

  async salvarEdicao() {

    await this.usuarioService.atualizarUsuario(
      this.usuarioEditando.id,
      {
        nome: this.nomeEditando,
        tipo: this.tipoEditando
      }
    );

    alert('Usuário atualizado com sucesso!');

    this.usuarioEditando = null;

    await this.carregarUsuarios();

  }

  async excluirUsuario(usuario: any) {

    const usuarioLogado = await this.authService.getUsuarioLogado();

    if (usuarioLogado?.uid === usuario.id) {

      alert('Você não pode excluir o próprio usuário.');

      return;

    }

    const confirmar = confirm(
      `Tem certeza que deseja excluir o usuário ${usuario.nome}?`
    );

    if (!confirmar) {
      return;
    }

    await this.usuarioService.excluirUsuario(usuario.id);

    alert('Usuário excluído com sucesso!');

    await this.carregarUsuarios();

  }

}