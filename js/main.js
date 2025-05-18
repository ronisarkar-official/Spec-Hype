import { posts } from './homePost.js';

let visibleCount = 5;
let isLoading = false;
const postsContainer = document.getElementById('posts');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let loadClickCount = 0;

function renderSkeletons(count) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.innerHTML = `
      <article class="animate-pulse bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4">
        <div class="bg-gray-300 w-full h-[136px] sm:w-60 rounded-md"></div>
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </article>
    `;
    fragment.appendChild(skeleton.firstElementChild);
  }
  postsContainer.appendChild(fragment);
}

function clearSkeletons() {
  const skeletons = postsContainer.querySelectorAll('.animate-pulse');
  skeletons.forEach(s => s.remove());
}

function renderPosts(start, end) {
  const visiblePosts = posts.slice(start, end);
  const fragment = document.createDocumentFragment();

  visiblePosts.forEach(post => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <article class="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row gap-5 animate-fadeInUp transition-all duration-500">
  <div class="sm:w-60 w-full overflow-hidden rounded-xl shrink-0 bg-gray-100">
    <a href="${post.link}" aria-label="Open ${post.title}">
      <img
        src="${post.image}"
        alt="${post.title}"
        fetchpriority="high"
        class="w-full h-auto rounded-md hover:scale-110 transition-transform duration-300"
      />
    </a>
  </div>

  <div class="flex-1 space-y-2">
    <h2 class="text-lg font-semibold text-blue-700 leading-snug hover:underline transition-colors duration-200">
      <a href="${post.link}">${post.title}</a>
    </h2>
    <p class="text-sm text-gray-600 leading-relaxed">
      ${post.description}
    </p>
  </div>
</article>

    `;
    const postEl = wrapper.firstElementChild;
    fragment.appendChild(postEl);
    requestAnimationFrame(() => postEl.classList.add('show'));
  });

  postsContainer.appendChild(fragment);
}

// Initial skeletons
renderSkeletons(visibleCount);

window.onload = () => {
  clearSkeletons();
  requestIdleCallback(() => renderPosts(0, visibleCount));
};

// Load more button logic
loadMoreBtn.addEventListener('click', () => {
  if (isLoading) return;
  isLoading = true;

  const loadAmount = loadClickCount === 0 ? 5 : 6;
  const nextCount = visibleCount + loadAmount;

  renderSkeletons(loadAmount);

  requestIdleCallback(() => {
    clearSkeletons();
    renderPosts(visibleCount, nextCount);
    visibleCount = nextCount;
    loadClickCount++;
    isLoading = false;

    if (visibleCount >= posts.length) {
      loadMoreBtn.style.display = 'none';
    }
  });
});
