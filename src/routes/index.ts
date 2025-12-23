import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import visionRoutes from "./vision.routes";
import metaRoutes from "./meta.routes";
import objetivoRoutes from "./objetivo.routes";
import misionRoutes from "./mision.routes";
import tareaRoutes from "./tarea.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/visiones", visionRoutes);
router.use("/metas", metaRoutes);
router.use("/objetivos", objetivoRoutes);
router.use("/misiones", misionRoutes);
router.use("/tareas", tareaRoutes);

export default router;
