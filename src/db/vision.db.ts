import { prisma } from './prisma';
import { UpsertVisionDto } from '../types';
import { Vision as PrismaVision } from '../generated/prisma/client';

export const findAll = async () => {
  return await prisma.vision.findMany({
    include: {
      usuario: true,
      metas: true
    }
  });
};

export const findById = async (id: PrismaVision['id']) => {
  return await prisma.vision.findUnique({
    where: { id },
    include: {
      usuario: true,
      metas: true
    }
  });
};

export const upsert = async (data: UpsertVisionDto) => {
  const { id, ...rest } = data;

  if (id) {
    return await prisma.vision.upsert({
      where: { id },
      update: rest,
      create: { id, ...rest }
    });
  }

  return await prisma.vision.create({
    data: rest
  });
};

export const deleteById = async (id: PrismaVision['id']) => {
  return await prisma.vision.delete({
    where: { id }
  });
};
