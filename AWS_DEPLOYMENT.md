# Despliegue en AWS — Luna Mística

Esta guía explica varias formas de desplegar la app Next.js en AWS: **Amplify**, **ECS/Fargate (Docker + ECR)**, **Elastic Beanstalk**, y **EC2 + PM2**. Elige la que mejor se adapte a tu presupuesto y experiencia.

## Requisitos previos
- Cuenta AWS con permisos: ECR, ECS, Amplify, Elastic Beanstalk, IAM
- AWS CLI configurado: `aws configure`
- Docker instalado (para contenedores) - **Opcional para Amplify y EB**
- Git repo conectado a GitHub (opcional para Amplify)

## 🚀 RECOMENDACIÓN RÁPIDA: Usa AWS Amplify primero

Si tienes problemas con Docker local o permisos de Node.js, **AWS Amplify es la mejor opción** porque:
- No requiere Docker en tu máquina
- El build se hace en la nube
- Detecta automáticamente Next.js
- CI/CD automático desde GitHub

---

## Opción A — AWS Amplify (la más sencilla) ⭐ RECOMENDADA

**Ventajas**: Sin Docker, sin permisos complicados, build en la nube

1. **Sube tu código a GitHub**:
```powershell
git add .
git commit -m "Add AWS deployment files"
git push origin main
```

2. **Configura Amplify**:
   - Ve a https://console.aws.amazon.com/amplify/home
   - "Host web app" → Conecta GitHub → selecciona el repo y branch `main`
   - Amplify detectará `amplify.yml` automáticamente
   - **Importante**: En "Environment variables" agrega:
     ```
     NEXT_PUBLIC_SUPABASE_URL = tu_url_supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY = tu_clave_publica
     NEXT_PUBLIC_APP_URL = https://tu-app.amplifyapp.com
     ```

3. **Deploy automático**: Amplify ejecutará `npm ci` y `npm run build` en la nube

4. **SSL y dominio**: Incluidos automáticamente. Puedes agregar dominio personalizado después.

**Costo estimado**: Gratis para tráfico bajo (~5GB/mes)

---

## Opción B — ECS (ECR + Fargate) — para producción con contenedores

**Solo si tienes Docker instalado localmente**

1. **Construir y probar imagen localmente**:
```powershell
# Desde la raíz del proyecto (requiere Docker Desktop)
docker build -t luna-mistica:latest .
docker run -e NEXT_PUBLIC_APP_URL=http://localhost:3000 -p 3000:3000 luna-mistica:latest
```

2. **Subir a ECR** (usa el script incluido):
```powershell
.\scripts\build-docker.ps1 -region us-east-1 -repoName luna-mistica
```

3. **Crear servicio ECS**: Usa la consola AWS o Terraform para crear cluster ECS, task definition con la imagen ECR, y servicio con ALB.

**Alternativa sin Docker local**: Usa AWS CodeBuild para construir la imagen en la nube desde GitHub.

## Opción C — Elastic Beanstalk (recomendado si no quieres Docker)

1. **Preparar deployment bundle**:
```powershell
# Crear archivo .zip con el código fuente
Compress-Archive -Path * -DestinationPath luna-mistica-deploy.zip -Exclude node_modules,.git,.next
```

2. **Deploy con EB CLI**:
```powershell
# Instalar EB CLI primero: pip install awsebcli
eb init luna-mistica --region us-east-1 --platform "Node.js 20"
eb create luna-mistica-prod --envvars NEXT_PUBLIC_SUPABASE_URL=tu_url,NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave
eb deploy
```

**Beneficios**: Maneja escalado automático, health checks, rolling deployments.

---

## Opción D — EC2 + Nginx + PM2 (control total)

1. Provisiona una instancia EC2 (Amazon Linux 2)
2. Instala Node, Nginx, PM2
3. Clona el repo, instala dependencias y corre `npm run build` y `pm2 start ecosystem.config.js`
4. Configura Nginx como reverse proxy en el puerto 80

Comandos ejemplo (PowerShell / SSH):

```powershell
# en local: ssh ubuntu@your-ec2-ip
sudo yum update -y
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs nginx git
sudo npm i -g pm2
git clone https://github.com/tu-usuario/luna-mistica.git
cd luna-mistica
npm ci
npm run build
pm2 start ecosystem.config.js
sudo systemctl enable nginx
# Configura /etc/nginx/conf.d/luna-mistica.conf con proxy_pass http://127.0.0.1:3000
sudo systemctl restart nginx
```

---

## ⚡ Resolución de problemas comunes

### Error EPERM en Windows (como el que experimentaste)
```
Error: EPERM: operation not permitted, lstat 'AppData'
```

**Soluciones**:
1. **Usar AWS Amplify** (recomendado) - el build se hace en la nube
2. **Ejecutar PowerShell como Administrador**
3. **Verificar antivirus** - agregar exclusión para la carpeta del proyecto
4. **Usar Docker** - si tienes Docker Desktop instalado
5. **Cambiar versión de Node** - usar Node 18 o 20 LTS

### Variables de entorno requeridas
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1Q...
NEXT_PUBLIC_APP_URL=https://tu-dominio.amplifyapp.com
```

## 💰 Comparación de costos (estimado mensual)

| Opción | Tráfico bajo | Tráfico medio | Beneficios |
|--------|-------------|---------------|------------|
| **Amplify** | Gratis | $5-15 | Más fácil, SSL incluido |
| **Elastic Beanstalk** | $10-20 | $30-50 | Escalado automático |
| **ECS Fargate** | $15-25 | $40-80 | Microservicios, contenedores |
| **EC2** | $5-10 | $20-40 | Control total, más trabajo |

## 🎯 Recomendación final

**Para empezar**: Usa **AWS Amplify**
- Sin complicaciones de Docker o permisos
- Deploy en 5 minutos
- SSL automático
- CI/CD incluido

**Para producción empresarial**: **Elastic Beanstalk** o **ECS Fargate**
- Mejor control sobre recursos
- Escalado avanzado
- Monitoring integrado
