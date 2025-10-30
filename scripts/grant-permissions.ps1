# Script para Dar Permisos al Usuario lng-clientadmin
# EJECUTAR COMO ADMINISTRADOR

Write-Host "=== Configurar Permisos para lng-clientadmin ===" -ForegroundColor Cyan

# Verificar si se está ejecutando como Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "`nERROR: Este script requiere permisos de Administrador" -ForegroundColor Red
    Write-Host "Cierra este terminal y abre PowerShell como Administrador" -ForegroundColor Yellow
    Read-Host "`nPresiona Enter para salir"
    exit 1
}

Write-Host "Ejecutando como Administrador - OK`n" -ForegroundColor Green

# 1. Dar permisos completos a AppData
Write-Host "Paso 1: Configurando permisos en AppData..." -ForegroundColor Yellow
$appDataPath = "C:\Users\lng-clientadmin\AppData"

if (Test-Path $appDataPath) {
    Write-Host "Carpeta encontrada: $appDataPath" -ForegroundColor Cyan
    
    # Dar permisos completos al usuario
    $command = "icacls `"$appDataPath`" /grant lng-clientadmin:(OI)(CI)F /T /Q"
    Write-Host "Ejecutando: $command" -ForegroundColor Gray
    
    try {
        icacls "$appDataPath" /grant lng-clientadmin:`(OI`)`(CI`)F /T /Q
        Write-Host "Permisos configurados correctamente" -ForegroundColor Green
    } catch {
        Write-Host "Error al configurar permisos: $_" -ForegroundColor Red
    }
} else {
    Write-Host "ADVERTENCIA: No se encontro la carpeta AppData" -ForegroundColor Red
}

# 2. Dar permisos a la carpeta del proyecto
Write-Host "`nPaso 2: Configurando permisos en carpeta del proyecto..." -ForegroundColor Yellow
$projectPath = "C:\dev\Dev2\Esoteric"

if (Test-Path $projectPath) {
    Write-Host "Carpeta del proyecto: $projectPath" -ForegroundColor Cyan
    
    try {
        icacls "$projectPath" /grant lng-clientadmin:`(OI`)`(CI`)F /T /Q
        Write-Host "Permisos del proyecto configurados" -ForegroundColor Green
    } catch {
        Write-Host "Error al configurar permisos del proyecto: $_" -ForegroundColor Red
    }
} else {
    Write-Host "ADVERTENCIA: No se encontro la carpeta del proyecto" -ForegroundColor Red
}

# 3. Crear carpeta de cache de npm con permisos
Write-Host "`nPaso 3: Creando carpeta de cache de npm..." -ForegroundColor Yellow
$cacheDir = "C:\npm-cache"

if (-not (Test-Path $cacheDir)) {
    New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null
    Write-Host "Carpeta de cache creada: $cacheDir" -ForegroundColor Green
}

# Dar permisos a la carpeta de cache
try {
    icacls "$cacheDir" /grant lng-clientadmin:`(OI`)`(CI`)F /T /Q
    Write-Host "Permisos de cache configurados" -ForegroundColor Green
} catch {
    Write-Host "Error al configurar permisos de cache: $_" -ForegroundColor Red
}

# 4. Crear carpeta para instalaciones globales de npm
Write-Host "`nPaso 4: Creando carpeta para npm global..." -ForegroundColor Yellow
$npmGlobalDir = "C:\npm-global"

if (-not (Test-Path $npmGlobalDir)) {
    New-Item -ItemType Directory -Path $npmGlobalDir -Force | Out-Null
    Write-Host "Carpeta npm global creada: $npmGlobalDir" -ForegroundColor Green
}

try {
    icacls "$npmGlobalDir" /grant lng-clientadmin:`(OI`)`(CI`)F /T /Q
    Write-Host "Permisos de npm global configurados" -ForegroundColor Green
} catch {
    Write-Host "Error al configurar permisos de npm global: $_" -ForegroundColor Red
}

# 5. Verificar permisos
Write-Host "`nPaso 5: Verificando permisos..." -ForegroundColor Yellow

Write-Host "`nPermisos en AppData:" -ForegroundColor Cyan
icacls "$appDataPath" | Select-String "lng-clientadmin"

Write-Host "`nPermisos en proyecto:" -ForegroundColor Cyan
icacls "$projectPath" | Select-String "lng-clientadmin"

Write-Host "`nPermisos en cache:" -ForegroundColor Cyan
icacls "$cacheDir" | Select-String "lng-clientadmin"

# Resumen
Write-Host "`n=== RESUMEN ===" -ForegroundColor Cyan
Write-Host "1. Permisos configurados en: $appDataPath" -ForegroundColor White
Write-Host "2. Permisos configurados en: $projectPath" -ForegroundColor White
Write-Host "3. Cache creada en: $cacheDir" -ForegroundColor White
Write-Host "4. NPM Global en: $npmGlobalDir" -ForegroundColor White

Write-Host "`nProximos pasos:" -ForegroundColor Yellow
Write-Host "1. Cierra este terminal" -ForegroundColor White
Write-Host "2. Abre un NUEVO PowerShell (normal, no admin)" -ForegroundColor White
Write-Host "3. cd C:\dev\Dev2\Esoteric" -ForegroundColor White
Write-Host "4. npm install" -ForegroundColor White
Write-Host "5. npm run dev" -ForegroundColor White

Read-Host "`nPresiona Enter para finalizar"
