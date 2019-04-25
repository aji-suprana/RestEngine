@echo off
set /p msg="Enter Commit Message: "

git add -A
git commit -m"%msg%"
git pull
git push
cd .. 

cd bin
git add -A
git commit -m"%msg%"
git pull
git push

