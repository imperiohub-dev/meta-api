export interface Objetivo {
  id: string;
  titulo: string;
  descripcion?: string | null;
  metaId: string;
  createdAt: Date;
  updatedAt: Date;
}
