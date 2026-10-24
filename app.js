// ========================================================
// GGA - GREAT GOAL ACADEMY
// TV PRESENTATION CORE ENGINE (app.js)
// ========================================================

class TVPresentationEngine {
  constructor(config, slides) {
    this.config = config;
    this.slides = slides;
    this.currentIndex = 0;
    this.isPlaying = true;
    this.slideDuration = config.defaultSlideDuration || 11000;
    this.timer = null;
    this.startTime = null;
    this.elapsedTime = 0;
    this.animFrameId = null;

    this.initElements();
    this.initParticles();
    this.renderSlides();
    this.renderDots();
    this.initClock();
    this.initEvents();

    // Check if URL has ?slide=X parameter
    const urlParams = new URLSearchParams(window.location.search);
    const startSlide = parseInt(urlParams.get("slide"), 10);
    if (!isNaN(startSlide) && startSlide >= 1 && startSlide <= this.slides.length) {
      this.goToSlide(startSlide - 1);
    }

    // Check if auto-play is disabled via URL
    if (urlParams.get("autoplay") === "false") {
      this.isPlaying = false;
      const icon = this.playPauseBtn.querySelector("i");
      icon.className = "bi bi-play-fill";
    } else {
      this.startSlideShow();
    }
  }

  initElements() {
    this.stage = document.getElementById("slide-stage");
    this.progressBar = document.getElementById("progress-bar");
    this.slideCurrentEl = document.getElementById("slide-current-num");
    this.slideTotalEl = document.getElementById("slide-total-num");
    this.slideCategoryEl = document.getElementById("slide-category");
    this.clockTimeEl = document.getElementById("clock-time");
    this.clockDateEl = document.getElementById("clock-date");
    this.playPauseBtn = document.getElementById("btn-play-pause");
    this.fullscreenBtn = document.getElementById("btn-fullscreen");
    this.prevBtn = document.getElementById("btn-prev");
    this.nextBtn = document.getElementById("btn-next");
    this.speedSelect = document.getElementById("speed-select");
    this.dotsContainer = document.getElementById("dots-container");
    this.tickerContent = document.getElementById("ticker-content");

    // Populate static text
    this.slideTotalEl.textContent = String(this.slides.length).padStart(2, '0');
    if (this.tickerContent && this.config.tickerText) {
      this.tickerContent.textContent = this.config.tickerText;
    }
  }

