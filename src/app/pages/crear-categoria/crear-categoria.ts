import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-categoria',
  standalone:  true,
  imports: [Header, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './crear-categoria.html',
  styleUrl: './crear-categoria.css',
})
export class CrearCategoria {

  categoriaForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router){
    this.categoriaForm = this.fb.group({
      idCategoria: ['', [Validators.required, Validators.maxLength(3)]],
      nombreCategoria: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.categoriaForm.valid) {
      const datosParaEnviar = this.categoriaForm.value;

      const urlBackend = 'http://localhost:8080/prueba/CrearCategoriaServlet';

      this.http.post(urlBackend, datosParaEnviar).subscribe({
        next: (res) => {
          console.log('EXITO', res);
          alert('Categoria creada correctamente');

          this.router.navigate([]);
        }, 
        error: (err) => {
           console.log('Error', err);
          if (err.status === 400) {
            const mensajeError = err.error.mensaje || 'Error: La categoria ya existe.';
            alert(mensajeError);
          } else if (err.status === 500) {
            alert('Error interno del servidor. Intente más tarde.');
          } else {
            alert('Hubo un error desconocido al conectar con el servidor.');
          }
        }
      });
    } else {
      this.categoriaForm.markAllAsTouched();
      alert('Por favor llenar todos los campos')
    }
  }

}
