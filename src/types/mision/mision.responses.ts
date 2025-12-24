import { Mision } from './mision.types';
import { Objetivo } from '../objetivo/objetivo.types';
import { Tarea } from '../tarea/tarea.types';

export interface MisionWithRelations extends Mision {
  objetivo: Objetivo;
  tareas: Tarea[];
}

export type FindAllMisionesResponse = MisionWithRelations[];
export type FindMisionByIdResponse = MisionWithRelations | null;
export type FindByObjetivoIdResponse = MisionWithRelations[];
export type UpsertMisionResponse = Mision;
export type DeleteMisionResponse = Mision;
