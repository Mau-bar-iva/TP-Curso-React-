# CARPETA DE INGENIERÍA DE SOFTWARE: MODEAVELOUR E-COMMERCE

---

## 1. INTRODUCCIÓN Y PROPÓSITO DEL PROYECTO

### 1.1 Nombre del Sistema
**ModeaVelour** (Plataforma E-Commerce & Retail Management).

### 1.2 Descripción General
ModeaVelour es una plataforma web integral de comercio electrónico orientada al sector de indumentaria y accesorios de moda sostenible. El proyecto comprende dos frentes principales:
1. **Frontend del Cliente (B2C):** Catálogo dinámico con navegación por colecciones, filtrado multidimensional (talles, colores, marcas), carrito de compras reactivo, lista de deseos (favoritos) y flujo de checkout simulado.
2. **Backoffice Administrativo (ABM / ERP Light):** Panel de control protegido para gestión de inventario, alta/baja/modificación de productos, control de variantes (talles y colores) y monitoreo de órdenes.

### 1.3 Propósito Técnico (Portfolio Showcase)
Demostrar dominio en el desarrollo de software moderno full-stack bajo un stack escalable:
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL. Arquitectura multicapa limpia (Clean Architecture / Controller-Service-Repository).
- **Frontend:** React, Vite, TypeScript, TailwindCSS, Context API, diseño UI/UX responsivo con estética editorial/minimalista.
- **Seguridad e Infraestructura:** Autenticación JWT stateless mediante cookies `httpOnly`, validación estricta de esquemas (Zod), migraciones declarativas y contenedores Docker para entorno local.

---

## 2. RECOMENDACIÓN ESTRATÉGICA: TRANSACCIONES, PAGOS Y ENVÍOS

### 2.1 Cómo se manejan los pagos y transacciones en e-commerce modernos
En la industria real, los sistemas **nunca** almacenan números de tarjetas en su base de datos (por normativas PCI-DSS). Se utilizan Pasarelas de Pago (Payment Gateways) como **Stripe**, **Mercado Pago** o **PayPal**:
1. El cliente envía su orden desde el frontend.
2. El backend calcula el monto total real desde la base de datos (evitando que el cliente manipule el precio).
3. El backend crea una *Preferencia de Pago* o *PaymentIntent* en la API de la pasarela y devuelve un ID de sesión o redirect URL.
4. El cliente paga en el entorno seguro de la pasarela.
5. La pasarela emite un **Webhook (evento POST asincrónico firmado)** al backend notificando: `payment.success` o `payment.failed`.
6. El backend procesa el webhook dentro de una **transacción atómica de base de datos** (`prisma.$transaction`), descuenta el inventario (stock) y cambia el estado de la orden a `PAID`.

### 2.2 Estrategia recomendada para este Portfolio
> **Decisión:** Implementar un **Checkout Simulado con Transacciones Atómicas Reales en Base de Datos**, dejando la integración con APIs reales (Stripe/Mercado Pago) como una integración opcional/fase posterior.

**¿Por qué suma más valor técnico a un reclutador?**
- Conectar un SDK de Stripe es solo copiar un tutorial de 10 líneas.
- Diseñar la lógica backend donde se valide concurrencia, idempotencia, cálculo de importes en el servidor y reducción de stock dentro de una transacción en PostgreSQL (`BEGIN...COMMIT / ROLLBACK` gestionado por Prisma) demuestra **conocimiento real de ingeniería de software**.
- Se evita depender de credenciales bancarias de prueba o cuentas de terceros que expiren en el portafolio.

---

## 3. ALCANCE DEL SISTEMA (SCOPE)

### 3.1 Dentro del Alcance (In Scope)
- **Gestión de Identidad y Accesos (RBAC):**
  - Autenticación segura mediante JWT almacenados en cookies seguras (`httpOnly`, `SameSite=Strict`).
  - Roles definidos: `CLIENT` y `ADMIN`.
  - Rutas frontend protegidas y middlewares de autorización en backend.
