# 🚀 Guía de Despliegue - Luna Mística

Esta guía te mostrará las **mejores opciones** para publicar tu tienda esotérica en producción, desde las más económicas hasta las más robustas.

## 📋 Tabla de Contenidos

- [🏆 Opciones Recomendadas](#-opciones-recomendadas)
- [🆓 Opción Gratuita: Vercel](#-opción-gratuita-vercel)
- [💰 Opción Profesional: Netlify](#-opción-profesional-netlify)
- [🏢 Opción Empresarial: Railway](#-opción-empresarial-railway)
- [🔧 Preparación Previa](#-preparación-previa)
- [🛡️ Configuración de Seguridad](#️-configuración-de-seguridad)

## 🏆 Opciones Recomendadas

### 🥇 **VERCEL** (Recomendado para empezar)
- **Precio**: Gratis hasta 100GB de transferencia
- **Velocidad**: ⚡ Ultrarrápido (Edge Network global)
- **Facilidad**: 🟢 Extremadamente fácil (1 clic)
- **Escalabilidad**: 🟡 Buena
- **Ideal para**: Lanzamiento inicial, pruebas, pequeñas tiendas

### 🥈 **NETLIFY**
- **Precio**: Gratis hasta 300 minutos de build/mes
- **Velocidad**: ⚡ Muy rápido
- **Facilidad**: 🟢 Fácil
- **Escalabilidad**: 🟡 Buena
- **Ideal para**: Tiendas medianas, formularios avanzados

### 🥉 **RAILWAY/RENDER**
- **Precio**: ~$5-20/mes
- **Velocidad**: 🟡 Rápido
- **Facilidad**: 🟡 Moderado
- **Escalabilidad**: 🟢 Excelente
- **Ideal para**: Aplicaciones que necesitan base de datos persistente

---

## 🆓 Opción Gratuita: Vercel

**La opción más recomendada para comenzar** ✨

### Paso 1: Preparar el Repositorio

```bash
# 1. Inicializar Git (si no lo has hecho)
git init
git add .
git commit -m "Initial commit: Luna Mística - Tienda Esotérica"

# 2. Subir a GitHub
# Crear repositorio en github.com
git remote add origin https://github.com/tu-usuario/luna-mistica.git
git branch -M main
git push -u origin main
```

### Paso 2: Despliegue en Vercel

1. **Ir a [vercel.com](https://vercel.com)**
2. **Conectar con GitHub**
3. **Importar tu repositorio**
4. **Configurar variables de entorno:**

```bash
# Variables de producción
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

### 2. Optimizaciones de Build

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Para Netlify (descomenta si usas Netlify)
  // output: 'export',
  // trailingSlash: true,
}

module.exports = nextConfig
```

## Opciones de Hosting

### 🥇 Opción 1: Vercel (Recomendado)
- **Costo**: Gratis
- **Dominio**: tu-app.vercel.app
- **Características**: 
  - Deploy automático desde GitHub
  - SSL gratuito
  - Edge Functions
  - Analytics básicos

**Pasos:**
1. `git push` a GitHub
2. Conectar repositorio en vercel.com
3. Deploy automático ✨

### 🥈 Opción 2: Netlify
- **Costo**: Gratis
- **Dominio**: tu-app.netlify.app
- **Características**:
  - Formularios gratuitos
  - Functions serverless
  - A/B testing

### 🥉 Opción 3: Railway
- **Costo**: $5 créditos mensuales gratis
- **Incluye**: Base de datos PostgreSQL
- **Ideal para**: Apps con backend complejo

## Configuración de Supabase para Producción

### 1. Crear Proyecto Supabase
```bash
# Ir a https://supabase.com/dashboard
# Crear nuevo proyecto (gratis)
# Ejecutar las migraciones SQL
```

### 2. Configurar RLS (Row Level Security)
```sql
-- Ya incluido en database/migrations/001_initial_schema.sql
-- Solo ejecutar el archivo completo en Supabase
```

### 3. Variables de Entorno en Vercel
```
NEXT_PUBLIC_SUPABASE_URL = [URL del proyecto]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [Clave pública]
```

## Dominio Personalizado (Opcional)

### Dominios Gratuitos:
- **Freenom**: .tk, .ml, .ga, .cf
- **GitHub Pages**: tu-usuario.github.io
- **Netlify**: Subdominio personalizado

### Dominios de Pago Baratos:
- **Namecheap**: ~$10/año (.com)
- **Porkbun**: ~$8/año (.com)
- **Cloudflare**: Precio al costo

## Checklist Pre-Deploy

- [ ] Variables de entorno configuradas
- [ ] Build exitoso (`npm run build`)
- [ ] Imágenes optimizadas
- [ ] Meta tags para SEO
- [ ] Favicon configurado
- [ ] Robots.txt creado
- [ ] Sitemap.xml generado
- [ ] Analytics configurado (Google/Vercel)

## Monitoreo Post-Deploy

### Gratuito:
- **Vercel Analytics**: Incluido
- **Google Analytics**: Gratis
- **Sentry**: Plan gratuito para errores

### Métricas Importantes:
- Tiempo de carga
- Conversiones (carrito → compra)
- Páginas más visitadas
- Errores JavaScript

## SEO y Performance

### Meta Tags Base:
```html
<title>🌙 Luna Mística - Tienda Esotérica Online</title>
<meta name="description" content="Descubre cristales, velas, inciensos y servicios de tarot. Tu tienda esotérica de confianza." />
<meta property="og:title" content="Luna Mística - Tienda Esotérica" />
<meta property="og:description" content="Productos místicos y lecturas de tarot profesionales" />
```

### Performance:
- Imágenes WebP
- Lazy loading automático
- Code splitting (Next.js)
- Caché CDN (Vercel/Netlify)

## Backup y Seguridad

### Automático:
- **GitHub**: Código fuente
- **Supabase**: Backups automáticos
- **Vercel**: Deployments históricos

### Manual:
- Exportar base de datos semanalmente
- Backup de imágenes/assets
- Documentar configuraciones

---

**¡Tu tienda estará online en menos de 10 minutos! 🚀**