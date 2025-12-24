import axios from "axios";
import type {
  // User types
  User,
  UserWithVisions,
  UpsertUserDto,
  FindAllUsersResponse,
  FindUserByIdResponse,
  UpsertUserResponse,
  DeleteUserResponse,
  // Vision types
  Vision,
  VisionWithRelations,
  UpsertVisionDto,
  FindByUserIdResponse as FindVisionsByUserIdResponse,
  FindVisionByIdResponse,
  UpsertVisionResponse,
  DeleteVisionResponse,
  // Meta types
  Meta,
  MetaWithRelations,
  UpsertMetaDto,
  FindByVisionIdResponse as FindMetasByVisionIdResponse,
  FindMetaByIdResponse,
  UpsertMetaResponse,
  DeleteMetaResponse,
  // Objetivo types
  Objetivo,
  ObjetivoWithRelations,
  UpsertObjetivoDto,
  FindByMetaIdResponse as FindObjetivosByMetaIdResponse,
  FindObjetivoByIdResponse,
  UpsertObjetivoResponse,
  DeleteObjetivoResponse,
  // Mision types
  Mision,
  MisionWithRelations,
  UpsertMisionDto,
  FindByObjetivoIdResponse as FindMisionesByObjetivoIdResponse,
  FindMisionByIdResponse,
  UpsertMisionResponse,
  DeleteMisionResponse,
  // Tarea types
  Tarea,
  TareaWithRelations,
  UpsertTareaDto,
  FindByMisionIdResponse as FindTareasByMisionIdResponse,
  FindTareaByIdResponse,
  UpsertTareaResponse,
  DeleteTareaResponse,
} from "./src/types";

// ============================================
// CONFIGURACIÓN DE LA API
// ============================================

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// En desarrollo con proxy, usar ruta relativa
// En producción o desarrollo local, usar URL completa
const getBaseURL = () => {
  const isProduction = import.meta.env.PROD;
  const isDevelopmentWithProxy = !isProduction && API_URL.startsWith("https");

  // Si estamos en desarrollo y el API_URL es HTTPS, usar proxy relativo
  if (isDevelopmentWithProxy) {
    return "/api";
  }

  return API_URL;
};

// ============================================
// INSTANCIA DE AXIOS
// ============================================

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // IMPORTANTE: permite enviar/recibir cookies automáticamente
  timeout: 10000, // 10 segundos - evita carga indefinida si el backend está caído
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Solo logueamos el error, la redirección la maneja ProtectedRoute
    if (error.response?.status === 401) {
      console.log("Error 401: Usuario no autenticado");
    }
    return Promise.reject(error);
  }
);

// ============================================
// TIPOS DE AUTH
// ============================================

export interface UserToken {
  id: string;
  email: string;
  nombre: string;
}

export interface AuthResponse {
  success: boolean;
  authenticated?: boolean;
  message?: string;
  user?: UserToken;
}

// ============================================
// SERVICIO DE API CENTRALIZADO
// ============================================

