import { prisma } from './prisma';
import { UpsertMetaDto } from '../types';
import { Meta as PrismaMeta } from '../generated/prisma/client';

export const findAll = async () => {
  return await prisma.meta.findMany({
    include: {
      vision: true,
      objetivos: true
    }
  });
};

export const findById = async (id: PrismaMeta['id']) => {
  return await prisma.meta.findUnique({
    where: { id },
    include: {
      vision: true,
      objetivos: true
    }
  });
};

export const upsert = async (data: UpsertMetaDto) => {
  const { id, ...rest } = data;

  if (id) {
    return await prisma.meta.upsert({
      where: { id },
      update: rest,
      create: { id, ...rest }
    });
  }

  return await prisma.meta.create({
    data: rest
  });
};

export const deleteById = async (id: PrismaMeta['id']) => {
  return await prisma.meta.delete({
    where: { id }
  });
};
