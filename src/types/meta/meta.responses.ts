import { Meta } from './meta.types';
import { Vision } from '../vision/vision.types';
import { Objetivo } from '../objetivo/objetivo.types';

export interface MetaWithRelations extends Meta {
  vision: Vision;
  objetivos: Objetivo[];
}

export type FindAllMetasResponse = MetaWithRelations[];
export type FindMetaByIdResponse = MetaWithRelations | null;
export type FindByVisionIdResponse = MetaWithRelations[];
export type UpsertMetaResponse = Meta;
export type DeleteMetaResponse = Meta;
