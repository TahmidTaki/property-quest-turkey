@echo off
title PQT Website - keep this window open
cd /d C:\dev\pqt-website

echo ===============================================================
echo   STARTING THE PQT WEBSITE
echo ---------------------------------------------------------------
echo   A browser tab will open automatically in a few seconds.
echo   If it shows "can't connect", just refresh it once.
echo.
echo   KEEP THIS BLACK WINDOW OPEN while using the site.
echo   Close this window when you are done to stop the site.
echo ===============================================================
echo.

REM Open the browser to the site after the server has had time to start
start "" /min powershell -WindowStyle Hidden -Command "Start-Sleep 8; Start-Process 'http://localhost:3003'"

REM Start the website (this keeps running - do not close the window)
call npm run dev
