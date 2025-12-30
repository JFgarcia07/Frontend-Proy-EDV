import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ver-grupo-familiar',
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './ver-grupo-familiar.html',
  styleUrl: './ver-grupo-familiar.css',
})
export class VerGrupoFamiliar {
  miembros: any[] = [];

  miembroForm!: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, private fb: FormBuilder) {
    this.miembroForm = this.fb.group({
      idGrupo: [{ value: '', disabled: true }, [Validators.required]],
      idUsuario: ['', Validators.required],
    });
  }

  ngOnInit() {
    const idGrupo = this.route.snapshot.paramMap.get('idGrupo');
    this.miembroForm.patchValue({ idGrupo: idGrupo });
    if (idGrupo) {
      this.cargarMiembrosDeGrupo(idGrupo);
    }
  }

  cargarMiembrosDeGrupo(id: any) {
    const urlBackend = `http://localhost:8080/prueba/AgregarUsuarioGrupo?id=${id}`;

    this.http.get<any[]>(urlBackend).subscribe({
      next: (res) => {
        console.log('Grupos cargados', res);
        this.miembros = res ?? [];
      },
      error: (err) => {
        console.log('Error al cargar los miembros del grupo', err);
      }
    });
  }

  onSubmit() {
    this.envairDatosBackend();
  }

  envairDatosBackend() {
    const id = this.route.snapshot.paramMap.get('idGrupo');
    const formValues = this.miembroForm.getRawValue();

    const datosParaEnviar = {
      "idGrupo": formValues.idGrupo,
      "idUsuario": formValues.idUsuario
    }

    const urlBackend = `http://localhost:8080/prueba/AgregarUsuarioGrupo?id=${id}`;

    this.http.post<any>(urlBackend, datosParaEnviar).subscribe({
      next: (res) => {
        alert(res?.mensaje ?? 'Usuario agregado al grupo.');
        this.cargarMiembrosDeGrupo(id);
      },
      error: (err) => {
        alert(err?.error?.mensaje ?? 'Error interno en el servidor.');
      }
    });
  }


  confirmarEliminacion(idUsuario: any) {
    const ok = confirm('¿Seguro que deseas eliminar este usuario del grupo?');
    if (!ok) return;

    const idGrupo = this.route.snapshot.paramMap.get('idGrupo');
    this.EliminarMiembro(idUsuario, idGrupo);
  }

  EliminarMiembro(idUsuario: any, idGrupo: any) {
    const urlBackend = 'http://localhost:8080/prueba/EliminarMiembroGrupo';

    const datosParaEnviar = {
      idGrupo: idGrupo,
      idUsuario: idUsuario
    };

    this.http.post<any>(urlBackend, datosParaEnviar).subscribe({
      next: (res) => {
        alert(res?.mensaje ?? 'Usuario eliminado del grupo.');
        this.cargarMiembrosDeGrupo(idGrupo);
      },
      error: (err) => {
        alert(err?.error?.mensaje ?? 'Error interno en el servidor.');
      }
    });
  }
}
