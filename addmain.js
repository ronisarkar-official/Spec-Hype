import { popularPosts } from './homePost.js';
// Load sidebar posts

const headerHTML = `
    <header id="navbar" class="bg-white shadow-md fixed top-0 left-0 w-full h-fit sm:h-fit z-50 p-4 transition-transform duration-300 ease-in-out">
  <div class="container mx-auto flex justify-between items-center transition-all duration-300 ease-in-out">
    
    <div class="font-bold text-xl text-blue-600 ml-4 sm:ml-20 transition-all duration-300 ease-in-out">
  <img 
    src="https://blogger.googleusercontent.com/img/a/AVvXsEhD8QgIGVZ9eNxJ6beNrUQG6INrZh8Koh5OZs3T7NTWz_s6006cAblotrBooyM9tfR6uAGZ6gpDwGzl7vqM7VJV23Grhwedn5BxMClQ7-90SAMb9vIBqiixm2QfW46yZM-_J8NFAFfB09wFaBN7mvjjwLxMWw2pWUe_dUJpnUHM0yKA9leRnII6Sb3nKcm2=s227" 
    alt="Logo" 
    class="h-8 sm:h-10 w-auto  ml-1 sm:ml-1"
  >
</div>


    <!-- Desktop Nav -->
    <nav class="hidden md:flex items-center space-x-6 transition-opacity duration-300 ease-in-out">
      <a href="https://www.explorerstalks.com" class="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out">Home</a>
      <a href="#" class="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out">Games</a>
      <a href="privacy-policy.html" class="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out">Privacy Policy</a>
      <a href="about-us.html" class="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out">About Us</a>
      <a href="contact-us.html" class="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out">Contact Us</a>
      
    </nav>
	<input 
  type="text" 
  id="searchInput"
  placeholder="Search..." 
  class="w-20 sm:w-fit mb-2 sm:mb-0 mr-0 sm:mr-6 border rounded-md px-3 py-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-200 focus:ring-offset-2"
/>




    <!-- Mobile Menu Button -->
    <button id="menu-btn" class="md:hidden focus:outline-none transition-transform duration-300 ease-in-out hover:scale-110">
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" 
           viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="md:hidden overflow-hidden max-h-0 transition-all duration-500 ease-in-out flex flex-col mt-3 space-y-2 px-4">
  <a href="https://www.explorerstalks.com" class="text-gray-700 hover:text-blue-500 transition-all duration-500 ease-in-out">Home</a>
  <a href="#" class="text-gray-700 hover:text-blue-500 transition-all duration-500 ease-in-out">Guide</a>
  <a href="privacy-policy.html" class="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out">Privacy Policy</a>
  <a href="about-us.html" class="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out">About Us</a>
  <a href="contact-us.html" class="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out">Contact Us</a>
  

</div>

</header>

  `;

// Insert the navbar at the top of the <body>
document.body.insertAdjacentHTML('afterbegin', headerHTML);

const sidebarList = document.querySelector('#sidebar ul');

popularPosts.forEach((item) => {
	sidebarList.innerHTML += `
  					<h2
						class="text-sm font-semibold text-[#339af0] border-b pb-2 mb-4 uppercase">
						Popular Posts
					</h2>

					<!-- Featured Post -->
					<div class="mb-4">
  <div class="relative overflow-hidden rounded-lg">
    <a href="${item.link1}">
      <img
        src="${item.image1}"
        alt="Mecha Break"
        class="w-full h-40 object-cover rounded-md hover:scale-110 transition-transform duration-300" />
      <span
        class="absolute bottom-6 left-2 bg-[#339af0] text-white text-xs font-bold px-2 py-1 rounded">
        Games
      </span>
    </a>
  </div>
</div>

						<div class="mt-2">
							<a
								class="text-base font-semibold leading-tight text-gray-800 hover:underline"
								href="${item.link1}"
								>${item.title1}</a
							>
							
						</div>
					</div>

					<!-- List of Other Posts -->
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
  <a href="${item.link2}">
    <img
      src="${item.image2}"
      alt="Monster Hunter"
      class="w-[88px] h-[57px] object-cover rounded-md" />
  </a>
  <div>
    <a
      class="text-sm font-semibold text-gray-800 hover:underline"
      href="${item.link2}">
      ${item.title2}
    </a>
  </div>
</li>

						<li class="flex items-start gap-3">
  <a href="${item.link3}">
    <img
      src="${item.image3}"
      alt="Monster Hunter"
      class="w-fit h-[57px] object-cover rounded-md" />
  </a>
  <div>
    <a
      class="text-sm font-semibold text-gray-800 hover:underline"
      href="${item.link3}">
      ${item.title3}
    </a>
  </div>
</li>


						<li class="flex items-start gap-3">
  <a href="${item.link4}">
    <img
      src="${item.image4}"
      alt="Monster Hunter"
      class="w-[88px] h-[57px] object-cover rounded-md" />
  </a>
  <div>
    <a
      class="text-sm font-semibold text-gray-800 hover:underline"
      href="${item.link4}">
      ${item.title4}
    </a>
  </div>
</li>

					</ul>
  `;
});

const backToTopButton = document.getElementById('backToTop');

// Show button after scrolling down 300px
window.addEventListener('scroll', () => {
	if (window.scrollY > 300) {
		backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
	} else {
		backToTopButton.classList.add('opacity-0', 'pointer-events-none');
	}
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
});

let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
	if (window.scrollY > lastScrollY) {
		// Scroll Down
		navbar.style.transform = 'translateY(-100%)';
	} else {
		// Scroll Up
		navbar.style.transform = 'translateY(0)';
	}
	lastScrollY = window.scrollY;
});

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

let isOpen = false;

menuBtn.addEventListener('click', () => {
	isOpen = !isOpen;

	if (isOpen) {
		mobileMenu.classList.remove('max-h-0');
		mobileMenu.classList.add('max-h-screen');
	} else {
		mobileMenu.classList.remove('max-h-screen');
		mobileMenu.classList.add('max-h-0');
	}
});

const searchInput = document.getElementById('searchInput');
const loadMoreBtn = document.getElementById('loadMoreBtn');

searchInput.addEventListener('input', function () {
	const query = this.value.toLowerCase();
	const articles = document.querySelectorAll('#posts article');
	let anyVisible = false;

	articles.forEach((article) => {
		const title = article.querySelector('h2').textContent.toLowerCase();
		const description = article.querySelector('p').textContent.toLowerCase();

		const matches = title.includes(query) || description.includes(query);
		article.style.display = matches ? '' : 'none';
		if (matches) anyVisible = true;
	});

	// Hide Load More during search
	if (query.length > 0) {
		loadMoreBtn.style.display = 'none';
	} else {
		loadMoreBtn.style.display = anyVisible ? '' : 'none';
	}
});
