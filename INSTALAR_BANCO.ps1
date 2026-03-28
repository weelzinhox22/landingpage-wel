# Script PowerShell para instalar banco de dados
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Instalando Banco de Dados" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANTE: Este script vai pedir sua senha MySQL" -ForegroundColor Yellow
Write-Host ""

# Ler arquivo SQL e executar
$sqlContent = Get-Content -Path "backend\database.sql" -Raw
mysql -u root -p -e $sqlContent

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "  Banco de dados instalado!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

