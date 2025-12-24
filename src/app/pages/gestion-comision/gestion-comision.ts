import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestion-comision',
  imports: [Header, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './gestion-comision.html',
  styleUrl: './gestion-comision.css',
})
export class GestionComision {
  comisionForm: FormGroup;
  comision: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.comisionForm = this.fb.group({
      idComision: [{ value: '', disabled: true }],
      porcentajeComision: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarOpcionesComision();
  }

  cargarOpcionesComision() {
    this.http.get<any[]>('http://localhost:8080/prueba/ComisionServlet').subscribe({
      next: (data) => {
        if (!data || data.length === 0) {
          alert('No hay comisión registrada.');
          return;
        }

        this.comision = data[0];

        this.comisionForm.patchValue({
          idComision: this.comision.idComision,
          porcentajeComision: this.comision.porcentaje
        });

      },
      error: (err) => {
        console.log("Error al cargar las comisiones");
      }
    });
  }

  onSubmit() {
    if (this.comisionForm.invalid) {
      alert('Completa el porcentaje.');
      return;
    }
    
    const porcentajeStr = String(this.comisionForm.get('porcentajeComision')?.value ?? '').trim();
    const porcentajeNum = Number(porcentajeStr);

    if (porcentajeStr === '' || Number.isNaN(porcentajeNum)) {
      alert('El valor ingresado no es un número.');
      return;
    }

    const datosParaEnviar = { porcentaje: porcentajeNum };

    this.http.post<any>('http://localhost:8080/prueba/ComisionServlet', datosParaEnviar).subscribe({
      next: (res) => {
        alert(res?.mensaje ?? 'Comisión actualizada.');
        if (res?.exito) this.cargarOpcionesComision();
      },
      error: (err) => {
        alert(err?.error?.mensaje ?? 'Error de conexión con el servidor.');
      }
    });
  }


}
