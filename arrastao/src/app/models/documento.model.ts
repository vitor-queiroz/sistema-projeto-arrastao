export interface Documento {

  id?: string;

  funcionarioId: string;
  funcionarioNome: string;

  tipo: string;

  nomeArquivo: string;
  enviadoPor: string;
  url: string;

  dataUpload: string;

}