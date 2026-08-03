import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase.config';
import { Documento } from '../models/documento.model';

@Injectable({
    providedIn: 'root'
})
export class DocumentoService {

    private db = getFirestore(app);

    async listarDocumentos(): Promise<Documento[]> {

        const documentosRef = collection(this.db, 'documentos');

        const snapshot = await getDocs(documentosRef);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Documento));

    }

    async cadastrarDocumento(documento: Documento) {

        const documentosRef = collection(this.db, 'documentos');

        return await addDoc(documentosRef, documento);

    }

    async atualizarDocumento(id: string, documento: Documento) {

        const documentoRef = doc(this.db, 'documentos', id);

        await updateDoc(documentoRef, {
            funcionarioId: documento.funcionarioId,
            funcionarioNome: documento.funcionarioNome,
            tipo: documento.tipo,
            nomeArquivo: documento.nomeArquivo,
            enviadoPor: documento.enviadoPor,
            url: documento.url,
            dataUpload: documento.dataUpload
        });

    }


    async excluirDocumento(id: string) {

        const documentoRef = doc(this.db, 'documentos', id);

        await deleteDoc(documentoRef);

    }

}