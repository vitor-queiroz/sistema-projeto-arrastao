import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { app } from '../config/firebase.config';

@Injectable({
    providedIn: 'root'
})
export class DocumentoService {

    private db = getFirestore(app);

    async listarDocumentos() {

        const documentosRef = collection(this.db, 'documentos');

        const snapshot = await getDocs(documentosRef);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

    }

    async cadastrarDocumento(documento: any) {

        const documentosRef = collection(this.db, 'documentos');

        return await addDoc(documentosRef, documento);

    }

}