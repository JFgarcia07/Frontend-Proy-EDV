import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-videojuego',
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './editar-videojuego.html',
  styleUrl: './editar-videojuego.css',
})
export class EditarVideojuego {
  juegoForm: FormGroup;

  imagenSeleccionada: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.juegoForm = this.fb.group({
      idJuego: [{ value: '', disabled: true }, Validators.required],
      idEmpresa: [{ value: '', disabled: true }, Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      recursosMinimos: ['', Validators.required],
      clasificacion: ['', Validators.required],
      fechaLanzamiento: ['', Validators.required],
      comentarios: [true, Validators.required], 
      estadoVenta: [true, Validators.required], 
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
    const idJuegoUrl = this.route.snapshot.paramMap.get('idJuego');

    if (idGuardado) {
      this.juegoForm.patchValue({
        idEmpresa: idGuardado
      });
    }

    if (idJuegoUrl) {
      this.juegoForm.patchValue({
        idJuego: idJuegoUrl
      });
      this.cargarDatosJuego(idJuegoUrl);
    }
  }

  cargarDatosJuego(id: String) {
    const urlBackend = `http://localhost:8080/prueba/EditarJuegoServlet?id=${id}`;

    this.http.get<any>(urlBackend).subscribe({
      next: (res) => {
        console.log("Datos recibidos:", res);
        if (res.exito && res.juego) {
          const data = res.juego;

          this.juegoForm.patchValue({
            titulo: data.titulo,
            descripcion: data.descripcion,
            precio: data.precio,
            recursosMinimos: data.recursosMinimos,
            clasificacion: data.clasificacion,
            fechaLanzamiento: data.fechaLanzamiento,
            comentarios: data.comentarios,
            estadoVenta: data.estadoVenta,
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
      "estado_venta": formValues.estadoVenta,
      "comentarios": formValues.comentarios,
      "imagen": imagenString
    };

    const urlBackend = 'http://localhost:8080/prueba/EditarJuegoServlet';

    this.http.post(urlBackend, datosParaEnviar).subscribe({
      next: (res: any) => {
        console.log('EXITO', res);

        if (res.exito) {
          alert('Juego registrado correctamente');

          this.router.navigate(['/gestion-empresa-desarrolladora']);

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
