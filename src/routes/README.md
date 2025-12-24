# Documentación de Rutas API

## Base URL
Todas las rutas están prefijadas con `/api`

---

## Autenticación

### Auth Routes (`/api/auth`)

#### `GET /api/auth/google`
Inicia el proceso de autenticación con Google OAuth.

**Request:** Ninguno
**Response:** Redirección a Google OAuth

---

#### `GET /api/auth/google/callback`
Callback de autenticación de Google OAuth.

**Request:** Query params de Google OAuth
**Response:** Redirección con cookie de sesión

---

#### `GET /api/auth/me`
Obtiene la información del usuario autenticado.

**Request:** Ninguno (requiere autenticación)

**Response Type:** `UserToken`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
interface UserToken {
  id: string;
  email: string;
  nombre: string;
}
```
</details>

---

#### `GET /api/auth/failure`
Ruta de fallo de autenticación.

**Request:** Ninguno
**Response:** Mensaje de error

---

#### `POST /api/auth/logout`
Cierra la sesión del usuario.

**Request:** Ninguno
**Response:** Confirmación de logout

---

## Usuarios

### User Routes (`/api/users`)
**Nota:** Todas las rutas requieren autenticación

#### `GET /api/users`
Obtiene todos los usuarios.

**Request:** Ninguno

**Response Type:** `FindAllUsersResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindAllUsersResponse = UserWithVisions[];

interface UserWithVisions extends User {
  visiones: Vision[];
}

