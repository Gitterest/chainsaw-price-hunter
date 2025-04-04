@echo off
echo 🚫 Removing Tailwind directives from all .scss files...

REM Loop through all .scss files recursively
for /r %%f in (*.scss) do (
    echo Cleaning %%f...
    powershell -Command "(Get-Content '%%f') | Where-Object { $_ -notmatch '@tailwind (base|components|utilities);' } | Set-Content '%%f'"
)

echo ✅ Done! All Tailwind @ directives removed from .scss files.
pause