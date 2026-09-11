@echo off
title SahakarNyaya AI - SIH 2026 Chatbot
color 0B
cls
echo ======================================================================
echo    SIH 2026: Multilingual Cooperative Governance ^& Legal Assistance
echo                  SahakarNyaya AI Prototype Launcher
echo ======================================================================
echo.
echo [*] Navigating to project directory...
cd /d "C:\Users\Raj Gajjar\.gemini\antigravity\scratch\sih-coop-legal-bot"

echo [*] Starting SahakarNyaya local server and opening your browser...
echo [*] Keep this black terminal window open while using the chatbot.
echo.

python start_server.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Launching direct HTML interface in browser as fallback...
    start "" "index.html"
)

echo.
pause