interface User {
  id: string;
  email: string;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Vision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `GET /api/users/:id`
Obtiene un usuario por ID.

**Request Params:**
- `id`: string

**Response Type:** `FindUserByIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindUserByIdResponse = UserWithVisions | null;

interface UserWithVisions extends User {
  visiones: Vision[];
}

interface User {
  id: string;
  email: string;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Vision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `POST /api/users`
Crea o actualiza un usuario (upsert).

**Request Type:** `UpsertUserDto`

<details>
<summary>📋 Copiar definición de tipo Request</summary>

```typescript
interface UpsertUserDto {
  id?: string;
  email: string;
  nombre: string;
}
```
</details>

**Response Type:** `UpsertUserResponse`

<details>
<summary>📋 Copiar definición de tipo Response</summary>

```typescript
type UpsertUserResponse = User;

interface User {
  id: string;
  email: string;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `DELETE /api/users/:id`
Elimina un usuario por ID.

**Request Params:**
- `id`: string

**Response Type:** `DeleteUserResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type DeleteUserResponse = User;

interface User {
  id: string;
  email: string;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

## Visiones

### Vision Routes (`/api/visiones`)
**Nota:** Todas las rutas requieren autenticación

#### `GET /api/visiones`
Obtiene todas las visiones del usuario autenticado.

**Request:** Ninguno (usa el token de autenticación)

**Response Type:** `FindByUserIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindByUserIdResponse = VisionWithRelations[];

interface VisionWithRelations extends Vision {
  usuario: User;
  metas: Meta[];
}

interface Vision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  email: string;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Meta {
  id: string;
  titulo: string;
  descripcion?: string | null;
  visionId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `GET /api/visiones/:id`
Obtiene una visión por ID.

**Request Params:**
- `id`: string

**Response Type:** `FindVisionByIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindVisionByIdResponse = VisionWithRelations | null;

interface VisionWithRelations extends Vision {
  usuario: User;
  metas: Meta[];
}

interface Vision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  email: string;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Meta {
  id: string;
  titulo: string;
  descripcion?: string | null;
  visionId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `POST /api/visiones`
Crea o actualiza una visión (upsert).

**Request Type:** `UpsertVisionDto`

<details>
<summary>📋 Copiar definición de tipo Request</summary>

```typescript
interface UpsertVisionDto {
  id?: string;
  titulo: string;
  descripcion?: string;
  usuarioId: string;
}
```
</details>

**Response Type:** `UpsertVisionResponse`

<details>
<summary>📋 Copiar definición de tipo Response</summary>

```typescript
type UpsertVisionResponse = Vision;

interface Vision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `DELETE /api/visiones/:id`
Elimina una visión por ID.

**Request Params:**
- `id`: string

**Response Type:** `DeleteVisionResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type DeleteVisionResponse = Vision;

interface Vision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

## Metas

### Meta Routes (`/api/metas`)
**Nota:** Todas las rutas requieren autenticación

#### `GET /api/metas?visionId={visionId}`
Obtiene todas las metas de una visión específica.

**Request Query Params:**
- `visionId`: string (requerido)

**Response Type:** `FindByVisionIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindByVisionIdResponse = MetaWithRelations[];

interface MetaWithRelations extends Meta {
  vision: Vision;
  objetivos: Objetivo[];
}

interface Meta {
  id: string;
  titulo: string;
  descripcion?: string | null;
  visionId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Vision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Objetivo {
  id: string;
  titulo: string;
  descripcion?: string | null;
  metaId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `GET /api/metas/:id`
Obtiene una meta por ID.

**Request Params:**
- `id`: string

**Response Type:** `FindMetaByIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindMetaByIdResponse = MetaWithRelations | null;

interface MetaWithRelations extends Meta {
  vision: Vision;
  objetivos: Objetivo[];
}

interface Meta {
  id: string;
  titulo: string;
  descripcion?: string | null;
  visionId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Vision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Objetivo {
  id: string;
  titulo: string;
  descripcion?: string | null;
  metaId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `POST /api/metas`
Crea o actualiza una meta (upsert).

**Request Type:** `UpsertMetaDto`

<details>
<summary>📋 Copiar definición de tipo Request</summary>

```typescript
interface UpsertMetaDto {
  id?: string;
  titulo: string;
  descripcion?: string;
  visionId: string;
}
```
</details>

**Response Type:** `UpsertMetaResponse`

<details>
<summary>📋 Copiar definición de tipo Response</summary>

```typescript
type UpsertMetaResponse = Meta;

interface Meta {
  id: string;
  titulo: string;
  descripcion?: string | null;
  visionId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `DELETE /api/metas/:id`
Elimina una meta por ID.

**Request Params:**
- `id`: string

**Response Type:** `DeleteMetaResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type DeleteMetaResponse = Meta;

interface Meta {
  id: string;
  titulo: string;
  descripcion?: string | null;
  visionId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

## Objetivos

### Objetivo Routes (`/api/objetivos`)
**Nota:** Todas las rutas requieren autenticación

#### `GET /api/objetivos?metaId={metaId}`
Obtiene todos los objetivos de una meta específica.

**Request Query Params:**
- `metaId`: string (requerido)

**Response Type:** `FindByMetaIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindByMetaIdResponse = ObjetivoWithRelations[];

interface ObjetivoWithRelations extends Objetivo {
  meta: Meta;
  misiones: Mision[];
}

interface Objetivo {
  id: string;
  titulo: string;
  descripcion?: string | null;
  metaId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Meta {
  id: string;
  titulo: string;
  descripcion?: string | null;
  visionId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Mision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  objetivoId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `GET /api/objetivos/:id`
Obtiene un objetivo por ID.

**Request Params:**
- `id`: string

**Response Type:** `FindObjetivoByIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindObjetivoByIdResponse = ObjetivoWithRelations | null;

interface ObjetivoWithRelations extends Objetivo {
  meta: Meta;
  misiones: Mision[];
}

interface Objetivo {
  id: string;
  titulo: string;
  descripcion?: string | null;
  metaId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Meta {
  id: string;
  titulo: string;
  descripcion?: string | null;
  visionId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Mision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  objetivoId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `POST /api/objetivos`
Crea o actualiza un objetivo (upsert).

**Request Type:** `UpsertObjetivoDto`

<details>
<summary>📋 Copiar definición de tipo Request</summary>

```typescript
interface UpsertObjetivoDto {
  id?: string;
  titulo: string;
  descripcion?: string;
  metaId: string;
}
```
</details>

**Response Type:** `UpsertObjetivoResponse`

<details>
<summary>📋 Copiar definición de tipo Response</summary>

```typescript
type UpsertObjetivoResponse = Objetivo;

interface Objetivo {
  id: string;
  titulo: string;
  descripcion?: string | null;
  metaId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `DELETE /api/objetivos/:id`
Elimina un objetivo por ID.

**Request Params:**
- `id`: string

**Response Type:** `DeleteObjetivoResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type DeleteObjetivoResponse = Objetivo;

interface Objetivo {
  id: string;
  titulo: string;
  descripcion?: string | null;
  metaId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

## Misiones

### Mision Routes (`/api/misiones`)
**Nota:** Todas las rutas requieren autenticación

#### `GET /api/misiones?objetivoId={objetivoId}`
Obtiene todas las misiones de un objetivo específico.

**Request Query Params:**
- `objetivoId`: string (requerido)

**Response Type:** `FindByObjetivoIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindByObjetivoIdResponse = MisionWithRelations[];

interface MisionWithRelations extends Mision {
  objetivo: Objetivo;
  tareas: Tarea[];
}

interface Mision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  objetivoId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Objetivo {
  id: string;
  titulo: string;
  descripcion?: string | null;
  metaId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string | null;
  completada: boolean;
  misionId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `GET /api/misiones/:id`
Obtiene una misión por ID.

**Request Params:**
- `id`: string

**Response Type:** `FindMisionByIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindMisionByIdResponse = MisionWithRelations | null;

interface MisionWithRelations extends Mision {
  objetivo: Objetivo;
  tareas: Tarea[];
}

interface Mision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  objetivoId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Objetivo {
  id: string;
  titulo: string;
  descripcion?: string | null;
  metaId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string | null;
  completada: boolean;
  misionId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `POST /api/misiones`
Crea o actualiza una misión (upsert).

**Request Type:** `UpsertMisionDto`

<details>
<summary>📋 Copiar definición de tipo Request</summary>

```typescript
interface UpsertMisionDto {
  id?: string;
  titulo: string;
  descripcion?: string;
  objetivoId: string;
}
```
</details>

**Response Type:** `UpsertMisionResponse`

<details>
<summary>📋 Copiar definición de tipo Response</summary>

```typescript
type UpsertMisionResponse = Mision;

interface Mision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  objetivoId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `DELETE /api/misiones/:id`
Elimina una misión por ID.

**Request Params:**
- `id`: string

**Response Type:** `DeleteMisionResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type DeleteMisionResponse = Mision;

interface Mision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  objetivoId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

## Tareas

### Tarea Routes (`/api/tareas`)
**Nota:** Todas las rutas requieren autenticación

#### `GET /api/tareas?misionId={misionId}`
Obtiene todas las tareas de una misión específica.

**Request Query Params:**
- `misionId`: string (requerido)

**Response Type:** `FindByMisionIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindByMisionIdResponse = TareaWithRelations[];

interface TareaWithRelations extends Tarea {
  mision: Mision;
}

interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string | null;
  completada: boolean;
  misionId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Mision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  objetivoId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `GET /api/tareas/:id`
Obtiene una tarea por ID.

**Request Params:**
- `id`: string

**Response Type:** `FindTareaByIdResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type FindTareaByIdResponse = TareaWithRelations | null;

interface TareaWithRelations extends Tarea {
  mision: Mision;
}

interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string | null;
  completada: boolean;
  misionId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Mision {
  id: string;
  titulo: string;
  descripcion?: string | null;
  objetivoId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `POST /api/tareas`
Crea o actualiza una tarea (upsert).

**Request Type:** `UpsertTareaDto`

<details>
<summary>📋 Copiar definición de tipo Request</summary>

```typescript
interface UpsertTareaDto {
  id?: string;
  titulo: string;
  descripcion?: string;
  completada?: boolean;
  misionId: string;
}
```
</details>

**Response Type:** `UpsertTareaResponse`

<details>
<summary>📋 Copiar definición de tipo Response</summary>

```typescript
type UpsertTareaResponse = Tarea;

interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string | null;
  completada: boolean;
  misionId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

#### `DELETE /api/tareas/:id`
Elimina una tarea por ID.

**Request Params:**
- `id`: string

**Response Type:** `DeleteTareaResponse`

<details>
<summary>📋 Copiar definición de tipo</summary>

```typescript
type DeleteTareaResponse = Tarea;

interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string | null;
  completada: boolean;
  misionId: string;
  createdAt: Date;
  updatedAt: Date;
}
```
</details>

---

## Jerarquía de Datos

La jerarquía de relaciones es la siguiente:

```
Usuario
  └── Visión (Vision)
       └── Meta
            └── Objetivo
                 └── Misión (Mision)
                      └── Tarea
```

## Tipos de Respuesta

Todos los tipos de respuesta están disponibles en `src/types` y se exportan desde los módulos correspondientes:

- **User Types**: `src/types/user/user.responses.ts`
- **Vision Types**: `src/types/vision/vision.responses.ts`
- **Meta Types**: `src/types/meta/meta.responses.ts`
- **Objetivo Types**: `src/types/objetivo/objetivo.responses.ts`
- **Mision Types**: `src/types/mision/mision.responses.ts`
- **Tarea Types**: `src/types/tarea/tarea.responses.ts`

## Autenticación

La autenticación se realiza mediante cookies. Las rutas protegidas requieren el middleware `authenticateToken` que verifica la cookie de sesión y extrae la información del usuario.

El token contiene la siguiente información:
```typescript
interface UserToken {
  id: string;
  email: string;
  nombre: string;
}
```
