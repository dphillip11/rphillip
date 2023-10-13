@echo off
setlocal

:: Define the file name to delete
set "file_to_delete=file_names.txt"

:: Check if the file exists before deleting it
if exist "%file_to_delete%" (
    del "%file_to_delete%"
    echo Deleted %file_to_delete%
) else (
    echo %file_to_delete% not found. Skipping deletion.
)

:: Run "getNames.exe"
start "" "getNames.exe"

timeout /t 3

:: Perform Git operations
git pull
git add .
git commit -m "added images"
git push

:: Display a success message
echo Script completed successfully.
pause
