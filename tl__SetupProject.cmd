IF NOT EXIST "package.json" call npm init


call .\tools\tool_GrabDependency.bat
call .\tools\tool_GrabAuthentication.bat
call .\tools\tool_GrabEngine.bat

call .\tools\tool_TypeScriptInit.bat