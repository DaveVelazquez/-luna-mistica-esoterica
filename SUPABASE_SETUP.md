# 🔮 Configuración de Supabase para Tienda Esotérica

Esta guía te ayudará a configurar Supabase paso a paso para tu tienda esotérica.

## 🚀 Opción 1: Supabase Cloud (Recomendado para producción)

### 1. Crear cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Anota tu `Project URL` y `anon public key`

### 2. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### 3. Ejecutar migraciones
1. Ve al SQL Editor en el dashboard de Supabase
2. Copia y pega el contenido de `database/migrations/001_initial_schema.sql`
3. Ejecuta el script

### 4. Configurar autenticación
1. Ve a Authentication > Settings en Supabase
2. Configura los providers que desees (Email, Google, etc.)
3. Ajusta las URLs de redirección:
   - Site URL: `http://localhost:3000` (desarrollo)
   - Redirect URLs: `http://localhost:3000/auth/callback`

## 🛠️ Opción 2: Supabase Local (Para desarrollo)

### 1. Instalar Supabase CLI
```bash
# Windows (con Chocolatey)
choco install supabase

# macOS (con Homebrew)
brew install supabase/tap/supabase

# O usar npm
npm install -g supabase
```

### 2. Inicializar proyecto local
```bash
# En la raíz del proyecto
supabase init

# Iniciar servicios locales (requiere Docker)
supabase start
```

### 3. Variables de entorno para desarrollo local
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_local
```

### 4. Aplicar migraciones
```bash
# Crear migración desde el archivo SQL
supabase db diff --file database/migrations/001_initial_schema.sql

# O aplicar directamente
supabase db reset
```

## 📊 Datos de prueba (Opcional)

Si quieres poblar la base de datos con datos de ejemplo, ejecuta también este SQL:

```sql
-- Productos de ejemplo
INSERT INTO public.products (slug, name, description_md, price_mxn, featured) VALUES
('tarot-rider-waite', 'Tarot Rider-Waite Original', 'El tarot más popular del mundo, perfecto para principiantes y expertos.', 450.00, true),
('cristal-amatista', 'Amatista Natural Brasileña', 'Cristal de amatista natural para meditación y protección energética.', 180.00, true),
('vela-proteccion', 'Vela de Protección Blanca', 'Vela artesanal con hierbas naturales para rituales de protección.', 95.00, true);

-- Servicios de ejemplo  
INSERT INTO public.services (slug, name, description_md, duration_min, price_mxn, mode) VALUES
('lectura-tarot-general', 'Lectura de Tarot General', 'Lectura completa para orientación general.', 45, 350.00, 'video'),
('lectura-tarot-amor', 'Lectura de Tarot del Amor', 'Consulta especializada en temas del corazón.', 60, 450.00, 'video');
```

## 🔧 Comandos útiles

```bash
# Ver estado de Supabase local
npm run supabase:status

# Generar tipos TypeScript desde el esquema
npm run db:generate

# Reiniciar base de datos local
npm run db:reset

# Detener servicios locales
npm run supabase:stop
```

## 🚨 Troubleshooting

### Error: "Cannot find module '@supabase/ssr'"
```bash
npm install @supabase/ssr
```

### Error: Row Level Security
Si tienes problemas con RLS, temporalmente puedes deshabilitarlo:
```sql
ALTER TABLE nombre_tabla DISABLE ROW LEVEL SECURITY;
```

### Error de autenticación
Verifica que:
1. Las URLs en `.env.local` sean correctas
2. Las políticas RLS estén configuradas
3. El usuario esté autenticado correctamente

## 📱 Próximos pasos

Una vez configurado Supabase:
1. ✅ Prueba las APIs en `/api/products` y `/api/services`
2. ✅ Configura la autenticación
3. ✅ Sube imágenes de productos al Storage
4. ✅ Crea un usuario administrador
5. ✅ Prueba el carrito y checkout

## 🔗 Enlaces útiles

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase + Next.js](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage](https://supabase.com/docs/guides/storage)

¿Necesitas ayuda? Abre un issue o contacta al equipo de desarrollo.