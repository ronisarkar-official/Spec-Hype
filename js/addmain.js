import { popularPosts } from './homePost.js';

(() => {
	'use strict';

	/* -------------------------
     Config / small utilities
     ------------------------- */
	const navLinks = [
		{ name: 'Home', href: '/' },
		{
			name: 'Terms and Conditions',
			href: 'https://www.spechype.com/terms-and-conditions.html',
		},
		{
			name: 'Privacy Policy',
			href: 'https://www.spechype.com/privacy-policy.html',
		},
		{ name: 'About Us', href: 'https://www.spechype.com/about-us.html' },
		{ name: 'Contact Us', href: 'https://www.spechype.com/contact-us.html' },
	];

	const createNavLinks = (isMobile = false) =>
		navLinks
			.map(
				({ name, href }) =>
					`<a href="${href}" class="${
						isMobile
							? 'block text-gray-800 px-4 py-2 rounded-md bg-white shadow-sm hover:bg-blue-50'
							: 'text-gray-700 hover:text-blue-500'
					} transition-all" rel="noopener noreferrer">${name}</a>`,
			)
			.join('');

	/* -------------------------
     Insert header once (safe)
     ------------------------- */
	const headerHTML = `
<header id="navbar" class="bg-white shadow-md fixed top-0 left-0 w-full z-50 p-4 transition-transform duration-300">
  <div class="container mx-auto flex justify-between items-center">
    <div class="ml-4 sm:ml-20">
      <a href="https://www.spechype.com" aria-label="Spechype home">
        <img src="https://www.spechype.com/icons/logo.webp" alt="Logo" class="h-8 sm:h-10 w-auto ml-1" />
      </a>
    </div>
    <nav class="hidden md:flex items-center space-x-6">${createNavLinks()}</nav>
    <input type="text" id="searchInput" placeholder="Search..." class="w-40 sm:w-64 mb-2 sm:mb-0 mr-0 sm:mr-6 border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-offset-2" />
    <button id="menu-btn" aria-label="menu" aria-expanded="false" class="md:hidden focus:outline-none hover:scale-110 transition-transform">
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
  <div id="mobile-menu" class="md:hidden max-h-0 overflow-hidden transition-all duration-500 flex flex-col mt-3 space-y-3 px-4">
    ${createNavLinks(true)}
  </div>
</header>
`;

	if (!document.getElementById('navbar')) {
		document.body.insertAdjacentHTML('afterbegin', headerHTML);
	}

	/* -------------------------
     Inject small CSS fallback
     (so class toggles below have smooth behaviour)
     You can remove/replace with Tailwind utilities if preferred.
     ------------------------- */
	const injectedStyles = `
#navbar { transition: transform 260ms cubic-bezier(.4,0,.2,1); will-change: transform; }
#navbar.nav-hidden { transform: translateY(-110%); }
#backToTop { transition: opacity 200ms ease, visibility 200ms ease; opacity:0; visibility:hidden; pointer-events:none; }
#backToTop.visible { opacity:1; visibility:visible; pointer-events:auto; }
#mobile-menu { transition: max-height 320ms ease; overflow: hidden; }
#mobile-menu.open { max-height: 60rem; } 
`;
	const styleEl = document.createElement('style');
	styleEl.textContent = injectedStyles;
	document.head.appendChild(styleEl);

	/* -------------------------
     Cache DOM nodes once
     ------------------------- */
	const navbar = document.getElementById('navbar');
	const backToTopButton = document.getElementById('backToTop'); // optional
	const menuBtn = document.getElementById('menu-btn');
	const mobileMenu = document.getElementById('mobile-menu');
	const searchInput = document.getElementById('searchInput');
	const loadMoreBtn = document.getElementById('loadMoreBtn'); // optional
	const sidebarList = document.querySelector('#sidebar ul');

	/* -------------------------
     Render Sidebar (single write)
     - adds lazy + decoding attributes for images
     ------------------------- */
	const renderSidebarPost = ({ link1, image1, title1, ...rest }) => {
		const safe = (s) => (s ?? '').toString().replace(/"/g, '&quot;');
		return `
    <section class="mb-6">
      <h2 class="text-sm font-semibold text-[#8F08C4] border-b pb-2 mb-4 uppercase">Popular Posts</h2>
      <div class="mb-4">
        <div class="relative overflow-hidden rounded-lg">
          <a href="${safe(link1)}" rel="noopener noreferrer">
            <img src="${safe(image1)}" alt="${safe(
			title1,
		)}" width="248" height="135" class="w-full rounded-md hover:scale-110 transition-transform duration-300" loading="lazy" decoding="async" />
            <span class="absolute bottom-6 left-2 bg-[#0E579F] text-white text-xs font-bold px-2 py-1 rounded">Games</span>
          </a>
        </div>
        <div class="mt-2">
          <a href="${safe(
						link1,
					)}" class="text-base font-semibold leading-tight text-black hover:underline">${safe(
			title1,
		)}</a>
        </div>
      </div>
      <ul class="space-y-3">
        ${[2, 3, 4]
					.map(
						(i) => `
          <li class="flex items-start gap-3">
            <a href="${safe(rest[`link${i}`])}" rel="noopener noreferrer">
              <img src="${safe(rest[`image${i}`])}" alt="${safe(
							rest[`title${i}`],
						)}" width="88" height="57" class="w-[88px] h-[57px] object-cover rounded-md" loading="lazy" decoding="async" />
            </a>
            <div class="flex-1">
              <a href="${safe(
								rest[`link${i}`],
							)}" class="text-sm font-semibold text-gray-800 hover:underline">${safe(
							rest[`title${i}`],
						)}</a>
            </div>
          </li>`,
					)
					.join('')}
      </ul>
    </section>
  `;
	};

	if (sidebarList && Array.isArray(popularPosts) && popularPosts.length) {
		// single DOM write — quick and simple
		sidebarList.innerHTML = popularPosts.map(renderSidebarPost).join('');
	}

	/* -------------------------
     Unified, batched scroll handling
     - handles navbar hide/show + back-to-top
     - uses rAF and passive listener for performance
     ------------------------- */
	let lastScrollY = window.scrollY || 0;
	let ticking = false;

	function handleScroll(nowY) {
		// Back-to-top visibility
		if (backToTopButton) {
			backToTopButton.classList.toggle('visible', nowY > 300);
		}

		// Hide navbar when scrolling down, show when scrolling up
		if (navbar) {
			const hideNav = nowY > lastScrollY && nowY > 80; // threshold avoids jitter near top
			navbar.classList.toggle('nav-hidden', hideNav);
		}

		lastScrollY = nowY;
	}

	window.addEventListener(
		'scroll',
		() => {
			const currentY = window.scrollY || 0;
			if (!ticking) {
				window.requestAnimationFrame(() => {
					handleScroll(currentY);
					ticking = false;
				});
				ticking = true;
			}
		},
		{ passive: true },
	);

	// Back-to-top click (if present)
	if (backToTopButton) {
		backToTopButton.addEventListener('click', (e) => {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	/* -------------------------
     Mobile menu toggle (aria + class)
     ------------------------- */
	if (menuBtn && mobileMenu) {
		menuBtn.addEventListener('click', () => {
			const isOpen = mobileMenu.classList.toggle('open');
			menuBtn.setAttribute('aria-expanded', String(isOpen));
		});
	}

	/* -------------------------
     Fast, debounced search
     - builds a lightweight search index once
     - debounce user input
     - batch DOM updates in rAF
     ------------------------- */
	if (searchInput) {
		const articles = Array.from(document.querySelectorAll('#posts article'));
		const index = articles.map((article) => {
			const title = article.querySelector('h2')?.textContent || '';
			const desc = article.querySelector('p')?.textContent || '';
			return { el: article, text: (title + ' ' + desc).toLowerCase() };
		});

		let debounceTimer = null;
		const DEBOUNCE_MS = 160;

		searchInput.addEventListener('input', (ev) => {
			const query = (ev.target.value || '').trim().toLowerCase();
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				if (!query) {
					// restore all posts (fast via rAF)
					window.requestAnimationFrame(() => {
						index.forEach((it) => (it.el.style.display = ''));
						if (loadMoreBtn) loadMoreBtn.style.display = '';
					});
					return;
				}

				// find matches
				const matched = new Set();
				for (let i = 0; i < index.length; i++) {
					if (index[i].text.includes(query)) matched.add(index[i].el);
				}

				// apply visibility changes in one rAF paint
				window.requestAnimationFrame(() => {
					index.forEach((it) => {
						it.el.style.display = matched.has(it.el) ? '' : 'none';
					});
					if (loadMoreBtn) loadMoreBtn.style.display = 'none';
				});
			}, DEBOUNCE_MS);
		});
	}

	/* -------------------------
     Optional: close mobile menu on Escape for accessibility
     ------------------------- */
	document.addEventListener('keydown', (e) => {
		if (
			e.key === 'Escape' &&
			mobileMenu &&
			mobileMenu.classList.contains('open')
		) {
			mobileMenu.classList.remove('open');
			menuBtn?.setAttribute('aria-expanded', 'false');
		}
	});

	/* -------------------------
     Done — useful console hint (remove in production)
     ------------------------- */
	// console.debug('UI optimizations applied: batched scroll, debounced search, lazy images.');
})();
