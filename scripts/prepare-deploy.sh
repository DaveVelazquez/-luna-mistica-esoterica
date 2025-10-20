#!/bin/bash
# 🚀 Script de Preparación para Deployment
# Este script prepara tu aplicación Luna Mística para producción

echo "🔮 ===== PREPARANDO LUNA MÍSTICA PARA PRODUCCIÓN ===== 🔮"
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encuentra package.json. Ejecuta este script desde el directorio raíz del proyecto."
    exit 1
fi

print_status "Verificando estructura del proyecto..."

# Verificar archivos esenciales
essential_files=(
    "package.json"
    "next.config.js"
    "tailwind.config.ts"
    "tsconfig.json"
    ".env.example"
)

for file in "${essential_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ $file encontrado"
    else
        print_warning "⚠ $file no encontrado"
    fi
done

echo ""
print_status "🧹 Limpiando caché y dependencias..."

# Limpiar caché de Next.js
if [ -d ".next" ]; then
    rm -rf .next
    print_success "Caché de Next.js limpiado"
fi

# Limpiar node_modules
if [ -d "node_modules" ]; then
    rm -rf node_modules
    print_success "node_modules eliminado"
fi

# Limpiar package-lock.json para reinstalación limpia
if [ -f "package-lock.json" ]; then
    rm package-lock.json
    print_success "package-lock.json eliminado"
fi

echo ""
print_status "📦 Reinstalando dependencias..."

# Reinstalar dependencias
npm install

if [ $? -eq 0 ]; then
    print_success "Dependencias instaladas correctamente"
else
    print_error "Error al instalar dependencias"
    exit 1
fi

echo ""
print_status "🔧 Verificando configuración..."

# Verificar TypeScript
print_status "Verificando TypeScript..."
npx tsc --noEmit

if [ $? -eq 0 ]; then
    print_success "TypeScript: Sin errores"
else
    print_warning "TypeScript: Se encontraron errores"
fi

# Verificar ESLint
print_status "Verificando ESLint..."
npm run lint

if [ $? -eq 0 ]; then
    print_success "ESLint: Sin errores"
else
    print_warning "ESLint: Se encontraron errores"
fi

echo ""
print_status "🏗️ Construyendo aplicación para producción..."

# Build de producción
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completado exitosamente"
else
    print_error "Error en el build de producción"
    exit 1
fi

echo ""
print_status "📊 Analizando el bundle..."

# Mostrar información del build
if [ -d ".next" ]; then
    echo ""
    echo "📈 Tamaño del bundle:"
    du -sh .next
    echo ""
    
    # Mostrar páginas generadas
    if [ -d ".next/static" ]; then
        print_success "Assets estáticos generados correctamente"
    fi
fi

echo ""
print_status "🔍 Verificando archivos de configuración para deployment..."

# Verificar archivos importantes para deployment
deployment_files=(
    ".env.example"
    "next.config.js"
    "package.json"
    "vercel.json"
    "netlify.toml"
)

echo "Archivos de deployment encontrados:"
for file in "${deployment_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ $file"
    else
        print_warning "- $file (opcional)"
    fi
done

echo ""
print_status "🌍 Verificando variables de entorno..."

if [ -f ".env.local" ]; then
    print_warning "⚠ .env.local encontrado - Asegúrate de NO subirlo a Git"
    echo "Variables encontradas en .env.local:"
    grep -E "^[A-Z_]+" .env.local | sed 's/=.*/=***' || true
fi

if [ -f ".env.example" ]; then
    print_success "✓ .env.example encontrado - Úsalo como referencia para producción"
fi

echo ""
print_status "📋 Checklist de deployment:"
echo ""

checklist=(
    "✓ Crear repositorio en GitHub"
    "✓ Subir código con git push"
    "✓ Configurar variables de entorno en la plataforma"
    "✓ Configurar dominio personalizado (opcional)"
    "✓ Configurar Supabase para producción"
    "✓ Verificar que todas las URLs apunten a producción"
    "✓ Probar funcionalidades críticas"
    "✓ Configurar analytics (Google Analytics, etc.)"
)

for item in "${checklist[@]}"; do
    echo "  $item"
done

echo ""
echo "🎯 PLATAFORMAS RECOMENDADAS:"
echo ""
echo "🥇 VERCEL (Recomendado)"
echo "   - Gratis para proyectos personales"
echo "   - Deploy automático desde GitHub"
echo "   - CDN global incluido"
echo "   - Dominio personalizado gratis"
echo "   - Perfecto para Next.js"
echo ""
echo "🥈 NETLIFY"
echo "   - Gratis hasta 300 minutos build/mes"
echo "   - Formularios integrados"
echo "   - A/B testing"
echo ""
echo "🥉 RAILWAY"
echo "   - Base de datos incluida"
echo "   - ~$5/mes"
echo "   - Escalado automático"
echo ""

# Crear archivo con comandos de Git
echo ""
print_status "📝 Generando comandos de Git..."

cat > deploy-commands.txt << EOL
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
EOL

print_success "Comandos guardados en deploy-commands.txt"

echo ""
echo "🔮 ===== PREPARACIÓN COMPLETADA ===== 🔮"
echo ""
print_success "Tu aplicación Luna Mística está lista para deployment!"
print_status "Revisa el archivo 'deploy-commands.txt' para los siguientes pasos"
print_status "Lee DEPLOYMENT_GUIDE.md para instrucciones detalladas"
echo ""
print_warning "IMPORTANTE: No olvides configurar las variables de entorno en tu plataforma de hosting"
echo ""