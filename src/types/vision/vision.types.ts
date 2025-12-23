export interface Vision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
}