- **Catálogo de Productos & Filtros:**
  - Estructura de variantes: Productos con múltiples talles, colores y stock asociado.
  - Filtrado multidimensional en servidor/cliente por categoría, temporada, color, marca y ordenamiento (precio, fecha).
- **Carrito y Favoritos:**
  - Carrito local con sincronización de contexto y verificación de stock contra backend.
  - Lista de deseos (Wishlist) persistente por usuario.
- **Panel Administrativo (ABM de Productos):**
  - Creación, edición y borrado (físico o lógico) de productos y sus variantes.
  - Carga segura de imágenes mediante servicio cloud (Cloudinary / ImgBB) con sanitización de tipos MIME.
- **Órdenes y Transacciones (Checkout Simulado):**
  - Creación de órdenes de compra con estado: `PENDING`, `COMPLETED`, `CANCELLED`.
  - Disminución atómica de stock mediante `prisma.$transaction`.
- **Diseño Responsivo & UI/UX:**
  - Mobile-first con breakpoints consistentes, microinteracciones, estados de carga (skeletons) y feedback accesible (toasts).

### 3.2 Fuera del Alcance (Out of Scope)
- Integración bancaria con cobro monetario en vivo (producción PCI-DSS).
- Cotización automática con APIs de logística física en tiempo real (DHL, Correo Argentino, FedEx).
- Facturación electrónica impositiva legal (AFIP, SAT, etc.).
- Soporte multilingüe / internacionalización (i18n) automatizada.

---

## 4. REGLAS DE NEGOCIO (RN)

- **RN-01 (Inmutabilidad de Precios en Compra):** El total de la orden se calcula **exclusivamente en el backend** consultando el valor unitario en la base de datos al momento de ejecutar la orden. No se aceptan montos enviados desde el payload del cliente.
- **RN-02 (Atomicidad del Stock):** Al momento de confirmarse una orden, el stock de las variantes seleccionadas debe decrementar. Si alguna variante no posee stock suficiente (`stock < requestedQuantity`), la transacción completa debe revertirse (`ROLLBACK`) notificando el producto faltante.
- **RN-03 (Acceso al ABM):** Las rutas de mutación de catálogo (`POST`, `PUT`, `DELETE /api/products`) requieren rol `ADMIN` verificado mediante token criptográfico válido.
- **RN-04 (Autenticación Segura de Claves):** Toda contraseña debe ser procesada con un algoritmo de hashing unidireccional con salt dinámico (Bcrypt, mínimo 10 rondas de salt) de forma estrictamente asíncrona.
- **RN-05 (Unicidad de Variantes):** Un producto no puede registrar dos combinaciones idénticas de color y talle en el inventario.
- **RN-06 (Limpieza de Sesión):** El cierre de sesión (`/api/auth/logout`) invalida la cookie del cliente sobrescribiéndola con expiración inmediata en el encabezado `Set-Cookie`.

---

## 5. REQUERIMIENTOS DEL SISTEMA

### 5.1 Requerimientos Funcionales (RF)
- **RF-01 (Registro y Autenticación):** El sistema debe permitir registrar usuarios (`POST /api/auth/register`), iniciar sesión (`POST /api/auth/login`) y consultar la sesión activa (`GET /api/auth/me`).
- **RF-02 (Exploración de Catálogo):** El usuario debe poder listar productos con paginación (`limit`, `page`), búsqueda por texto y filtros acumulativos por categoría, color y marca.
- **RF-03 (Detalle de Producto):** El usuario debe poder ver información técnica, selector de variantes (color/talle) e indicador dinámico de disponibilidad ("En stock" / "Agotado").
- **RF-04 (Administración de Carrito):** El usuario puede agregar variantes al carrito, modificar cantidades y eliminar ítems, con actualización reactiva del importe subtotal.
- **RF-05 (Checkout Simulado):** El usuario autenticado debe poder confirmar la compra de los ítems de su carrito, generando un registro único de orden y descontando el stock correspondiente.
- **RF-06 (Gestión de Favoritos):** Los usuarios registrados pueden añadir/remover productos a su lista de favoritos (`POST/DELETE /api/favorites`).
- **RF-07 (ABM Administrativo de Productos):** El administrador debe poder crear, editar, listar y eliminar productos junto a la subida de sus fotografías de muestra.

