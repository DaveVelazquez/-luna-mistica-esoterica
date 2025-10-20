# 🚀 Script de Preparación para Deployment - Luna Mística
# Version para Windows PowerShell

Write-Host "🔮 ===== PREPARANDO LUNA MÍSTICA PARA PRODUCCIÓN ===== 🔮" -ForegroundColor Magenta
Write-Host ""

# Función para imprimir mensajes con colores
function Write-Status {
    param($Message)
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-Success {
    param($Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Error "No se encuentra package.json. Ejecuta este script desde el directorio raíz del proyecto."
    exit 1
}

Write-Status "Verificando estructura del proyecto..."

# Verificar archivos esenciales
$essentialFiles = @(
    "package.json",
    "next.config.js", 
    "tailwind.config.ts",
    "tsconfig.json",
    ".env.example"
)

foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        Write-Success "✓ $file encontrado"
    } else {
        Write-Warning "⚠ $file no encontrado"
    }
}

Write-Host ""
Write-Status "🧹 Limpiando caché y dependencias..."

# Limpiar caché de Next.js
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Success "Caché de Next.js limpiado"
}

# Limpiar node_modules
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules
    Write-Success "node_modules eliminado"
}

# Limpiar package-lock.json
if (Test-Path "package-lock.json") {
    Remove-Item -Force package-lock.json
    Write-Success "package-lock.json eliminado"
}

Write-Host ""
Write-Status "📦 Reinstalando dependencias..."

# Reinstalar dependencias
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Success "Dependencias instaladas correctamente"
} else {
    Write-Error "Error al instalar dependencias"
    exit 1
}

Write-Host ""
Write-Status "🔧 Verificando configuración..."

# Verificar TypeScript
Write-Status "Verificando TypeScript..."
npx tsc --noEmit

if ($LASTEXITCODE -eq 0) {
    Write-Success "TypeScript: Sin errores"
} else {
    Write-Warning "TypeScript: Se encontraron errores"
}

# Verificar ESLint
Write-Status "Verificando ESLint..."
npm run lint

if ($LASTEXITCODE -eq 0) {
    Write-Success "ESLint: Sin errores"
} else {
    Write-Warning "ESLint: Se encontraron errores"
}

Write-Host ""
Write-Status "🏗️ Construyendo aplicación para producción..."

# Build de producción
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Success "Build completado exitosamente"
} else {
    Write-Error "Error en el build de producción"
    exit 1
}

Write-Host ""
Write-Status "📊 Analizando el bundle..."

# Mostrar información del build
if (Test-Path ".next") {
    Write-Host ""
    Write-Host "📈 Tamaño del bundle:"
    $size = (Get-ChildItem .next -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "$([math]::Round($size, 2)) MB"
    Write-Host ""
    
    if (Test-Path ".next/static") {
        Write-Success "Assets estáticos generados correctamente"
    }
}

Write-Host ""
Write-Status "🔍 Verificando archivos de configuración para deployment..."

# Verificar archivos importantes para deployment
$deploymentFiles = @(
    ".env.example",
    "next.config.js",
    "package.json", 
    "vercel.json",
    "netlify.toml"
)

Write-Host "Archivos de deployment encontrados:"
foreach ($file in $deploymentFiles) {
    if (Test-Path $file) {
        Write-Success "✓ $file"
    } else {
        Write-Warning "- $file (opcional)"
    }
}

Write-Host ""
Write-Status "🌍 Verificando variables de entorno..."

if (Test-Path ".env.local") {
    Write-Warning "⚠ .env.local encontrado - Asegúrate de NO subirlo a Git"
    Write-Host "Variables encontradas en .env.local:"
    Get-Content .env.local | Where-Object { $_ -match "^[A-Z_]+" } | ForEach-Object {
        $varName = ($_ -split "=")[0]
        Write-Host "$varName=***"
    }
}

if (Test-Path ".env.example") {
    Write-Success "✓ .env.example encontrado - Úsalo como referencia para producción"
}

Write-Host ""
Write-Status "📋 Checklist de deployment:"
Write-Host ""

$checklist = @(
    "✓ Crear repositorio en GitHub",
    "✓ Subir código con git push",
    "✓ Configurar variables de entorno en la plataforma",
    "✓ Configurar dominio personalizado (opcional)",
    "✓ Configurar Supabase para producción", 
    "✓ Verificar que todas las URLs apunten a producción",
    "✓ Probar funcionalidades críticas",
    "✓ Configurar analytics (Google Analytics, etc.)"
)

foreach ($item in $checklist) {
    Write-Host "  $item"
}

Write-Host ""
Write-Host "🎯 PLATAFORMAS RECOMENDADAS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "🥇 VERCEL (Recomendado)" -ForegroundColor Green
Write-Host "   - Gratis para proyectos personales"
Write-Host "   - Deploy automático desde GitHub"
Write-Host "   - CDN global incluido"
Write-Host "   - Dominio personalizado gratis"
Write-Host "   - Perfecto para Next.js"
Write-Host ""
Write-Host "🥈 NETLIFY" -ForegroundColor Yellow
Write-Host "   - Gratis hasta 300 minutos build/mes"
Write-Host "   - Formularios integrados"
Write-Host "   - A/B testing"
Write-Host ""
Write-Host "🥉 RAILWAY" -ForegroundColor Blue
Write-Host "   - Base de datos incluida"
Write-Host "   - ~$5/mes"
Write-Host "   - Escalado automático"
Write-Host ""

# Crear archivo con comandos de Git
Write-Status "📝 Generando comandos de Git..."

$gitCommands = @"
# 🚀 Comandos para deployment

## 1. Preparar Git (si es primera vez)
git init
git add .
git commit -m "feat: Initial commit - Luna Mística Tienda Esotérica"

## 2. Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU-USUARIO/luna-mistica.git
git branch -M main
git push -u origin main

## 3. Para actualizaciones futuras
git add .
git commit -m "feat: descripción del cambio"
git push

## 4. Variables de entorno para producción
# Copia estas variables en tu plataforma de hosting:

NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_publica
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app

# Opcional para analytics:
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL=123456789

## 5. Dominios sugeridos
# luna-mistica.com
# tienda-esoterica.com
# cristales-y-tarot.com
# mystic-store.com
"@

$gitCommands | Out-File -FilePath "deploy-commands.txt" -Encoding UTF8
Write-Success "Comandos guardados en deploy-commands.txt"

Write-Host ""
Write-Host "🔮 ===== PREPARACIÓN COMPLETADA ===== 🔮" -ForegroundColor Magenta
Write-Host ""
Write-Success "Tu aplicación Luna Mística está lista para deployment!"
Write-Status "Revisa el archivo 'deploy-commands.txt' para los siguientes pasos"
Write-Status "Lee DEPLOYMENT_GUIDE.md para instrucciones detalladas"
Write-Host ""
Write-Warning "IMPORTANTE: No olvides configurar las variables de entorno en tu plataforma de hosting"
Write-Host ""

# Pausa para que el usuario pueda leer
Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")