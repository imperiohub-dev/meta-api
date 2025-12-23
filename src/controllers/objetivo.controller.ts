import { Request, Response } from 'express';
import { objetivoDb } from '../db';

export const getAll = async (req: Request, res: Response) => {
  try {
    const objetivos = await objetivoDb.findAll();
    res.json({
      success: true,
      data: objetivos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener objetivos',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const objetivo = await objetivoDb.findById(id);

    if (!objetivo) {
      return res.status(404).json({
        success: false,
        error: 'Objetivo no encontrado'
      });
    }

    res.json({
      success: true,
      data: objetivo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener objetivo',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const upsert = async (req: Request, res: Response) => {
  try {
    const { id, titulo, descripcion, metaId } = req.body;

    if (!titulo || !metaId) {
      return res.status(400).json({
        success: false,
        error: 'Título y metaId son requeridos'
      });
    }

    const objetivo = await objetivoDb.upsert({ id, titulo, descripcion, metaId });

    res.status(id ? 200 : 201).json({
      success: true,
      data: objetivo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al guardar objetivo',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await objetivoDb.deleteById(id);

    res.json({
      success: true,
      message: 'Objetivo eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar objetivo',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};
