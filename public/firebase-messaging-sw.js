importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
   apiKey: "AIzaSyDRBQego0Oq4bj5QnVgjlJ7bN5fPrbKMZY",
   authDomain: "bundo-assessment.firebaseapp.com",
   projectId: "bundo-assessment",
   storageBucket: "bundo-assessment.appspot.com",
   messagingSenderId: "689390160020",
   appId: "1:689390160020:web:be0c938179ebea4005cc81",
   measurementId: "G-MB5X6CKC9R"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
   console.log('[firebase-messaging-sw.js] Received background message ', payload);
   const notificationTitle = payload.notification.title;
   const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
});