export const api = {
  // ==========================================
  // AUTENTICACIÓN
  // ==========================================
  auth: {
    /**
     * Iniciar el flujo de autenticación con Google
     * Redirige al backend que maneja OAuth
     */
    initiateGoogleLogin(): void {
      const isProduction = import.meta.env.PROD;
      const isDevelopmentWithProxy =
        !isProduction && API_URL.startsWith("https");

      // Si estamos usando proxy, usar ruta relativa
      const authUrl = isDevelopmentWithProxy
        ? "/api/auth/google"
        : `${API_URL}/auth/google`;

      console.log("URL", authUrl);
      window.location.href = authUrl;
    },

    /**
     * Verificar si el usuario está autenticado
     * El navegador envía la cookie automáticamente gracias a withCredentials: true
     */
    async checkAuth(): Promise<AuthResponse> {
      console.log("activando checkAuth");

      try {
        const { data } = await axiosInstance.get<UserToken>("/auth/me");
        return {
          success: true,
          authenticated: true,
          user: data,
        };
      } catch (error) {
        console.error("Error checking auth:", error);
        return { success: false, authenticated: false };
      }
    },

    /**
     * Logout - El backend eliminará la cookie
     */
    async logout(): Promise<void> {
      await axiosInstance.post("/auth/logout");
    },
  },

  // ==========================================
  // USUARIOS
  // ==========================================
  users: {
    /**
     * Obtener todos los usuarios
     */
    async getAll(): Promise<FindAllUsersResponse> {
      const { data } = await axiosInstance.get<FindAllUsersResponse>("/users");
      return data;
    },

    /**
     * Obtener un usuario por ID
     */
    async getById(id: string): Promise<FindUserByIdResponse> {
      const { data } = await axiosInstance.get<FindUserByIdResponse>(
        `/users/${id}`
      );
      return data;
    },

    /**
     * Crear o actualizar un usuario (upsert)
     */
    async upsert(userData: UpsertUserDto): Promise<UpsertUserResponse> {
      const { data } = await axiosInstance.post<UpsertUserResponse>(
        "/users",
        userData
      );
      return data;
    },

    /**
     * Eliminar un usuario
     */
    async delete(id: string): Promise<DeleteUserResponse> {
      const { data } = await axiosInstance.delete<DeleteUserResponse>(
        `/users/${id}`
      );
      return data;
    },
  },

  // ==========================================
  // VISIONES
  // ==========================================
  visiones: {
    /**
     * Obtener todas las visiones del usuario autenticado
     */
    async getAll(): Promise<FindVisionsByUserIdResponse> {
      const { data } = await axiosInstance.get<FindVisionsByUserIdResponse>(
        "/visiones"
      );
      return data;
    },

    /**
     * Obtener una visión por ID
     */
    async getById(id: string): Promise<FindVisionByIdResponse> {
      const { data } = await axiosInstance.get<FindVisionByIdResponse>(
        `/visiones/${id}`
      );
      return data;
    },

    /**
     * Crear o actualizar una visión (upsert)
     */
    async upsert(visionData: UpsertVisionDto): Promise<UpsertVisionResponse> {
      const { data } = await axiosInstance.post<UpsertVisionResponse>(
        "/visiones",
        visionData
      );
      return data;
    },

    /**
     * Eliminar una visión
     */
    async delete(id: string): Promise<DeleteVisionResponse> {
      const { data } = await axiosInstance.delete<DeleteVisionResponse>(
        `/visiones/${id}`
      );
      return data;
    },
  },

  // ==========================================
  // METAS
  // ==========================================
  metas: {
    /**
     * Obtener todas las metas de una visión específica
     */
    async getByVisionId(visionId: string): Promise<FindMetasByVisionIdResponse> {
      const { data } = await axiosInstance.get<FindMetasByVisionIdResponse>(
        `/metas?visionId=${visionId}`
      );
      return data;
    },

    /**
     * Obtener una meta por ID
     */
    async getById(id: string): Promise<FindMetaByIdResponse> {
      const { data } = await axiosInstance.get<FindMetaByIdResponse>(
        `/metas/${id}`
      );
      return data;
    },

    /**
     * Crear o actualizar una meta (upsert)
     */
    async upsert(metaData: UpsertMetaDto): Promise<UpsertMetaResponse> {
      const { data } = await axiosInstance.post<UpsertMetaResponse>(
        "/metas",
        metaData
      );
      return data;
    },

    /**
     * Eliminar una meta
     */
    async delete(id: string): Promise<DeleteMetaResponse> {
      const { data } = await axiosInstance.delete<DeleteMetaResponse>(
        `/metas/${id}`
      );
      return data;
    },
  },

  // ==========================================
  // OBJETIVOS
  // ==========================================
  objetivos: {
    /**
     * Obtener todos los objetivos de una meta específica
     */
    async getByMetaId(metaId: string): Promise<FindObjetivosByMetaIdResponse> {
      const { data } = await axiosInstance.get<FindObjetivosByMetaIdResponse>(
        `/objetivos?metaId=${metaId}`
      );
      return data;
    },

    /**
     * Obtener un objetivo por ID
     */
    async getById(id: string): Promise<FindObjetivoByIdResponse> {
      const { data } = await axiosInstance.get<FindObjetivoByIdResponse>(
        `/objetivos/${id}`
      );
      return data;
    },

    /**
     * Crear o actualizar un objetivo (upsert)
     */
    async upsert(
      objetivoData: UpsertObjetivoDto
    ): Promise<UpsertObjetivoResponse> {
      const { data } = await axiosInstance.post<UpsertObjetivoResponse>(
        "/objetivos",
        objetivoData
      );
      return data;
    },

    /**
     * Eliminar un objetivo
     */
    async delete(id: string): Promise<DeleteObjetivoResponse> {
      const { data } = await axiosInstance.delete<DeleteObjetivoResponse>(
        `/objetivos/${id}`
      );
      return data;
    },
  },

  // ==========================================
  // MISIONES
  // ==========================================
  misiones: {
    /**
     * Obtener todas las misiones de un objetivo específico
     */
    async getByObjetivoId(
      objetivoId: string
    ): Promise<FindMisionesByObjetivoIdResponse> {
      const { data } =
        await axiosInstance.get<FindMisionesByObjetivoIdResponse>(
          `/misiones?objetivoId=${objetivoId}`
        );
      return data;
    },

    /**
     * Obtener una misión por ID
     */
    async getById(id: string): Promise<FindMisionByIdResponse> {
      const { data } = await axiosInstance.get<FindMisionByIdResponse>(
        `/misiones/${id}`
      );
      return data;
    },

    /**
     * Crear o actualizar una misión (upsert)
     */
    async upsert(misionData: UpsertMisionDto): Promise<UpsertMisionResponse> {
      const { data } = await axiosInstance.post<UpsertMisionResponse>(
        "/misiones",
        misionData
      );
      return data;
    },

    /**
     * Eliminar una misión
     */
    async delete(id: string): Promise<DeleteMisionResponse> {
      const { data } = await axiosInstance.delete<DeleteMisionResponse>(
        `/misiones/${id}`
      );
      return data;
    },
  },

  // ==========================================
  // TAREAS
  // ==========================================
  tareas: {
    /**
     * Obtener todas las tareas de una misión específica
     */
    async getByMisionId(misionId: string): Promise<FindTareasByMisionIdResponse> {
      const { data } = await axiosInstance.get<FindTareasByMisionIdResponse>(
        `/tareas?misionId=${misionId}`
      );
      return data;
    },

    /**
     * Obtener una tarea por ID
     */
    async getById(id: string): Promise<FindTareaByIdResponse> {
      const { data } = await axiosInstance.get<FindTareaByIdResponse>(
        `/tareas/${id}`
      );
      return data;
    },

    /**
     * Crear o actualizar una tarea (upsert)
     */
    async upsert(tareaData: UpsertTareaDto): Promise<UpsertTareaResponse> {
      const { data } = await axiosInstance.post<UpsertTareaResponse>(
        "/tareas",
        tareaData
      );
      return data;
    },

    /**
     * Eliminar una tarea
     */
    async delete(id: string): Promise<DeleteTareaResponse> {
      const { data } = await axiosInstance.delete<DeleteTareaResponse>(
        `/tareas/${id}`
      );
      return data;
    },
  },

  // ==========================================
  // MÉTODOS GENÉRICOS (para casos especiales)
  // ==========================================
  generic: {
    /**
     * Llamada GET genérica
     */
    async get<T>(endpoint: string): Promise<T> {
      const { data } = await axiosInstance.get<T>(endpoint);
      return data;
    },

    /**
     * Llamada POST genérica
     */
    async post<T>(endpoint: string, body: unknown): Promise<T> {
      const { data } = await axiosInstance.post<T>(endpoint, body);
      return data;
    },

    /**
     * Llamada PUT genérica
     */
    async put<T>(endpoint: string, body: unknown): Promise<T> {
      const { data } = await axiosInstance.put<T>(endpoint, body);
      return data;
    },

    /**
     * Llamada DELETE genérica
     */
    async delete<T>(endpoint: string): Promise<T> {
      const { data } = await axiosInstance.delete<T>(endpoint);
      return data;
    },
  },
};

