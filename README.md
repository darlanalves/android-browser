# Android on Browser

The screen of my Moto G is dead, so I've made a little app that captures the screen on my phone and
pipes the output on a node server. Now I can see what's on screen via adb.

# Running

Just open a terminal and run `make` in the root folder. Then go to `http://localhost:7000/` to see the phone screen and interact with it.

## Gestures

- Left click is a "tap" on screen.
- Right click will update the screen only.
- Holding Ctrl while dragging over the screen (with left button on mouse pressed) will do a swipe.
- Writing in the input and pressing enter will send a sequence of characters to a input that is focused on device.

## Install

For the main app you just need to run `npm install`.

You will also need the `adb` binary available and the Android phone with USB Debugging enabled.

If you don't have the latest adb app or the Android SDK, there's a tgz'ed adb binary in the `vendor` folder. This binary was copied from the Android SDK, in the version `1.0.32`.

More info about ADB [here](https://developer.android.com/sdk/installing/index.html)

To check if adb is okay, you can run `adb devices` in a terminal. The expected output is a list of devices and their states. The device must be listed as "device", otherwise it is not properly connected and authorized.

## To-do

- I have to translate all the keyboard inputs to adb commands
- A better and faster way to capture the screen (like a websocket)
