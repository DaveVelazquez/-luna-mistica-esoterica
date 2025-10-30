# Script para Reparar Node.js y npm en Windows
# EJECUTAR COMO ADMINISTRADOR

Write-Host "=== Reparación de Node.js y npm ===" -ForegroundColor Cyan
Write-Host "IMPORTANTE: Este script debe ejecutarse como Administrador" -ForegroundColor Red

# Verificar si se está ejecutando como Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "`n✗ ERROR: Este script requiere permisos de Administrador" -ForegroundColor Red
    Write-Host "Por favor, ejecuta PowerShell como Administrador y vuelve a intentar" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "✓ Ejecutando como Administrador" -ForegroundColor Green

# 1. Configurar nueva ubicación de caché de npm
Write-Host "`n1. Configurando caché de npm..." -ForegroundColor Yellow
$cacheDir = "C:\npm-cache"
if (-not (Test-Path $cacheDir)) {
    New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null
    Write-Host "✓ Carpeta de caché creada: $cacheDir" -ForegroundColor Green
}

# Dar permisos completos a la carpeta de caché
$acl = Get-Acl $cacheDir
$permission = "$env:USERNAME", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow"
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule $permission
$acl.SetAccessRule($accessRule)
Set-Acl $cacheDir $acl
Write-Host "✓ Permisos configurados en carpeta de caché" -ForegroundColor Green

# 2. Configurar npm para usar nueva caché
Write-Host "`n2. Actualizando configuración de npm..." -ForegroundColor Yellow
& npm config set cache $cacheDir --global
Write-Host "✓ Caché de npm configurada" -ForegroundColor Green

# 3. Configurar prefix de npm
Write-Host "`n3. Configurando prefix de npm..." -ForegroundColor Yellow
$prefixDir = "C:\npm-global"
if (-not (Test-Path $prefixDir)) {
    New-Item -ItemType Directory -Path $prefixDir -Force | Out-Null
}
& npm config set prefix $prefixDir --global
Write-Host "✓ Prefix de npm configurado" -ForegroundColor Green

# 4. Agregar al PATH si no existe
Write-Host "`n4. Verificando PATH..." -ForegroundColor Yellow
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($currentPath -notlike "*$prefixDir*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$prefixDir", "User")
    Write-Host "✓ PATH actualizado" -ForegroundColor Green
} else {
    Write-Host "✓ PATH ya está configurado" -ForegroundColor Green
}

# 5. Limpiar node_modules y reinstalar
Write-Host "`n5. Limpiando node_modules..." -ForegroundColor Yellow
$nodeModulesPath = Join-Path (Get-Location) "node_modules"
if (Test-Path $nodeModulesPath) {
    Write-Host "Eliminando node_modules (esto puede tardar)..." -ForegroundColor Cyan
    Remove-Item -Path $nodeModulesPath -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✓ node_modules eliminado" -ForegroundColor Green
}

$packageLockPath = Join-Path (Get-Location) "package-lock.json"
if (Test-Path $packageLockPath) {
    Remove-Item -Path $packageLockPath -Force
    Write-Host "✓ package-lock.json eliminado" -ForegroundColor Green
}

# 6. Reinstalar dependencias
Write-Host "`n6. Reinstalando dependencias..." -ForegroundColor Yellow
Write-Host "Esto puede tardar varios minutos..." -ForegroundColor Cyan
& npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencias instaladas exitosamente" -ForegroundColor Green
} else {
    Write-Host "✗ Error al instalar dependencias" -ForegroundColor Red
    Write-Host "Código de salida: $LASTEXITCODE" -ForegroundColor Red
}

# 7. Resumen
Write-Host "`n=== RESUMEN ===" -ForegroundColor Cyan
Write-Host "Caché de npm: $cacheDir" -ForegroundColor White
Write-Host "Prefix de npm: $prefixDir" -ForegroundColor White
Write-Host "`nAhora puedes intentar ejecutar:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host "`nSi aún tienes problemas:" -ForegroundColor Yellow
Write-Host "  1. Reinicia PowerShell" -ForegroundColor White
Write-Host "  2. Reinicia tu computadora" -ForegroundColor White
Write-Host "  3. Reinstala Node.js desde: https://nodejs.org" -ForegroundColor White

Read-Host "`nPresiona Enter para finalizar"
