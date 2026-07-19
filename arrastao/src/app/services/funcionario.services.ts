import { Injectable } from '@angular/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../config/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private db = getFirestore(app);

  async listarFuncionarios() {

    const funcionariosRef = collection(this.db, 'funcionarios');

    const snapshot = await getDocs(funcionariosRef);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  }

}