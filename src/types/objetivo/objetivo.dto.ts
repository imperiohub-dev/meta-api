export interface CreateObjetivoDto {
  titulo: string;
  descripcion?: string;
  metaId: string;
}

export interface UpdateObjetivoDto {
  titulo?: string;
  descripcion?: string;
  metaId?: string;
}

export interface UpsertObjetivoDto {
  id?: string;
  titulo: string;
  descripcion?: string;
  metaId: string;
}
