function metaList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderProjectMetaList(project) {
  return `
    <dl class="work-detail-meta-list">
      <div class="work-meta-field">
        <dt>Client</dt>
        <dd>${project.client || project.context || "—"}</dd>
      </div>
      <div class="work-meta-field">
        <dt>Year</dt>
        <dd>${project.year || "—"}</dd>
      </div>
      <div class="work-meta-field">
        <dt>Project type</dt>
        <dd><ul class="work-meta-list">${metaList(project.projectType || [])}</ul></dd>
      </div>
      <div class="work-meta-field">
        <dt>Role</dt>
        <dd><ul class="work-meta-list">${metaList(project.role || [])}</ul></dd>
      </div>
      <div class="work-meta-field">
        <dt>Tech</dt>
        <dd><ul class="work-meta-list">${metaList(project.tools || [])}</ul></dd>
      </div>
    </dl>
  `;
}

function renderStoryBlock(label, content) {
  if (!content) return "";
  return `
    <section class="work-story-block">
      <h4 class="work-story-label">${label}</h4>
      <p class="work-story-text">${content}</p>
    </section>
  `;
}

function renderPresentationSlideshow(slides, title = "Project overview") {
  if (!slides?.length) return "";

  const slideItems = slides
    .map((slide, index) => {
      if (slide.type === "video") {
        const poster = slide.poster ? ` poster="${slide.poster}"` : "";
        return `<div class="presentation-slide${index === 0 ? " is-active" : ""}" data-slide-index="${index}" data-slide-type="video">
          <video class="presentation-slide-video" controls playsinline preload="metadata"${poster} aria-label="${slide.alt || `Presentation slide ${index + 1}`}">
            <source src="${slide.src}" type="video/mp4">
          </video>
        </div>`;
      }

      return `<div class="presentation-slide${index === 0 ? " is-active" : ""}" data-slide-index="${index}" data-slide-type="image">
        <img class="presentation-slide-image" src="${slide.src}" alt="${slide.alt || `Presentation slide ${index + 1}`}" loading="lazy">
      </div>`;
    })
    .join("");

  return `
    <section class="presentation-slideshow" aria-label="${title}" tabindex="0">
      <div class="presentation-slideshow-header">
        <h4 class="presentation-slideshow-title">${title}</h4>
        <span class="presentation-slideshow-counter"><span class="presentation-current">1</span> / ${slides.length}</span>
      </div>
      <div class="presentation-slideshow-frame">
        <button type="button" class="presentation-arrow presentation-arrow-prev" aria-label="Previous slide">‹</button>
        <div class="presentation-slideshow-viewport">
          <div class="presentation-slideshow-track">${slideItems}</div>
        </div>
        <button type="button" class="presentation-arrow presentation-arrow-next" aria-label="Next slide">›</button>
      </div>
    </section>
  `;
}

function setupPresentationSlideshow(root) {
  const slideshow = root?.querySelector(".presentation-slideshow");
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll(".presentation-slide"));
  const prevBtn = slideshow.querySelector(".presentation-arrow-prev");
  const nextBtn = slideshow.querySelector(".presentation-arrow-next");
  const counter = slideshow.querySelector(".presentation-current");
  const viewport = slideshow.querySelector(".presentation-slideshow-viewport");
  let current = 0;
  let touchStartX = 0;

  function pauseVideos(exceptIndex = -1) {
    slides.forEach((slide, index) => {
      if (index === exceptIndex) return;
      const video = slide.querySelector("video");
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === current);
    });
    if (counter) counter.textContent = String(current + 1);
    pauseVideos(current);
  }

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));

  slideshow.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(current - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(current + 1);
    }
  });

  viewport?.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0]?.screenX ?? 0;
    },
    { passive: true }
  );

  viewport?.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0]?.screenX ?? 0;
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) < 40) return;
      goTo(current + (deltaX < 0 ? 1 : -1));
    },
    { passive: true }
  );

  goTo(0);
}

function renderStaticFallback(project, className) {
  const label = `${project.title} preview`;
  if (project.image) {
    return `<img class="${className}" src="${project.image}" alt="${label}" loading="lazy">`;
  }
  return `<div class="${className} ${className}-placeholder">Preview unavailable</div>`;
}

