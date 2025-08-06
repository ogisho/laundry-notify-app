// firebase-messaging-sw.js

// Import Firebase scripts (必須)
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging.js');

// Firebase 初期化
firebase.initializeApp({
  apiKey: "AIzaSyCA1s7R1DCYyTkU9Hm_9F3GvgD6j95oD4o",
  authDomain: "pushnotification-4395c.firebaseapp.com",
  projectId: "pushnotification-4395c",
  storageBucket: "pushnotification-4395c.appspot.com",
  messagingSenderId: "656011398931",
  appId: "1:656011398931:web:527ddfc508a5f88f9cd4e6"
});

// Messaging を取得
const messaging = firebase.messaging();

// 🔑 iOS Safari は "push" イベントがないと権限 granted にならない
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push 受信:', event);

  const payload = event.data?.json() || {};
  const title = payload.notification?.title || '通知';
  const options = {
    body: payload.notification?.body || 'メッセージがあります',
    icon: '/icon.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
