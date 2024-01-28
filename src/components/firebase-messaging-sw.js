import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzI_pYNOig5crDJA2SkyglGFC0yi0nm3s",
    authDomain: "firstproject-fbc73.firebaseapp.com",
    projectId: "firstproject-fbc73",
    storageBucket: "firstproject-fbc73.appspot.com",
    messagingSenderId: "410151713751",
    appId: "1:410151713751:web:94e3e1883922caaac3a992",
    measurementId: "G-MPPWGV4EQ3"
};


function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const app = initializeApp(firebaseConfig);

       const messaging = getMessaging(app);
       getToken(messaging, {vapidKey: "BAaDZ3bg6-ZlA-j488Mno_o5RNLKbxE6T9zngPfof2lu2kmxvBM7dZVms6ECwsa7j6aaqLbsmMcIoIF0lBPmRJw"})
      .then((currentToken) => {
       if (currentToken) {
       console.log('currentToken ', currentToken )
    } else {
        console.log('Cannot get token')
    }
})

      } else {
        console.log('Do not have permission')
      }
    })
}

requestPermission()