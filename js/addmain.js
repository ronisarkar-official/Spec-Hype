import { popularPosts } from './homePost.js';

// --- Render Navbar ---
const navLinks = [
	{ name: 'Home', href: 'https://www.spechype.com' },
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

const renderLinks = (isMobile = false) =>
	navLinks
		.map(
			(link) => `
      <a href="${link.href}" class="${
				isMobile
					? 'block text-gray-800 px-4 py-2 rounded-md bg-white shadow-sm hover:bg-blue-50'
					: 'text-gray-700 hover:text-blue-500'
			} transition-all">${link.name}</a>`,
		)
		.join('');

const headerHTML = `
<header id="navbar" class="bg-white shadow-md fixed top-0 left-0 w-full z-50 p-4 transition-transform duration-300">
  <div class="container mx-auto flex justify-between items-center">
    <div class="ml-4 sm:ml-20">
      <a href="https://www.spechype.com">
        <img src="https://www.spechype.com/icons/logo.webp" alt="Logo" class="h-8 sm:h-10 w-auto ml-1" />
      </a>
    </div>

    <nav class="hidden md:flex items-center space-x-6">
      ${renderLinks(false)}
    </nav>

    <input type="text" id="searchInput" placeholder="Search..." class="w-40 sm:w-64 mb-2 sm:mb-0 mr-0 sm:mr-6 border rounded-md px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-offset-2" />

    <button id="menu-btn" aria-label="menu" class="md:hidden focus:outline-none hover:scale-110 transition-transform">
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  <div id="mobile-menu" class="md:hidden max-h-0 overflow-hidden transition-all duration-500 flex flex-col mt-3 space-y-3 px-4">
    ${renderLinks(true)}
  </div>
</header>
`;

document.body.insertAdjacentHTML('afterbegin', headerHTML);

// --- Populate Sidebar ---
const sidebarList = document.querySelector('#sidebar ul');

const renderSidebarPost = (item) => `
  <h2 class="text-sm font-semibold text-[#8F08C4] border-b pb-2 mb-4 uppercase">Popular Posts</h2>
  <div class="mb-4">
    <div class="relative overflow-hidden rounded-lg">
      <a href="${item.link1}">
        <img src="${item.image1}" alt="${
	item.title1
}" width="248" height="135" class="w-full rounded-md hover:scale-110 transition-transform duration-300" />
        <span class="absolute bottom-6 left-2 bg-[#0E579F] text-white text-xs font-bold px-2 py-1 rounded">Games</span>
      </a>
    </div>
    <div class="mt-2">
      <a href="${
				item.link1
			}" class="text-base font-semibold leading-tight text-black hover:underline">${
	item.title1
}</a>
    </div>
  </div>
  <ul class="space-y-3">
    ${[2, 3, 4]
			.map(
				(i) => `
      <li class="flex items-start gap-3">
        <a href="${item[`link${i}`]}">
          <img src="${item[`image${i}`]}" alt="${
					item[`title${i}`]
				}" width="88" height="57" class="w-[88px] h-[57px] object-cover rounded-md" />
        </a>
        <div class="flex-1">
          <a href="${
						item[`link${i}`]
					}" class="text-sm font-semibold text-gray-800 hover:underline">${
					item[`title${i}`]
				}</a>
        </div>
      </li>
    `,
			)
			.join('')}
  </ul>
`;

sidebarList.innerHTML = popularPosts.map(renderSidebarPost).join('');

// --- Back to Top Button ---
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
	backToTopButton.classList.toggle('opacity-0', window.scrollY <= 300);
	backToTopButton.classList.toggle(
		'pointer-events-none',
		window.scrollY <= 300,
	);
});

backToTopButton.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Navbar Scroll Hide/Show ---
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
	const isScrollingDown = window.scrollY > lastScrollY;
	navbar.style.transform = isScrollingDown
		? 'translateY(-100%)'
		: 'translateY(0)';
	lastScrollY = window.scrollY;
});

// --- Mobile Menu Toggle ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
	const open = mobileMenu.classList.toggle('max-h-screen');
	mobileMenu.classList.toggle('max-h-0', !open);
});

// --- Search Functionality ---
const searchInput = document.getElementById('searchInput');
const loadMoreBtn = document.getElementById('loadMoreBtn');

searchInput.addEventListener('input', function () {
	const query = this.value.toLowerCase();
	const articles = document.querySelectorAll('#posts article');
	let visibleCount = 0;

	articles.forEach((article) => {
		const title = article.querySelector('h2')?.textContent.toLowerCase() || '';
		const desc = article.querySelector('p')?.textContent.toLowerCase() || '';
		const match = title.includes(query) || desc.includes(query);
		article.style.display = match ? '' : 'none';
		if (match) visibleCount++;
	});

	loadMoreBtn.style.display = query ? 'none' : visibleCount ? '' : 'none';
});
