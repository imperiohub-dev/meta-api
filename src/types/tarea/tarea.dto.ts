export interface CreateTareaDto {
  titulo: string;
  descripcion?: string;
  completada?: boolean;
  misionId: string;
}

export interface UpdateTareaDto {
  titulo?: string;
  descripcion?: string;
  completada?: boolean;
  misionId?: string;
}

export interface UpsertTareaDto {
  id?: string;
  titulo: string;
  descripcion?: string;
  completada?: boolean;
  misionId: string;
}
