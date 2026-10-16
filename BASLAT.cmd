@echo off
setlocal
cd /d "%~dp0"
set "STORY_PYTHON=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
where python >nul 2>nul
if %errorlevel% equ 0 set "STORY_PYTHON=python"
echo Hikaye: http://127.0.0.1:4173
"%STORY_PYTHON%" -m http.server 4173 --bind 127.0.0.1 --directory site

