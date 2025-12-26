const url = new URL(window.location.href);
url.protocol = 'https';
url.port = 443;
url.host = 'api.reddit.com';
if (url.pathname === '/404.html' || url.pathname === '/') {
  url.pathname = '/r/itookapicture/hot.json';
}


const root = document.getElementById('root');
const background = document.getElementById('background');
let loading = document.getElementById('loading');

function updateBackground(url) {
  background.style.background = `center url("${url}")`
  root.style.background = `center / contain no-repeat url("${url}")`;
  if (loading) {
    loading.remove();
    loading = null;
  }
}

const stack = [];
async function refresh() {
  if (stack.length === 0) {
    try {
      const posts = await fetch(url)
        .then(r => r.json())
        .then(j => j.data.children)
      stack.push(...posts.filter(post => post.data.post_hint === "image"));
      stack.sort(() => Math.random() - 0.5);
    } catch (e) {
      console.error("Failed to fetch from reddit", e);
      if (loading) {
        loading.remove();
        loading = null;
      }
      return;
    }
  }

  const nextPost = stack.pop();
  if (nextPost && nextPost.data && nextPost.data.url) {
    updateBackground(nextPost.data.url);
  }
}

refresh();
setInterval(refresh, 60_000);