### 5.2 Requerimientos No Funcionales (RNF)
- **RNF-01 (Seguridad - Secretos y Configuración):** Ningún secreto (JWT secret, DB URL, API Keys) debe residir en el código fuente. Se cargarán mediante variables de entorno validadas en el arranque.
- **RNF-02 (Rendimiento):** Tiempos de respuesta menores a 200ms en endpoints de consulta de catálogo bajo carga local estándar.
- **RNF-03 (Tipado Estricto & Robustez):** 100% de la base de código backend migrada a TypeScript en modo estricto (`noImplicitAny: true`).
- **RNF-04 (Manejo Seguro de Errores):** Ningún error en producción debe exponer el stack trace al cliente. Se dispondrá de un middleware centralizado de errores.
- **RNF-05 (Diseño & Accesibilidad UI):** Interfaz fluida adaptable a Mobile (<768px), Tablet (768-1024px) y Desktop (>1024px), cumpliendo contrastes legibles WCAG 2.1 AA.

---

## 6. CASOS DE USO PRINCIPALES
+-----------------------+
              |      ModeaVelour      |
              +-----------------------+
                         |
     +-------------------+-------------------+
     |                                       |
[ Cliente ]                             [ Admin ]
     |                                       |
     +---> (CU-01: Explorar Catálogo)        +---> (CU-05: Gestionar Productos)
     +---> (CU-02: Gestionar Carrito)        +---> (CU-06: Ver Órdenes Recibidas)
     +---> (CU-03: Crear Favorito)           +---> (CU-07: Gestionar Variantes)
     +---> (CU-04: Ejecutar Checkout)


### CU-01: Exploración y Filtrado de Catálogo
- **Actor:** Cliente / Visitante no autenticado.
- **Precondición:** Existencia de productos cargados en la base de datos.
- **Flujo Principal:**
  1. El cliente ingresa a `/category`.
  2. Selecciona un filtro (ej. Color "Negro", Talle "M").
  3. El frontend envía los parámetros a `GET /api/products?color=Negro&size=M`.
  4. El servidor consulta mediante Prisma y retorna la lista paginada.
  5. El cliente visualiza los productos resultantes.

### CU-04: Finalización de Compra (Checkout Simulado)
- **Actor:** Cliente autenticado (`role: CLIENT` o `ADMIN`).
- **Precondición:** Usuario ha iniciado sesión y tiene ítems en el carrito.
- **Flujo Principal:**
  1. El cliente pulsa "Checkout" en `/carrito`.
  2. El frontend envía la lista de variantes y cantidades solicitadas a `POST /api/orders`.
  3. El backend abre una transacción Prisma:
     - Verifica existencia y stock de cada ítem.
     - Si hay stock: descuenta la cantidad requerida del stock disponible.
     - Crea el registro `Order` y sus `OrderItem` vinculados al `userId`.
  4. La transacción confirma (`COMMIT`).
  5. El backend devuelve HTTP 201 con el resumen de la orden generada.
  6. El frontend vacía el carrito y redirige al usuario a la pantalla de confirmación.
- **Flujo Alternativo (Falta de Stock):**
  - Si una variante no cuenta con el stock necesario, la transacción ejecuta un `ROLLBACK`.
  - El backend responde HTTP 409 con el detalle de los productos no disponibles.

### CU-05: Alta de Producto en ABM
- **Actor:** Administrador autenticado (`role: ADMIN`).
- **Precondición:** Cookie de sesión válida con privilegios de administrador.
- **Flujo Principal:**
  1. El administrador ingresa a `/admin/alta-productos`.
  2. Completa campos (Nombre, Descripción, Precio, Categoría) y selecciona archivo de imagen.
  3. La imagen se almacena en el servicio de imágenes y devuelve la URL.
  4. El formulario envía payload tipado a `POST /api/products`.
  5. El middleware `requireAuth` y el guard de roles autorizan la operación.
  6. El servicio registra el producto y sus variantes asociadas.
  7. El frontend notifica la creación exitosa y resetea el formulario.