function renderClickableStaticPreview(project, overlayLabel = "Visit site") {
  const staticHtml = `<div class="live-preview-static">${renderStaticFallback(project, "live-preview-fallback-image")}</div>`;
  if (!project.liveUrl) return staticHtml;
  return `
    <a class="live-preview-link" href="${project.liveUrl}" target="_blank" rel="noopener">
      ${staticHtml}
      <span class="live-preview-overlay">${overlayLabel}</span>
    </a>
  `;
}

function renderLiveSitePreview(project, variant = "detail") {
  if (project.embedLivePreview === false || !project.liveUrl) {
    return variant === "detail"
      ? `<div class="live-preview-static">${renderStaticFallback(project, "live-preview-fallback-image")}</div>`
      : renderClickableStaticPreview(project, variant === "grid" ? "Visit site" : "Open live site");
  }

  const wrapClass =
    variant === "grid"
      ? "live-preview-wrap live-preview-wrap--grid"
      : "live-preview-wrap live-preview-wrap--detail";
  const overlayLabel = variant === "grid" ? "Visit site" : "Open live site";
  const fallback = project.image
    ? `<div class="live-preview-fallback" hidden>${renderStaticFallback(project, "live-preview-fallback-image")}</div>`
    : "";

  return `
    <div class="${wrapClass}" data-live-preview>
      <iframe
        class="live-preview-iframe"
        data-src="${project.liveUrl}"
        title="${project.title} live preview"
        tabindex="-1"
      ></iframe>
      ${fallback}
      <a class="live-preview-overlay" href="${project.liveUrl}" target="_blank" rel="noopener">${overlayLabel}</a>
    </div>
  `;
}

function loadLivePreviewIframe(wrap) {
  const iframe = wrap?.querySelector(".live-preview-iframe[data-src]");
  if (!iframe || iframe.src) return;
  iframe.src = iframe.dataset.src;
  iframe.removeAttribute("data-src");
}

function setupLivePreviewWrap(wrap) {
  if (!wrap || wrap.dataset.liveReady) return;
  wrap.dataset.liveReady = "true";

  const iframe = wrap.querySelector(".live-preview-iframe");
  const fallback = wrap.querySelector(".live-preview-fallback");
  if (!iframe) return;

  let settled = false;

  function showFallback() {
    if (settled || !fallback) return;
    settled = true;
    iframe.hidden = true;
    fallback.hidden = false;
    wrap.classList.add("is-fallback");
  }

  iframe.addEventListener("error", showFallback);
  iframe.addEventListener("load", () => {
    try {
      const doc = iframe.contentDocument;
      if (doc && doc.body && doc.body.childElementCount === 0) showFallback();
    } catch {
      /* cross-origin — keep iframe visible */
    }
  });
}

function setupLivePreviews(root = document) {
  const wraps = root.querySelectorAll("[data-live-preview]:not([data-live-ready])");
  if (!wraps.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const wrap = entry.target;
        loadLivePreviewIframe(wrap);
        setupLivePreviewWrap(wrap);
        observer.unobserve(wrap);
      });
    },
    { rootMargin: "240px 0px" }
  );

  wraps.forEach((wrap) => {
    if (wrap.closest(".work-detail-view:not([hidden])")) {
      loadLivePreviewIframe(wrap);
      setupLivePreviewWrap(wrap);
      return;
    }
    observer.observe(wrap);
  });
}

function getGridProjects() {
  return projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => project.featuredOnClientGrid !== false)
    .sort((a, b) => (a.project.featuredOrder || 99) - (b.project.featuredOrder || 99));
}

function renderProjectGridCard({ project, index }) {
  const visitLink = project.liveUrl
    ? `<a class="spotlight-visit" href="${project.liveUrl}" target="_blank" rel="noopener">Visit the live site</a>`
    : "";
  const image = project.image
    ? `<img class="spotlight-photo" src="${project.image}" alt="">`
    : `<div class="spotlight-photo spotlight-photo-placeholder"></div>`;
  const kicker = project.kicker || project.context || "Project";
  const label = `${kicker}: ${project.title}`;

  return `
    <article class="spotlight-card" data-project-index="${index}">
      ${image}
      <button type="button" class="spotlight-toggle" aria-expanded="false" aria-label="${label}"></button>
      <button type="button" class="spotlight-close" aria-label="Close">&times;</button>
      <div class="spotlight-head">
        <p class="spotlight-kicker">${kicker}</p>
        <h3 class="spotlight-blurb-title">${project.title}</h3>
      </div>
      <div class="spotlight-sliding">
        <p class="spotlight-teaser">${project.clientBlurb || project.clientTeaser || project.summary || ""}</p>
      </div>
      <div class="spotlight-cta">${visitLink}</div>
    </article>
  `;
}

