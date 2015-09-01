# Android on Browser

The screen of my Moto G is dead, so I've made a little app that captures the screen on my phone and
pipes the output on a node server, so I can see what's on screen via adb.

Going to http://localhost:5000/ will show the phone screen and allow to interact with the phone
using a mouse (tap and swipe).

## Install

For the main app you just need to run `npm install`.

You will also need the `adb` binary available in your path.

If you don't have the latest adb app or the Android SDK, there's a tgz'ed adb binary in the `vendor` folder.
This binary was copied from the Android SDK, in the version `1.0.32`.

More info [here](https://developer.android.com/sdk/installing/index.html)

## To-do

- I have to translate all the keyboard inputs to adb commands
- A better and faster way to capture the screen
