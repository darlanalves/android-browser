# Really dumb checking
if [ $(uname) = "Darwin" ]; then
   adb shell screencap -p
else
   adb shell screencap -p | sed 's/\r$//';
fi
