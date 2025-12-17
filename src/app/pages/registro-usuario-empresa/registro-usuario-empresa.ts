import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro-usuario-empresa',
  imports: [Header, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro-usuario-empresa.html',
  styleUrl: './registro-usuario-empresa.css',
})
export class RegistroUsuarioEmpresa implements OnInit{
  registroForm: FormGroup;
  idEmpresaSeleccionada: String | null = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.registroForm = this.fb.group({
      idUsuario: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.idEmpresaSeleccionada = this.route.snapshot.paramMap.get('idEmpresa');
    console.log('ID DE LA EMPRESA: ', this.idEmpresaSeleccionada)
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const datosParaEnviar = { 
        ...this.registroForm.value,  
        idEmpresa: this.idEmpresaSeleccionada
      };

      const urlBackend = 'http://localhost:8080/prueba/CrearUsuarioEmpresaServlet';

      this.http.post(urlBackend, datosParaEnviar).subscribe({
        next: (res) => {
          console.log('EXITO', res);
          alert('Usuario registrado correctamente');

          //this.router.navigate(['']);
        },
        error: (err) => {
          console.log('Error', err);
          if (err.status === 400) {
            const mensajeError = err.error.mensaje || 'Error: Usuario ya existente.';
            alert(mensajeError);
          } else if (err.status === 500) {
            alert('Error interno del servidor. Intente más tarde.');
          } else {
            alert('Hubo un error desconocido al conectar con el servidor.');
          }
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
      alert('Por favor llenar todos los campos')
    }

  }
}
