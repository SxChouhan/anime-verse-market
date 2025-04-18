@echo off
echo Building and starting the Express server for anime-verse-market...
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js and try again.
    pause
    exit /b 1
)

REM Install server dependencies
echo Installing server dependencies...
copy server-package.json package.json >nul
npm install express compression helmet

REM Build the project
echo Building the project...
npm run build

REM Start the server
echo Starting the server...
node server.js

pause
