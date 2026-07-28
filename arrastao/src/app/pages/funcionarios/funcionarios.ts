import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FuncionarioService } from '../../services/funcionario.services';
import { AuthService } from '../../services/auth.service';
import { FuncionarioForm } from '../../components/funcionario-form/funcionario-form';

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

  constructor(private funcionarioService: FuncionarioService, public authService: AuthService) { }

  ngOnInit() {
    this.carregarFuncionarios();
  }

  async carregarFuncionarios() {

    this.funcionarios = await this.funcionarioService.listarFuncionarios();
    this.totalFuncionarios = this.funcionarios.length;

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
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

}