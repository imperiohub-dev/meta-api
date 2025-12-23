import { prisma } from "./prisma";
import { UpsertObjetivoDto } from "../types";
import { Objetivo as PrismaObjetivo } from "../generated/prisma/client";

export const findAll = async () => {
  return await prisma.objetivo.findMany({
    include: {
      meta: true,
      misiones: true,
    },
  });
};

export const findById = async (id: PrismaObjetivo["id"]) => {
  return await prisma.objetivo.findUnique({
    where: { id },
    include: {
      meta: true,
      misiones: true,
    },
  });
};

export const upsert = async (data: UpsertObjetivoDto) => {
  const { id, ...rest } = data;

  if (id) {
    return await prisma.objetivo.upsert({
      where: { id },
      update: rest,
      create: { id, ...rest },
    });
  }

  return await prisma.objetivo.create({
    data: rest,
  });
};

export const deleteById = async (id: PrismaObjetivo["id"]) => {
  return await prisma.objetivo.delete({
    where: { id },
  });
};
