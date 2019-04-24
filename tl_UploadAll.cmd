@echo off
set /p msg="Enter Commit Message: "

cd Engine

git add -A
git commit -m"%msg%"
git push
cd .. 

cd Events_Authentication
git add -A
git commit -m"%msg%"
git push

cd ..
git add -A
git commit -m"%msg%"
git push