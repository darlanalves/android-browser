# Really dumb checking
if [ $(uname) = "Darwin" ]; then
    adb shell screencap -p | perl -pe 's/\x0D\x0A/\x0A/g';
else
   adb shell screencap -p | sed 's/\r$//';
fi
