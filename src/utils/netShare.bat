echo off
setlocal EnableDelayedExpansion

(for /F "tokens=1,* delims==" %%a IN (
  'wmic /node:"%HOSTNAME%" share get path /value %_narrow%'
) do for /F "delims=" %%A in ("%%~b") do (

  set dirname=%%~A
  IF NOT "!dirname!"=="!dirname:~0,4!" (
    IF /I NOT "!dirname!"=="C:\windows" (
      echo !dirname!
    )
  )

)) > shares.log

endlocal