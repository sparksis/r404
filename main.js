const url = new URL(window.location.href);
url.protocol = 'https';
url.port = 443;
url.host = 'api.reddit.com';


const root = document.getElementById('root');
const background = document.getElementById('background');
function updateBackground(url) {
  background.style.background = `center url("${url}")`
  root.style.background = `center / contain no-repeat url("${url}")`;
}

const stack = [];
async function refresh() {
  if (stack.length === 0) {
    try {
      const posts = await fetch(url)
        .then(r => r.json())
        .then(j => j.data.children);
      stack.push(...posts.filter(post => post.data.post_hint === "image"));
      stack.sort(() => Math.random() - 0.5);
    } catch (error) {
      console.error("Failed to fetch images from Reddit:", error);
      document.body.classList.add('loaded');
      return;
    }
  }

  const post = stack.pop();
  if (!post) {
    document.body.classList.add('loaded');
    return;
  }

  const imageUrl = post.data.url;
  const img = new Image();
  img.onload = () => {
    updateBackground(imageUrl);
    document.body.classList.add('loaded');
  };
  img.onerror = refresh;
  img.src = imageUrl;
}

refresh();
setInterval(refresh, 60_000);
