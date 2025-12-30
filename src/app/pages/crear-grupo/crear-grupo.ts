import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-grupo',
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-grupo.html',
  styleUrl: './crear-grupo.css',
})
export class CrearGrupo {
  grupoForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.grupoForm = this.fb.group({
      idGrupo: ['', [Validators.required, Validators.maxLength(5)]],
      nombreGrupo: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.grupoForm.valid){
      this.enviarDatosBackEnd();
    } else {
      this.grupoForm.markAllAsTouched();
      alert('Por favor llenar todos los campos');
    }
  }

  enviarDatosBackEnd() {
    const formValues = this.grupoForm.getRawValue();

    const datosParaEnviar = {
      "idGrupo": formValues.idGrupo,
      "nombreGrupo": formValues.nombreGrupo
    }

    const urlBackend = 'http://localhost:8080/prueba/CrearGrupoFamiliar';

    this.http.post<any>(urlBackend, datosParaEnviar).subscribe({
      next: (res) => {
        alert(res?.mensaje ?? 'Grupo creado.');
        if (res?.exito) this.router.navigate(['/gestion-grupos-familiares']);
      },
      error: (err) => {
        alert(err?.error?.mensaje ?? 'Error interno en el servidor.');
      }
    });
  }

}
