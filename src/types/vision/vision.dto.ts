export interface CreateVisionDto {
  titulo: string;
  descripcion?: string;
  usuarioId: string;
}

export interface UpdateVisionDto {
  titulo?: string;
  descripcion?: string;
  usuarioId?: string;
}

export interface UpsertVisionDto {
  id?: string;
  titulo: string;
  descripcion?: string;
  usuarioId: string;
}
