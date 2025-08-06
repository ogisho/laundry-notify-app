// service-worker.js

// === プッシュ通知を受け取ったときの処理 ===
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
    icon: "/icon-192.png",   // manifest.json と合わせる
    badge: "/icon-72.png"    // 小さい通知用アイコン
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// === 通知をクリックしたときの処理 ===
self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      if (clientList.length > 0) {
        const client = clientList[0];
        return client.focus();
      }
      return clients.openWindow("/");
    })
  );
});
