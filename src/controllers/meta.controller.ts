import { Request, Response } from "express";
import { metaDb } from "../db";

export const getAll = async (req: Request, res: Response) => {
  try {
    const { visionId } = req.query;

    if (!visionId || typeof visionId !== 'string') {
      return res.status(400).json({
        success: false,
        error: "visionId es requerido",
      });
    }

    const metas = await metaDb.findByVisionId(visionId);
    res.json({
      success: true,
      data: metas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener metas",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const meta = await metaDb.findById(id);

    if (!meta) {
      return res.status(404).json({
        success: false,
        error: "Meta no encontrada",
      });
    }

    res.json({
      success: true,
      data: meta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener meta",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const upsert = async (req: Request, res: Response) => {
  try {
    const { id, titulo, descripcion, visionId } = req.body;

    if (!titulo || !visionId) {
      return res.status(400).json({
        success: false,
        error: "Título y visionId son requeridos",
      });
    }

    const meta = await metaDb.upsert({ id, titulo, descripcion, visionId });

    res.status(id ? 200 : 201).json({
      success: true,
      data: meta,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al guardar meta",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await metaDb.deleteById(id);

    res.json({
      success: true,
      message: "Meta eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al eliminar meta",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
