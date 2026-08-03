import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Documento } from '../../models/documento.model';
import { Funcionario } from '../../models/funcionario.model';

import { DocumentoService } from '../../services/documento.service';
import { FuncionarioService } from '../../services/funcionario.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documento-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './documento-form.html',
  styleUrl: './documento-form.css'
})
export class DocumentoForm implements OnChanges, OnInit {

  constructor(
    private documentoService: DocumentoService, private funcionarioService: FuncionarioService, private cdr: ChangeDetectorRef
  ) { }

  @Input()
  documento: Documento | null = null;

  @Output()
  salvou = new EventEmitter<void>();

  funcionarios: Funcionario[] = [];

  funcionarioId = '';
  tipo = '';
  nomeArquivo = '';
  url = '';

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['documento'] && this.documento) {

      this.funcionarioId = this.documento.funcionarioId;
      this.tipo = this.documento.tipo;
      this.nomeArquivo = this.documento.nomeArquivo;
      this.url = this.documento.url;
    }
  }

  async ngOnInit() {

    this.funcionarios =
      await this.funcionarioService.listarFuncionarios();

    this.cdr.detectChanges();

  }



  async salvar() {

    const funcionario = this.funcionarios.find(
      f => f.id === this.funcionarioId
    );

    if (!funcionario) {
      alert('Funcionário não encontrado.');
      return;
    }

    const documento: Documento = {

      funcionarioId: this.funcionarioId,
      funcionarioNome: funcionario.nome,
      tipo: this.tipo,
      nomeArquivo: this.nomeArquivo,
      url: this.url,
      dataUpload: new Date().toLocaleDateString('pt-BR'),
      enviadoPor: 'Administrador'

    };

    if (this.documento?.id) {

      await this.documentoService.atualizarDocumento(
        this.documento.id,
        documento
      );

      alert('Documento atualizado com sucesso!');

    } else {

      await this.documentoService.cadastrarDocumento(documento);

      alert('Documento cadastrado com sucesso!');

    }

    this.funcionarioId = '';
    this.tipo = '';
    this.nomeArquivo = '';
    this.url = '';

    this.salvou.emit();

  }

}