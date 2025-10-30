# 🚀 Workflow de Desarrollo - Luna Mística

## 📋 Resumen del Proyecto

**Tienda Esotérica e-commerce** con productos físicos y servicios de lectura (tarot, astrología, runas).

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Hosting**: AWS Amplify
- **Database**: Supabase (PostgreSQL)
- **Estilos**: TailwindCSS + Diseño místico personalizado

---

## 🌐 Aplicación en Producción

### URL Principal
```
https://main.d1a7gqykv9s6bd.amplifyapp.com/
```

### Páginas Disponibles
- 🏠 **Home**: `/` - Página principal con productos destacados
- 🛍️ **Productos**: `/productos` - Catálogo completo
- 🔮 **Servicios**: `/servicios` - Lecturas esotéricas
- 🛒 **Carrito**: `/carrito` - Carrito de compras
- 👤 **Login**: `/login` - Iniciar sesión
- 📝 **Registro**: `/register` - Crear cuenta
- 💳 **Checkout**: `/checkout` - Proceso de pago
- 🎯 **Mi Cuenta**: `/cuenta` - Perfil del usuario
- 🔐 **Panel Admin**: `/admin` - Administración (solo admins)
- 📦 **Catálogo Admin**: `/admin/catalogo` - Gestión de productos

---

## 🔄 Workflow de Desarrollo

### Opción 1: Desarrollo en AWS Amplify (Recomendado)

#### Ventajas
✅ Despliegue automático con cada commit  
✅ Entorno idéntico a producción  
✅ No requiere configuración local compleja  
✅ Preview automático de cada branch  
✅ Variables de entorno centralizadas  

#### Proceso de Desarrollo
1. **Hacer cambios en el código**
   ```bash
   # Editar archivos en VS Code
   # Ejemplo: src/components/footer.tsx
   ```

2. **Commit y Push**
   ```powershell
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```

3. **Amplify despliega automáticamente**
   - Ve a AWS Amplify Console
   - Observa el progreso del build
   - Verifica los cambios en la URL de producción

4. **Verificar cambios**
   ```
   https://main.d1a7gqykv9s6bd.amplifyapp.com/
   ```

#### Tiempo de Deploy
- ⏱️ **Build**: ~3-5 minutos
- ⏱️ **Deploy**: ~1-2 minutos
- ⏱️ **Total**: ~5-7 minutos por cambio

---

### Opción 2: Desarrollo Local (Alternativo)

#### Requisitos Previos
- Node.js v18+ instalado
- Permisos de administrador en Windows
- Variables de entorno configuradas

#### Configuración Inicial

1. **Crear archivo .env.local**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://[tu-proyecto].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[tu-key-anon]
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

2. **Instalar dependencias**
   ```powershell
   # Ejecutar PowerShell como Administrador
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```powershell
   npm run dev
   ```

4. **Abrir en navegador**
   ```
   http://localhost:3000
   ```

#### ⚠️ Problemas Comunes en Local

##### Error: EPERM operation not permitted
**Causa**: Restricciones de permisos en Windows  
**Solución**:
1. Abre PowerShell como Administrador
2. Ejecuta: `npm run dev`

##### Error: Cannot find module
**Causa**: Dependencias no instaladas  
**Solución**:
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

##### Error: Port 3000 already in use
**Causa**: Puerto ocupado  
**Solución**:
```powershell
# Opción 1: Cambiar puerto
$env:PORT=3001; npm run dev

# Opción 2: Matar proceso en puerto 3000
netstat -ano | findstr :3000
taskkill /PID [numero-pid] /F
```

---

## 🔧 Configuración de Variables de Entorno

### En AWS Amplify

1. Ve a AWS Amplify Console
2. Selecciona tu app: `-luna-mistica-esoterica`
3. Ve a **Environment variables**
4. Configura:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://[proyecto].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[tu-anon-key]
   NEXT_PUBLIC_APP_URL=https://main.d1a7gqykv9s6bd.amplifyapp.com
   ```

### En Local

1. Crea archivo `.env.local` en la raíz del proyecto
2. Agrega las mismas variables con `localhost:3000` como APP_URL
3. **Nunca** subas este archivo a Git (ya está en .gitignore)

---

## 📊 Base de Datos (Supabase)

### Conexión
- **Dashboard**: https://supabase.com/dashboard
- **SQL Editor**: Para ejecutar queries directamente
- **Table Editor**: Para editar datos manualmente

### Schemas Importantes

#### Productos (`public.products`)
- Productos físicos (velas, cristales, tarots, etc.)
- Campos: slug, name, description_md, price_mxn, featured

#### Servicios (`public.services`)
- Lecturas esotéricas (tarot, carta natal, runas)
- Campos: slug, name, description_md, duration_min, price_mxn, mode

#### Usuarios (`public.users`)
- Extiende auth.users de Supabase
- Roles: `customer` (default) o `admin`

#### Pedidos (`public.orders`)
- Órdenes de compra con items
- Estados: pending, paid, preparing, shipped, completed, cancelled

### Crear Usuario Admin

1. Regístrate en la aplicación: `/register`
2. En Supabase SQL Editor, ejecuta:
   ```sql
   UPDATE public.users 
   SET role = 'admin' 
   WHERE email = 'tu-email@ejemplo.com';
   ```
3. Ahora puedes acceder a `/admin`

---

## 🎨 Estructura del Proyecto

