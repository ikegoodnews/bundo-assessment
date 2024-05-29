import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';

const firebaseConfig = {
   apiKey: 'AIzaSyDRBQego0Oq4bj5QnVgjlJ7bN5fPrbKMZY',
   authDomain: 'bundo-assessment.firebaseapp.com',
   projectId: 'bundo-assessment',
   storageBucket: 'bundo-assessment.appspot.com',
   messagingSenderId: '689390160020',
   appId: '1:689390160020:web:be0c938179ebea4005cc81',
   measurementId: 'G-MB5X6CKC9R',
};

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
