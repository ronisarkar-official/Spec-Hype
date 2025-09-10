self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('app-cache').then((cache) => {
			return cache.addAll([
				'/',
				'/index.html',
				'/app.css',
				'/js/addmain.js',
				'/js/homePost.js',
				'/js/recomend.js',
			]);
		}),
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => response || fetch(event.request)),
	);
});
