import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAzI_pYNOig5crDJA2SkyglGFC0yi0nm3s",
    authDomain: "firstproject-fbc73.firebaseapp.com",
    projectId: "firstproject-fbc73",
    storageBucket: "firstproject-fbc73.appspot.com",
    messagingSenderId: "410151713751",
    appId: "1:410151713751:web:94e3e1883922caaac3a992",
    measurementId: "G-MPPWGV4EQ3"
};
const app = initializeApp(firebaseConfig);


// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');
