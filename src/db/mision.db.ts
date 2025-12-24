import { prisma } from './prisma';
import { UpsertMisionDto } from '../types';
import { Mision as PrismaMision, Objetivo as PrismaObjetivo } from '../generated/prisma/client';

export const findAll = async () => {
  return await prisma.mision.findMany({
    include: {
      objetivo: true,
      tareas: true
    }
  });
};

export const findById = async (id: PrismaMision['id']) => {
  return await prisma.mision.findUnique({
    where: { id },
    include: {
      objetivo: true,
      tareas: true
    }
  });
};

export const findByObjetivoId = async (objetivoId: PrismaObjetivo['id']) => {
  return await prisma.mision.findMany({
    where: { objetivoId },
    include: {
      objetivo: true,
      tareas: true
    }
  });
};

export const upsert = async (data: UpsertMisionDto) => {
  const { id, ...rest } = data;

  if (id) {
    return await prisma.mision.upsert({
      where: { id },
      update: rest,
      create: { id, ...rest }
    });
  }

  return await prisma.mision.create({
    data: rest
  });
};

export const deleteById = async (id: PrismaMision['id']) => {
  return await prisma.mision.delete({
    where: { id }
  });
};
