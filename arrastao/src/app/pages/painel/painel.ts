import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {

  pesquisa = '';

  funcionarios = [
    {
      nome: 'Maria Silva',
      cpf: '12345678900',
      setor: 'Administrativo'
    },
    {
      nome: 'Carlos Souza',
      cpf: '98765432100',
      setor: 'Financeiro'
    },
    {
      nome: 'Ana Paula',
      cpf: '45612378900',
      setor: 'RH'
    },
    {
      nome: 'Pedro Henrique',
      cpf: '74185296300',
      setor: 'Financeiro'
    }
  ];

  funcionariosFiltrados() {

    return this.funcionarios.filter(funcionario =>
      funcionario.nome.toLowerCase().includes(this.pesquisa.toLowerCase()) ||
      funcionario.cpf.includes(this.pesquisa) ||
      funcionario.setor.toLowerCase().includes(this.pesquisa.toLowerCase())

    );

  }
}
