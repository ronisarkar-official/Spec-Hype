'use strict';

import { posts } from './homePost.js';

// ------- Utilities -------
/** Return a new array with `count` random items using Fisher-Yates (non-destructive). */
function getRandomSubset(arr, count) {
	const n = Math.min(count, arr.length);
	const copy = arr.slice(); // shallow copy
	// Fisher-Yates
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy.slice(0, n);
}

/** Safe helper to attach click listener if element exists. */
function on(el, type, fn) {
	if (el) el.addEventListener(type, fn);
}

// ------- Build posts section (single DOM write) -------
(function renderRecommended() {
	const dynamicRoot = document.getElementById('dynamic-section');
	if (!dynamicRoot) return;

	const selected = getRandomSubset(posts, 6);

	// Create section and grid using document fragments / elements
	const section = document.createElement('div');
	section.className =
		'bg-white w-fit max-w-full sm:max-w-6xl rounded-lg shadow p-4 sm:p-6 mb-4 mx-auto mt-28 flex flex-col px-4 sm:mt-4';

	const heading = document.createElement('h2');
	heading.className =
		'text-lg font-semibold text-gray-800 border-b-2 border-[#339af0] inline-block mb-4';
	heading.textContent = 'YOU MIGHT LIKE';
	section.appendChild(heading);

	const grid = document.createElement('div');
	grid.className =
		'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6';

	// Build cards into a fragment
	const gridFragment = document.createDocumentFragment();

	for (let i = 0; i < selected.length; i++) {
		const post = selected[i];

		const card = document.createElement('article');
		card.className = 'bg-white rounded-lg overflow-hidden transition p-2 group';

		// image wrapper + link + img
		const imgWrap = document.createElement('div');
		imgWrap.className = 'overflow-hidden rounded-lg';

		const a = document.createElement('a');
		a.href = post.link || '#';
		a.rel = 'noopener noreferrer';

		const img = document.createElement('img');
		img.src = post.image || '';
		img.alt = post.title || 'Post';
		img.loading = 'lazy'; // lazy load
		img.decoding = 'async'; // non-blocking decode
		img.className =
			'w-full h-auto object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105';

		a.appendChild(img);
		imgWrap.appendChild(a);
		card.appendChild(imgWrap);

		// meta area
		const meta = document.createElement('div');
		meta.className = 'mt-2';

		const tag = document.createElement('span');
		tag.className = 'text-xs text-white bg-[#0E579F] px-2 py-1 rounded';
		tag.textContent = post.category || 'GAMES';

		const titleLink = document.createElement('a');
		titleLink.href = post.link || '#';
		titleLink.className =
			'font-semibold mt-2 text-gray-800 text-sm flex leading-snug';
		titleLink.textContent = post.title || '';

		meta.appendChild(tag);
		meta.appendChild(titleLink);

		card.appendChild(meta);
		gridFragment.appendChild(card);
	}

	grid.appendChild(gridFragment);
	section.appendChild(grid);

	// Replace children in a single operation
	dynamicRoot.replaceChildren(section);
})();

// ------- Generate Table of Contents (deferred if possible) -------
(function buildTOC() {
	const tocList = document.getElementById('toc-list');
	const tocToggle = document.getElementById('toc-toggle');
	if (!tocList) {
		if (tocToggle) tocToggle.style.display = 'none';
		return;
	}

	const generate = () => {
		// clear existing
		tocList.textContent = '';

		const sections = document.querySelectorAll('section');
		if (!sections.length) {
			tocList.classList.add('hidden');
			if (tocToggle) tocToggle.textContent = 'Show';
			return;
		}

		const frag = document.createDocumentFragment();
		for (let i = 0; i < sections.length; i++) {
			const sec = sections[i];
			const h2 = sec.querySelector('h2');
			if (!h2) continue;

			const id = sec.id || `section-${i + 1}`;
			sec.id = id; // ensure id exists

			const li = document.createElement('li');
			const a = document.createElement('a');
			a.href = `#${id}`;
			a.textContent = h2.textContent.trim();
			a.className = 'text-indigo-600 hover:underline';
			li.appendChild(a);
			frag.appendChild(li);
		}
		tocList.appendChild(frag);
	};

	// Use requestIdleCallback for low-priority work if available; fallback to setTimeout
	if ('requestIdleCallback' in window) {
		requestIdleCallback(generate, { timeout: 500 });
	} else {
		setTimeout(generate, 0);
	}

	// Attach toggle with a safe helper
	on(tocToggle, 'click', () => {
		tocList.classList.toggle('hidden');
		if (tocToggle) {
			tocToggle.textContent = tocList.classList.contains('hidden')
				? 'Show'
				: 'Hide';
		}
	});
})();
