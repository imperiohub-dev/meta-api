export interface CreateMisionDto {
  titulo: string;
  descripcion?: string;
  objetivoId: string;
}

export interface UpdateMisionDto {
  titulo?: string;
  descripcion?: string;
  objetivoId?: string;
}

export interface UpsertMisionDto {
  id?: string;
  titulo: string;
  descripcion?: string;
  objetivoId: string;
}
