export interface Funcionario {
  id?: string;

  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  setor: string;
  cargo: string;
  admissao: string;

  foto?: string;
}