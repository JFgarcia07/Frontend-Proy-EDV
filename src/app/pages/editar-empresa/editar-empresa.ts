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
  selector: 'app-editar-empresa',
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './editar-empresa.html',
  styleUrl: './editar-empresa.css',
})
export class EditarEmpresa {
  empresaForm: FormGroup;
  
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute){
    this.empresaForm = this.fb.group({
      idEmpresa: [{value:'', disable: true}, Validators.required],
      nombreEmpresa: ['', Validators.required],
      descripcion: ['', Validators.required],
      porcentajeEspecifico: [0, [Validators.min(0), Validators.max(1)]],
    });
  }

  ngOnInit(){
    const idEmpresaUrl = this.route.snapshot.paramMap.get('idEmpresa');

    if(idEmpresaUrl){
      this.empresaForm.patchValue({
        idEmpresa: idEmpresaUrl
      });
      this.cargarDatosEmpresa(idEmpresaUrl);
    }
  }

  cargarDatosEmpresa(id:string){
    const urlBackend = `http://localhost:8080/prueba/EditarEmpresa?id=${id}`;

    this.http.get<any>(urlBackend).subscribe({
      next: (res) => {
        console.log("Datos recibidos: ", res)
        if(res.exito && res.empresa){
          const data = res.empresa;

          this.empresaForm.patchValue({
            nombreEmpresa: data.nombreEmpresa,
            descripcion: data.descripcion,
            porcentajeEspecifico: data.porcentajeEspecifico,
          });

        } else {
          alert("No se encontro la empresa");
        }
      },
      error: (err) => {
        console.log("Error al cargar los datos de la empresa");
      }
    });
  }


  onSubmit(){
    if(this.empresaForm.valid){
      this.enviarDatosBackend();
    }
  }

  enviarDatosBackend(){
    const formValues = this.empresaForm.getRawValue();

    const datosParaEnviar = {
      "idEmpresa": formValues.idEmpresa,
      "nombreEmpresa": formValues.nombreEmpresa,
      "descripcion": formValues.descripcion,
      "porcentajeEspecifico": formValues.porcentajeEspecifico,
    };

    const urlBackend = 'http://localhost:8080/prueba/EditarEmpresa';

    this.http.post(urlBackend, datosParaEnviar).subscribe({
      next: (res: any) => {
        console.log('EXITO', res);

        if (res.exito) {
          alert('Empresa actualizada correctamente');

          this.router.navigate(['/gestion-empresa']);

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
