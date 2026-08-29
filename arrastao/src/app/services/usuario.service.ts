import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';

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

}