import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.services';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './funcionario-form.html',
  styleUrl: './funcionario-form.css',
})
export class FuncionarioForm {

  constructor(private funcionarioService: FuncionarioService) { }

  nome = '';
  cpf = '';
  setor = '';
  admissao = '';

  async salvar() {

    await this.funcionarioService.cadastrarFuncionario({

      nome: this.nome,
      cpf: this.cpf,
      setor: this.setor,
      admissao: this.admissao

    });

    this.nome = '';
    this.cpf = '';
    this.setor = '';
    this.admissao = '';

    alert('Funcionário cadastrado com sucesso!');

  }
}