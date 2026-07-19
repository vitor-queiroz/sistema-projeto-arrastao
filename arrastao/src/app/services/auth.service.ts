import { Injectable } from '@angular/core';

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../config/firebase.config';

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

}