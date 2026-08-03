import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { FormsModule } from '@angular/forms';
import { Documento } from '../../models/documento.model';
import { DocumentoForm } from '../../components/documento-form/documento-form';

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [CommonModule, FormsModule, DocumentoForm],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css',
})
export class Documentos implements OnInit {

  documentos: Documento[] = [];

  documentoSelecionado: Documento | null = null;

  modalAberto = false;


  constructor(private documentoService: DocumentoService) { }

  async ngOnInit() {
    await this.carregarDocumentos();
  }

  async carregarDocumentos() {

    this.documentos = await this.documentoService.listarDocumentos();
    console.log(this.documentos);

  }

  
  abrirDocumento(url: string) {

    window.open(url, '_blank');

  }


  editarDocumento(documento: Documento) {

    this.documentoSelecionado = documento;
    this.modalAberto = true;

  }


  async excluirDocumento(documento: Documento) {

    const confirmar = confirm(
      `Deseja realmente excluir "${documento.nomeArquivo}"?`
    );

    if (!confirmar) {
      return;
    }

    await this.documentoService.excluirDocumento(documento.id!);
    await this.carregarDocumentos();

    alert('Documento excluído com sucesso!');

  }


  abrirModal() {

    this.documentoSelecionado = null;
    this.modalAberto = true;

  }

  fecharModal() {

    this.modalAberto = false;
    this.documentoSelecionado = null;

  }

  async aoSalvarDocumento() {

    this.fecharModal();
    await this.carregarDocumentos();

  }
}
