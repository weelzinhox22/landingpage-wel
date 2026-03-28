# Script para instalar banco de dados
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Instalando Banco de Dados MySQL" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se MySQL está disponível
try {
    $mysqlVersion = mysql --version
    Write-Host "MySQL encontrado: $mysqlVersion" -ForegroundColor Green
} catch {
    Write-Host "ERRO: MySQL não encontrado!" -ForegroundColor Red
    Write-Host "Certifique-se de que o MySQL está instalado e no PATH" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Agora vamos importar o banco de dados..." -ForegroundColor Yellow
Write-Host "Você precisará digitar sua senha MySQL" -ForegroundColor Yellow
Write-Host ""

# Usar cmd para executar o comando MySQL (funciona melhor no Windows)
$sqlFile = Join-Path $PSScriptRoot "backend\database.sql"
cmd /c "mysql -u root -p < `"$sqlFile`""

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "  Instalação concluída!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure as credenciais em backend/api/config.php" -ForegroundColor White
Write-Host "2. Acesse: http://localhost/backend/admin/login.php" -ForegroundColor White
Write-Host "3. Login: admin / admin123" -ForegroundColor White
Write-Host ""
pause

