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

  novoUsuario = false;

  nomeNovoUsuario = '';
  emailNovoUsuario = '';
  senhaNovoUsuario = '';

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

  }

  cancelarEdicao() {
    this.usuarioEditando = null;

  }

  abrirCadastro() {

    this.novoUsuario = true;

    this.nomeNovoUsuario = '';
    this.emailNovoUsuario = '';
    this.senhaNovoUsuario = '';

  }

  cancelarCadastro() {

    this.novoUsuario = false;

  }

  async salvarNovoUsuario() {

    try {
      const usuario = await this.authService.cadastrarUsuario(
        this.emailNovoUsuario,
        this.senhaNovoUsuario
      );

      const codigo = this.gerarCodigoConfirmacao();


      await this.usuarioService.cadastrarUsuario(
        usuario.uid,
        {
          nome: this.nomeNovoUsuario,
          email: this.emailNovoUsuario,
          tipo: 'usuario',
          status: 'pendente',
          codigoConfirmacao: codigo
        }
      );

      await this.authService.enviarCodigoConfirmacao(
        this.emailNovoUsuario,
        this.nomeNovoUsuario,
        codigo
      );

      console.log('Código de confirmação:', codigo);

      alert('Usuário cadastrado com sucesso!');

      this.novoUsuario = false;

      await this.carregarUsuarios();

    } catch (erro: any) {

      console.error('ERRO COMPLETO:', erro);

      alert('Erro ao cadastrar usuário:\n' +
        erro.code + '\n' +
        erro.message);

    }

  }

  async salvarEdicao() {

    await this.usuarioService.atualizarUsuario(
      this.usuarioEditando.id,
      {
        nome: this.nomeEditando,
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



  gerarCodigoConfirmacao(): string {

    return Math.floor(100000 + Math.random() * 900000).toString(); /* Código de autenticação === Ele sempre vai gerar um número entre 100000 e 999999, portanto teremos exatamente 6 dígitos.*/

  }

}