@echo off
setlocal
cd /d "%~dp0"
set "PORTFOLIO_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
where node >nul 2>nul
if %errorlevel% equ 0 for /f "delims=" %%N in ('where node') do set "PORTFOLIO_NODE=%%N"
if not exist "%PORTFOLIO_NODE%" (
  echo Node.js bulunamadi. Node.js 20.9 veya uzerini kurup tekrar deneyin.
  exit /b 1
)
for %%N in ("%PORTFOLIO_NODE%") do set "PATH=%%~dpN;%PATH%"
if not exist "node_modules\next\dist\bin\next" (
  echo Bagimliliklar eksik. Once pnpm install komutunu calistirin.
  exit /b 1
)
"%PORTFOLIO_NODE%" node_modules\next\dist\bin\next dev --hostname 127.0.0.1
exit /b %errorlevel%

