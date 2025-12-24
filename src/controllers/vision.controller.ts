import { Request, Response } from "express";
import { visionDb } from "../db";

export const getAll = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.user?.id;

    if (!usuarioId) {
      return res.status(401).json({
        success: false,
        error: "Usuario no autenticado",
      });
    }

    const visiones = await visionDb.findByUserId(usuarioId);
    res.json({
      success: true,
      data: visiones,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener visiones",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vision = await visionDb.findById(id);

    if (!vision) {
      return res.status(404).json({
        success: false,
        error: "Visión no encontrada",
      });
    }

    res.json({
      success: true,
      data: vision,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener visión",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const upsert = async (req: Request, res: Response) => {
  try {
    const { id, titulo, descripcion, usuarioId } = req.body;

    if (!titulo || !usuarioId) {
      return res.status(400).json({
        success: false,
        error: "Título y usuarioId son requeridos",
      });
    }

    const vision = await visionDb.upsert({
      id,
      titulo,
      descripcion,
      usuarioId,
    });

    res.status(id ? 200 : 201).json({
      success: true,
      data: vision,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al guardar visión",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await visionDb.deleteById(id);

    res.json({
      success: true,
      message: "Visión eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al eliminar visión",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
