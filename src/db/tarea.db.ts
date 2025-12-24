import { prisma } from './prisma';
import { UpsertTareaDto } from '../types';
import { Tarea as PrismaTarea, Mision as PrismaMision } from '../generated/prisma/client';

export const findAll = async () => {
  return await prisma.tarea.findMany({
    include: {
      mision: true
    }
  });
};

export const findById = async (id: PrismaTarea['id']) => {
  return await prisma.tarea.findUnique({
    where: { id },
    include: {
      mision: true
    }
  });
};

export const findByMisionId = async (misionId: PrismaMision['id']) => {
  return await prisma.tarea.findMany({
    where: { misionId },
    include: {
      mision: true
    }
  });
};

export const upsert = async (data: UpsertTareaDto) => {
  const { id, ...rest } = data;

  if (id) {
    return await prisma.tarea.upsert({
      where: { id },
      update: rest,
      create: { id, ...rest }
    });
  }

  return await prisma.tarea.create({
    data: rest
  });
};

export const deleteById = async (id: PrismaTarea['id']) => {
  return await prisma.tarea.delete({
    where: { id }
  });
};
