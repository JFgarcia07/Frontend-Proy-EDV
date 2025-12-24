import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-categoria',
  imports: [Header, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.css',
})
export class EditarCategoria {
    categoriaForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute){
    this.categoriaForm = this.fb.group({
      idCategoria: ['', [Validators.required, Validators.maxLength(3)]],
      nombreCategoria: ['', Validators.required]
    });
  }

  ngOnInit(){
    const idCategoriaUrl = this.route.snapshot.paramMap.get('idCategoria');

    if(idCategoriaUrl){
      this.categoriaForm.patchValue({
        idCategoria: idCategoriaUrl
      });
      this.cargarDatos(idCategoriaUrl);
    }
  }

  cargarDatos(id: String){
     const urlBackend = `http://localhost:8080/prueba/EditarCategoria?id=${id}`;

    this.http.get<any>(urlBackend).subscribe({
      next: (res) => {
        console.log("Datos recibidos:", res);
        if (res.exito && res.juego) {
          const data = res.juego;

          this.categoriaForm.patchValue({
            nombreCategoria: data.nombreCategoria
          });

        } else {
          alert("No se encontró el juego");
        }
      },
      error: (err) => {
        console.error(err);
        alert("Error al cargar datos del juego");
      }
    });
  }

  onSubmit(){
    if (this.categoriaForm.valid) {
      const datosParaEnviar = this.categoriaForm.value;

      const urlBackend = 'http://localhost:8080/prueba/EditarCategoria';

      this.http.post(urlBackend, datosParaEnviar).subscribe({
        next: (res) => {
          console.log('EXITO', res);
          alert('Categoria actulizada correctamente');

          this.router.navigate(['/gestionar-categorias']);
        }, 
        error: (err) => {
           console.log('Error', err);
          if (err){
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
