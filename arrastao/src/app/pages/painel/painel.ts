import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FuncionarioService } from '../../services/funcionario.services';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel implements OnInit {

  funcionarios: any[] = [];
  totalFuncionarios = 0;
  pesquisa = '';

  constructor(private funcionarioService: FuncionarioService) { }

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
    
      return(
      funcionario.nome?.toLowerCase().includes(termo) ||
      funcionario.cpf.includes(this.pesquisa) ||
      funcionario.setor?.toLowerCase().includes(termo)
    );
  });
}
}
/*
ngOnInit() executa
⬇
carregarFuncionarios() chama o serviço
⬇
FuncionarioService busca a coleção funcionarios no Firestore
⬇
Logo depois, os dados entram em (this.funcionarios = ...*/