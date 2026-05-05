@echo off
REM Code Language Translator - Setup Script
REM This script installs all dependencies for both backend and frontend

echo.
echo ================================
echo Code Language Translator Setup
echo ================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version

echo.
echo [1/5] Installing backend dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Fixing backend security vulnerabilities...
call npm audit fix --force
if %errorlevel% neq 0 (
    echo WARNING: Some vulnerabilities could not be fixed
)

echo.
echo [3/5] Installing frontend dependencies...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo [4/5] Fixing frontend security vulnerabilities...
call npm audit fix --force
if %errorlevel% neq 0 (
    echo WARNING: Some vulnerabilities could not be fixed
)

cd ..

echo.
echo [5/5] Setup complete!
echo.
echo ================================
echo Next Steps:
echo ================================
echo.
echo 1. Create a .env file in the 'server' directory:
echo    - Copy from server\.env.example
echo    - Add your OpenAI API key: OPENAI_API_KEY=sk-your-key-here
echo.
echo 2. Start the backend (in PowerShell/Command Prompt):
echo    cd server
echo    npm start
echo.
echo 3. Start the frontend (in another PowerShell/Command Prompt):
echo    cd client
echo    npm start
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo ================================
echo.
pause
