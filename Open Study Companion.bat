@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js, then open this file again.
  pause
  exit /b 1
)

if not exist "dist\index.html" (
  echo Building the frontend...
  call npm run build
  if errorlevel 1 (
    echo The app could not be prepared. Please keep this window open and share the message above.
    pause
    exit /b 1
  )
)

echo Starting EELU Study Companion server on http://127.0.0.1:4177 ...
start "EELU Study Companion Server" /min cmd /c node server\index.mjs
for /l %%i in (1,1,25) do (
  powershell -NoProfile -Command "try { $null = Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:4177/api/catalog' -TimeoutSec 1; exit 0 } catch { exit 1 }" >nul 2>&1
  if not errorlevel 1 goto open_app
  timeout /t 1 >nul
)

echo The local study server did not respond in time. Check that port 4177 is free.
pause
exit /b 1

:open_app
echo Server is running! Opening browser...
start "" "http://127.0.0.1:4177"
endlocal
