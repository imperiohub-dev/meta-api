import { Request, Response } from "express";
import { tareaDb } from "../db";

export const getAll = async (req: Request, res: Response) => {
  try {
    // TODO: Tiene que ser getAll pero segun el usuario
    const tareas = await tareaDb.findAll();
    res.json({
      success: true,
      data: tareas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener tareas",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tarea = await tareaDb.findById(id);

    if (!tarea) {
      return res.status(404).json({
        success: false,
        error: "Tarea no encontrada",
      });
    }

    res.json({
      success: true,
      data: tarea,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener tarea",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const upsert = async (req: Request, res: Response) => {
  try {
    const { id, titulo, descripcion, completada, misionId } = req.body;

    if (!titulo || !misionId) {
      return res.status(400).json({
        success: false,
        error: "Título y misionId son requeridos",
      });
    }

    const tarea = await tareaDb.upsert({
      id,
      titulo,
      descripcion,
      completada,
      misionId,
    });

    res.status(id ? 200 : 201).json({
      success: true,
      data: tarea,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al guardar tarea",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await tareaDb.deleteById(id);

    res.json({
      success: true,
      message: "Tarea eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al eliminar tarea",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
