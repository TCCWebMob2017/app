@ECHO OFF
set _my_datetime=%date%_%time%
git status
git add .
IF "%1%"=="" (
    git commit -m %_my_datetime%
    GOTO FIM
)
git commit -m %1
:FIM
git push origin master