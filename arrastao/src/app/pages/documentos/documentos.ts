import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.services';

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css',
})
export class Documentos implements OnInit {

  documentos: any[] = [];
  funcionarios: any[] = [];

  modalAberto = false;

  novoDocumento = {
    funcionarioNome: '',
    funcionarioId: '',
    tipo: '',
    arquivo: '',
    enviadoPor: 'Administrador',
    dataUpload: new Date().toLocaleDateString('pt-BR'),
    url: 'teste'
  };

  constructor(private documentoService: DocumentoService, private funcionarioService: FuncionarioService) { }

  async ngOnInit() {
    await this.carregarFuncionarios();
    await this.carregarDocumentos();
  }

  async carregarDocumentos() {

    this.documentos = await this.documentoService.listarDocumentos();
    console.log(this.documentos);

  }

  async salvarDocumento() {

    if (
      !this.novoDocumento.funcionarioId ||
      !this.novoDocumento.tipo ||
      !this.novoDocumento.arquivo
    ) {

      alert('Preencha todos os campos.');

      return;

    }

    const funcionario = this.funcionarios.find(
      f => f.id === this.novoDocumento.funcionarioId
    );

    if (!funcionario) {
      alert('Funcionário não encontrado.');
      return;
    }

    this.novoDocumento.funcionarioNome = funcionario.nome;

    
    await this.documentoService.cadastrarDocumento(this.novoDocumento);

    alert('Documento cadastrado com sucesso!');

    await this.carregarDocumentos();

    this.novoDocumento = {
      funcionarioNome: '',
      funcionarioId: '',
      tipo: '',
      arquivo: '',
      enviadoPor: 'Administrador',
      dataUpload: new Date().toLocaleDateString('pt-BR'),
      url: 'teste'
    };

    this.fecharModal();

  }

  abrirModal() {

    this.modalAberto = true;

  }

  fecharModal() {

    this.modalAberto = false;

  }

  async carregarFuncionarios() {
    this.funcionarios = await this.funcionarioService.listarFuncionarios();
  }
}
