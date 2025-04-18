@echo off
echo Copying resource files...
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js and try again.
    pause
    exit /b 1
)

REM Run the copy-resources.js script
node copy-resources.js

echo.
echo Resource files copied successfully!
echo.
pause
