import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';

const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTTH_DOMAIN,
   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
console.log(`firebaseConfig=====>`, firebaseConfig);

let messaging;
if (typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator) {
   const app = initializeApp(firebaseConfig);
   messaging = getMessaging(app);

   onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      if (navigator.serviceWorker) {
         navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(payload.notification.title, {
               body: payload.notification.body,
            });
         });
      }
   });
}

export {messaging, getToken, onMessage};
