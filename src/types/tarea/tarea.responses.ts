import { Tarea } from './tarea.types';
import { Mision } from '../mision/mision.types';

export interface TareaWithRelations extends Tarea {
  mision: Mision;
}

export type FindAllTareasResponse = TareaWithRelations[];
export type FindTareaByIdResponse = TareaWithRelations | null;
export type FindByMisionIdResponse = TareaWithRelations[];
export type UpsertTareaResponse = Tarea;
export type DeleteTareaResponse = Tarea;
