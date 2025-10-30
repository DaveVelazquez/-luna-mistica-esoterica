# 🚀 INSTRUCCIONES PARA EJECUTAR LA APLICACIÓN LOCALMENTE

## ⚠️ IMPORTANTE: Problema Identificado

Tu sistema Windows tiene restricciones de permisos que impiden que Node.js acceda a:
```
C:\Users\lng-clientadmin\AppData
```

Este es un usuario corporativo/administrado que tiene restricciones de seguridad.

## ✅ SOLUCIÓN RÁPIDA (5 minutos)

### Opción A: Script Automático

1. **Cierra VS Code completamente**

2. **Abre PowerShell como Administrador**:
   - Presiona `Windows + X`
   - Selecciona "Windows PowerShell (Admin)" o "Terminal (Admin)"
   - ⚠️ IMPORTANTE: Debe decir "Administrador" en el título

3. **Navega al proyecto**:
   ```powershell
   cd C:\dev\Dev2\Esoteric
   ```

4. **Ejecuta el script de reparación**:
   ```powershell
   .\scripts\simple-fix.ps1
   ```

5. **Si todo va bien, ejecuta la app**:
   ```powershell
   npm run dev
   ```

6. **Abre en navegador**:
   ```
   http://localhost:3000
   ```

### Opción B: Comandos Manuales

Si el script no funciona, ejecuta esto en PowerShell como Administrador:

```powershell
# 1. Navega al proyecto
cd C:\dev\Dev2\Esoteric

# 2. Limpia instalación previa
Remove-Item -Path node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path package-lock.json -Force -ErrorAction SilentlyContinue

# 3. Instala dependencias
npm install

# 4. Ejecuta la aplicación
npm run dev
```

## 🌐 ALTERNATIVA: Usar Versión en Producción

Si los problemas persisten, tu aplicación **YA ESTÁ FUNCIONANDO** en:

### 🚀 https://main.d1a7gqykv9s6bd.amplifyapp.com/

**Workflow recomendado sin ejecución local**:

1. Edita código en VS Code
2. Guarda cambios
3. Commit y push:
   ```powershell
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```
4. Amplify despliega automáticamente en ~5-7 minutos
5. Verifica cambios en la URL de producción

**Ventajas**:
- ✅ No necesitas ejecutar localmente
- ✅ No hay problemas de permisos
- ✅ Entorno idéntico a producción
- ✅ Deploy automático con cada push

## 🔍 Diagnóstico

Si quieres saber qué está mal, ejecuta (como Administrador):

```powershell
.\scripts\diagnose-node.ps1
```

## 💡 Por Qué No Funciona

Tu usuario `lng-clientadmin` parece ser:
- 🏢 Usuario corporativo/administrado
- 🔒 Con políticas de seguridad restrictivas
- ⛔ Sin acceso completo a AppData

**Posibles soluciones permanentes**:
1. Contacta a tu administrador de sistemas
2. Usa otro usuario de Windows con permisos completos
3. Instala Node.js en otra ubicación (C:\dev\nodejs)
4. Usa WSL2 (Windows Subsystem for Linux)
5. **Trabaja con AWS Amplify** (sin ejecución local)

## 📊 Estado Actual del Proyecto

✅ **Código**: Funcionando perfectamente
✅ **Producción**: Desplegado en AWS Amplify
✅ **Base de Datos**: Configurada en Supabase
✅ **CI/CD**: GitHub → Amplify automático

❌ **Ejecución Local**: Bloqueada por permisos de Windows

## 🎯 Recomendación Final

**Usa el workflow de AWS Amplify** - es más simple y evita todos estos problemas:

1. Editas en VS Code
2. `git push`
3. Listo - deploy automático

No necesitas ejecutar localmente para desarrollar. 🌙✨

---

## 📞 ¿Necesitas Ayuda?

- **Documentación**: Ver DEVELOPMENT_WORKFLOW.md
- **Problemas**: Ver TROUBLESHOOTING.md
- **URL Producción**: https://main.d1a7gqykv9s6bd.amplifyapp.com/
