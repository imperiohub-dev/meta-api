import { Objetivo } from './objetivo.types';
import { Meta } from '../meta/meta.types';
import { Mision } from '../mision/mision.types';

export interface ObjetivoWithRelations extends Objetivo {
  meta: Meta;
  misiones: Mision[];
}

export type FindAllObjetivosResponse = ObjetivoWithRelations[];
export type FindObjetivoByIdResponse = ObjetivoWithRelations | null;
export type FindByMetaIdResponse = ObjetivoWithRelations[];
export type UpsertObjetivoResponse = Objetivo;
export type DeleteObjetivoResponse = Objetivo;
