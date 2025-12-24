# Guía de Uso del API Client

Este archivo contiene ejemplos de cómo usar el servicio de API (`client-api-service.ts`) en tu aplicación frontend.

## Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en tu proyecto frontend con:

```env
VITE_API_URL=http://localhost:3000/api
# O en producción:
# VITE_API_URL=https://tu-dominio.com/api
```

### 2. Importar el Servicio

```typescript
import { api } from './client-api-service';
```

## Ejemplos de Uso

### Autenticación

#### Login con Google

```typescript
// Redirige al flujo de OAuth de Google
const handleLogin = () => {
  api.auth.initiateGoogleLogin();
};
```

#### Verificar Autenticación

```typescript
const checkUserAuth = async () => {
  const response = await api.auth.checkAuth();

  if (response.authenticated) {
    console.log('Usuario autenticado:', response.user);
    // response.user contiene: { id, email, nombre }
  } else {
    console.log('Usuario no autenticado');
  }
};
```

#### Logout

```typescript
const handleLogout = async () => {
  try {
    await api.auth.logout();
    console.log('Sesión cerrada exitosamente');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
```

---

### Usuarios

#### Obtener Todos los Usuarios

```typescript
const fetchAllUsers = async () => {
  try {
    const users = await api.users.getAll();
    console.log('Usuarios:', users);
    // users es un array de UserWithVisions[]
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
};
```

#### Obtener Usuario por ID