// ============================================
// EXPORTS DE TIPOS (para conveniencia)
// ============================================

export type {
  // User
  User,
  UserWithVisions,
  UpsertUserDto,
  FindAllUsersResponse,
  FindUserByIdResponse,
  UpsertUserResponse,
  DeleteUserResponse,
  // Vision
  Vision,
  VisionWithRelations,
  UpsertVisionDto,
  FindVisionsByUserIdResponse,
  FindVisionByIdResponse,
  UpsertVisionResponse,
  DeleteVisionResponse,
  // Meta
  Meta,
  MetaWithRelations,
  UpsertMetaDto,
  FindMetasByVisionIdResponse,
  FindMetaByIdResponse,
  UpsertMetaResponse,
  DeleteMetaResponse,
  // Objetivo
  Objetivo,
  ObjetivoWithRelations,
  UpsertObjetivoDto,
  FindObjetivosByMetaIdResponse,
  FindObjetivoByIdResponse,
  UpsertObjetivoResponse,
  DeleteObjetivoResponse,
  // Mision
  Mision,
  MisionWithRelations,
  UpsertMisionDto,
  FindMisionesByObjetivoIdResponse,
  FindMisionByIdResponse,
  UpsertMisionResponse,
  DeleteMisionResponse,
  // Tarea
  Tarea,
  TareaWithRelations,
  UpsertTareaDto,
  FindTareasByMisionIdResponse,
  FindTareaByIdResponse,
  UpsertTareaResponse,
  DeleteTareaResponse,
};
