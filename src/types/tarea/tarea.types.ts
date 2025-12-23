export interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string | null;
  completada: boolean;
  misionId: string;
  createdAt: Date;
  updatedAt: Date;
}
