// === Firebase SDK を読み込む ===
importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging.js");

// === Firebase を初期化 ===
firebase.initializeApp({
  apiKey: "AIzaSyCA1s7R1DCYyTkU9Hm_9F3GvgD6j95oD4o",
  authDomain: "pushnotification-4395c.firebaseapp.com",
  projectId: "pushnotification-4395c",
  storageBucket: "pushnotification-4395c.appspot.com",
  messagingSenderId: "656011398931",
  appId: "1:656011398931:web:527ddfc508a5f88f9cd4e6"
});

// === Messaging を取得 ===
const messaging = firebase.messaging();

// === プッシュ通知受信時 ===
self.addEventListener("push", event => {
  console.log("📩 Pushイベント受信:", event);

  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: "通知", body: event.data.text() };
    }
  }

  const title = data.title || "通知タイトル";
  const options = {
    body: data.body || "通知内容がありません",
    icon: "/icon-192.png",
    badge: "/icon-72.png"
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// === 通知クリック時 ===
self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow("/");
    })
  );
});
