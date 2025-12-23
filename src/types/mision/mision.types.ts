export interface Mision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  objetivoId: string;
  createdAt: Date;
  updatedAt: Date;
}
