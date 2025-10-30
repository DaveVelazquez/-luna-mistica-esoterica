# 🔮 Tienda Esotérica - E-commerce + Servicios de Lectura

Una plataforma completa de e-commerce para tienda esotérica con sistema de productos y reservas de servicios (lecturas de tarot), construida únicamente con herramientas gratuitas.

## 🌐 **Aplicación en Producción**

**URL**: https://main.d1a7gqykv9s6bd.amplifyapp.com/

## 🚀 Stack Tecnológico (100% Gratuito)

### Frontend
- **Next.js 14** (App Router) - Framework React con SSR
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos utilitarios
- **shadcn/ui** - Componentes UI reutilizables
- **Zustand** - Gestión de estado ligera
- **React Hook Form + Zod** - Formularios y validación

### Backend & Base de Datos
- **Supabase** (Plan gratuito) - BaaS completo
  - PostgreSQL Database
  - Authentication
  - Storage para imágenes
  - Realtime subscriptions
  - Edge Functions

### Funcionalidades Principales

#### 🛍️ E-commerce
- ✅ Catálogo de productos con filtros y búsqueda
- ✅ Carrito de compras persistente (Zustand + localStorage)
- ✅ Sistema de variantes de producto (tallas, colores, etc.)
- ✅ Gestión de inventario
- ✅ Sistema de cupones y descuentos
- ✅ Checkout con múltiples métodos de pago:
  - 💰 SPEI/Transferencia bancaria (gratuito)
  - 💵 Pago contraentrega
  - 💳 Mercado Pago (comisión por transacción)
  - 💳 Stripe (comisión por transacción)

#### 🔮 Servicios de Lectura
- ✅ Catálogo de servicios (Tarot, Astrología, etc.)
- ✅ Sistema de reservas con calendario
- ✅ Slots de tiempo disponibles/ocupados
- ✅ Modalidades: Presencial y Video llamada
- ✅ Confirmación automática de citas

#### 👥 Usuarios y Autenticación
- ✅ Registro/Login con email y contraseña
- ✅ Autenticación OAuth (Google, Facebook) - gratuita
- ✅ Perfiles de usuario con historial de pedidos
- ✅ Panel administrativo para gestión

#### 📱 Notificaciones
- 📧 **Email**: Brevo/Sendinblue (plan gratuito)
- 📱 **Telegram Bot**: Notificaciones de pedidos y citas (gratuito)

## 🗄️ Modelo de Datos

### Tablas Principales

```sql
-- Usuarios
users (id, email, name, phone, role, created_at)

-- Productos
products (id, slug, name, description_md, price_mxn, active, featured)
product_variants (id, product_id, sku, stock, weight_g, attrs)
media (id, product_id, url, alt, sort)

-- Pedidos
orders (id, user_id, total_mxn, status, payment_method, created_at)
order_items (id, order_id, product_id, variant_id, qty, unit_price_mxn)

-- Servicios y Reservas
services (id, slug, name, duration_min, price_mxn, mode)
service_slots (id, service_id, starts_at, ends_at, status)
service_bookings (id, user_id, service_id, slot_id, status, video_link)

-- Cupones y Blog
coupons (id, code, kind, value, min_total, ends_at, max_uses, used)
blog_posts (id, slug, title, md, published_at, cover_url, tags)
```

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
\`\`\`bash
git clone <repository-url>
cd Esoteric
\`\`\`

### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno
Copia el archivo `.env.example` a `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Configura las siguientes variables:
\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Pagos (opcional)
STRIPE_SECRET_KEY=tu_stripe_key
MP_ACCESS_TOKEN=tu_mercado_pago_token

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_password

# Telegram Bot (opcional)
TELEGRAM_BOT_TOKEN=tu_bot_token
TELEGRAM_CHAT_ID=tu_chat_id
\`\`\`

### 4. Configurar Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Ejecuta las migraciones SQL (próximo paso)
4. Configura las variables de entorno

### 5. Ejecutar el proyecto
\`\`\`bash
npm run dev
\`\`\`

El proyecto estará disponible en `http://localhost:3000`

