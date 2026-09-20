# 📁 CARPETA DE PROYECTO DE SOFTWARE: ModeaVelour E-Commerce

> **Proyecto de Portafolio Profesional Full-Stack**  
> **Autor / Desarrollador:** Mau-bar-iva  
> **Estado:** Documentación Técnica & Backlog de Arquitectura (Pre-Sprint Backend)  
> **Tecnologías Core:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, React, Vite, Tailwind CSS.

---

## 1. RESUMEN EJECUTIVO Y VISIÓN DEL PRODUCTO
ModeaVelour es una plataforma de comercio electrónico orientada al sector de indumentaria y accesorios de moda atemporal y sustentable. El sistema combina una experiencia de usuario minimalista y responsiva con un motor transaccional robusto en el backend, diseñado bajo estándares de arquitectura por capas (Controller-Service-Repository), tipado estricto en TypeScript y persistencia relacional con Prisma ORM sobre PostgreSQL.

---

## 2. ASESORÍA TÉCNICA: TRANSACCIONES, PAGOS Y ENVÍOS
- **Transacciones en E-commerce Real:** Los comercios modernos no tocan tarjetas de crédito directamente por normas PCI-DSS. Usan pasarelas como Stripe o Mercado Pago que tokenizan la tarjeta y notifican al backend vía Webhooks para confirmar la orden.
- **Estrategia Recomendada para Portafolio:** Dejar las pasarelas reales y couriers externos FUERA DEL ALCANCE (Out of Scope) e implementar un **Checkout Transaccional Simulado con Atomicidad Real en Base de Datos (prisma.$transaction)**.
- **¿Por qué?**
  1. Evitas que los evaluadores de recursos humanos o líderes técnicos sufran por tarjetas de sandbox caídas o claves que vencen.
  2. Demuestras el verdadero valor de ingeniería de backend: transacciones ACID en PostgreSQL, bloqueo de stock para evitar sobreventas y manejo de consistencia.
- **Envíos:** Se deja fuera el cálculo dinámico con couriers comerciales (FedEx, Correo Argentino, DHL) y se modelan modalidades de entrega fijas (Estándar y Express) con cálculo transparente de costos.

---

## 3. ALCANCE DEL SISTEMA (IN-SCOPE VS OUT-OF-SCOPE)

### Dentro del Alcance (In-Scope):
1. Autenticación JWT con HttpOnly Cookies y roles (ADMIN / CUSTOMER).
2. Catálogo público con filtros por categoría, temporada, talle, color, precio y búsqueda debounced.
3. Detalle de producto con selector dinámico de variantes de talle y color y stock en tiempo real.
4. Carrito de compras reactivo con cálculo de subtotales y total.
5. Lista de Favoritos (Wishlist) persistida en PostgreSQL.
6. ABM completo de Productos (Creación, edición de inventario y borrado suave) en panel de administración.
7. Simulación transaccional de Checkout con persistencia de orden y descuento de stock atómico.
8. Panel Admin con listado de órdenes y control de despacho.

### Fuera del Alcance (Out-of-Scope):
1. Pasarelas de pago con cobro real a tarjetas de crédito bancarias.
2. Integración en vivo con APIs corporativas de couriers de envíos.
3. Facturación fiscal electrónica con organismos gubernamentales.
4. Multi-moneda o multi-idioma (i18n).
5. Chat de soporte en tiempo real o notificaciones SMS/WhatsApp.

---