---

## 7. ARQUITECTURA TÉCNICA Y ESPECIFICACIÓN DE BASE DE DATOS

### 7.1 Arquitectura Backend (Layered Clean Pattern)
[ Request HTTP ]
│
[ Middlewares: CORS, CookieParser, requireAuth, requireRole, errorHandler ]
│
[ Controllers: Validación de entrada (Zod / Express DTOs) ]
│
[ Services: Reglas de negocio y orquestación ]
│
[ Repositories / Prisma Client: Abstracción de acceso a datos ]
│
[ PostgreSQL Database ]

### 7.2 Modelo Entidad-Relación (Prisma Schema Reference)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  CLIENT
  ADMIN
}

enum OrderStatus {
  PENDING
  COMPLETED
  CANCELLED
}

model User {
  id           String     @id @default(uuid())
  email        String     @unique
  passwordHash String
  name         String?
  role         Role       @default(CLIENT)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  orders       Order[]
  favorites    Favorite[]

  @@map("users")
}

model Product {
  id          String           @id @default(uuid())
  name        String
  description String
  price       Decimal          @db.Decimal(10, 2)
  oldPrice    Decimal?         @db.Decimal(10, 2)
  imageUrl    String
  brand       String           @default("ModeaVelour")
  category    String[]
  collection  String?
  season      String?
  isNew       Boolean          @default(true)
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  variants    ProductVariant[]
  favorites   Favorite[]

  @@map("products")
}

model ProductVariant {
  id         String      @id @default(uuid())
  productId  String
  color      String
  size       String
  stock      Int         @default(0)
  product    Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  orderItems OrderItem[]

  @@unique([productId, color, size])
  @@map("product_variants")
}

model Favorite {
  id        String   @id @default(uuid())
  userId    String
  productId String
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@map("favorites")
}

model Order {
  id          String      @id @default(uuid())
  userId      String
  status      OrderStatus @default(COMPLETED)
  totalAmount Decimal     @db.Decimal(10, 2)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  user        User        @relation(fields: [userId], references: [id], onDelete: Restrict)
  items       OrderItem[]

  @@map("orders")
}

model OrderItem {
  id         String         @id @default(uuid())
  orderId    String
  variantId  String
  quantity   Int
  unitPrice  Decimal        @db.Decimal(10, 2)

  order      Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)
  variant    ProductVariant @relation(fields: [variantId], references: [id], onDelete: Restrict)

  @@map("order_items")
}

8. CONTRATO DE API REST (ENDPOINTS PRINCIPALES)
Método	Endpoint	Acceso	Descripción
POST	/api/auth/register	Público	Registra nuevo usuario (email, password, name).
POST	/api/auth/login	Público	Autentica y fija cookie token HTTP-Only.
POST	/api/auth/logout	Autenticado	Limpia cookie de sesión.
GET	    /api/auth/me	Autenticado	Retorna datos del usuario en sesión actual.
GET	    /api/products	Público	Retorna productos con filtros y paginación.
GET	    /api/products/:id	Público	Detalle de un producto con sus variantes y stock.
POST	/api/products	Admin	Crea producto nuevo junto con variantes.
PUT	    /api/products/:id	Admin	Actualiza campos y variantes de un producto.
DELETE	/api/products/:id	Admin	Eliminación controlada de un producto.
GET	    /api/favorites	Autenticado	Obtiene la lista de IDs o productos guardados.
POST	/api/favorites/:productId	Autenticado	Conmuta/agrega producto a favoritos.
POST	/api/orders	Autenticado	Genera orden y descuenta stock atómicamente.
GET	    /api/orders/my-orders	Autenticado	Historial de compras del usuario autenticado.
