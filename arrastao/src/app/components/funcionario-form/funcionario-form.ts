import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './funcionario-form.html',
  styleUrl: './funcionario-form.css',
})
export class FuncionarioForm {

  nome = '';
  cpf = '';
  setor = '';
  admissao = '';

}