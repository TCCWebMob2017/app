@if (@X)==(@Y) @end /* ---Harmless hybrid line that begins a JScript comment

@echo off
cscript //E:JScript //nologo "%~f0"
exit /b 0
*------------------------------------------------------------------------------*/

function GetCurrentDate() {
        // Today date time which will used to set as default date.
        var todayDate = new Date();
        todayDate = ("0" + todayDate.getDate()).slice(-2) + "/" + 
                    ("0" + (todayDate.getMonth() + 1)).slice(-2) + "/" +
                    todayDate.getFullYear() + " " +
                    ("0" + todayDate.getHours()).slice(-2) + ":" +
                    ("0" + todayDate.getMinutes()).slice(-2);

        return todayDate;
    }

WScript.Echo(GetCurrentDate());