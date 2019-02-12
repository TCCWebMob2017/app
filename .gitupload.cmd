@ECHO OFF
git status
git add .
IF "%1%"=="" (
    git commit -m "Commit"
    GOTO FIM
)
git commit -m %1
:FIM
git push origin master