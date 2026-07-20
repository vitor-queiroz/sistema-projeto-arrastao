import { Injectable } from '@angular/core';

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../config/firebase.config';

import { onAuthStateChanged, User } from 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private auth = getAuth(app);

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

}