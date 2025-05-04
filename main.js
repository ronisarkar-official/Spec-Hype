import { posts } from './homePost.js';

// Load main posts
let visibleCount = 6;
const postsContainer = document.getElementById('posts');
const loadMoreBtn = document.getElementById('loadMoreBtn');

function renderPosts(start, end) {
  const visiblePosts = posts.slice(start, end);
  visiblePosts.forEach((post) => {
    const postHTML = `
      <article  class="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4 ">
      <div class="overflow-hidden rounded-lg ">
    <img src="${post.image}" alt="Thumbnail" class="w-full h-fit sm:w-60 rounded-md hover:scale-110 transition-transform duration-300" /></div>
    <div>
      <h2 class="text-lg font-semibold text-blue-700 hover:underline">
        <a href="${post.link}">${post.title}</a>
      </h2>
      <p class="text-sm text-gray-600  ">${post.description}</p>
    </div>
</article>



    `;
    postsContainer.insertAdjacentHTML('beforeend', postHTML);
  });
}

renderPosts(0, visibleCount);

loadMoreBtn.addEventListener('click', () => {
  const nextCount = visibleCount + 5;
  renderPosts(visibleCount, nextCount);
  visibleCount = nextCount;

  if (visibleCount >= posts.length) {
    loadMoreBtn.style.display = 'none';
  }
});

