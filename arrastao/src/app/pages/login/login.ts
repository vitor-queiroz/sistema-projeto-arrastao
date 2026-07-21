import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router){ }

  async entrar() {
    try {

      await this.authService.login(this.email, this.senha);
      await this.authService.buscarPerfil();
      console.log(this.authService.perfilUsuario);

      this.router.navigate(['/painel']);

    } catch (error) {

      alert('E-mail ou senha inválidos.');

      console.error(error);

    }

  }

}

