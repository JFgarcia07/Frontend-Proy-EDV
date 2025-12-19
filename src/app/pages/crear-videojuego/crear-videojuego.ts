import { Component, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-videojuego',
  standalone: true,
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-videojuego.html',
  styleUrl: './crear-videojuego.css',
})

export class CrearVideojuego implements OnInit{
  juegoForm: FormGroup;
  
  imagenSeleccionada: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.juegoForm = this.fb.group({
      idJuego: ['', Validators.required],
      idEmpresa: [{ value: '', disabled: true }, Validators.required], 
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      recursosMinimos: ['', Validators.required],
      clasificacion: ['', Validators.required],
      fechaLanzamiento: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
      console.log("Imagen seleccionada:", file.name);
    }
  }

  ngOnInit(): void {
    const idGuardado = localStorage.getItem('idEmpresa');

    if (idGuardado) {
      this.juegoForm.patchValue({
        idEmpresa: idGuardado
      });
    }
  }

  onSubmit() {
    if (this.juegoForm.valid) {
      if (this.imagenSeleccionada) {
        const reader = new FileReader();
        
        reader.onload = (e: any) => {
          const imagenBase64 = e.target.result; 
          this.enviarDatosBackend(imagenBase64); 
        };
        
        reader.readAsDataURL(this.imagenSeleccionada);
        
      } else {
        this.enviarDatosBackend(""); 
      }

    } else {
      this.juegoForm.markAllAsTouched();
      alert('Por favor llenar todos los campos');
    }
  }

  enviarDatosBackend(imagenString: string) {
    const formValues = this.juegoForm.getRawValue();

    const datosParaEnviar = {
      "id_juego": formValues.idJuego,
      "id_empresa": formValues.idEmpresa,
      "titulo": formValues.titulo,
      "descripcion": formValues.descripcion,
      "precio": formValues.precio,
      "recursos_minimos": formValues.recursosMinimos,
      "clasificacion_edad": formValues.clasificacion,
      "fecha_lanzamiento": formValues.fechaLanzamiento,
      "imagen": imagenString
    };

    const urlBackend = 'http://localhost:8080/prueba/CrearJuegoServlet';

    this.http.post(urlBackend, datosParaEnviar).subscribe({
      next: (res: any) => {
        console.log('EXITO', res);
        
        if(res.exito) {
           alert('Juego registrado correctamente');
           
          this.router.navigate(['desarrolladora']);

        } else {
           alert('Atención: ' + res.mensaje);
        }
      },
      error: (err) => {
        console.log('Error', err);
        if (err.status === 400) {
          const mensajeDelBackend = err.error.mensaje || 'Error: Datos inválidos o ID duplicado';
          alert(mensajeDelBackend);
        } else {
          alert('Hubo un error desconocido al registrar');
        }
      }
    });
  }






















  
}
