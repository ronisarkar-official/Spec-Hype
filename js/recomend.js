import { mightLike } from './homePost.js';

const tocList = document.getElementById('toc-list');

document.querySelectorAll('section').forEach((sec, index) => {
	const h2 = sec.querySelector('h2');
	if (!h2) return;

	// Generate a simple ID like "section-1", "section-2", etc.
	const autoId = `section-${index + 1}`;
	sec.id = autoId;

	const li = document.createElement('li');
	const a = document.createElement('a');
	a.href = `#${autoId}`;
	a.textContent = h2.textContent;
	a.className = 'text-indigo-600 hover:underline';

	li.appendChild(a);
	tocList.appendChild(li);
});

let cardsHTML = '';

mightLike.forEach((section) => {
	section.cards.forEach((card) => {
		cardsHTML += `
      <div class="bg-white rounded-lg overflow-hidden transition p-2 group">
  <div class="overflow-hidden rounded-lg">
    <a href="${card.link}">
      <img src="${card.image}" alt="Game Image"
           class="w-full h-auto object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105">
    </a>
  </div>
  <div class="mt-2">
    <span class="text-xs text-white bg-[#0E579F] px-2 py-1 rounded">GAMES</span>
    <a class="font-semibold mt-2 text-gray-800 text-sm flex leading-snug" href="${card.link}">
      ${card.title}
    </a>
  </div>
</div>


    `;
	});
});

const sectionHTML = `
  <div class="bg-white w-fit max-w-full sm:max-w-6xl  rounded-lg shadow p-4 sm:p-6 mb-4  mx-auto mt-28 flex flex-col px-4  sm:mt-4">
    <h2 class="text-lg font-semibold text-gray-800 border-b-2 border-[#339af0] inline-block mb-4">
      YOU MIGHT LIKE
    </h2>
    <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      ${cardsHTML}
    </div>
  </div>
`;

document.getElementById('dynamic-section').innerHTML = sectionHTML;
