@echo off
echo Starting Anime Verse Market Server...
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js and try again.
    pause
    exit /b 1
)

REM Start the server
node server.js

echo.
pause
