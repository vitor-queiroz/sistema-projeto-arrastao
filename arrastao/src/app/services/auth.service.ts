import { Injectable } from '@angular/core';

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../config/firebase.config';

import { onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private auth = getAuth(app);
    private db = getFirestore(app);

    perfilUsuario: any = null;

    async login(email: string, senha: string) {

        return await signInWithEmailAndPassword(this.auth, email, senha);

    }

    async logout() {

        return await signOut(this.auth);

    }


    getUsuarioLogado(): Promise<User | null> {

        return new Promise((resolve) => {

            const unsubscribe = onAuthStateChanged(this.auth, (user) => {

                unsubscribe();

                resolve(user);
            });
        });
    }


    async buscarPerfil() {

        const usuario = this.auth.currentUser;

        if (!usuario) {
            return null;
        }

        const usuarioRef = doc(this.db, 'usuarios', usuario.uid);

        const documento = await getDoc(usuarioRef);

        if (!documento.exists()) {
            return null;
        }

        this.perfilUsuario = documento.data();
        return this.perfilUsuario;
    }


    isAdmin(): boolean {
        return this.perfilUsuario?.tipo === 'admin';
    }

    isSuperAdmin(): boolean {
        return this.perfilUsuario?.tipo === 'superadmin';
    }
}