import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

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

  constructor(private usuarioService: UsuarioService) { }

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

}