# Simple Node.js Fix for Windows
# Run as Administrator

Write-Host "=== Node.js Repair Script ===" -ForegroundColor Cyan

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: Must run as Administrator" -ForegroundColor Red
    Write-Host "Please run PowerShell as Administrator" -ForegroundColor Yellow
    exit 1
}

Write-Host "Running as Administrator - OK" -ForegroundColor Green

# Step 1: Create and configure npm cache
Write-Host "`nStep 1: Configuring npm cache..." -ForegroundColor Yellow
$cacheDir = "C:\npm-cache"
if (-not (Test-Path $cacheDir)) {
    New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null
}
Write-Host "Cache directory created: $cacheDir" -ForegroundColor Green

# Step 2: Clean node_modules
Write-Host "`nStep 2: Cleaning node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "node_modules removed" -ForegroundColor Green
}

if (Test-Path "package-lock.json") {
    Remove-Item -Path "package-lock.json" -Force
    Write-Host "package-lock.json removed" -ForegroundColor Green
}

# Step 3: Install dependencies
Write-Host "`nStep 3: Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take several minutes..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSUCCESS! Dependencies installed" -ForegroundColor Green
    Write-Host "`nYou can now run: npm run dev" -ForegroundColor Cyan
} else {
    Write-Host "`nERROR: Installation failed" -ForegroundColor Red
    Write-Host "Error code: $LASTEXITCODE" -ForegroundColor Red
}

Write-Host "`nPress Enter to exit..."
Read-Host
