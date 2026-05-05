@echo off
REM Start both backend and frontend servers

echo.
echo Starting Code Language Translator...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "server\node_modules" (
    echo ERROR: Backend dependencies not installed!
    echo Please run setup.bat first
    pause
    exit /b 1
)

if not exist "client\node_modules" (
    echo ERROR: Frontend dependencies not installed!
    echo Please run setup.bat first
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist "server\.env" (
    echo ERROR: .env file not found in server directory!
    echo Please create it from .env.example and add your OpenAI API key
    pause
    exit /b 1
)

echo.
echo ================================
echo Starting Backend Server...
echo ================================
echo Server will run on: http://localhost:5000
echo.

start cmd /k "cd server && npm start"

REM Wait a bit for server to start
timeout /t 3 /nobreak

echo.
echo ================================
echo Starting Frontend Server...
echo ================================
echo Frontend will open at: http://localhost:3000
echo.

start cmd /k "cd client && npm start"

echo.
echo ================================
echo Both servers are starting...
echo ================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause
