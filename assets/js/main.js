/* ============================================================
   HUNTER ENGENHARIA E PROJETOS
   Motor de interação
   main.js
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sprites SVG ---------- */
  const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<symbol id="i-gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></symbol>
<symbol id="i-arrow-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></symbol>
<symbol id="i-arrow-r" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></symbol>
<symbol id="i-arrow-ur" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></symbol>
<symbol id="i-arrow-l" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 19l-7-7 7-7"/></symbol>
<symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></symbol>
<symbol id="i-layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></symbol>
<symbol id="i-wrench" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.8 2.8 0 0 1-4-4l9.4-9.4Z"/><path d="M15 9 9 15"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></symbol>
<symbol id="i-leaf" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-6 6-9 16-9 0 10-4 14-9 14Z"/><path d="M4 21c2-6 5-9 9-11"/></symbol>
<symbol id="i-cpu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></symbol>
<symbol id="i-chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/></symbol>
<symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
<symbol id="i-factory" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20M4 20V9l5 3V9l5 3V9l5 3v8"/><path d="M8 20v-4M13 20v-4M18 20v-4"/></symbol>
<symbol id="i-box" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8v8a2 2 0 0 1-1 1.7l-7 3.9a2 2 0 0 1-2 0l-7-3.9A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.7l7-3.9a2 2 0 0 1 2 0l7 3.9A2 2 0 0 1 21 8Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></symbol>
<symbol id="i-target" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></symbol>
<symbol id="i-spark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></symbol>
<symbol id="i-wa" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.4-.1-.6.1l-.9 1.1c-.2.2-.3.2-.6.1a8.1 8.1 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5a.6.6 0 0 0 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.2 2.2 3.4 5.4 4.8 2.1.9 2.9.9 3.9.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3Z"/><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></symbol>
<symbol id="i-in" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.6 4.8 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9Z"/></symbol>
<symbol id="i-ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none"/></symbol>
<symbol id="i-fb" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z"/></symbol>
<symbol id="i-yt" viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.7 4.7 12 4.7 12 4.7s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8ZM9.8 15.4V8.6l5.8 3.4-5.8 3.4Z"/></symbol>
<symbol id="i-quote" viewBox="0 0 24 24" fill="currentColor"><path d="M9.6 5.5C6.5 6.9 4.5 9.9 4.5 13.5c0 3 1.8 5 4.3 5 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1 .2.4-1.6 1.8-3.1 3.6-3.9l-2.3-2.1Zm9 0c-3.1 1.4-5.1 4.4-5.1 8 0 3 1.8 5 4.3 5 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1 .2.4-1.6 1.8-3.1 3.6-3.9l-2.3-2.1Z"/></symbol>
<symbol id="i-bolt" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></symbol>
<symbol id="i-ruler" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15 15 3l6 6L9 21l-6-6Z"/><path d="m7 11 2 2M10 8l2 2M13 5l2 2"/></symbol>
<symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></symbol>
</defs></svg>`;

  function mountSprite() {
    if ($("#sprite-host")) return;
    const host = document.createElement("div");
    host.id = "sprite-host";
    host.setAttribute("aria-hidden", "true");
    host.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    host.innerHTML = SPRITE;
    document.body.insertBefore(host, document.body.firstChild);
  }
  const ico = (name, cls) =>
    `<svg class="${cls || ""}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

  /* ---------- Preloader ---------- */
  function preloader() {
    const el = $(".preloader");
    if (!el) { document.body.classList.remove("is-locked"); return; }
    const bar = $(".pre-bar i", el);
    const num = $("[data-pre-num]", el);
    let finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      clearInterval(tick);
      el.classList.add("is-done");
      document.body.classList.remove("is-locked");
      const h = $(".hero");
      if (h) h.classList.add("is-in");
      setTimeout(() => { el.style.display = "none"; }, 800);
    }

    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 14 + 4;
      if (p > 100) p = 100;
      if (bar) bar.style.width = p + "%";
      if (num) num.textContent = String(Math.round(p)).padStart(3, "0");
      if (p >= 100) setTimeout(finish, 220);
    }, REDUCED ? 20 : 130);

    // rede lenta / script bloqueado nunca pode prender o usuario
    setTimeout(finish, 6000);
    addEventListener("load", () => setTimeout(finish, 400));
  }

  /* ---------- Scroll: header, progresso, parallax suave ---------- */
  function scrollEngine() {
    const hdr = $(".hdr");
    const hero = $(".hero");
    const bar = $(".progress");
    const toTop = $("[data-to-top]");
    const layers = $$("[data-parallax]");
    let lastY = 0, ticking = false;

    function frame() {
      ticking = false;
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (toTop) toTop.classList.toggle("is-on", y > 700);

      if (hdr) {
        hdr.classList.toggle("is-stuck", y > 20);
        const nav = $(".hdr-cta .btn");
        const hide = y > 420 && y > lastY && (!nav || getComputedStyle(nav).display === "none");
        hdr.classList.toggle("is-hidden", hide);
      }

      if (!REDUCED) {
        if (hero && y < innerHeight * 1.1) {
          const t = $(".hero-in");
          if (t) {
            const k = y / innerHeight;
            t.style.transform = `translate3d(0,${k * 46}px,0)`;
            t.style.opacity = String(Math.max(0, 1 - k * 1.2));
          }
        }
        // Parallax suave nas imagens marcadas
        layers.forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > innerHeight + 200) return;
          const centro = r.top + r.height / 2 - innerHeight / 2;
          const f = parseFloat(el.dataset.parallax) || 0.08;
          el.style.transform = `translate3d(0,${(-centro * f).toFixed(1)}px,0)`;
        });
      }
      lastY = y;
    }

    addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(frame); ticking = true; }
    }, { passive: true });
    frame();

    if (toTop) {
      toTop.addEventListener("click", () => {
        scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
      });
    }
  }

  /* ---------- Revelacao de imagem ---------- */
  function revealImg() {
    const els = $$("[data-reveal-img]");
    if (!els.length) return;
    if (REDUCED) { els.forEach(e => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver(en => {
      en.forEach(x => { if (x.isIntersecting) { x.target.classList.add("is-in"); io.unobserve(x.target); } });
    }, { threshold: 0.15 });
    els.forEach(e => io.observe(e));
  }

  /* ---------- Grade 3D: reacao suave ao mouse ---------- */
  function grid3d() {
    const wall = $(".bg3d__wall");
    if (!wall || REDUCED || window.matchMedia("(hover:none)").matches) return;

    let px = innerWidth / 2, py = innerHeight / 2;
    let cx = 0, cy = 0;

    addEventListener("pointermove", e => { px = e.clientX; py = e.clientY; }, { passive: true });

    (function loop() {
      const alvoX = ((py / innerHeight) - 0.5) * -3.2;
      const alvoY = ((px / innerWidth) - 0.5) * 3.6;
      cx += (alvoX - cx) * 0.06;
      cy += (alvoY - cy) * 0.06;
      wall.style.setProperty("--rx", cx.toFixed(2) + "deg");
      wall.style.setProperty("--ry", cy.toFixed(2) + "deg");
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Reveal on scroll ---------- */
  function reveal() {
    const items = $$("[data-rv], .line-mask");
    if (!items.length) return;
    if (REDUCED) { items.forEach(i => i.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(i => io.observe(i));
  }

  /* ---------- Contadores ---------- */
  function counters() {
    const els = $$("[data-count]");
    if (!els.length) return;

    const run = el => {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      const to = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.dec || "0", 10);
      if (REDUCED) { el.textContent = to.toFixed(dec); return; }
      const dur = 1500;
      const t0 = performance.now();
      const step = now => {
        const k = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - k, 4);
        el.textContent = (to * e).toFixed(dec);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(en => {
      en.forEach(x => { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } });
    }, { threshold: 0.4 });
    els.forEach(e => io.observe(e));

    // Rede de seguranca: nenhum numero pode ficar preso no zero
    const onScreen = el => {
      const r = el.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0;
    };
    setTimeout(() => els.forEach(el => { if (onScreen(el)) run(el); }), 1000);
    setTimeout(() => els.forEach(run), 3200);
  }

  /* ---------- Tilt 3D nos cards (delegado) ---------- */
  function tilt() {
    if (REDUCED || window.matchMedia("(hover:none)").matches) return;
    let raf = null;
    document.addEventListener("mousemove", e => {
      const card = e.target.closest(".prod");
      if (!card) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(1000px) rotateX(${(-py * 3).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg) translateY(-4px)`;
      });
    }, { passive: true });
    document.addEventListener("mouseout", e => {
      const card = e.target.closest(".prod");
      if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
    }, { passive: true });
  }

  /* ---------- Marquee: clona com base em uma unica medicao ---------- */
  function marquee() {
    $$(".marquee").forEach(m => {
      const track = $(".mq-track", m);
      if (!track || track.dataset.cloned) return;
      const original = track.innerHTML;
      const unit = track.scrollWidth || 400;
      const need = Math.max(2, Math.ceil((m.clientWidth || 1200) / unit) + 1);
      for (let i = 0; i < need; i++) track.insertAdjacentHTML("beforeend", original);
      track.dataset.cloned = "1";
      const dur = m.dataset.speed || 40;
      track.style.animationDuration = dur + "s";
    });
  }

  /* ---------- Header / Drawer ---------- */
  function nav() {
    const hdr = $(".hdr");
    const burger = $(".burger");
    const drawer = $(".drawer");
    const logo = $(".logo");

    if (logo) {
      logo.innerHTML = `
        <span class="logo-mark">${ico("gear")}</span>
        <span class="logo-txt">Hunter<small>Engenharia &amp; Projetos</small></span>`;
      $(".logo-mark svg", logo).style.width = "100%";
      $(".logo-mark svg", logo).style.height = "100%";
    }

    // Dropdown desktop
    $$(".nav-item.has-mega").forEach(item => {
      const link = $(".nav-link", item);
      const close = () => item.classList.remove("is-open");
      item.addEventListener("mouseenter", () => item.classList.add("is-open"));
      item.addEventListener("mouseleave", close);
      link.addEventListener("focus", () => item.classList.add("is-open"));
      item.addEventListener("focusout", e => {
        if (!item.contains(e.relatedTarget)) close();
      });
    });
    document.addEventListener("click", e => {
      $$(".nav-item.is-open").forEach(i => { if (!i.contains(e.target)) i.classList.remove("is-open"); });
    });
    addEventListener("keydown", e => {
      if (e.key === "Escape") $$(".nav-item.is-open").forEach(i => i.classList.remove("is-open"));
    });

    // Drawer
    if (burger && drawer) {
      const toggle = on => {
        burger.classList.toggle("is-active", on);
        drawer.classList.toggle("is-open", on);
        burger.setAttribute("aria-expanded", String(on));
        document.body.classList.toggle("is-locked", on);
      };
      burger.addEventListener("click", () => toggle(!drawer.classList.contains("is-open")));
      $(".drawer-bd", drawer).addEventListener("click", () => toggle(false));
      $$("a", drawer).forEach(a => a.addEventListener("click", () => toggle(false)));
      addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });
    }
  }

  /* ---------- Faixa flutuante do WhatsApp ---------- */
  function waFloat() {
    const el = $(".wa-float");
    if (!el) return;
    const io = new IntersectionObserver(en => {
      en.forEach(x => {
        if (x.isIntersecting) {
          el.classList.add("is-on");
          io.unobserve(x.target);
        }
      });
    }, { threshold: 0.2 });
    const tgt = $(".hero") || $("body");
    io.observe(tgt);
  }

  /* ---------- Renderização de produtos ---------- */
  function prodCard(p) {
    const c = window.HUNTER.catOf(p.cat);
    return `<button class="prod" type="button" data-id="${p.code}" data-cat="${p.cat}"
      data-name="${p.name.toLowerCase()}" data-desc="${p.desc.toLowerCase()}"
      data-tags="${p.tags.join(" ").toLowerCase()}" aria-label="Ver ${p.name}">
      <span class="prod-media">
        <span class="sk"></span>
        <img src="${window.HUNTER.imgThumb(p.file)}" alt="${p.name}" loading="lazy" decoding="async">
        <span class="prod-cat">${c.curto}</span>
      </span>
      <span class="prod-plus" aria-hidden="true"></span>
      <span class="prod-body">
        <span class="prod-code">CÓD. ${p.code}</span>
        <span class="prod-name">${p.name}</span>
        <span class="prod-desc">${p.desc}</span>
        <span class="prod-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</span>
      </span>
    </button>`;
  }

  function renderGrid(target, list) {
    const grid = typeof target === "string" ? $(target) : target;
    if (!grid) return;
    grid.innerHTML = list.length
      ? list.map(prodCard).join("")
      : `<div class="empty">${ico("search")}
           <b>Nada encontrado</b>
           <p>Ajuste os filtros ou procure por outro termo.</p>
         </div>`;
    $$(".prod-media img", grid).forEach(img => {
      const done = () => {
        const sk = img.parentElement.querySelector(".sk");
        if (sk) sk.classList.add("done");
      };
      if (img.complete && img.naturalWidth) done();
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", () => {
        const sk = img.parentElement.querySelector(".sk");
        if (sk) sk.classList.add("done");
        img.closest(".prod-media").insertAdjacentHTML(
          "beforeend",
          `<span style="position:absolute;inset:0;display:grid;place-items:center;color:var(--txt-4)">${ico("box")}</span>`);
      }, { once: true });
    });
  }

  /* ---------- Filtros + busca (FLIP) ---------- */
  function filters() {
    const root = $("[data-products]");
    if (!root || !window.HUNTER) return;
    const grid = $(".prod-grid", root);
    const bar = $(".p-tools", root);
    if (!grid || !bar) return;

    const chips = $$(".chip", bar);
    const input = $(".search input", bar);
    const counter = $("[data-result-count]", bar);
    const forced = root.dataset.forceCat || null;
    let cat = forced || "all";
    let term = "";

    function visible() {
      return window.HUNTER.PRODUTOS.filter(p => {
        const okCat = cat === "all" || p.cat === cat;
        const hay = (p.name + " " + p.desc + " " + p.tags.join(" ") + " " + p.code).toLowerCase();
        const okTerm = !term || hay.includes(term);
        return okCat && okTerm;
      });
    }

    function apply() {
      const items = $$(".prod", grid);
      const first = items.map(el => el.getBoundingClientRect());

      const list = visible();
      items.forEach(el => {
        const p = window.HUNTER.PRODUTOS.find(x => x.code === el.dataset.id);
        const keep = list.includes(p);
        el.classList.toggle("is-hidden", !keep);
      });

      // Preenche vazio
      const oldEmpty = $(".empty", grid);
      if (list.length && oldEmpty) oldEmpty.remove();
      if (!list.length && !oldEmpty) {
        grid.insertAdjacentHTML("beforeend",
          `<div class="empty">${ico("search")}<b>Nada encontrado</b><p>Ajuste os filtros ou procure por outro termo.</p></div>`);
      }
      if (counter) {
        counter.innerHTML = forced
          ? `<b>${list.length}</b> itens nesta frente`
          : `<b>${list.length}</b> de ${window.HUNTER.PRODUTOS.length} itens`;
      }

      // Animação FLIP
      if (!REDUCED) {
        const firstById = new Map();
        items.forEach((el, i) => firstById.set(el.dataset.id, first[i]));
        $$(".prod:not(.is-hidden)", grid).forEach(el => {
          const prev = firstById.get(el.dataset.id);
          if (!prev) return;
          const now = el.getBoundingClientRect();
          const dx = prev.left - now.left;
          const dy = prev.top - now.top;
          if (!dx && !dy) return;
          el.animate(
            [{ transform: `translate(${dx}px,${dy}px)` }, { transform: "none" }],
            { duration: 520, easing: "cubic-bezier(0.16,1,0.3,1)" }
          );
        });
      }
      syncURL();
    }

    function syncURL() {
      if (forced) return;
      const u = new URL(location.href);
      if (cat === "all") u.searchParams.delete("cat"); else u.searchParams.set("cat", cat);
      if (!term) u.searchParams.delete("q"); else u.searchParams.set("q", term);
      history.replaceState(null, "", u);
    }

    chips.forEach(chip => chip.addEventListener("click", () => {
      const wasActive = chip.classList.contains("is-active");
      chips.forEach(c => c.classList.remove("is-active"));
      if (wasActive) { cat = "all"; chips[0].classList.add("is-active"); }
      else { cat = chip.dataset.cat; chip.classList.add("is-active"); }
      apply();
    }));

    if (input) {
      let t;
      input.addEventListener("input", () => {
        clearTimeout(t);
        t = setTimeout(() => { term = input.value.trim().toLowerCase(); apply(); }, 180);
      });
    }

    // Estado inicial pela URL
    const q = new URLSearchParams(location.search);
    const c0 = q.get("cat");
    const s0 = q.get("q");
    if (!forced && c0 && chips.some(c => c.dataset.cat === c0)) {
      chips.forEach(c => c.classList.remove("is-active"));
      const c = chips.find(x => x.dataset.cat === c0);
      c.classList.add("is-active");
      cat = c0;
    }
    if (s0) { term = s0.toLowerCase(); if (input) input.value = s0; }

    // Pagina de frente so precisa dos itens dela
    const base = forced
      ? window.HUNTER.PRODUTOS.filter(p => p.cat === forced)
      : window.HUNTER.PRODUTOS;
    renderGrid(grid, base);
    apply();
  }

  const CAT_PAGES = {
  "4": "reposicao.html",
  "6": "laminadora.html",
  "7": "importado.html",
  "8": "agronegocio.html"
};

/* ---------- Modal de produto ---------- */
  function modal() {
    let host, lastFocus;
    const WA = "https://api.whatsapp.com/send?phone=5547999542756";

    function build() {
      host = document.createElement("div");
      host.className = "modal";
      host.setAttribute("role", "dialog");
      host.setAttribute("aria-modal", "true");
      host.innerHTML = `<div class="modal-bd" data-close></div>
        <div class="modal-box">
          <button class="modal-x" data-close aria-label="Fechar">${ico("x")}</button>
          <div class="modal-in">
            <div class="modal-media"><img alt=""></div>
            <div class="modal-info">
              <span class="eyebrow" data-cat></span>
              <h2 class="d4" data-name></h2>
              <p class="lead" data-desc style="margin-top:1rem;font-size:var(--t-base)"></p>
              <dl class="spec">
                <div class="spec-row"><dt>Código</dt><dd data-code></dd></div>
                <div class="spec-row"><dt>Categoria</dt><dd data-catname></dd></div>
                <div class="spec-row"><dt>Aplicação</dt><dd data-app></dd></div>
                <div class="spec-row"><dt>Tags</dt><dd data-tags></dd></div>
                <div class="spec-row"><dt>Disponibilidade</dt><dd class="pending">Sob consulta comercial</dd></div>
                <div class="spec-row"><dt>Suporte</dt><dd class="pending">Instalação e assistência técnica</dd></div>
              </dl>
              <div class="modal-actions">
                <a class="btn btn--primary" data-wa target="_blank" rel="noopener">
                  ${ico("wa")} <span>Pedir orçamento</span>
                </a>
                <a class="btn btn--ghost" href="produtos.html" data-all>
                  ${ico("arrow-r")} <span>Ver todos</span>
                </a>
              </div>
            </div>
          </div>
        </div>`;
      document.body.append(host);
      host.addEventListener("click", e => { if (e.target.closest("[data-close]")) close(); });
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && host.classList.contains("is-open")) close();
      });
    }

    function open(code) {
      const p = window.HUNTER.PRODUTOS.find(x => x.code === code);
      if (!p) return;
      if (!host) build();
      const c = window.HUNTER.catOf(p.cat);
      const img = $(".modal-media img", host);
      img.src = window.HUNTER.imgFull(p.file);
      img.alt = p.name;
      $("[data-cat]", host).textContent = c.nome;
      $("[data-name]", host).textContent = p.name;
      $("[data-desc]", host).textContent = p.desc;
      $("[data-code]", host).textContent = p.code;
      $("[data-catname]", host).textContent = c.nome;
      $("[data-app]", host).textContent = p.aplic;
      $("[data-tags]", host).textContent = p.tags.join(" · ");
      $("[data-wa]", host).href = `${WA}&text=${encodeURIComponent(
        `Olá! Tenho interesse no produto ${p.code} — ${p.name}. Podem me passar um orçamento?`)}`;
      $("[data-all]", host).href = (CAT_PAGES[p.cat] || "produtos.html") + "#catalogo";

      lastFocus = document.activeElement;
      host.classList.add("is-open");
      document.body.classList.add("is-locked");
      setTimeout(() => $(".modal-x", host).focus(), 60);
    }

    function close() {
      if (!host) return;
      host.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      if (lastFocus) lastFocus.focus();
    }

    document.addEventListener("click", e => {
      const card = e.target.closest(".prod");
      if (card) { e.preventDefault(); open(card.dataset.id); }
    });

    // Deep link: produtos.html?p=COD
    const p0 = new URLSearchParams(location.search).get("p");
    if (p0) open(p0);
  }

  /* ---------- Formulário ---------- */
  function form() {
    const f = $("[data-form]");
    if (!f) return;
    f.addEventListener("submit", e => {
      e.preventDefault();
      let ok = true;
      $$(".field", f).forEach(field => {
        const input = $("input, select, textarea", field);
        if (!input || !input.required) return;
        const bad = !input.value.trim() || (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value));
        field.classList.toggle("is-err", bad);
        if (bad) ok = false;
      });
      const msg = $("[data-form-msg]", f);
      if (!ok) {
        if (msg) { msg.classList.remove("is-on"); }
        const first = $(".field.is-err input, .field.is-err select, .field.is-err textarea", f);
        if (first) first.focus();
        return;
      }
      if (msg) {
        msg.classList.add("is-on");
        f.reset();
      }
      const btn = $(".btn--primary", f);
      if (btn) {
        const lbl = btn.querySelector("span");
        if (lbl) lbl.textContent = "Mensagem enviada";
        setTimeout(() => { if (lbl) lbl.textContent = "Enviar mensagem"; }, 4000);
      }
    });
    $$(".field input, .field select, .field textarea", f).forEach(i => {
      i.addEventListener("input", () => i.closest(".field").classList.remove("is-err"));
    });
  }

  /* ---------- Menu ativo por pathname ---------- */
  function activeNav() {
    const p = location.pathname.split("/").pop() || "index.html";
    $$("[data-nav]").forEach(a => {
      if (a.dataset.nav === p) {
        const item = a.closest(".nav-item");
        if (item) item.classList.add("is-active");
        else a.classList.add("is-active");
      }
    });
  }

  /* ---------- Ano corrente ---------- */
  function year() {
    $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- Boot ---------- */
  function init() {
    mountSprite();
    document.documentElement.classList.add("h-anim");
    if ($(".preloader")) document.body.classList.add("is-locked");
    preloader();
    grid3d();
    scrollEngine();
    reveal();
    revealImg();
    counters();
    tilt();
    marquee();
    nav();
    waFloat();
    filters();
    modal();
    form();
    activeNav();
    year();
    addEventListener("load", marquee);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();