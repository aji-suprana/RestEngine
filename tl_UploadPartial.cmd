@echo off
set /p moduleToCommit="Enter Module to commit: Example [Engine]:"
set /p msg="Enter Commit Message: "

cd Engine

git add -A
git commit -m"%msg%"
git push
cd .. 