function setSpotlightOpen(card, open) {
  card.classList.toggle("is-open", open);
  const toggle = card.querySelector(".spotlight-toggle");
  if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
}

function closeSpotlightCards(grid, except) {
  grid.querySelectorAll(".spotlight-card.is-open").forEach((card) => {
    if (card !== except) setSpotlightOpen(card, false);
  });
}

function setupSpotlightCards(grid) {
  const hoverFine = window.matchMedia("(hover: hover) and (pointer: fine)");

  grid.querySelectorAll(".spotlight-card").forEach((card) => {
    const toggle = card.querySelector(".spotlight-toggle");
    const close = card.querySelector(".spotlight-close");

    card.addEventListener("mouseenter", () => {
      if (hoverFine.matches) setSpotlightOpen(card, true);
    });
    card.addEventListener("mouseleave", () => {
      if (hoverFine.matches) setSpotlightOpen(card, false);
    });

    toggle?.addEventListener("click", () => {
      const willOpen = !card.classList.contains("is-open");
      closeSpotlightCards(grid, card);
      setSpotlightOpen(card, willOpen);
    });

    close?.addEventListener("click", (event) => {
      event.stopPropagation();
      setSpotlightOpen(card, false);
    });
  });
}

function renderProjectGrid() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  grid.innerHTML = getGridProjects().map(renderProjectGridCard).join("");
  setupSpotlightCards(grid);
}

function skillPills(tools, limit = 0, className = "recruiter-skills") {
  if (!tools?.length) return "";
  const shown = limit > 0 ? tools.slice(0, limit) : tools;
  const extra = tools.length - shown.length;
  const items = shown.map((tool) => `<li>${tool}</li>`).join("");
  const more = extra > 0 ? `<li class="skill-pill-more">+${extra}</li>` : "";
  return `<ul class="${className}">${items}${more}</ul>`;
}

function renderRecruiterCard(entry) {
  const project = entry.projectIndex != null ? projects[entry.projectIndex] : null;
  const tools = project?.tools || entry.tools || [];
  const href = project?.liveUrl || project?.githubUrl || "";
  const impact = entry.impact || project?.Impact || "";
  const thumb = project?.image
    ? `<img src="${project.image}" alt="${entry.title} preview" loading="lazy">`
    : "";
  const media = thumb
    ? href
      ? `<a class="recruiter-thumb" href="${href}" target="_blank" rel="noopener">${thumb}<span class="recruiter-thumb-label">Visit site</span></a>`
      : `<div class="recruiter-thumb">${thumb}</div>`
    : "";
  const live = project?.liveUrl
    ? `<a class="recruiter-link" href="${project.liveUrl}" target="_blank" rel="noopener">Live site</a>`
    : "";
  const repo = project?.githubUrl
    ? `<a class="recruiter-link" href="${project.githubUrl}" target="_blank" rel="noopener">Repository</a>`
    : "";

  return `
    <li class="timeline-item">
      <div class="timeline-marker" aria-hidden="true"></div>
      <article class="recruiter-card">
        ${media}
        <div class="recruiter-card-body">
          <div class="recruiter-card-meta">
            <time class="timeline-date">${entry.dateLabel}</time>
            <span class="timeline-category">${categoryLabels[entry.category] || entry.category}</span>
          </div>
          <h3 class="recruiter-card-title">${entry.title}</h3>
          <p class="recruiter-card-org">${entry.organization}</p>
          <p class="recruiter-card-summary">${entry.summary}</p>
          ${impact ? `<p class="recruiter-card-impact">${impact}</p>` : ""}
          ${skillPills(tools)}
          <div class="recruiter-card-links">${live}${repo}</div>
        </div>
      </article>
    </li>
  `;
}

function renderRecruiterExperience() {
  const list = document.getElementById("recruiter-list");
  if (!list || !timelineEntries?.length) return;

  const sorted = [...timelineEntries].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  list.innerHTML = `<ol class="timeline-track recruiter-track">${sorted.map(renderRecruiterCard).join("")}</ol>`;
}

