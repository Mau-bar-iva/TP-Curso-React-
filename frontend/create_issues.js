/* eslint-env node */

const token = process.env.GITHUB_TOKEN;
if (!token) {
    console.error('GITHUB_TOKEN no está definido en el entorno.');
    process.exit(1);
}

const repo = 'Mau-bar-iva/TP-Curso-React-';
const api = `https://api.github.com/repos/${repo}/issues`;
const dryRun = process.env.DRY_RUN === '1' || process.env.DRY_RUN === 'true';

const issues = [
    {
        title: 'Refactor: Migrar proyecto a TypeScript, Express y estructura monorepo (crear "frontend" carpeta)',
        body: `Historia de usuario:\nComo desarrollador del proyecto quiero una base de código consistente en TypeScript con un backend en Express separado y una estructura backend/frontend clara, para facilitar mantenimiento y despliegues.\n\nAlcance:\n- Migrar backend a TypeScript usando Express.\n- Mantener frontend en React + Vite y mover los archivos actuales a la carpeta "frontend/" para concordar con README.\n- Configurar scripts de arranque/build para ambos paquetes.\n\nRestricciones:\n- No introducir servicios de pago.\n- Mantener compatibilidad funcional con la UI actual.\n\nDoD:\n- Repositorio reestructurado con carpetas "backend/" y "frontend/".\n- Backend escrito en TypeScript y se compila.\n- Scripts para dev y build funcionan (npm run dev en cada paquete).\n\nCriterios de aceptación:\n- Clonar repo, instalar deps y ejecutar ambos servidores localmente siguiendo README actualizado.\n- No se añade código funcional nuevo que rompa la app.\n\nDependencias:\n- Puede depender de: "Extraer configuración en módulo config" y "Persistencia de usuarios"`
    },
    {
        title: 'Seguridad: Mover secrets (JWT, password) a variables de entorno',
        body: `Historia de usuario:\nComo administrador quiero que las claves y credenciales no estén hardcodeadas en el código para evitar fugas.\n\nAlcance:\n- Leer JWT secret desde env (e.g., JWT_SECRET).\n- Eliminar contraseñas en texto plano del repo.\n\nRestricciones:\n- No crear un servicio externo de pago.\n\nDoD:\n- JWT secret y configuración leídos desde archivo .env o variables de entorno.\n- Documentación en README con variables necesarias.\n\nCriterios de aceptación:\n- La app levanta usando las variables y no contiene valores secretos en los archivos del repo.\n\nDependencias:\n- Debe implementarse junto con "Refactor: Migrar proyecto a TypeScript..." si se migra el backend.\n\nPrompt sugerido:\nProporciona un patch y pasos para extraer secretos a variables de entorno en un backend Express existente y cómo documentarlo en README.`
    },
    {
        title: 'Feature: Añadir persistencia de usuarios y endpoint de registro (PostgreSQL + Prisma)',
        body: `Historia de usuario:\nComo usuario quiero poder registrarme y que mis credenciales se almacenen de forma segura para poder iniciar sesión posteriormente.\n\nAlcance:\n- Añadir endpoint POST /api/auth/register.\n- Persistir usuarios en PostgreSQL usando Prisma como ORM.\n\nRestricciones:\n- Debe ser desplegable sin coste (uso local con Docker Compose + PostgreSQL; documentación para usar Supabase si se desea).\n\nDoD:\n- Registro crea usuario con password hasheado.\n- Login utiliza la tabla "users" en PostgreSQL a través de Prisma.\n\nCriterios de aceptación:\n- Registro + login funcionan en local con PostgreSQL.\n- Documentación sobre cómo cambiar a Supabase.\n\nDependencias:\n- Depende de: "Refactor: Migrar proyecto a TypeScript..." y "Seguridad: Mover secrets..."\n\nPrompt sugerido:\nDiseña la estructura de datos Prisma para \`User\` y los endpoints necesarios para implementar registro y autenticación con PostgreSQL. Incluye migraciones y ejemplos de consultas.`
    },

    // Infra + Backend + Frontend tasks for PostgreSQL + Prisma + TypeScript
    {
        title: 'Infra: Configurar Docker Compose y Prisma con PostgreSQL',
        body: `Objetivo:\nDisponer de una base de datos local reproducible y configurar Prisma como ORM para el backend en TypeScript.\n\nAlcance:\n- Crear docker-compose.yml en la raíz con servicio PostgreSQL 16 (y pgAdmin opcional).\n- Inicializar Prisma en backend/ (npx prisma init).\n- Definir esquemas Prisma para User, Product, ProductVariant, Favorite, Order, OrderItem.\n- Crear scripts: npm run prisma:migrate y seed.ts para poblar datos de prueba.\n\nCriterios de aceptación:\n- docker-compose up levanta PostgreSQL accesible por el backend.\n- Prisma genera cliente y migraciones aplicables.\n\nDependencias:\n- Debe ejecutarse antes de implementar persistencia y endpoints que dependan de la DB.`
    },
    {
        title: 'Backend: Migración a TypeScript y arquitectura modular (Routes-Controllers-Services-Prisma)',
        body: `Objetivo:\nReemplazar el código backend JS por TypeScript compilable y organizar en capas.\n\nAlcance:\n- Configurar tsconfig.json en backend/.\n- Usar tsx/ts-node-dev para desarrollo.\n- Crear capas tipadas para auth, products, orders y favorites.\n- Instalar tipos: @types/express, @types/jsonwebtoken, @types/bcrypt, @types/cookie-parser.\n\nCriterios de aceptación:\n- Backend inicia en modo dev con tsx y compila con tsc.\n- Endpoints tipados básicos disponibles para autenticación y productos.\n\nDependencias:\n- Requiere Prisma y config de DB (Docker Compose).`
    },
    {
        title: 'Backend: Implementar Módulo de Órdenes y Checkout Atómico con Prisma',
        body: `Objetivo:\nDesarrollar endpoint transaccional de compras que garantice integridad de stock y cree ordenes atomically.\n\nAlcance:\n- Crear endpoint POST /api/orders protegido por token.\n- Implementar transacción con prisma.$transaction: validar stock, decrementar stock, crear Order y OrderItem.\n- Devolver 409 si stock insuficiente, 201 si éxito.\n\nCriterios de aceptación:\n- Simulación de compra decremente stock y cree orden en la misma transacción.\n\nDependencias:\n- Prisma, persistencia de productos y variantes.`
    },
    {
        title: 'Frontend: Reemplazar llamadas de MockAPI por Backend Express propio',
        body: `Objetivo:\nConectar la app React con el backend local para eliminar dependencias de MockAPI.\n\nAlcance:\n- Modificar src/services/products.js para apuntar a http://localhost:3000/api/products (o migrar a TypeScript).\n- Soportar lectura de variantes, stock y talles desde la API.\n- Asegurar fetch con credentials: "include" para solicitudes autenticadas.\n\nCriterios de aceptación:\n- El frontend consume los endpoints locales y muestra variantes y stock reales.\n\nDependencias:\n- Backend en TypeScript con endpoints de productos implementados.`
    },
    {
        title: 'Frontend: Migrar estilos a TailwindCSS y pulir UI/UX',
        body: `Objetivo:\nHomogeneizar estilos y corregir bugs de maquetación visibles.\n\nAlcance:\n- Instalar y configurar TailwindCSS con Vite.\n- Corregir layout del carrito (evitar solapamiento entre texto y imagen).\n- Arreglar botón de eliminar favoritos en /favorite (alineación).\n- Rediseñar formulario admin para paleta clara editorial.\n\nCriterios de aceptación:\n- UI consistente con Tailwind; los bugs de layout corregidos.\n\nDependencias:\n- Ninguna técnica, recomendable después de migración a frontend/ carpeta.`
    },
    {
        title: 'Frontend: Checkout Simulado y flujo de compra en UI',
        body: `Objetivo:\nOfrecer una experiencia completa de checkout y limpiar el carrito tras la compra.\n\nAlcance:\n- Conectar botón Checkout con POST /api/orders.\n- Crear vista /checkout/success con número de orden y detalle.\n- Limpiar estado del carrito y mostrar toast notifications en éxito o error (stock insuficiente).\n\nCriterios de aceptación:\n- Flujo de compra desde frontend a backend funciona, carrito se limpia y usuario ve confirmación.\n\nDependencias:\n- Endpoint POST /api/orders implementado en backend.`
    },
    {
        title: 'Feature: Añadir endpoint POST /api/auth/logout',
        body: `Historia de usuario:\nComo usuario quiero cerrar sesión para que mi token no sea válido y mi cookie sea eliminada.\n\nAlcance:\n- Endpoint POST /api/auth/logout que borre la cookie "token".\n\nRestricciones:\n- Compatible con SameSite y secure según entorno.\n\nDoD:\n- Endpoint implementado y documentado.\n\nCriterios de aceptación:\n- Llamar al endpoint borra la cookie y devuelve 200.\n\nDependencias:\n- Depende de la implementación actual de auth y configuración de cookies.\n\nPrompt sugerido:\nProvee el código para un endpoint Express que borre la cookie de sesión de manera segura y muestre ejemplos curl para probarlo.`
    },
    {
        title: 'Bug: Manejo de error en requireAuth y filtrado de errores',
        body: `Historia de usuario:\nComo desarrollador quiero que middleware de auth no filtre detalles de errores al cliente y maneje correctamente excepciones.\n\nAlcance:\n- Cambiar res.status(401).send('Unauthorized', err) por respuesta segura y logging interno.\n\nRestricciones:\n- No exponer stack traces en producción.\n\nDoD:\n- Middleware devuelve 401 sin detalles y registra error en servidor.\n\nCriterios de aceptación:\n- Token inválido devuelve 401 y no muestra stack trace.\n\nDependencias:\n- Ninguna crítica, pero recomendable junto a logging centralizado.\n\nPrompt sugerido:\nExplica cómo mejorar un middleware Express para no exponer errores en respuesta y cómo integrar un logger simple.`
    },
    {
        title: 'Mejora: Evitar operaciones síncronas (bcrypt.hashSync) en tiempo de import',
        body: `Historia de usuario:\nComo mantenedor quiero que el arranque de la app no haga operaciones bloqueantes para evitar retardo en startup.\n\nAlcance:\n- Reemplazar hashSync por hash asincrónico o usar password pre-hasheado almacenado en data.\n\nRestricciones:\n- No introducir bloqueos en import.\n\nDoD:\n- No hay llamadas bloqueantes en archivos importados en runtime.\n\nCriterios de aceptación:\n- Arranque del servidor no ejecuta hashing síncrono.\n\nDependencias:\n- Recomendado junto con persistencia de usuarios.\n\nPrompt sugerido:\nMuestra cómo refactorizar un USER hardcodeado que ahora usa bcrypt.hashSync para que use hash asíncrono o un valor precomputado en un archivo de datos.`
    },
    {
        title: 'Mejora: Hacer CORS origin configurable via env',
        body: `Historia de usuario:\nComo desplegador quiero configurar orígenes permitidos sin tocar el código fuente.\n\nAlcance:\n- Leer CORS_ORIGIN desde env y soportar lista separada por comas.\n\nRestricciones:\n- Mantener seguridad en producción.\n\nDoD:\n- CORS configurable y documentado.\n\nCriterios de aceptación:\n- Cambiar env actualiza el comportamiento.\n\nDependencias:\n- Ninguna directa.\n\nPrompt sugerido:\nImplementa lectura de CORS_ORIGIN desde env, parseo de orígenes y configuración de cors en Express.`
    },
    {
        title: 'Mejora: Añadir logging básico y middleware de error',
        body: `Historia de usuario:\nComo equipo quiero logs consistentes y un middleware de error para debug y producción.\n\nAlcance:\n- Implementar middleware de error global y logger simple (p.ej. winston o consola estructurada).\n\nRestricciones:\n- No añadir servicios externos de pago.\n\nDoD:\n- Errores pasan por middleware; logs tienen nivel e información útil.\n\nCriterios de aceptación:\n- Errores no controlados son capturados y devuelven respuesta con código adecuado.\n\nDependencias:\n- Recomendado antes de desplegar en producción.\n\nPrompt sugerido:\nProvee un ejemplo de middleware de error para Express y un logger (winston) configurado para dev/production.`
    },
    {
        title: 'Refactor: Extraer configuración en módulo backend/src/config',
        body: `Historia de usuario:\nComo desarrollador quiero valores de configuración centralizados para evitar duplicación.\n\nAlcance:\n- Crear backend/src/config/index.ts (o .js) que exporte PORT, JWT_SECRET, CORS_ORIGIN, NODE_ENV.\n\nRestricciones:\n- Compatible con TypeScript migration.\n\nDoD:\n- Todos los lugares consumen config del módulo.\n\nCriterios de aceptación:\n- No hay valores hardcodeados en módulos.\n\nDependencias:\n- Debe realizarse temprano; dependencia para la migración a TS.\n\nPrompt sugerido:\nGenera un módulo de configuración que lea variables de entorno con valores por defecto y ejemplos de uso en app.ts.`
    },
    {
        title: 'Refactor: Introducir capa services + repositories para auth',
        body: `Historia de usuario:\nComo desarrollador quiero separar lógica de negocio y persistencia para mejorar testabilidad.\n\nAlcance:\n- Crear auth.service.ts (business) y user.repository.ts (persistencia).\n\nRestricciones:\n- Mantener compatibilidad API.\n\nDoD:\n- Controladores usan service, service usa repository.\n\nCriterios de aceptación:\n- Código más modular y con puntos claros para mock en tests.\n\nDependencias:\n- Depende de: Refactor a TypeScript y persistencia de usuarios.\n\nPrompt sugerido:\nDescribe la separación entre controller, service y repository para auth, y ejemplos de pruebas unitarias para cada capa.`
    },
    {
        title: 'Tests: Configurar test runner y añadir tests para autenticación',
        body: `Historia de usuario:\nComo QA quiero pruebas unitarias y E2E para garantizar que auth funciona y prevenir regresiones.\n\nAlcance:\n- Configurar Vitest/Jest y supertest.\n- Añadir tests unitarios para loginService y middleware requireAuth.\n\nRestricciones:\n- Tests deben correr localmente sin servicios externos.\n\nDoD:\n- Tests añadidos y ejecutables con npm test.\n\nCriterios de aceptación:\n- Cobertura básica para casos positivos/negativos.\n\nDependencias:\n- Depende de: Separación de capas y migración a TS (si se migra).\n\nPrompt sugerido:\nProvee configuración mínima de Vitest/Jest para un backend Express y ejemplos de tests para login y middleware.`
    },
    {
        title: 'Docs: Documentar env vars y endpoints en docs/API.md',
        body: `Historia de usuario:\nComo desarrollador nuevo quiero documentación clara de los endpoints y variables para poner en marcha el proyecto.\n\nAlcance:\n- Crear docs/API.md con ejemplos curl para login/register/logout y sección env.\n\nRestricciones:\n- Mantener documentación en repo.\n\nDoD:\n- Archivo docs/API.md presente y referenciado desde README.\n\nCriterios de aceptación:\n- Siguiendo la documentación un usuario puede iniciar el backend y probar endpoints con curl.\n\nDependencias:\n- Debe sincronizarse con las tareas de features y seguridad.\n\nPrompt sugerido:\nGenera un documento API.md con endpoints de auth, ejemplos curl y descripción de variables de entorno.`
    }
];

(async () => {
    for (const issue of issues) {
        try {
            if (dryRun) {
                // debug logs removed (dry run)
                continue;
            }
            // creating issue
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: issue.title, body: issue.body })
            });
            const data = await res.json();
            if (!res.ok) {
                console.error('Failed:', data);
            } else {
                // issue created
            }
        } catch (err) {
            console.error('Error creating issue', err);
        }
    }
})();
