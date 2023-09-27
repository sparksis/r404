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
    const posts = await fetch(url)
      .then(r => r.json())
      .then(j => j.data.children)
    stack.push(...posts.filter(post => post.post_hint === "image"));
    stack.sort(() => Math.random() - 0.5);
  }
  updateBackground(stack.pop().data.url)
}

refresh();
setInterval(refresh, 60_000);
