// UGXGIG — lightweight activity tracker.
// Records the last meaningful thing the person was doing on this device,
// so if the app gets killed in the background and reopens fresh, we can
// offer a way back in instead of just showing the static homepage.

function trackActivity(label) {
  try {
    localStorage.setItem('ugxgig_last_activity', JSON.stringify({
      url: location.pathname.split('/').pop() + location.search,
      label: label,
      ts: Date.now()
    }));
  } catch (e) {}
}

function getLastActivity() {
  try {
    var raw = localStorage.getItem('ugxgig_last_activity');
    if (!raw) return null;
    var a = JSON.parse(raw);
    // ignore anything older than 24h, and ignore the homepage itself
    if (Date.now() - a.ts > 24 * 60 * 60 * 1000) return null;
    if (!a.url || a.url.indexOf('index.html') === 0 || a.url === '') return null;
    return a;
  } catch (e) { return null; }
}
