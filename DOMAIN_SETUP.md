# 🌐 Configuración de Dominio Personalizado

## Opción 1: Dominio Propio en AWS Amplify

### Paso 1: Comprar Dominio
Recomendaciones de nombres:
- `luna-mistica.com`
- `tienda-esoterica.com` 
- `luna-mistica.mx`
- `esoterica-luna.com`

### Paso 2: Configurar en Amplify
1. Ve a AWS Amplify Console
2. Selecciona tu app: `-luna-mistica-esoterica`
3. Click en **Domain Management** (en el menú lateral)
4. Click **Add domain**
5. Ingresa tu dominio (ej: `luna-mistica.com`)
6. AWS generará certificados SSL automáticamente

### Paso 3: Configurar DNS
AWS te proporcionará registros DNS como:
```
CNAME: www -> d1a7gqykv9s6bd.amplifyapp.com
ANAME/ALIAS: @ -> d1a7gqykv9s6bd.amplifyapp.com
```

Configura estos registros en tu proveedor de dominio.

### Paso 4: Actualizar Variables de Entorno
Una vez configurado, actualiza en Amplify:
```
NEXT_PUBLIC_APP_URL=https://luna-mistica.com
```

---

## Opción 2: Subdominio de Amplify (Gratis)

### Configuración Simple
1. En Amplify Domain Management
2. Puedes configurar: `luna-mistica.amplifyapp.com`
3. Esto es gratis y no requiere dominio propio

---

## Opción 3: Cloudflare (Proxy + Dominio)

### Ventajas
- Mejor rendimiento
- Protección DDoS
- Analytics avanzados
- CDN global

### Configuración
1. Compra dominio en cualquier proveedor
2. Transfiere DNS a Cloudflare
3. Configura CNAME que apunte a Amplify
4. Habilita proxy de Cloudflare

---

## Opción 4: Dominio .dev o .app (Moderno)

### Dominios modernos para tech
- `luna-mistica.dev`
- `luna-mistica.app`
- `esoterica.dev`

Estos dominios:
- Son modernos y tech-friendly
- Vienen con HTTPS obligatorio
- Buena percepción para apps web

---

## Costos Estimados

| Opción | Costo Anual | Tiempo Setup |
|--------|-------------|--------------|
| .com tradicional | $10-15 USD | 24-48 horas |
| .dev/.app | $12-20 USD | 24-48 horas |
| Subdominio Amplify | Gratis | 5 minutos |
| Cloudflare Pro | $20 USD | 1-2 horas |

---

## Recomendación

Para **producción**: Compra `luna-mistica.com` + Cloudflare
Para **desarrollo/demo**: Usa subdominio de Amplify

---

## Comando para Actualizar URL

Una vez que tengas el dominio configurado:

```bash
# Actualizar en el código
git add .
git commit -m "Update domain to luna-mistica.com"
git push
```

```sql
-- En Supabase, si es necesario actualizar URLs almacenadas
UPDATE public.settings 
SET value = 'https://luna-mistica.com' 
WHERE key = 'app_url';
```