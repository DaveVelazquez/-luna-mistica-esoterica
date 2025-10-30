# 🔧 Solución de Problemas - Error EPERM en Windows

## 🚨 Problema

Error al ejecutar npm/Node.js:
```
Error: EPERM: operation not permitted, lstat 'C:\Users\lng-clientadmin\AppData'
```

Este error indica que Node.js no tiene permisos para acceder a archivos en `AppData`.

## ✅ Soluciones

### Solución 1: Script Automático de Reparación (Recomendado)

**Ejecuta el script de reparación como Administrador:**

1. **Abre PowerShell como Administrador**:
   - Presiona `Windows + X`
   - Selecciona "Windows PowerShell (Admin)" o "Terminal (Admin)"

2. **Navega al proyecto**:
   ```powershell
   cd C:\dev\Dev2\Esoteric
   ```

3. **Ejecuta el script de reparación**:
   ```powershell
   .\scripts\fix-node-windows.ps1
   ```

Este script:
- ✅ Configura nueva ubicación de caché de npm
- ✅ Establece permisos correctos
- ✅ Limpia y reinstala dependencias
- ✅ Configura variables de entorno

### Solución 2: Diagnóstico Manual

**Ejecuta el script de diagnóstico para identificar problemas**:

```powershell
.\scripts\diagnose-node.ps1
```

### Solución 3: Reparación Manual Paso a Paso

#### Paso 1: Crear nueva carpeta de caché con permisos

```powershell
# Ejecutar como Administrador
New-Item -ItemType Directory -Path "C:\npm-cache" -Force
npm config set cache "C:\npm-cache" --global
```

#### Paso 2: Limpiar instalación actual

```powershell
# En el directorio del proyecto
Remove-Item -Path node_modules -Recurse -Force
Remove-Item -Path package-lock.json -Force
```

#### Paso 3: Reinstalar dependencias

```powershell
npm install
```

#### Paso 4: Intentar ejecutar

```powershell
npm run dev
```

### Solución 4: Reinstalar Node.js

Si nada funciona, reinstala Node.js:

1. **Desinstalar Node.js actual**:
   - Panel de Control → Programas → Desinstalar
   - Busca "Node.js" y desinstala

2. **Descargar versión LTS**:
   - Ve a: https://nodejs.org
   - Descarga la versión LTS (Long Term Support)

3. **Instalar con permisos de Administrador**:
   - Clic derecho en el instalador
   - "Ejecutar como Administrador"
   - Sigue el asistente de instalación

4. **Verificar instalación**:
   ```powershell
   node --version
   npm --version
   ```

5. **Configurar npm**:
   ```powershell
   npm config set cache "C:\npm-cache" --global
   ```

### Solución 5: Verificar Permisos de Usuario

**Verificar permisos en carpeta AppData**:

1. Abre PowerShell como Administrador

2. Ejecuta:
   ```powershell
   icacls "C:\Users\lng-clientadmin\AppData" /grant "%username%:(OI)(CI)F"
   ```

3. Intenta ejecutar la app nuevamente

### Solución 6: Usar Alternativa de Desarrollo

**Desarrollo con AWS Amplify (Sin ejecutar localmente)**:

Si los problemas persisten, usa el workflow de producción:

1. Hacer cambios en VS Code
2. Commit y push:
   ```powershell
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```
3. Amplify despliega automáticamente (~5-7 min)
4. Verificar en: https://main.d1a7gqykv9s6bd.amplifyapp.com/

## 🔍 Diagnóstico de Problemas Comunes

### Problema: "Cannot find module"
**Solución**: Reinstalar dependencias
```powershell
rm -r node_modules
npm install
```

### Problema: "Port 3000 already in use"
**Solución**: Cambiar puerto o matar proceso
```powershell
# Opción 1: Usar otro puerto
$env:PORT=3001; npm run dev

# Opción 2: Matar proceso en puerto 3000
netstat -ano | findstr :3000
taskkill /PID [numero-pid] /F
```

### Problema: "npm ERR! code EACCES"
**Solución**: Ejecutar como Administrador
```powershell
# Abrir PowerShell como Administrador
npm run dev
```

### Problema: "npm ERR! network"
**Solución**: Verificar conexión a internet y configurar proxy si es necesario
```powershell
npm config set proxy null
npm config set https-proxy null
npm config set registry https://registry.npmjs.org/
```

## 📊 Verificación Post-Reparación

Después de aplicar las soluciones, verifica:

```powershell
# 1. Verificar Node.js
node --version

# 2. Verificar npm
npm --version

# 3. Verificar configuración de npm
npm config list

# 4. Intentar ejecutar la app
npm run dev
```

## 🌐 Alternativa: Usar Versión en Producción

Tu aplicación ya está funcionando en:
- 🚀 **https://main.d1a7gqykv9s6bd.amplifyapp.com/**

Puedes trabajar directamente con el workflow Git → Amplify sin necesidad de ejecutar localmente.

## 📞 Soporte Adicional

Si ninguna solución funciona:

1. **Revisa la documentación**: [DEVELOPMENT_WORKFLOW.md](DEVELOPMENT_WORKFLOW.md)
2. **Contacta al administrador del sistema**: El usuario `lng-clientadmin` puede tener restricciones corporativas
3. **Usa otro usuario de Windows**: Crea un nuevo usuario con permisos de administrador
4. **Usa WSL2**: Considera usar Windows Subsystem for Linux para desarrollo

## 📝 Notas

- Siempre ejecuta PowerShell como Administrador cuando trabajes con npm
- El usuario `lng-clientadmin` parece ser un usuario corporativo/administrado que puede tener restricciones
- La solución más simple es usar el workflow de AWS Amplify sin ejecución local
