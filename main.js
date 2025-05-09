import { posts } from './homePost.js';

let visibleCount = 6;
const postsContainer = document.getElementById('posts');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Render skeletons during initial page load
function renderSkeletons(count) {
  const skeletonHTML = `
    <article class="animate-pulse bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4">
      <div class="bg-gray-300 w-full h-[136px] sm:w-60 rounded-md"></div>
      <div class="flex-1 space-y-4 py-1">
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-full"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </article>
  `;
  for (let i = 0; i < count; i++) {
    postsContainer.insertAdjacentHTML('beforeend', skeletonHTML);
  }
}

// Clear skeletons
function clearSkeletons() {
  const skeletons = postsContainer.querySelectorAll('.animate-pulse');
  skeletons.forEach(s => s.remove());
}

// Render actual posts
function renderPosts(start, end) {
  const visiblePosts = posts.slice(start, end);
  visiblePosts.forEach(post => {
    const postHTML = `
      <article class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4">
        <div class="overflow-hidden rounded-lg">
          <a href="${post.link}">
            <img src="${post.image}" alt="Thumbnail"
              class="w-full h-[136px] sm:w-60 rounded-md hover:scale-110 transition-transform duration-300" />
          </a>
        </div>
        <div>
          <h2 class="text-lg font-semibold text-blue-700 hover:underline">
            <a href="${post.link}">${post.title}</a>
          </h2>
          <p class="text-sm text-gray-600">${post.description}</p>
        </div>
      </article>
    `;
    postsContainer.insertAdjacentHTML('beforeend', postHTML);
  });
}

// 🚀 Show skeletons immediately on page load
document.addEventListener('DOMContentLoaded', () => {
  renderSkeletons(visibleCount);

  // Simulate loading delay
  setTimeout(() => {
    clearSkeletons();
    renderPosts(0, visibleCount);
  }, 1000); // Change delay as needed
});

// Load more logic
loadMoreBtn.addEventListener('click', () => {
  const nextCount = visibleCount + 5;
  renderSkeletons(5);
  setTimeout(() => {
    clearSkeletons();
    renderPosts(visibleCount, nextCount);
    visibleCount = nextCount;
    if (visibleCount >= posts.length) {
      loadMoreBtn.style.display = 'none';
    }
  }, 1000);
});