```
Esoteric/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page
│   │   ├── productos/         # Catálogo
│   │   ├── servicios/         # Servicios de lectura
│   │   ├── carrito/           # Shopping cart
│   │   ├── checkout/          # Proceso de pago
│   │   ├── admin/             # Panel administrativo
│   │   └── api/               # API routes
│   ├── components/            # Componentes React
│   │   ├── navbar.tsx         # Navegación principal
│   │   ├── footer.tsx         # Footer místico
│   │   ├── product-card.tsx   # Card de productos
│   │   └── ui/                # Componentes UI base
│   ├── lib/                   # Utilidades
│   │   ├── supabase.ts        # Cliente Supabase
│   │   └── utils.ts           # Helpers
│   ├── store/                 # Estado global (Zustand)
│   │   └── cart-store.ts      # Store del carrito
│   └── types/                 # Tipos TypeScript
├── database/                  # Schemas SQL
│   ├── migrations/            # Migraciones de DB
│   │   └── 001_initial_schema.sql
│   └── sample-data.sql        # Datos de ejemplo
├── public/                    # Archivos estáticos
├── scripts/                   # Scripts de deploy
└── docs/                      # Documentación
```

---

## 🚢 Proceso de Deploy

### Deploy Automático (Git → Amplify)

```bash
# 1. Hacer cambios
# 2. Commit
git add .
git commit -m "Feat: agregar nueva funcionalidad"

# 3. Push (Trigger automático)
git push origin main

# 4. Amplify construye y despliega automáticamente
# 5. Verificar en: https://main.d1a7gqykv9s6bd.amplifyapp.com/
```

### Monitorear Deploy

1. Ve a AWS Amplify Console
2. Selecciona tu app
3. Ve a la pestaña "Build"
4. Observa el log en tiempo real

---

## 🧪 Testing

### Testing Manual en Producción

1. **Productos**
   - Visita `/productos`
   - Verifica que se muestren todos los productos
   - Prueba filtros y búsqueda

2. **Servicios**
   - Visita `/servicios`
   - Verifica horarios disponibles
   - Prueba reserva de servicio

3. **Carrito**
   - Agrega productos al carrito
   - Verifica cálculo de totales
   - Prueba checkout

4. **Autenticación**
   - Registro de nuevo usuario
   - Login con credenciales
   - Acceso a cuenta

5. **Panel Admin**
   - Login como admin
   - Gestión de productos
   - Ver órdenes

---

## 📝 Buenas Prácticas

### Commits
```bash
# Formato recomendado
git commit -m "Tipo: descripción concisa"

# Ejemplos
git commit -m "Feat: agregar filtro por categoría en productos"
git commit -m "Fix: corregir cálculo de precio en carrito"
git commit -m "Style: mejorar diseño de footer místico"
git commit -m "Docs: actualizar README con instrucciones"
```

### Branches
```bash
# Desarrollo de features
git checkout -b feature/nombre-feature
git push origin feature/nombre-feature

# Amplify crea preview automático para cada branch
```

### Variables de Entorno
- ✅ **Usar**: `.env.local` para desarrollo local
- ❌ **NO subir**: Archivos .env a Git
- ✅ **Configurar**: Variables en Amplify Console

---

## 🔍 Debugging

### Logs en Amplify
1. AWS Amplify Console → tu app
2. Pestaña "Monitoring"
3. Ver logs de build y runtime

### Logs en Supabase
1. Supabase Dashboard → tu proyecto
2. Pestaña "Logs"
3. Filtrar por tipo: API, Database, Auth

### Inspeccionar en Navegador
```
F12 → Console
Network tab → Ver requests a Supabase
```

---

## 🆘 Solución de Problemas

### La app no carga en Amplify
1. Verifica que el build pasó exitosamente
2. Revisa variables de entorno
3. Checa logs de Amplify

### Productos no se muestran
1. Verifica conexión a Supabase
2. Confirma que existen datos en `public.products`
3. Revisa RLS policies en Supabase

### No puedo acceder a /admin
1. Verifica que tu usuario tenga role='admin'
2. Ejecuta en Supabase:
   ```sql
   SELECT email, role FROM public.users WHERE email='tu-email@ejemplo.com';
   ```

### Error al hacer checkout
1. Verifica que el usuario esté autenticado
2. Confirma que hay stock disponible
3. Revisa logs de Supabase

---

## 🎯 Próximos Pasos

### Funcionalidades Pendientes
- [ ] Integración con pasarela de pago (Stripe/MercadoPago)
- [ ] Sistema de envíos y tracking
- [ ] Notificaciones por email
- [ ] Sistema de reviews de productos
- [ ] Chat en vivo para consultas
- [ ] Blog de contenido esotérico
- [ ] Sistema de puntos/rewards

### Optimizaciones
- [ ] Implementar caché de productos
- [ ] Optimizar imágenes con Next.js Image
- [ ] Agregar PWA capabilities
- [ ] Implementar SEO avanzado
- [ ] Analytics y tracking de conversiones

---

## 📞 Contacto y Soporte

### Recursos
- **GitHub Repo**: https://github.com/DaveVelazquez/-luna-mistica-esoterica
- **AWS Amplify**: Console de tu proyecto
- **Supabase**: Dashboard de tu proyecto

### Documentación Adicional
- `README.md` - Introducción general
- `AWS_DEPLOYMENT.md` - Guía detallada de deploy
- `SUPABASE_SETUP.md` - Configuración de base de datos
- `DOMAIN_SETUP.md` - Configuración de dominio personalizado

---

## 🌙 ¡Feliz Desarrollo! ✨

Recuerda: **Usa AWS Amplify para desarrollo** - es más simple y refleja el entorno de producción exactamente.

Para desarrollo local, asegúrate de ejecutar PowerShell como Administrador.
