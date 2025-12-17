import { Component, OnInit } from '@angular/core'
import { Header } from '../../components/header/header'
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crear-empresa',
  standalone: true,
  imports: [Header, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './crear-empresa.html',
  styleUrl: './crear-empresa.css',
})

export class CrearEmpresa implements OnInit {

  registroForm: FormGroup;
  listaComisiones: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registroForm = this.fb.group({
      idEmpresa: ['', Validators.required],
      nombreEmpresa: ['', Validators.required],
      descripcion: ['', Validators.required],
      comisionEspecifica: [''],
      idComision: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarOpcionesComision();
  }

  cargarOpcionesComision() {
    this.http.get<any[]>('http://localhost:8080/prueba/CrearEmpresa').subscribe({
      next: (data) => {
        this.listaComisiones = data;
      },
      error: (err) => {
        console.log("Error al cargar las comisiones")
      }
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const datosParaEnviar = this.registroForm.value;

      const urlBackend = 'http://localhost:8080/prueba/CrearEmpresa';

      this.http.post(urlBackend, datosParaEnviar).subscribe({
        next: (res) => {
          console.log('EXITO', res);
          alert('Empresa registrado correctamente');
          this.router.navigate(['/gestion-empresa']);
        },
        error: (err) => {
          console.log('Error', err);
          if (err.status === 400) {
            const mensajeDelBackend = err.error.mensaje || 'La empresa ya existe';
            alert(mensajeDelBackend);
          } else {
            alert('Hubo un error desconocido al registrar');
          }
        }
      });

    } else {
      this.registroForm.markAllAsTouched();
      alert('Por favor llenar todos los campos')
    }
  }

}
