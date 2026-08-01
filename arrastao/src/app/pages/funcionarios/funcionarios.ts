import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FuncionarioService } from '../../services/funcionario.services';
import { AuthService } from '../../services/auth.service';
import { FuncionarioForm } from '../../components/funcionario-form/funcionario-form';

import { Funcionario } from '../../models/funcionario.model';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [FormsModule, CommonModule, FuncionarioForm],
  templateUrl: './funcionarios.html',
  styleUrl: './funcionarios.css'
})
export class Funcionarios implements OnInit {

  funcionarios: any[] = [];
  totalFuncionarios = 0;
  pesquisa = '';

  modalAberto = false;
  funcionarioSelecionado: Funcionario | null = null;

  constructor(private funcionarioService: FuncionarioService, public authService: AuthService) { }

  async ngOnInit() {
    if (!this.authService.perfilUsuario) {
      await this.authService.buscarPerfil();
    }

    this.carregarFuncionarios();

  }

  async carregarFuncionarios() {

    this.funcionarios = await this.funcionarioService.listarFuncionarios();
    this.totalFuncionarios = this.funcionarios.length;

  }

  editarFuncionario(funcionario: Funcionario) {

    this.funcionarioSelecionado = funcionario;

    this.modalAberto = true;

  }

  async excluirFuncionario(funcionario: Funcionario) {

    const confirmar = confirm(
      `Deseja realmente excluir o funcionário ${funcionario.nome}?`);

    if (!confirmar) {
      return;
    }

    await this.funcionarioService.excluirFuncionario(funcionario.id!);

    await this.carregarFuncionarios();

    alert('Funcionário excluído com sucesso!');

  }

  funcionariosFiltrados() {

    return this.funcionarios.filter(funcionario => {

      const termo = this.pesquisa.toLowerCase();

      return (
        funcionario.nome?.toLowerCase().includes(termo) ||
        funcionario.cpf.includes(this.pesquisa) ||
        funcionario.setor?.toLowerCase().includes(termo)
      );

    });

  }

  abrirModal() {
    this.funcionarioSelecionado = null;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.funcionarioSelecionado = null;
  }

}