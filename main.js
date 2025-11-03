const root = document.getElementById('root');
const background = document.getElementById('background');
const masonryContainer = document.getElementById('masonry-container');
const rssLinkInput = document.getElementById('rss-link');
let after = '';
let loading = false;

const macy = Macy({
  container: masonryContainer,
  trueOrder: false,
  waitForImages: false,
  useOwnImageLoader: false,
  margin: 20,
  columns: 3,
  breakAt: {
    1200: 5,
    940: 3,
    520: 2,
    400: 1
  }
});

function updateBackground(url) {
  background.style.background = `center / cover no-repeat url("${url}")`;
}

rssLinkInput.addEventListener('change', handleRssLinkChange);
masonryContainer.addEventListener('scroll', handleScroll);

function handleRssLinkChange() {
  const rssLink = rssLinkInput.value;
  if (rssLink) {
    masonryContainer.innerHTML = '';
    after = '';
    const apiUrl = parseRssLink(rssLink);
    loadImages(apiUrl);
  }
}

function handleScroll() {
  if (masonryContainer.scrollTop + masonryContainer.clientHeight >= masonryContainer.scrollHeight - 500 && !loading) {
    const rssLink = rssLinkInput.value;
    if (rssLink) {
      const apiUrl = parseRssLink(rssLink);
      loadImages(apiUrl);
    }
  }
}

function parseRssLink(rssLink) {
  try {
    const url = new URL(rssLink);
    url.host = 'api.reddit.com';
    url.pathname = url.pathname.replace('/.rss', '.json');
    return url.href;
  } catch (e) {
    let path = rssLink;
    if (path.startsWith('www.reddit.com')) {
      path = path.substring('www.reddit.com'.length);
    }
    if (path.startsWith('https://www.reddit.com')) {
      path = path.substring('https://www.reddit.com'.length);
    }
    if (path.endsWith('/.rss')) {
      path = path.slice(0, -5);
    }
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return `https://api.reddit.com${path}.json`;
  }
}

async function loadImages(apiUrl) {
  loading = true;
  let url = apiUrl;
  if (after) {
    url += `?after=${after}`;
  }
  const posts = await fetch(url)
    .then(r => {
      if (!r.ok) {
        throw new Error('Network response was not ok');
      }
      return r.json();
    })
    .then(j => {
      after = j.data.after;
      return j.data.children;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      return [];
    });

  loading = false;
  const imagePosts = posts.filter(post => post.data.post_hint === "image");

  if (imagePosts.length > 0) {
    if (masonryContainer.innerHTML === '') {
      updateBackground(imagePosts[0].data.url);
    }
    imagePosts.forEach(post => {
      const img = document.createElement('img');
      img.src = post.data.url;
      masonryContainer.appendChild(img);
    });

    macy.recalculate(true);
  }
}
