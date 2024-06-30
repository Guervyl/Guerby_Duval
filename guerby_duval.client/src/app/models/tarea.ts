export interface TareaInterface {
  id: number;
  titulo: string;
  descripcion: string;
  fechaCreacion: Date;
  fechaVencimiento: Date;
  completada: boolean;
}

export class Tarea implements TareaInterface {
  id: number;
  titulo: string;
  descripcion: string;
  fechaCreacion: Date;
  fechaVencimiento: Date;
  completada: boolean;

  constructor(
    id: number,
    titulo: string,
    descripcion: string,
    fechaCreacion: string,
    fechaVencimiento: string,
    completada: boolean
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fechaCreacion = new Date(fechaCreacion);
    this.fechaVencimiento = new Date(fechaVencimiento);
    this.completada = completada;
  }
}