**⚠️ Nota para Windows**: Si encuentras errores de permisos (EPERM), ejecuta PowerShell como Administrador.

## 🔄 Workflow de Desarrollo Recomendado

### Opción 1: Desarrollo con AWS Amplify (Recomendado)
La forma más simple de trabajar es usar el deploy automático de Amplify:

1. Hacer cambios en el código localmente
2. Commit y push a GitHub: `git push`
3. Amplify despliega automáticamente (~5-7 min)
4. Verificar cambios en: https://main.d1a7gqykv9s6bd.amplifyapp.com/

**Ventajas**: Sin configuración local compleja, entorno idéntico a producción, deploy automático.

### Opción 2: Desarrollo Local
Para iteración rápida en local (requiere permisos de administrador):
```powershell
npm run dev
```

📖 **Ver [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md)** para guía completa de desarrollo.

## 📚 Documentación Adicional

- 📖 **[DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md)** - Guía completa de desarrollo
- 🚀 **[AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md)** - Despliegue en AWS
- 💾 **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** - Configuración de base de datos
- 🌐 **[DOMAIN_SETUP.md](DOMAIN_SETUP.md)** - Configuración de dominio personalizado

## 🎯 Próximos Pasos

### Fase 1: Setup básico ✅
- [x] Configuración de Next.js + TypeScript
- [x] Integración de TailwindCSS + shadcn/ui  
- [x] Componentes base (Navbar, Footer, ProductCard)
- [x] Store de Zustand para carrito

### Fase 2: Supabase Integration
- [ ] Configuración de cliente Supabase
- [ ] Creación de esquema de base de datos
- [ ] Setup de autenticación
- [ ] Middleware de autorización

### Fase 3: Funcionalidades Core
- [ ] API routes para productos
- [ ] Sistema de carrito completo
- [ ] Checkout y pagos
- [ ] Panel administrativo

### Fase 4: Servicios de Lectura
- [ ] Catálogo de servicios
- [ ] Sistema de reservas
- [ ] Calendario de disponibilidad
- [ ] Integración de video llamadas

### Fase 5: Optimización y Deploy
- [ ] SEO y metadata
- [ ] Optimización de imágenes
- [ ] Deploy en Vercel (gratuito)
- [ ] Testing y QA

## 📊 Costos Estimados

| Servicio | Plan Gratuito | Límites |
|----------|---------------|---------|
| **Vercel** | Free | 100GB bandwidth, 1000 deployments/mes |
| **Supabase** | Free | 50MB DB, 1GB storage, 2GB transfer |
| **Brevo Email** | Free | 300 emails/día |
| **Telegram Bot** | Gratuito | Ilimitado |
| **Stripe/MP** | $0 fijo | 3.6% + $3 por transacción |

**Costo mensual estimado: $0 pesos** (solo comisiones por venta)

## 🔐 Seguridad y Mejores Prácticas

- ✅ Variables de entorno para datos sensibles
- ✅ Validación de tipos con TypeScript
- ✅ Sanitización de inputs con Zod
- ✅ Rate limiting en APIs
- ✅ HTTPS obligatorio en producción
- ✅ Row Level Security en Supabase

## 📈 Analytics y Monitoreo

- **Vercel Analytics** (gratuito) - Métricas de performance
- **Umami** (self-hosted) - Analytics de privacidad
- **Sentry** (plan gratuito) - Error tracking

## 🤝 Contribuciones

Este es un proyecto de código abierto. Las contribuciones son bienvenidas:

1. Fork del proyecto
2. Crea una rama para tu feature
3. Commit de cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

**¿Preguntas?** Abre un issue o contacta al equipo de desarrollo.

🔮 **¡Que la magia del código esté contigo!** ✨