import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router){
    this.registroForm = this.fb.group({
      idUsuario: ['',  Validators.required],
      nombreUsuario: ['',  Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      pais: ['', Validators.required],
      telefono: ['']
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const datosParaEnviar = this.registroForm.value;

      const urlBackend =  'http://localhost:8080/prueba/RegistrarUsuarioServlet';
      
      this.http.post(urlBackend, datosParaEnviar).subscribe({
        next: (res) => {
          console.log('EXITO', res);
          alert('Usuario registrado correctamente');

          this.router.navigate(['']);
        },
        error: (err) => {
          console.log('Error', err);
          alert('Hubo un error al registrar')
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
      alert('Por favor llenar todos los campos')
    }

  }
}

