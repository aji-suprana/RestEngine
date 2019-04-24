::tsc

start .\tools\tool_startMongoDB.bat

timeout 4

call node server.js
pause