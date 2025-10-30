# Script de Diagnóstico y Reparación para Node.js en Windows
# Ejecutar como Administrador

Write-Host "=== Diagnóstico de Node.js y npm ===" -ForegroundColor Cyan

# 1. Verificar versión de Node.js
Write-Host "`n1. Verificando versión de Node.js..." -ForegroundColor Yellow
node --version

# 2. Verificar versión de npm
Write-Host "`n2. Verificando versión de npm..." -ForegroundColor Yellow
npm --version

# 3. Verificar permisos en carpeta AppData
Write-Host "`n3. Verificando permisos en AppData..." -ForegroundColor Yellow
$appDataPath = "$env:USERPROFILE\AppData"
if (Test-Path $appDataPath) {
    Write-Host "✓ La carpeta AppData existe" -ForegroundColor Green
    $acl = Get-Acl $appDataPath
    Write-Host "Propietario: $($acl.Owner)" -ForegroundColor Cyan
} else {
    Write-Host "✗ La carpeta AppData NO existe" -ForegroundColor Red
}

# 4. Verificar instalación de Node.js
Write-Host "`n4. Ubicación de Node.js..." -ForegroundColor Yellow
Get-Command node | Select-Object -ExpandProperty Source

# 5. Limpiar caché de npm (alternativo)
Write-Host "`n5. Intentando limpiar caché de npm..." -ForegroundColor Yellow
try {
    npm cache clean --force 2>$null
    Write-Host "✓ Caché limpiada exitosamente" -ForegroundColor Green
} catch {
    Write-Host "✗ No se pudo limpiar la caché" -ForegroundColor Red
}

# 6. Configurar nueva ubicación de caché
Write-Host "`n6. Configurando nueva ubicación de caché..." -ForegroundColor Yellow
$newCache = "C:\npm-cache"
if (-not (Test-Path $newCache)) {
    New-Item -ItemType Directory -Path $newCache -Force | Out-Null
    Write-Host "✓ Carpeta de caché creada: $newCache" -ForegroundColor Green
}

try {
    npm config set cache $newCache --global 2>$null
    Write-Host "✓ Caché configurada en: $newCache" -ForegroundColor Green
} catch {
    Write-Host "✗ No se pudo configurar la caché" -ForegroundColor Red
}

# 7. Verificar node_modules
Write-Host "`n7. Verificando node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✓ node_modules existe" -ForegroundColor Green
} else {
    Write-Host "✗ node_modules NO existe - ejecutar: npm install" -ForegroundColor Red
}

# 8. Verificar package.json
Write-Host "`n8. Verificando package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "✓ package.json existe" -ForegroundColor Green
    $pkg = Get-Content package.json | ConvertFrom-Json
    Write-Host "  Proyecto: $($pkg.name)" -ForegroundColor Cyan
    Write-Host "  Versión: $($pkg.version)" -ForegroundColor Cyan
} else {
    Write-Host "✗ package.json NO existe" -ForegroundColor Red
}

# 9. Recomendaciones
Write-Host "`n=== RECOMENDACIONES ===" -ForegroundColor Cyan
Write-Host "Si los errores persisten:" -ForegroundColor Yellow
Write-Host "1. Reinstala Node.js desde: https://nodejs.org" -ForegroundColor White
Write-Host "2. Ejecuta PowerShell como Administrador" -ForegroundColor White
Write-Host "3. Verifica permisos de usuario en Windows" -ForegroundColor White
Write-Host "4. Usa la aplicación en producción: https://main.d1a7gqykv9s6bd.amplifyapp.com/" -ForegroundColor White

Write-Host "`n=== FIN DEL DIAGNÓSTICO ===" -ForegroundColor Cyan
