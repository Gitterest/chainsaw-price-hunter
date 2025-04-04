@echo off
setlocal ENABLEDELAYEDEXPANSION
cd /d "%~dp0"

echo.
echo 🔍 Scanning for expo/react-native/@react-navigation across all frontend files...
echo.

for /R %%F in (*.ts *.tsx) do (
    findstr /I "expo react-native @react-navigation" "%%F" >nul
    if !errorlevel! == 0 (
        echo 🗑️ Removing: %%F
        del "%%F"
    )
)

echo.
echo ✅ All mobile-native dependencies purged.
pause