## 4. REGLAS DE NEGOCIO (BUSINESS RULES)
- **RN-01 (Stock por Variante):** El stock se administra a nivel de tupla (Producto, Color, Talle). Si una combinación específica se agota, se deshabilita en la interfaz.
- **RN-02 (Descuentos):** El precio vigente no puede ser <= 0. Si existe oldPrice, el porcentaje de descuento se computa como round(100 - (price / oldPrice * 100)).
- **RN-03 (Roles y RBAC):** Solo usuarios con rol ADMIN pueden mutar productos (POST, PUT, DELETE) y acceder a rutas administrativas.
- **RN-04 (Atomicidad en Checkout):** La compra se procesa bajo prisma.$transaction. Si algún ítem no tiene disponibilidad en el momento exacto, la transacción se revierte con error 409 Conflict.
- **RN-05 (Precios Históricos):** La orden congela el precio unitario en OrderItem al momento de la venta para no alterar reportes contables futuros.
- **RN-06 (Borrado Lógico / Soft Delete):** Los productos con historial de órdenes no se eliminan físicamente; se marca isActive: false.
- **RN-07 (Cookies Seguras):** Tokens JWT transmitidos exclusivamente por cookies HttpOnly con SameSite y Secure.

---

## 5. REQUERIMIENTOS FUNCIONALES (RF)
- RF-01: Registro de nuevos usuarios con hash bcrypt.
- RF-02: Inicio de sesión con emisión de cookie JWT HttpOnly.
- RF-03: Endpoint GET /api/auth/me para recuperar sesión.
- RF-04: Cierre de sesión con limpieza de cookie.
- RF-05: Listado paginado de productos con filtros de categoría, color, talle y precio.
- RF-06: Barra de búsqueda debounced (300 ms).
- RF-07: Detalle de prenda con variantes y stock.
- RF-08: Carrusel de recomendaciones relacionadas.
- RF-09: Agregar productos al carrito con talle y color sin duplicar registros.
- RF-10: Edición de cantidades y vaciado de carrito.
- RF-11: Checkout simulado con formulario de datos de destinatario.
- RF-12: Generación de número de seguimiento legible (MV-2026-XXXX).
- RF-13: Guardar y remover prendas de la lista de favoritos.
- RF-14: Alta de producto con variantes dinámicas en panel Admin.
- RF-15: Edición y soft delete de productos en panel Admin.
- RF-16: Visualización de órdenes de clientes en panel Admin.

---

## 6. REQUERIMIENTOS NO FUNCIONALES (RNF)
- RNF-01 (Seguridad): Consultas parametrizadas con Prisma, protección XSS, cabeceras Helmet y contraseñas con bcrypt (salt 10).
- RNF-02 (Rendimiento): Respuestas de catálogo en < 200 ms mediante paginación a nivel de BD e índices en PostgreSQL.
- RNF-03 (Mantenibilidad): TypeScript estricto en frontend y backend sin tipos any. Arquitectura en capas limpia.
- RNF-04 (Usabilidad): Interfaz responsiva mobile-first (320px+ a 4K) con contraste accesible WCAG AA.

---

## 7. CASOS DE USO PRINCIPALES
- **CU-01:** Alta de Prenda con Variantes de Color y Talle (Admin).
- **CU-02:** Compra Transaccional / Checkout Simulado con Descuento Atómico de Stock.
- **CU-03:** Búsqueda Debounced y Filtrado Multidimensional de Catálogo.

---

## 8. MODELO DE DATOS PRISMA (schema.prisma)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  CUSTOMER
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

model User {
  id           String     @id @default(uuid())
  email        String     @unique
  passwordHash String
  name         String
  role         Role       @default(CUSTOMER)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  orders       Order[]
  favorites    Favorite[]

  @@map("users")
}

model Category {
  id        String    @id @default(uuid())
  name      String    @unique
  slug      String    @unique
  products  Product[]

  @@map("categories")
}

model Product {
  id          String           @id @default(uuid())
  name        String
  slug        String           @unique
  description String           @db.Text
  price       Decimal          @db.Decimal(10, 2)
  oldPrice    Decimal?         @db.Decimal(10, 2)
  brand       String           @default("ModeaVelour")
  season      String?          // summer, fall, winter, spring
  collection  String?          // sustainable fashion, sporty wear
  imageUrl    String
  isNew       Boolean          @default(true)
  isActive    Boolean          @default(true)
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  categoryId  String
  category    Category         @relation(fields: [categoryId], references: [id])

  variants    ProductVariant[]
  favorites   Favorite[]

  @@index([categoryId])
  @@index([price])
  @@index([season])
  @@index([collection])
  @@map("products")
}

