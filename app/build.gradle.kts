plugins {
    id("com.android.application")
}

android {
    namespace = "com.zat10924.budget"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.zat10924.budget"
        minSdk = 23
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
