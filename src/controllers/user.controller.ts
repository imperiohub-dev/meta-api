import { Request, Response } from "express";
import { userDb } from "../db";

export const getAll = async (req: Request, res: Response) => {
  try {
    // TODO: Tiene que ser getAll pero segun el usuario
    const users = await userDb.findAll();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener usuarios",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userDb.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener usuario",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const upsert = async (req: Request, res: Response) => {
  try {
    const { id, email, nombre } = req.body;

    if (!email || !nombre) {
      return res.status(400).json({
        success: false,
        error: "Email y nombre son requeridos",
      });
    }

    const user = await userDb.upsert({ id, email, nombre });

    res.status(id ? 200 : 201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al guardar usuario",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userDb.deleteById(id);

    res.json({
      success: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al eliminar usuario",
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