function applySiteCopy() {
  if (siteConfig.title) document.title = siteConfig.title;
  const description = document.querySelector('meta[name="description"]');
  if (description && siteConfig.description) description.setAttribute("content", siteConfig.description);

  const status = document.getElementById("hero-status");
  if (status && siteConfig.status) {
    status.innerHTML = `<span class="hero-status-dot" aria-hidden="true"></span>${siteConfig.status}`;
  }

  const headline = document.getElementById("hero-headline");
  if (headline && siteConfig.headlineLines?.length) {
    headline.innerHTML = siteConfig.headlineLines
      .map((line, i) => `<span class="hero-title-line hero-title-line--${i % 2 ? "right" : "left"}">${line}</span>`)
      .join(" ");
  } else if (headline && siteConfig.headline) {
    headline.textContent = siteConfig.headline;
  }

  const tagline = document.querySelector(".hero-subtitle");
  if (tagline && siteConfig.tagline) tagline.textContent = siteConfig.tagline;

  const about = document.querySelector(".about-text");
  if (about && siteConfig.about) about.textContent = siteConfig.about;

  if (siteConfig.work) {
    const title = document.getElementById("work-title");
    const desc = document.getElementById("work-desc");
    if (title && siteConfig.work.title) title.textContent = siteConfig.work.title;
    if (desc && siteConfig.work.desc) desc.textContent = siteConfig.work.desc;
  }

  if (siteConfig.aboutSection?.title) {
    const aboutTitle = document.getElementById("about-title");
    if (aboutTitle) aboutTitle.textContent = siteConfig.aboutSection.title;
  }

  if (siteConfig.contact) {
    const title = document.getElementById("contact-title");
    const desc = document.getElementById("contact-desc");
    if (title && siteConfig.contact.title) title.textContent = siteConfig.contact.title;
    if (desc && siteConfig.contact.desc) desc.textContent = siteConfig.contact.desc;
  }
}

function currentHash() {
  return window.location.hash.slice(1);
}

let activeProjectIndex = null;
let returnHash = "";

function openProject(index, options = {}) {
  const project = projects[index];
  const detailView = document.getElementById("work-detail-view");
  if (!project || !detailView) return;

  if (!options.skipHistory) {
    returnHash = currentHash() || "work";
  }

  activeProjectIndex = index;
  detailView.innerHTML = renderDetailView(project, index);
  detailView.hidden = false;
  document.body.classList.add("work-showing-detail");

  if (!options.skipHistory) {
    window.history.pushState({ projectIndex: index }, "", `#project-${index}`);
  }

  detailView.querySelector(".work-detail-back")?.addEventListener("click", () => closeProject());
  detailView.querySelectorAll(".work-detail-dot").forEach((dot) => {
    dot.addEventListener("click", () => openProject(Number(dot.dataset.projectIndex)));
  });
  setupPresentationSlideshow(detailView);
  setupLivePreviews(detailView);
  smoothScrollTo(0);
}

function closeProject(options = {}) {
  const detailView = document.getElementById("work-detail-view");
  if (!detailView) return;

  activeProjectIndex = null;
  detailView.hidden = true;
  detailView.innerHTML = "";
  document.body.classList.remove("work-showing-detail");

  const hash = returnHash || "work";
  if (!options.skipHistory) {
    window.history.pushState(null, "", `#${hash}`);
  }
}

