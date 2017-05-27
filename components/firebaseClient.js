// Firebase used for Authentication and Messaging (GCM now FCM)

const firebase = require("firebase");

const config = {
    apiKey: "AIzaSyA8KXeYsdS00vCCBgFMePwCI2y3inDAe9c",
    authDomain: "glance-e7db8.firebaseapp.com",
}

firebase.initializeApp(config);

export default firebase;