model ProductVariant {
  id         String      @id @default(uuid())
  productId  String
  product    Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  color      String
  size       String      // XS, S, M, L, XL
  stock      Int         @default(0)
  sku        String      @unique

  orderItems OrderItem[]

  @@unique([productId, color, size])
  @@index([productId])
  @@map("product_variants")
}

model Order {
  id              String      @id @default(uuid())
  orderNumber     String      @unique
  status          OrderStatus @default(CONFIRMED)
  totalAmount     Decimal     @db.Decimal(10, 2)
  shippingCost    Decimal     @default(0.00) @db.Decimal(10, 2)
  
  recipientName   String
  recipientEmail  String
  recipientPhone  String
  shippingAddress String
  shippingCity    String
  shippingPostal  String
  
  userId          String?
  user            User?       @relation(fields: [userId], references: [id], onDelete: SetNull)

  items           OrderItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@index([userId])
  @@index([orderNumber])
  @@map("orders")
}

model OrderItem {
  id         String         @id @default(uuid())
  orderId    String
  order      Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)
  variantId  String
  variant    ProductVariant @relation(fields: [variantId], references: [id])

  productName String
  color       String
  size        String
  quantity    Int
  unitPrice   Decimal        @db.Decimal(10, 2)

  @@map("order_items")
}

model Favorite {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, productId])
  @@map("favorites")
}
```

---

## 9. CONTRATOS DE API RESTFUL
- `POST /api/auth/register` (Público)
- `POST /api/auth/login` (Público)
- `GET /api/auth/me` (Autenticado)
- `POST /api/auth/logout` (Autenticado)
- `GET /api/products` (Público - con paginación y filtros)
- `GET /api/products/:id` (Público)
- `POST /api/products` (Admin Only)
- `PUT /api/products/:id` (Admin Only)
- `DELETE /api/products/:id` (Admin Only)
- `POST /api/orders` (Checkout transaccional con descuento atómico de stock)
- `GET /api/orders` (Admin Only)
- `GET /api/favorites` (Autenticado)

---

## 10. BACKLOG DE TAREAS PARA GITHUB COPILOT
1. **TASK-01:** `infra: Configurar estructura Monorepo/Backend con Node.js, Express y TypeScript estricto`
2. **TASK-02:** `db: Inicializar Prisma ORM y definir Schema Relacional en PostgreSQL`
3. **TASK-03:** `db: Crear script de Seed para poblar datos iniciales de indumentaria y admin`
4. **TASK-04:** `auth: Migrar módulo de autenticación a TypeScript y persistencia en BD con bcrypt`
5. **TASK-05:** `auth: Implementar middleware de autenticación y autorización por roles (Admin Guard)`
6. **TASK-06:** `security: Validación de variables de entorno con Zod y configuración de Helmet/CORS`
7. **TASK-07:** `api: Implementar servicio y controlador de productos con filtros y paginación en Prisma`
8. **TASK-08:** `api: Implementar endpoint de detalle de producto con variantes y stock en tiempo real`
9. **TASK-09:** `frontend: Conectar catálogo, buscador debounced y filtros al nuevo backend de PostgreSQL`
10. **TASK-10:** `api: Implementar endpoints de creación, edición y baja lógica de productos con Zod`
11. **TASK-11:** `frontend: Rediseñar formulario de alta/edición con variantes dinámicas y feedback de UI`
12. **TASK-12:** `frontend: Implementar tabla de gestión de inventario en panel de administración`
13. **TASK-13:** `api: Implementar servicio transaccional de Checkout Simulado con Prisma ($transaction)`
14. **TASK-14:** `frontend: Crear flujo de Checkout con formulario de entrega y pantalla de confirmación`
15. **TASK-15:** `api/frontend: Implementar persistencia y sincronización de Favoritos en base de datos`
16. **TASK-16:** `testing: Configurar test runner con Vitest y Supertest para Auth y Checkout`
