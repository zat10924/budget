# Budget – Android wrapper

This Android Studio project wraps the existing Budget web app in a native Android WebView. It loads the GitHub Pages site so the app and website use the same account and data.

## Build an APK

1. Open this repository's `android/` directory in Android Studio.
2. Allow Gradle sync and install Android SDK 35 if prompted.
3. Choose **Build → Build Bundle(s) / APK(s) → Build APK(s)**.

Or, from this directory, run `gradle assembleDebug` with Gradle installed. The APK will be at `app/build/outputs/apk/debug/app-debug.apk`.

The app requires an internet connection to load the hosted site. Web app changes are reflected in the Android app without rebuilding it.
