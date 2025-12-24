import { Vision } from './vision.types';
import { User } from '../user/user.types';
import { Meta } from '../meta/meta.types';

export interface VisionWithRelations extends Vision {
  usuario: User;
  metas: Meta[];
}

export type FindAllVisionsResponse = VisionWithRelations[];
export type FindVisionByIdResponse = VisionWithRelations | null;
export type FindByUserIdResponse = VisionWithRelations[];
export type UpsertVisionResponse = Vision;
export type DeleteVisionResponse = Vision;