```typescript
const fetchUserById = async (userId: string) => {
  try {
    const user = await api.users.getById(userId);
    if (user) {
      console.log('Usuario encontrado:', user);
      console.log('Visiones del usuario:', user.visiones);
    } else {
      console.log('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Crear o Actualizar Usuario

```typescript
const upsertUser = async () => {
  try {
    // Crear nuevo usuario
    const newUser = await api.users.upsert({
      email: 'nuevo@ejemplo.com',
      nombre: 'Nuevo Usuario',
    });
    console.log('Usuario creado:', newUser);

    // Actualizar usuario existente
    const updatedUser = await api.users.upsert({
      id: newUser.id,
      email: 'actualizado@ejemplo.com',
      nombre: 'Usuario Actualizado',
    });
    console.log('Usuario actualizado:', updatedUser);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Eliminar Usuario

```typescript
const deleteUser = async (userId: string) => {
  try {
    const deletedUser = await api.users.delete(userId);
    console.log('Usuario eliminado:', deletedUser);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
};
```

---

### Visiones

#### Obtener Todas las Visiones del Usuario Autenticado

```typescript
const fetchMyVisiones = async () => {
  try {
    const visiones = await api.visiones.getAll();
    console.log('Mis visiones:', visiones);
    // Cada visión incluye: usuario, metas[]
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Obtener Visión por ID

```typescript
const fetchVisionById = async (visionId: string) => {
  try {
    const vision = await api.visiones.getById(visionId);
    if (vision) {
      console.log('Visión:', vision);
      console.log('Metas:', vision.metas);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Crear Nueva Visión

```typescript
const createVision = async (userId: string) => {
  try {
    const newVision = await api.visiones.upsert({
      titulo: 'Mi Gran Visión',
      descripcion: 'Descripción de mi visión',
      usuarioId: userId,
    });
    console.log('Visión creada:', newVision);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Actualizar Visión

```typescript
const updateVision = async (visionId: string, userId: string) => {
  try {
    const updatedVision = await api.visiones.upsert({
      id: visionId,
      titulo: 'Visión Actualizada',
      descripcion: 'Nueva descripción',
      usuarioId: userId,
    });
    console.log('Visión actualizada:', updatedVision);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Eliminar Visión

```typescript
const deleteVision = async (visionId: string) => {
  try {
    const deletedVision = await api.visiones.delete(visionId);
    console.log('Visión eliminada:', deletedVision);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

### Metas

#### Obtener Metas de una Visión

```typescript
const fetchMetasByVision = async (visionId: string) => {
  try {
    const metas = await api.metas.getByVisionId(visionId);
    console.log('Metas de la visión:', metas);
    // Cada meta incluye: vision, objetivos[]
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Crear Meta

```typescript
const createMeta = async (visionId: string) => {
  try {
    const newMeta = await api.metas.upsert({
      titulo: 'Nueva Meta',
      descripcion: 'Descripción de la meta',
      visionId: visionId,
    });
    console.log('Meta creada:', newMeta);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

### Objetivos

#### Obtener Objetivos de una Meta

```typescript
const fetchObjetivosByMeta = async (metaId: string) => {
  try {
    const objetivos = await api.objetivos.getByMetaId(metaId);
    console.log('Objetivos de la meta:', objetivos);
    // Cada objetivo incluye: meta, misiones[]
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Crear Objetivo

```typescript
const createObjetivo = async (metaId: string) => {
  try {
    const newObjetivo = await api.objetivos.upsert({
      titulo: 'Nuevo Objetivo',
      descripcion: 'Descripción del objetivo',
      metaId: metaId,
    });
    console.log('Objetivo creado:', newObjetivo);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

### Misiones

#### Obtener Misiones de un Objetivo

```typescript
const fetchMisionesByObjetivo = async (objetivoId: string) => {
  try {
    const misiones = await api.misiones.getByObjetivoId(objetivoId);
    console.log('Misiones del objetivo:', misiones);
    // Cada misión incluye: objetivo, tareas[]
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Crear Misión

```typescript
const createMision = async (objetivoId: string) => {
  try {
    const newMision = await api.misiones.upsert({
      titulo: 'Nueva Misión',
      descripcion: 'Descripción de la misión',
      objetivoId: objetivoId,
    });
    console.log('Misión creada:', newMision);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

### Tareas

#### Obtener Tareas de una Misión

```typescript
const fetchTareasByMision = async (misionId: string) => {
  try {
    const tareas = await api.tareas.getByMisionId(misionId);
    console.log('Tareas de la misión:', tareas);
    // Cada tarea incluye: mision
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Crear Tarea

```typescript
const createTarea = async (misionId: string) => {
  try {
    const newTarea = await api.tareas.upsert({
      titulo: 'Nueva Tarea',
      descripcion: 'Descripción de la tarea',
      completada: false,
      misionId: misionId,
    });
    console.log('Tarea creada:', newTarea);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Marcar Tarea como Completada

```typescript
const completeTarea = async (tareaId: string, misionId: string) => {
  try {
    // Primero obtenemos la tarea actual
    const tarea = await api.tareas.getById(tareaId);

    if (tarea) {
      // Luego la actualizamos
      const updatedTarea = await api.tareas.upsert({
        id: tareaId,
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        completada: true, // ← Marcamos como completada
        misionId: misionId,
      });
      console.log('Tarea completada:', updatedTarea);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## Ejemplo Completo: Flujo de Trabajo

```typescript
const completeWorkflow = async () => {
  try {
    // 1. Verificar autenticación
    const authResponse = await api.auth.checkAuth();
    if (!authResponse.authenticated || !authResponse.user) {
      console.log('Usuario no autenticado');
      return;
    }

    const userId = authResponse.user.id;

    // 2. Crear una visión
    const vision = await api.visiones.upsert({
      titulo: 'Visión 2024',
      descripcion: 'Mi visión para el año',
      usuarioId: userId,
    });

    // 3. Crear una meta para esa visión
    const meta = await api.metas.upsert({
      titulo: 'Meta Principal',
      descripcion: 'Mi meta principal',
      visionId: vision.id,
    });

    // 4. Crear un objetivo para esa meta
    const objetivo = await api.objetivos.upsert({
      titulo: 'Objetivo Específico',
      descripcion: 'Descripción del objetivo',
      metaId: meta.id,
    });

    // 5. Crear una misión para ese objetivo
    const mision = await api.misiones.upsert({
      titulo: 'Misión Importante',
      descripcion: 'Descripción de la misión',
      objetivoId: objetivo.id,
    });

    // 6. Crear tareas para esa misión
    const tarea1 = await api.tareas.upsert({
      titulo: 'Tarea 1',
      descripcion: 'Primera tarea',
      completada: false,
      misionId: mision.id,
    });

    const tarea2 = await api.tareas.upsert({
      titulo: 'Tarea 2',
      descripcion: 'Segunda tarea',
      completada: false,
      misionId: mision.id,
    });

    console.log('Flujo completo creado exitosamente!');

    // 7. Obtener toda la jerarquía
    const misVisiones = await api.visiones.getAll();
    console.log('Estructura completa:', misVisiones);
  } catch (error) {
    console.error('Error en el flujo:', error);
  }
};
```

---

## Uso en Componentes React

### Ejemplo con React Hooks

```typescript
import { useState, useEffect } from 'react';
import { api, type VisionWithRelations } from './client-api-service';

function VisionesComponent() {
  const [visiones, setVisiones] = useState<VisionWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisiones = async () => {
      try {
        setLoading(true);
        const data = await api.visiones.getAll();
        setVisiones(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las visiones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisiones();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Mis Visiones</h1>
      {visiones.map((vision) => (
        <div key={vision.id}>
          <h2>{vision.titulo}</h2>
          <p>{vision.descripcion}</p>
          <p>Metas: {vision.metas.length}</p>
        </div>
      ))}
    </div>
  );
}
```

### Ejemplo con TanStack Query (React Query)

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './client-api-service';

// Hook personalizado para obtener visiones
export const useVisiones = () => {
  return useQuery({
    queryKey: ['visiones'],
    queryFn: () => api.visiones.getAll(),
  });
};

// Hook para crear/actualizar visión
export const useUpsertVision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.visiones.upsert,
    onSuccess: () => {
      // Invalidar y refrescar
      queryClient.invalidateQueries({ queryKey: ['visiones'] });
    },
  });
};

// Uso en componente
function VisionForm({ userId }: { userId: string }) {
  const { data: visiones, isLoading } = useVisiones();
  const upsertVision = useUpsertVision();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await upsertVision.mutateAsync({
        titulo: 'Nueva Visión',
        descripcion: 'Descripción',
        usuarioId: userId,
      });
      alert('Visión creada!');
    } catch (error) {
      alert('Error al crear visión');
    }
  };

  // ... resto del componente
}
```

---

## Manejo de Errores

```typescript
const handleApiCall = async () => {
  try {
    const data = await api.visiones.getAll();
    console.log('Datos:', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log('No autenticado - redirigir al login');
        // Redirigir al login
      } else if (error.response?.status === 404) {
        console.log('Recurso no encontrado');
      } else {
        console.log('Error del servidor:', error.response?.data);
      }
    } else {
      console.log('Error desconocido:', error);
    }
  }
};
```

---

## Tipos TypeScript

Todos los tipos están disponibles para importar:

```typescript
import type {
  // Auth
  UserToken,
  AuthResponse,
  // User
  User,
  UserWithVisions,
  UpsertUserDto,
  // Vision
  Vision,
  VisionWithRelations,
  UpsertVisionDto,
  // Meta
  Meta,
  MetaWithRelations,
  UpsertMetaDto,
  // Objetivo
  Objetivo,
  ObjetivoWithRelations,
  UpsertObjetivoDto,
  // Mision
  Mision,
  MisionWithRelations,
  UpsertMisionDto,
  // Tarea
  Tarea,
  TareaWithRelations,
  UpsertTareaDto,
} from './client-api-service';
```

---

## Notas Importantes

1. **Autenticación con Cookies**: El servicio está configurado con `withCredentials: true`, por lo que las cookies se envían automáticamente.

2. **Timeout**: Las peticiones tienen un timeout de 10 segundos. Si necesitas más tiempo, modifica `axiosInstance.timeout`.

3. **Proxy en Desarrollo**: Si usas un proxy en desarrollo (Vite, CRA, etc.), el servicio detecta automáticamente si debe usar rutas relativas o absolutas.

4. **TypeScript**: Todos los métodos están completamente tipados. Tu IDE te dará autocompletado y verificación de tipos.

5. **Manejo de Errores**: El interceptor de axios maneja automáticamente errores 401, pero puedes agregar más lógica según necesites.
