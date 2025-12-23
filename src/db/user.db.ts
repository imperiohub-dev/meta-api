import { prisma } from './prisma';
import { UpsertUserDto, CreateUserDto } from '../types';
import { Usuario as PrismaUsuario } from '../generated/prisma/client';

export const findAll = async () => {
  return await prisma.usuario.findMany({
    include: {
      visiones: true
    }
  });
};

export const findById = async (id: PrismaUsuario['id']) => {
  return await prisma.usuario.findUnique({
    where: { id },
    include: {
      visiones: true
    }
  });
};

export const findByEmail = async (email: string) => {
  return await prisma.usuario.findUnique({
    where: { email }
  });
};

export const create = async (data: CreateUserDto) => {
  return await prisma.usuario.create({
    data
  });
};

export const upsert = async (data: UpsertUserDto) => {
  const { id, ...rest } = data;

  if (id) {
    return await prisma.usuario.upsert({
      where: { id },
      update: rest,
      create: { id, ...rest }
    });
  }

  return await prisma.usuario.create({
    data: rest
  });
};

export const deleteById = async (id: PrismaUsuario['id']) => {
  return await prisma.usuario.delete({
    where: { id }
  });
};