function renderDetailView(project, index) {
  const previewHtml = renderLiveSitePreview(project, "detail");
  const siteBtn = project.liveUrl
    ? `<a class="btn btn-primary" href="${project.liveUrl}" target="_blank" rel="noopener">View Website</a>`
    : "";
  const repoBtn = project.githubUrl
    ? `<a class="btn btn-secondary" href="${project.githubUrl}" target="_blank" rel="noopener">View Repository</a>`
    : "";
  const presentationBtn = project.presentationDownload
    ? `<a class="btn btn-secondary" href="${project.presentationDownload}" target="_blank" rel="noopener">Download PDF</a>`
    : "";
  const presentationHtml = project.presentationSlides?.length
    ? renderPresentationSlideshow(project.presentationSlides, project.presentationTitle)
    : "";
  const dots = projects
    .map(
      (_, dotIndex) =>
        `<button type="button" class="work-detail-dot${dotIndex === index ? " is-active" : ""}" data-project-index="${dotIndex}" aria-label="View project ${dotIndex + 1}"></button>`
    )
    .join("");

  return `
    <button type="button" class="work-detail-back" aria-label="Back">← Back</button>
    <article class="work-detail-card">
      <div class="work-detail-top">
        <div class="work-detail-preview">${previewHtml}</div>
        <div class="work-detail-meta">${renderProjectMetaList(project)}</div>
      </div>
      <div class="work-detail-bottom">
        <p class="work-detail-summary">${project.summary || ""}</p>
        ${project.deploymentNote ? `<p class="work-detail-note">${project.deploymentNote}</p>` : ""}
        ${project.detail ? `<p class="work-detail-text">${project.detail}</p>` : ""}
        ${presentationHtml}
        <div class="work-detail-story">
          ${renderStoryBlock("Task", project.Task)}
          ${renderStoryBlock("Impact", project.Impact)}
        </div>
        <div class="work-detail-actions">${siteBtn}${repoBtn}${presentationBtn}</div>
      </div>
      <nav class="work-detail-dots" aria-label="Project navigation">${dots}</nav>
    </article>
  `;
}

function closePreviewModal() {
  const modal = document.getElementById("preview-modal");
  const body = modal?.querySelector(".preview-modal-body");
  if (!modal) return;
  body?.querySelector("video")?.pause();
  if (body) body.innerHTML = "";
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function setupPreviewModal() {
  const modal = document.getElementById("preview-modal");
  if (!modal) return;
  modal.querySelector(".preview-modal-close")?.addEventListener("click", closePreviewModal);
  modal.querySelector("[data-close-modal]")?.addEventListener("click", closePreviewModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closePreviewModal();
  });
}

function setupAboutCarousel() {
  const images = siteConfig.aboutImages?.length
    ? siteConfig.aboutImages
    : [siteConfig.headshot].filter(Boolean);
  const track = document.getElementById("about-carousel-track");
  const dotsNav = document.getElementById("about-carousel-dots");
  if (!track || !dotsNav || !images.length) return;

  track.innerHTML = images
    .map(
      (src, index) =>
        `<img class="about-carousel-image${index === 0 ? " is-active" : ""}" src="${src}" alt="${siteConfig.name} photo ${index + 1}" data-index="${index}">`
    )
    .join("");

  dotsNav.innerHTML = images
    .map(
      (_, index) =>
        `<button type="button" class="about-carousel-dot${index === 0 ? " is-active" : ""}" data-index="${index}" aria-label="Show photo ${index + 1}"></button>`
    )
    .join("");

  let current = 0;
  let timer = null;

  function goTo(index) {
    current = (index + images.length) % images.length;
    track.querySelectorAll(".about-carousel-image").forEach((img, i) => {
      img.classList.toggle("is-active", i === current);
    });
    dotsNav.querySelectorAll(".about-carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
  }

  function startTimer() {
    if (timer) clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = window.setInterval(() => goTo(current + 1), 4000);
  }

  dotsNav.querySelectorAll(".about-carousel-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.index));
      startTimer();
    });
  });

  startTimer();
}

