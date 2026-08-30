import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore, doc, updateDoc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';

import { app } from '../config/firebase.config';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private db = getFirestore(app);

    async listarUsuarios() {

        const usuariosRef = collection(this.db, 'usuarios');

        const snapshot = await getDocs(usuariosRef);

        return snapshot.docs.map(documento => ({
            id: documento.id,
            ...documento.data()
        }));

    }

    async atualizarUsuario(id: string, dados: any) {

        const usuarioRef = doc(this.db, 'usuarios', id);

        await updateDoc(usuarioRef, dados);
    }

    async excluirUsuario(id: string) {

        const usuarioRef = doc(this.db, 'usuarios', id);

        await deleteDoc(usuarioRef);
    }

    async cadastrarUsuario(id: string, dados: any) {

        const usuarioRef = doc(this.db, 'usuarios', id);

        await setDoc(usuarioRef, dados);/* set ---> cria o documento ou substitui, caso já exista*/

    }



    async confirmarUsuario(id: string, codigo: string) {

        const usuarioRef = doc(this.db, 'usuarios', id);

        const documento = await getDoc(usuarioRef);

        if (!documento.exists()) {
            return false;
        }

        const dados = documento.data();

        console.log('Código no Firestore:', dados['codigoConfirmacao']);
        console.log('Código digitado:', codigo);
        console.log('Tipo do código Firestore:', typeof dados['codigoConfirmacao']);
        console.log('Tipo do código digitado:', typeof codigo);

        if (dados['codigoConfirmacao'] !== codigo) {
            return false;
        }

        await updateDoc(usuarioRef, {
            status: 'ativo'
        });

        return true;
    }

}