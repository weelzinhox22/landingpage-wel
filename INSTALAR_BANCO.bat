@echo off
echo ====================================
echo  Instalando Banco de Dados
echo ====================================
echo.
echo IMPORTANTE: Este script vai pedir sua senha MySQL
echo.
mysql -u root -p < backend\database.sql
echo.
echo ====================================
echo  Banco de dados instalado!
echo ====================================
pause

