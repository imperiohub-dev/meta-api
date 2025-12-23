import { Request, Response } from "express";
import { misionDb } from "../db";

export const getAll = async (req: Request, res: Response) => {
  try {
    // TODO: Tiene que ser getAll pero segun el usuario
    const misiones = await misionDb.findAll();
    res.json({
      success: true,
      data: misiones,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener misiones",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mision = await misionDb.findById(id);

    if (!mision) {
      return res.status(404).json({
        success: false,
        error: "Misión no encontrada",
      });
    }

    res.json({
      success: true,
      data: mision,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener misión",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const upsert = async (req: Request, res: Response) => {
  try {
    const { id, titulo, descripcion, objetivoId } = req.body;

    if (!titulo || !objetivoId) {
      return res.status(400).json({
        success: false,
        error: "Título y objetivoId son requeridos",
      });
    }

    const mision = await misionDb.upsert({
      id,
      titulo,
      descripcion,
      objetivoId,
    });

    res.status(id ? 200 : 201).json({
      success: true,
      data: mision,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al guardar misión",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await misionDb.deleteById(id);

    res.json({
      success: true,
      message: "Misión eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al eliminar misión",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