  // Generate SVG QR Code (Vector)
  generateQRCodeSVG(url) {
    // Elegant authentic QR matrix SVG illustration with center branding
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#ffffff" rx="10"/>
        <!-- Corner Markers -->
        <rect x="8" y="8" width="24" height="24" fill="#0f172a" rx="4"/>
        <rect x="12" y="12" width="16" height="16" fill="#ffffff" rx="2"/>
        <rect x="16" y="16" width="8" height="8" fill="#0f172a" rx="1"/>

        <rect x="68" y="8" width="24" height="24" fill="#0f172a" rx="4"/>
        <rect x="72" y="12" width="16" height="16" fill="#ffffff" rx="2"/>
        <rect x="76" y="16" width="8" height="8" fill="#0f172a" rx="1"/>

        <rect x="8" y="68" width="24" height="24" fill="#0f172a" rx="4"/>
        <rect x="12" y="72" width="16" height="16" fill="#ffffff" rx="2"/>
        <rect x="16" y="76" width="8" height="8" fill="#0f172a" rx="1"/>

        <!-- Grid pattern -->
        <g fill="#0f172a">
          <rect x="36" y="10" width="4" height="4"/><rect x="44" y="10" width="4" height="4"/><rect x="52" y="10" width="4" height="4"/><rect x="60" y="10" width="4" height="4"/>
          <rect x="36" y="18" width="4" height="4"/><rect x="48" y="18" width="4" height="4"/><rect x="56" y="18" width="4" height="4"/>
          <rect x="36" y="26" width="4" height="4"/><rect x="44" y="26" width="4" height="4"/><rect x="52" y="26" width="4" height="4"/><rect x="60" y="26" width="4" height="4"/>
          
          <rect x="10" y="36" width="4" height="4"/><rect x="18" y="36" width="4" height="4"/><rect x="26" y="36" width="4" height="4"/><rect x="36" y="36" width="4" height="4"/><rect x="48" y="36" width="4" height="4"/><rect x="68" y="36" width="4" height="4"/><rect x="84" y="36" width="4" height="4"/>
          <rect x="14" y="44" width="4" height="4"/><rect x="22" y="44" width="4" height="4"/><rect x="34" y="44" width="4" height="4"/><rect x="64" y="44" width="4" height="4"/><rect x="76" y="44" width="4" height="4"/><rect x="88" y="44" width="4" height="4"/>
          <rect x="10" y="52" width="4" height="4"/><rect x="26" y="52" width="4" height="4"/><rect x="68" y="52" width="4" height="4"/><rect x="80" y="52" width="4" height="4"/>
          <rect x="18" y="60" width="4" height="4"/><rect x="26" y="60" width="4" height="4"/><rect x="36" y="60" width="4" height="4"/><rect x="44" y="60" width="4" height="4"/><rect x="60" y="60" width="4" height="4"/><rect x="72" y="60" width="4" height="4"/><rect x="84" y="60" width="4" height="4"/>
          
          <rect x="36" y="68" width="4" height="4"/><rect x="48" y="68" width="4" height="4"/><rect x="56" y="68" width="4" height="4"/><rect x="68" y="68" width="4" height="4"/><rect x="80" y="68" width="4" height="4"/>
          <rect x="40" y="76" width="4" height="4"/><rect x="52" y="76" width="4" height="4"/><rect x="60" y="76" width="4" height="4"/><rect x="76" y="76" width="4" height="4"/><rect x="88" y="76" width="4" height="4"/>
          <rect x="36" y="84" width="4" height="4"/><rect x="44" y="84" width="4" height="4"/><rect x="56" y="84" width="4" height="4"/><rect x="64" y="84" width="4" height="4"/><rect x="80" y="84" width="4" height="4"/>
        </g>
        <!-- Center Emblem -->
        <rect x="40" y="40" width="20" height="20" fill="#1b8250" rx="4"/>
        <text x="50" y="54" fill="#ffffff" font-size="8" font-weight="900" text-anchor="middle" font-family="sans-serif">GGA</text>
      </svg>
    `;
  }

  renderSlides() {
    this.stage.innerHTML = "";
    this.slides.forEach((data, index) => {
      const slideEl = document.createElement("div");
      slideEl.className = `slide-item ${index === 0 ? "active" : ""}`;
      slideEl.id = `slide-${data.id}`;

      let contentHTML = "";

      // TYPE 1: HERO SLIDE
      if (data.type === "hero") {
        contentHTML = `
          <div class="hero-layout">
            <div class="hero-content">
              <div class="hero-pill">
                <i class="bi bi-stars"></i> ${data.badge}
              </div>
              <h1 class="hero-title">${data.title}</h1>
              <div class="hero-subtitle">${data.subtitle}</div>
              <p class="hero-description">${data.description}</p>
              
              <div class="hero-features-list">
                ${data.features.map(f => `<div class="hero-feat-item">${f}</div>`).join("")}
              </div>
            </div>

            <div class="hero-visual">
              <div class="hero-logo-card">
                <div class="hero-logo-glow"></div>
                <img src="${data.logo}" alt="GGA Logo" class="hero-logo-img" />
                <div class="hero-logo-badge">
                  <i class="bi bi-patch-check-fill"></i> KOSON TUMANI • SIFATLI TA'LIM MASKANI
                </div>
              </div>
              <div class="hero-stats-grid">
                ${data.stats.map(s => `
                  <div class="stat-box">
                    <div class="stat-val">${s.value}</div>
                    <div class="stat-lbl">${s.label}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `;
      }

      // TYPE 2: TEAM GRID
      else if (data.type === "team-grid") {
        contentHTML = `
          <div class="slide-header">
            <div class="section-badge">${data.badge}</div>
            <h2 class="section-title">${data.title}</h2>
            <p class="section-subtitle">${data.subtitle}</p>
          </div>
          <div class="teachers-grid-container">
            ${data.teachers.map(t => `
              <div class="teacher-mini-card" style="--card-accent: ${t.color}">
                <div class="card-photo-wrapper">
                  <img src="${t.photo}" alt="${t.name}" class="card-photo-img" />
                  <div class="card-badge-floating">${t.badge}</div>
                </div>
                <div class="card-info">
                  <div class="card-name">${t.name}</div>
                  <div class="card-role">${t.role}</div>
                  <div class="card-degree">${t.degree}</div>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      }

      // TYPE 3: TEACHER EXPERT SLIDE (DARK SLATE & EMERALD 16:9 VIEW)
      else if (data.type === "teacher-slide") {
        contentHTML = `
          <div class="teacher-expert-slide-view">
            ${data.slideImage ? `
              <img src="${data.slideImage}" alt="${data.name}" class="native-slide-fullscreen-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            ` : ""}
            <div class="teacher-expert-layout" style="${data.slideImage ? 'display: none;' : 'display: flex;'}">
              <div class="expert-content-col">
                <div class="expert-badge-tag">${data.tag || "EKSPERT O'QITUVCHI"}</div>
                <h1 class="expert-teacher-name">${data.name}</h1>
                <p class="expert-teacher-desc">${data.desc}</p>
                
                <div class="expert-stats-row">
                  <div class="expert-stat-card card-green-accent">
                    <div class="stat-highlight-val">${data.stat1_val}</div>
                    <div class="stat-highlight-lbl">${data.stat1_lbl}</div>
                  </div>
                  <div class="expert-stat-card card-slate-accent">
                    <div class="stat-highlight-val">${data.stat2_val}</div>
                    <div class="stat-highlight-lbl">${data.stat2_lbl}</div>
                  </div>
                </div>
              </div>

              <div class="expert-photo-col">
                <div class="expert-portrait-frame">
                  <img src="${data.photo}" alt="${data.name}" class="expert-portrait-img" />
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // TYPE 3B: LEGACY SINGLE TEACHER DOSSIER
      else if (data.type === "teacher-single") {
        contentHTML = `
          <div class="teacher-profile-layout">
            <div class="profile-portrait-col">
              <div class="portrait-frame" style="--accent-blue: ${data.accentColor}">
                <img src="${data.photo}" alt="${data.title}" class="portrait-img" />
                <div class="portrait-status-pill">
                  <i class="bi bi-patch-check-fill" style="color: ${data.accentColor}"></i> RASMIY USTOZ
                </div>
              </div>
            </div>

            <div class="profile-details-col">
              <div>
                <div class="section-badge" style="background: rgba(255,255,255,0.08); border-color: ${data.accentColor}; color: ${data.accentColor}">${data.badge}</div>
                <h2 class="teacher-main-title">${data.title}</h2>
                <div class="teacher-subject-tag"><i class="bi bi-bookmark-star-fill"></i> ${data.subject}</div>
              </div>

              <div class="credentials-list">
                ${data.credentials.map(c => `
                  <div class="cred-card">
                    <i class="bi ${c.icon} cred-icon" style="color: ${data.accentColor}"></i>
                    <div>
                      <div class="cred-lbl">${c.label}</div>
                      <div class="cred-val">${c.value}</div>
                    </div>
                  </div>
                `).join("")}
              </div>

              <div class="achievements-row">
                ${data.achievements.map(a => `
                  <div class="achieve-pill">
                    <i class="bi ${a.icon}"></i>
                    <div>
                      <div class="achieve-tag">${a.tag}</div>
                      <div class="achieve-text">${a.text}</div>
                    </div>
                  </div>
                `).join("")}
              </div>

              ${data.programs ? `
                <div class="programs-box">
                  <h4>O'quv Dasturlari</h4>
                  <div class="program-items-list">
                    ${data.programs.map(p => `
                      <div class="program-row">
                        <div>
                          <div class="prog-title">${p.title}</div>
                          <div class="prog-desc">${p.desc}</div>
                        </div>
                        <span class="prog-badge">${p.badge}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ""}

              ${data.schedule ? `
                <div class="programs-box">
                  <h4>Dars Jadvali va Guruhlar</h4>
                  <div class="schedule-grid">
                    ${data.schedule.map(s => `
                      <div class="sched-day-card">
                        <div class="sched-day-title">${s.days}</div>
                        ${s.times.map(tm => `
                          <div class="sched-time-row">
                            <span class="sched-time">${tm.time}</span>
                            <span class="sched-lvl">${tm.level}</span>
                          </div>
                        `).join("")}
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ""}

              ${data.groupsNotice ? `
                <div class="groups-notice-box">
                  ${data.groupsNotice.map(g => `<div class="group-notice-item"><i class="bi bi-bell-fill"></i> ${g}</div>`).join("")}
                </div>
              ` : ""}
            </div>
          </div>
        `;
      }

      // TYPE 4: CERTIFICATES SHOWCASE
      else if (data.type === "certificates-showcase") {
        contentHTML = `
          <div class="certificates-layout">
            <div class="slide-header">
              <div class="section-badge">${data.badge}</div>
              <h2 class="section-title">${data.title}</h2>
              <p class="section-subtitle">${data.subtitle}</p>
            </div>
            <div class="certs-showcase-grid">
              ${data.certificates.map(c => `
                <div class="cert-card-frame">
                  <div class="cert-img-container">
                    <img src="${c.image}" alt="${c.title}" class="cert-preview-img" />
                  </div>
                  <div class="cert-meta-info">
                    <div class="cert-title">${c.title}</div>
                    <div class="cert-issuer">${c.issuer}</div>
                    <div class="cert-highlight-badge">${c.highlight}</div>
                    <div class="cert-subtext">${c.subtext}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }

      // TYPE 5: FACULTY / TEAM CARDS
      else if (data.type === "team-cards") {
        contentHTML = `
          <div class="slide-header">
            <div class="section-badge">${data.badge}</div>
            <h2 class="section-title">${data.title}</h2>
            <p class="section-subtitle">${data.subtitle}</p>
          </div>
          <div class="faculty-grid">
            ${data.members.map(m => `
              <div class="faculty-card">
                <div class="fac-img-wrapper">
                  <img src="${m.photo}" alt="${m.name}" class="fac-img" />
                </div>
                <div class="fac-info">
                  <div class="fac-name">${m.name}</div>
                  <div class="fac-role">${m.title}</div>
                  <div class="fac-tags">
                    ${m.tags.map(t => `<span class="fac-tag-item">${t}</span>`).join("")}
                  </div>
                  <div class="fac-desc">${m.desc}</div>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      }

      // TYPE 6: WHY CHOOSE GGA (FEATURES GRID)
      else if (data.type === "features-grid") {
        const featureItems = data.features || data.items || [];
        contentHTML = `
          <div class="slide-header">
            <div class="section-badge">${data.badge}</div>
            <h2 class="section-title">${data.title}</h2>
            <p class="section-subtitle">${data.subtitle}</p>
          </div>
          <div class="features-grid-layout">
            ${featureItems.map(item => `
              <div class="advantage-card">
                <div class="adv-icon-frame" style="color: ${item.color || 'var(--primary-green)'}">
                  <i class="bi ${item.icon}"></i>
                </div>
                <div class="adv-title">${item.title}</div>
                <div class="adv-desc">${item.desc || item.text}</div>
              </div>
            `).join("")}
          </div>
        `;
      }

      // TYPE 7: ENROLLMENT & SCHEDULE
      else if (data.type === "enrollment") {
        contentHTML = `
          <div class="enrollment-layout">
            <div class="slide-header" style="margin-bottom: 0.8rem">
              <div class="section-badge">${data.badge}</div>
              <h2 class="section-title">${data.title}</h2>
              <p class="section-subtitle">${data.subtitle}</p>
            </div>
            
            <div class="courses-schedule-grid">
              ${data.courses.map(c => `
                <div class="course-schedule-card">
                  <div>
                    <div class="course-top-row">
                      <div class="course-name">${c.name}</div>
                      <span class="course-status-pill">${c.status}</span>
                    </div>
                    <div class="course-desc">${c.desc}</div>
                  </div>
                  <span class="course-badge">${c.badge}</span>
                </div>
              `).join("")}
            </div>

            <div class="enrollment-callout-banner">
              ${data.callout}
            </div>
          </div>
        `;
      }

      // TYPE 8: CONTACT SLIDE
      else if (data.type === "contact-slide") {
        contentHTML = `
          <div class="contact-layout">
            <div>
              <div class="slide-header">
                <div class="section-badge">${data.badge}</div>
                <h2 class="section-title">${data.title}</h2>
                <p class="section-subtitle">${data.subtitle}</p>
              </div>

              <div class="contact-cards-grid">
                ${data.contacts.map(c => `
                  <div class="contact-info-card">
                    <div class="contact-icon-frame" style="color: ${c.color}">
                      <i class="bi ${c.icon}"></i>
                    </div>
                    <div class="contact-details">
                      <h4>${c.title}</h4>
                      ${c.values.map(v => `<div class="contact-val-item">${v}</div>`).join("")}
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <div class="contact-visual-card">
              <div class="contact-brand-header">
                <img src="${this.config.logo || 'logo.png'}" alt="GGA Academy" class="contact-brand-logo" />
              </div>
              <div class="qr-code-frame">
                <img src="${this.config.qrCode || 'qr_code_clean.png'}" alt="GGA Telegram QR-kod" class="qr-code-img" onerror="this.src='qr_kode.jpg'" />
              </div>
              <div class="contact-cta-quote">${data.ctaText}</div>
              <div class="contact-sub-notice">${data.footerNotice}</div>
            </div>
          </div>
        `;
      }

      slideEl.innerHTML = contentHTML;
      this.stage.appendChild(slideEl);
    });

    this.slideElements = document.querySelectorAll(".slide-item");
  }

  renderDots() {
    this.dotsContainer.innerHTML = "";
    this.slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = `dot-btn ${i === 0 ? "active" : ""}`;
      dot.title = `Slayd ${i + 1}`;
      dot.addEventListener("click", () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    });
    this.dotElements = document.querySelectorAll(".dot-btn");
  }

  goToSlide(index) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;

    this.slideElements[this.currentIndex].classList.remove("active");
    this.dotElements[this.currentIndex].classList.remove("active");

    this.currentIndex = index;

    this.slideElements[this.currentIndex].classList.add("active");
    this.dotElements[this.currentIndex].classList.add("active");

    // Update meta
    this.slideCurrentEl.textContent = String(this.currentIndex + 1).padStart(2, '0');
    this.slideCategoryEl.textContent = this.slides[this.currentIndex].badge || "TAQDIMOT";

    // Reset progress
    this.resetTimer();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    const icon = this.playPauseBtn.querySelector("i");
    if (this.isPlaying) {
      icon.className = "bi bi-pause-fill";
      this.playPauseBtn.title = "To'xtatish (Space)";
      this.startSlideShow();
    } else {
      icon.className = "bi bi-play-fill";
      this.playPauseBtn.title = "Davom ettirish (Space)";
      this.pauseSlideShow();
    }
  }

  startSlideShow() {
    this.isPlaying = true;
    this.startTime = performance.now() - this.elapsedTime;

    const tick = (now) => {
      if (!this.isPlaying) return;

      const elapsed = now - this.startTime;
      const progressPercent = Math.min((elapsed / this.slideDuration) * 100, 100);
      this.progressBar.style.width = `${progressPercent}%`;

      if (elapsed >= this.slideDuration) {
        this.nextSlide();
      } else {
        this.animFrameId = requestAnimationFrame(tick);
      }
    };

    cancelAnimationFrame(this.animFrameId);
    this.animFrameId = requestAnimationFrame(tick);
  }

  pauseSlideShow() {
    cancelAnimationFrame(this.animFrameId);
  }

  resetTimer() {
    this.elapsedTime = 0;
    this.startTime = performance.now();
    this.progressBar.style.width = "0%";
    if (this.isPlaying) {
      this.startSlideShow();
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      this.fullscreenBtn.querySelector("i").className = "bi bi-fullscreen-exit";
    } else {
      document.exitFullscreen().catch(() => {});
      this.fullscreenBtn.querySelector("i").className = "bi bi-fullscreen";
    }
  }

  initClock() {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      this.clockTimeEl.textContent = `${hours}:${minutes}:${seconds}`;

      const daysUz = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
      const monthsUz = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
        "Iyul", "Avgust", "Sentabr", "Oktyabr", "Noyabr", "Dekabr"
      ];

      const dayName = daysUz[now.getDay()];
      const dayNum = now.getDate();
      const monthName = monthsUz[now.getMonth()];
      const year = now.getFullYear();

      this.clockDateEl.textContent = `${dayName}, ${dayNum}-${monthName} ${year}`;
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  initEvents() {
    // Keyboard remote controls
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        this.togglePlayPause();
      } else if (e.code === "ArrowRight" || e.code === "PageDown") {
        e.preventDefault();
        this.nextSlide();
      } else if (e.code === "ArrowLeft" || e.code === "PageUp") {
        e.preventDefault();
        this.prevSlide();
      } else if (e.code === "KeyF") {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.key >= "1" && e.key <= "9") {
        const target = parseInt(e.key, 10) - 1;
        if (target < this.slides.length) {
          this.goToSlide(target);
        }
      }
    });

    // Control buttons
    this.playPauseBtn.addEventListener("click", () => this.togglePlayPause());
    this.fullscreenBtn.addEventListener("click", () => this.toggleFullscreen());
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Speed selector
    this.speedSelect.addEventListener("change", (e) => {
      this.slideDuration = parseInt(e.target.value, 10);
      this.resetTimer();
    });

    // Double click to toggle fullscreen
    document.addEventListener("dblclick", (e) => {
      if (!e.target.closest("button, select")) {
        this.toggleFullscreen();
      }
    });
  }

  initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(27, 130, 80, ${p.alpha * 0.25})`;
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    };

    drawParticles();
  }
}

// Start on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.presentation = new TVPresentationEngine(ACADEMY_CONFIG, SLIDES_DATA);
});
