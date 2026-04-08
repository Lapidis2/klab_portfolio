const posts = {
  programming: {
    title: "My Programming jounery",
    image: "../assets/figma/blog-1.png",
    body:
      "My programming journey began with curiosity and has grown into a passion for building modern web applications. Starting with HTML, CSS, and JavaScript, I gradually expanded into frameworks like React, focusing on creating clean, responsive, and user-friendly interfaces. Through continuous learning and real-world projects, I’ve developed problem-solving skills and a strong attention to detail. I’m always exploring new technologies and improving my craft to build better and more impactful digital experiences.",
    comments: 3,
    likes: 2,
  },
  music: {
    title: "My Music jounery",
    image: "../assets/figma/blog-2.png",
    body:
      "Music has always been part of how I stay creative and focused. From learning rhythm and melody to experimenting with production tools, my music journey runs parallel to building software—both reward patience, practice, and listening closely. I enjoy blending genres and sharing what I learn along the way, whether through small recordings or live collaboration with friends.",
    comments: 5,
    likes: 8,
  },
  achievement: {
    title: "My academic shifting",
    image: "../assets/figma/blog-1.png",
    body:
      "Shifting my academic path was not easy, but it aligned my studies with what I want to build long term. I focused on computer science and practical projects that mirror real industry work. That shift helped me grow faster technically while staying grounded in clear goals—graduating with skills I can apply immediately in software development.",
    comments: 2,
    likes: 4,
  },
};

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug") || "programming";
}

function render() {
  const slug = getSlug();
  const data = posts[slug] || posts.programming;

  const titleEl = document.getElementById("blog-title");
  const imgEl = document.getElementById("blog-cover");
  const bodyEl = document.getElementById("blog-body");
  const commentsEl = document.getElementById("stat-comments");
  const likesEl = document.getElementById("stat-likes");
  if (titleEl) titleEl.textContent = data.title;
  if (imgEl) {
    imgEl.src = data.image;
    imgEl.alt = data.title;
  }
  if (bodyEl) bodyEl.textContent = data.body;
  if (commentsEl) commentsEl.textContent = String(data.comments);
  if (likesEl) likesEl.textContent = String(data.likes);
  document.title = `${data.title} | KLAB`;
}

document.addEventListener("DOMContentLoaded", render);
