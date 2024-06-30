import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ApiServiceService } from '../services/api-service.service';
import { Tarea, TareaInterface } from '../models/tarea';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent implements OnInit {
  tareas: TareaInterface[] = [];
  isLoading = true;
  private modalService = inject(NgbModal);
  activeTarea: TareaInterface | null = null;
  isDeleting = false;
  isCreating = false;
  tareaForm!: FormGroup;

  constructor(private apiService: ApiServiceService, private loginService: LoginService) {
    // Crear el formulario
    this.crearFormulario();
  }

  private crearFormulario() {
    this.tareaForm = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      fechaCreacion: new FormControl(null, Validators.required),
      fechaVencimiento: new FormControl(null, Validators.required),
      completada: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.fetchTareas().subscribe({
      next: l => {
        this.tareas = l;
        this.isLoading = false;
      },
      error: (e) => {
        if (e.status === 401) {
          this.loginService.deleteSession();
        }
        //todo: Mostrar error
        this.isLoading = false;
      }
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then();
  }

  openDelete(tarea: TareaInterface, content: TemplateRef<any>) {
    this.activeTarea = tarea;
    this.open(content);
  }

  openCreate(content: TemplateRef<any>) {
    this.activeTarea = null;
    this.crearFormulario();
    this.open(content);
  }

  openEdit(tarea: TareaInterface, content: TemplateRef<any>) {
    this.activeTarea = tarea;

    let dateCreation = null;
    let dateVenc = null;

    // Quitar el timezone de la fecha
    if (typeof(tarea.fechaCreacion) === 'string') {
      dateCreation = tarea.fechaCreacion;
    } else {
      dateCreation = tarea.fechaCreacion.toISOString().split('.')[0];
    }

    if (typeof (tarea.fechaVencimiento) === 'string') {
      dateVenc = tarea.fechaVencimiento;
    } else {
      dateVenc = tarea.fechaVencimiento.toISOString().split('.')[0];
    }

    this.tareaForm = new FormGroup({
      titulo: new FormControl(tarea.titulo, Validators.required),
      descripcion: new FormControl(tarea.descripcion, Validators.required),
      fechaCreacion: new FormControl(dateCreation, Validators.required),
      fechaVencimiento: new FormControl(dateVenc, Validators.required),
      completada: new FormControl(tarea.completada)
    });

    this.open(content);
  }

  async delete(modal: NgbModalRef) {
    this.isDeleting = true;

    try {
      await lastValueFrom(this.apiService.deleteTarea(this.activeTarea!));

      this.tareas = this.tareas.filter(t => t.id !== this.activeTarea!.id);
    } catch (e) {
      // todo: Mostrar error
      console.log(e)
    } finally {
      this.activeTarea = null;
      this.isDeleting = false;
      modal.close();
    }
  }

  async create(modal: NgbModalRef) {
    this.isCreating = true;

    const tarea = new Tarea(0, this.tareaForm.value.titulo, this.tareaForm.value.descripcion, this.tareaForm.value.fechaCreacion,
      this.tareaForm.value.fechaVencimiento, this.tareaForm.value.completada);

    if (this.activeTarea !== null) {
      tarea.id = this.activeTarea.id;
    }

    try {
      if (this.activeTarea === null) {
        const newOne = await lastValueFrom(this.apiService.createTarea(tarea));
        this.tareas.push(newOne);
      } else {
        await lastValueFrom(this.apiService.editTarea(tarea));
        this.activeTarea.descripcion = tarea.descripcion;
        this.activeTarea.titulo = tarea.titulo;
        this.activeTarea.fechaCreacion = tarea.fechaCreacion;
        this.activeTarea.fechaVencimiento = tarea.fechaVencimiento;
        this.activeTarea.completada = tarea.completada;
      }
    } catch (e) {
      // todo: Mostrar error
      console.log(e)
    } finally {
      this.activeTarea = null;
      this.isCreating = false;
      modal.close();
    }
  }
}