function setupProjectRouting() {
  function handleRoute() {
    const hash = currentHash();
    const projectMatch = hash.match(/^project-(\d+)$/);

    if (projectMatch) {
      openProject(Number(projectMatch[1]), { skipHistory: true });
      return;
    }

    if (document.body.classList.contains("work-showing-detail")) {
      closeProject({ skipHistory: true });
    }
  }

  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("popstate", handleRoute);

  const initial = window.location.hash.match(/^#project-(\d+)$/);
  if (initial) {
    openProject(Number(initial[1]), { skipHistory: true });
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothScrollTo(targetY, duration = 780) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(now) {
    const progress = clamp((now - startTime) / duration, 0, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid || !siteConfig.skillCategories?.length) return;

  grid.innerHTML = siteConfig.skillCategories
    .map(
      (category) => `
        <article class="skill-card">
          <h3 class="skill-card-title">${category.title}</h3>
          <ul class="skill-pills">
            ${category.skills.map((skill) => `<li>${skill}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function renderContact() {
  const container = document.getElementById("contact-links");
  const links = siteConfig.contact?.links;
  if (!container || !links?.length) return;
  container.innerHTML = links
    .map((link) => {
      if (link.type === "email") {
        return `<button type="button" class="contact-link contact-link-copy" data-email="${link.value}">${link.label}</button>`;
      }
      if (link.type === "calendar") {
        return `<a class="contact-link contact-link-highlight" href="${siteConfig.calendarBookingUrl}" target="_blank" rel="noopener">${link.label}</a>`;
      }
      return `<a class="contact-link" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`;
    })
    .join("");
}

async function copyEmail(button) {
  const email = button.dataset.email;
  const originalLabel = button.dataset.originalLabel || button.textContent;

  try {
    await navigator.clipboard.writeText(email);
    button.textContent = "Copied!";
    button.classList.add("copied");
    setTimeout(() => {
      button.textContent = originalLabel;
      button.classList.remove("copied");
    }, 2000);
  } catch {
    window.prompt("Copy this email:", email);
  }
}

function setupContact() {
  document.querySelectorAll(".contact-link-copy").forEach((button) => {
    button.dataset.originalLabel = button.textContent;
    button.addEventListener("click", () => copyEmail(button));
  });
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  toggle?.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  links?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      links.classList.remove("open");

      if (document.body.classList.contains("work-showing-detail")) {
        closeProject({ skipHistory: true });
      }

      const href = link.getAttribute("href");
      if (!href?.startsWith("#") || href.length < 2) return;

      event.preventDefault();
      const target = document.querySelector(href);
      window.history.pushState(null, "", href);
      if (!target) {
        smoothScrollTo(0);
        return;
      }
      const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      smoothScrollTo(Math.max(0, top));
    });
  });

  document.querySelector(".nav-logo")?.addEventListener("click", (event) => {
    event.preventDefault();
    if (document.body.classList.contains("work-showing-detail")) {
      closeProject({ skipHistory: true });
    }
    smoothScrollTo(0);
    window.history.pushState(null, "", window.location.pathname);
  });
}

function setupHeroDrift() {
  const hero = document.getElementById("hero");
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const left = hero.querySelector(".hero-title-line--left");
  const right = hero.querySelector(".hero-title-line--right");
  const title = hero.querySelector(".hero-title");
  const copy = hero.querySelector(".hero-copy");
  let frame = 0;
  let heroVisible = true;

  // Uses the `translate` property so it composes with the CSS entrance keyframes on `transform`.
  const apply = () => {
    frame = 0;
    const y = Math.min(window.scrollY, hero.offsetTop + hero.offsetHeight);
    if (title) title.style.translate = `0 ${(y * 0.12).toFixed(2)}px`;
    if (left) left.style.translate = `${(-y * 0.06).toFixed(2)}px 0`;
    if (right) right.style.translate = `${(y * 0.06).toFixed(2)}px 0`;
    if (copy) copy.style.translate = `0 ${(y * 0.06).toFixed(2)}px`;
  };

  const onScroll = () => {
    if (!heroVisible || frame) return;
    frame = requestAnimationFrame(apply);
  };

  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    if (heroVisible) onScroll();
  }).observe(hero);

  window.addEventListener("scroll", onScroll, { passive: true });
  apply();
}

function setupActiveNav() {
  const links = [...document.querySelectorAll(".nav-links a[href^='#']")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const line = window.innerHeight * 0.3;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    const current = atBottom
      ? sections[sections.length - 1]
      : sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= line && rect.bottom > line;
        });
    links.forEach((link) => {
      link.classList.toggle("is-active", !!current && link.getAttribute("href") === `#${current.id}`);
    });
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!frame) frame = requestAnimationFrame(update);
    },
    { passive: true }
  );
  update();
}

function setupCalendarLinks() {
  if (!siteConfig.calendarBookingUrl) return;
  document.querySelectorAll("#hero-book-chat, #nav-book-chat").forEach((link) => {
    link.href = siteConfig.calendarBookingUrl;
  });
}

function renderSiteConfig() {
  document.querySelectorAll("[data-name]").forEach((el) => {
    el.textContent = siteConfig.name;
  });

  setupCalendarLinks();
  applySiteCopy();
}

document.getElementById("year").textContent = new Date().getFullYear();

renderSiteConfig();
setupAboutCarousel();
renderProjectGrid();
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".spotlight-card.is-open").forEach((card) => {
    setSpotlightOpen(card, false);
  });
});
setupProjectRouting();
setupPreviewModal();
renderContact();
setupContact();
setupNav();
setupActiveNav();
setupHeroDrift();
