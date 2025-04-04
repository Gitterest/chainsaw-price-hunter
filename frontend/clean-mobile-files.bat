@echo off
cd /d "%~dp0"

echo Searching for files containing expo, react-native, or @react-navigation...

for %%F in (*.ts *.tsx) do (
    findstr /I "expo react-native @react-navigation" "%%F" >nul
    if %errorlevel%==0 (
        echo Deleting %%F
        del "%%F"
    )
)

echo Done cleaning up files with mobile-only dependencies.
pause