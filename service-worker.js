// Service Worker for WeatherNotify
self.addEventListener("push", function(event) {
  const data = event.data.json();
  const title = data.notification.title || "WeatherNotify";
  const options = {
    body: data.notification.body,
    icon: "/icons/icon-192.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
