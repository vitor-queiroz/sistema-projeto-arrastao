import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase.config';

import { Funcionario } from '../models/funcionario.model';

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


  async cadastrarFuncionario(funcionario: Funcionario) {

    const funcionariosRef = collection(this.db, 'funcionarios');

    await addDoc(funcionariosRef, funcionario);

  }

  async atualizarFuncionario(id: string, funcionario: Funcionario) {

    const funcionarioRef = doc(this.db, 'funcionarios', id);

    await updateDoc(funcionarioRef, {
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      setor: funcionario.setor,
      admissao: funcionario.admissao
    });

  }
}