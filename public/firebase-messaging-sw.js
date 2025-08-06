// public/firebase-messaging-sw.js
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
    body: data.body || "通知内容がありません"
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
