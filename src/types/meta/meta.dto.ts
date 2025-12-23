export interface CreateMetaDto {
  titulo: string;
  descripcion?: string;
  visionId: string;
}

export interface UpdateMetaDto {
  titulo?: string;
  descripcion?: string;
  visionId?: string;
}

export interface UpsertMetaDto {
  id?: string;
  titulo: string;
  descripcion?: string;
  visionId: string;
}
