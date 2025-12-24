import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asignar-categoria',
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './asignar-categoria.html',
  styleUrl: './asignar-categoria.css',
})

export class AsignarCategoria {
  categorias: any[] = [];
  cargando = true;

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      idJuego: ['', Validators.required],
      idCategoria: ['', Validators.required],
    })
  }

  ngOnInit() {
    const idJuegoUrl = this.route.snapshot.paramMap.get('idJuego');

    if (idJuegoUrl) {
      this.form.patchValue({
        idJuego: idJuegoUrl
      });

      this.cargarCategorias();
    }
  }

  cargarCategorias() {
    const urlBackend = 'http://localhost:8080/prueba/ListarCategorias'

    this.http.get<any[]>(urlBackend).subscribe({
      next: (data) => {
        this.categorias = data;
        this.cargando = false;
      },
      error: (err) => {
        console.log("Error al obtener las categorias");
        this.cargando = false;
      }
    })
  }

  onSubmit() {
    const formValues = this.form.getRawValue();

    const datosParaEnviar = {
        "idJuego": formValues.idJuego,
        "idCategoria": formValues.idCategoria
      };

    if (this.form.valid) {
      const urlBackend = 'http://localhost:8080/prueba/AsignarCategoriaJuegoServlet';
      this.http.post(urlBackend, datosParaEnviar).subscribe({
        next: (res) => {
          alert('Categoría asignada correctamente');
          this.router.navigate(['/gestion-empresa-desarrolladora']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al asignar la categoría');
        }
      });
    }
  }

}
