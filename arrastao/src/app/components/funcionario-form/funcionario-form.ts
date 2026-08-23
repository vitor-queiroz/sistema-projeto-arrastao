import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.services';

import { Funcionario } from '../../models/funcionario.model';
@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './funcionario-form.html',
  styleUrl: './funcionario-form.css',
})

export class FuncionarioForm implements OnChanges {

  constructor(private funcionarioService: FuncionarioService) { }
  @Input()
  funcionario: Funcionario | null = null;

  @Output()
  salvou = new EventEmitter<void>();

  nome = '';
  cpf = '';
  setor = '';
  admissao = '';
  rg = '';
  dataNascimento = '';
  cargo = '';

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['funcionario'] && this.funcionario) {

      this.nome = this.funcionario.nome;
      this.cpf = this.funcionario.cpf;
      this.setor = this.funcionario.setor;
      this.admissao = this.funcionario.admissao;
      this.rg = this.funcionario.rg;
      this.dataNascimento = this.funcionario.dataNascimento;
      this.cargo = this.funcionario.cargo;

    }

  }


  async salvar() {

    const funcionario: Funcionario = {
      nome: this.nome,
      cpf: this.cpf,
      setor: this.setor,
      admissao: this.admissao,
      rg: this.rg,
      dataNascimento: this.dataNascimento,
      cargo: this.cargo
    };

    if (this.funcionario?.id) {

      await this.funcionarioService.atualizarFuncionario(
        this.funcionario.id,
        funcionario
      );

      alert('Funcionário atualizado com sucesso!');

    } else {

      await this.funcionarioService.cadastrarFuncionario(funcionario);

      alert('Funcionário cadastrado com sucesso!');

    }
    this.nome = '';
    this.cpf = '';
    this.setor = '';
    this.admissao = '';
    this.rg = '';
    this.dataNascimento = '';
    this.cargo = '';

    this.salvou.emit(); /* O que esse emit() faz? É como se o formulário dissesse: PAII!! Eu terminei de salvar!! */
  }
}