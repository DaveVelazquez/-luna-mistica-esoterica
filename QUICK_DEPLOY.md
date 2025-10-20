# 🚀 Comandos Rápidos de Deployment

## 📋 CHECKLIST PRE-DEPLOYMENT

- [ ] ✅ Código funciona correctamente en desarrollo
- [ ] 🧪 Todas las funciones admin probadas
- [ ] 🔧 Variables de entorno configuradas
- [ ] 📝 Commits al día en Git
- [ ] 🗄️ Base de datos lista (Supabase)

## 🔧 PREPARACIÓN

```bash
# 1. Limpiar y preparar
npm run build

# 2. Verificar que no hay errores
npm run lint

# 3. Probar build localmente
npm run start
```

## 🆓 OPCIÓN 1: VERCEL (RECOMENDADO)

### Paso a Paso:

```bash
# 1. Subir a GitHub
git add .
git commit -m "feat: ready for deployment"
git push origin main

# 2. Ir a vercel.com
# 3. Conectar GitHub
# 4. Importar repositorio
# 5. Configurar variables de entorno:
```

**Variables de Entorno para Vercel:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
```

### ✅ VENTAJAS DE VERCEL:
- ✅ Deploy automático con cada push
- ✅ CDN global ultrarrápido  
- ✅ Dominio .vercel.app gratis
- ✅ Certificado SSL automático
- ✅ Perfect for Next.js
- ✅ Analytics incluidos

---

## 💻 OPCIÓN 2: NETLIFY

```bash
# 1. Subir a GitHub (igual que Vercel)
git add .
git commit -m "feat: ready for netlify"
git push origin main

# 2. Ir a netlify.com
# 3. "New site from Git"
# 4. Conectar repositorio
# 5. Build settings:
#    Build command: npm run build
#    Publish directory: .next
```

**Variables de Entorno para Netlify:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  
NEXT_PUBLIC_APP_URL=https://tu-sitio.netlify.app
```

---

## 🚂 OPCIÓN 3: RAILWAY (CON BASE DE DATOS)

```bash
# 1. Crear cuenta en railway.app
# 2. "New Project" > "Deploy from GitHub repo"
# 3. Conectar repositorio
# 4. Agregar PostgreSQL database (opcional)
```

**Variables de Entorno para Railway:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_APP_URL=https://tu-app.up.railway.app
DATABASE_URL=postgresql://... (si agregaste DB)
```

---

## 🌐 CONFIGURAR DOMINIO PERSONALIZADO

### Dominios Sugeridos:
- `luna-mistica.com` 
- `tienda-esoterica.com`
- `cristales-tarot.com`
- `mystic-luna.com`

### Registrars Recomendados:
- **Namecheap** (~$8-12/año)
- **Cloudflare** (~$8-10/año) 
- **GoDaddy** (~$12-15/año)

### Configurar en Vercel:
1. Project Settings > Domains
2. Add Domain: `www.tu-dominio.com`
3. Configurar DNS según instrucciones

---

## 📊 MONITOREO POST-DEPLOYMENT

### Google Analytics (Opcional):
```bash
# 1. Crear cuenta en analytics.google.com
# 2. Crear property para tu sitio
# 3. Copiar Measurement ID (G-XXXXXXXXXX)
# 4. Agregar variable de entorno:
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

### Configurar Alertas:
- 📧 Email notifications en Vercel/Netlify
- 📱 Uptime monitoring (UptimeRobot gratis)
- 🔍 Error tracking (Sentry)

---

## 🛡️ SEGURIDAD POST-DEPLOYMENT

### SSL/HTTPS:
✅ Automático en Vercel/Netlify

### Backup de Datos:
✅ Automático en Supabase

### Updates:
```bash
# Para actualizar después del deployment:
git add .
git commit -m "feat: descripción del cambio"
git push origin main
# Deploy automático! 🚀
```

---

## 🎯 RECOMENDACIÓN FINAL

**Para Luna Mística:**

### 🏆 GANADOR: Vercel + GitHub
**Por qué:**
- ✅ Gratuito para comenzar
- ✅ Deploy automático
- ✅ Performance excepcional
- ✅ Perfecto para Next.js
- ✅ Dominio personalizado gratis
- ✅ SSL automático
- ✅ Analytics incluidos

### 💰 Costos Estimados:
- **Mes 1-6**: $0 (completamente gratis)
- **Con dominio**: $8-12/año adicional
- **Si creces mucho**: $20/mes Vercel Pro

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Build Fails:
```bash
# Limpiar caché
rm -rf .next node_modules
npm install
npm run build
```

### Variables de Entorno no funcionan:
- ✅ Verificar que empiecen con `NEXT_PUBLIC_`
- ✅ Reiniciar deployment después de cambios
- ✅ Verificar ortografía exacta

### Dominio no funciona:
- ✅ Esperar 24-48h para propagación DNS
- ✅ Verificar configuración de DNS
- ✅ Usar `www.` si hay problemas

---

## 📞 RECURSOS ÚTILES

- 📚 [Documentación de Vercel](https://vercel.com/docs)
- 📚 [Documentación de Netlify](https://docs.netlify.com)
- 🎬 [Video: Deploy Next.js to Vercel](https://youtube.com/watch?v=...)
- 💬 [Comunidad de Next.js](https://github.com/vercel/next.js/discussions)

---

**¡Tu tienda esotérica estará online en menos de 10 minutos! 🔮✨**