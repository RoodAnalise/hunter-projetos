/* ============================================================
   HUNTER ENGENHARIA E PROJETOS
   Hero 3D — modelo da esteira FC.1001
   Carregamento tardio, rotacao automatica e comportamento seguro no mobile.
   ============================================================ */
(function () {
  "use strict";

  const host = document.getElementById("hero3d");
  if (!host) return;

  const canvas = host.querySelector("[data-hero3d-canvas]");
  const status = host.querySelector("[data-hero3d-status]");
  const toggle = host.querySelector("[data-hero3d-toggle]");
  const hint = host.querySelector(".hero3d-hint");
  if (!canvas) return;

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)");
  const COARSE = window.matchMedia("(hover: none)");

  // Sem WebGL nao ha o que mostrar: some com o bloco e devolve o hero ao padrao.
  function noWebGL() {
    host.classList.add("is-off");
  }

  if (!window.THREE || !window.THREE.WebGLRenderer) { noWebGL(); return; }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: !COARSE.matches,
      alpha: true,
      powerPreference: "low-power",
      failIfMajorPerformanceCaveat: false,
    });
  } catch (e) { noWebGL(); return; }

  if (!renderer.getContext()) { noWebGL(); return; }

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 5000);

  /* ---------- Iluminacao ----------
     Tres pontos + ambiente: sem isso os metais escurecem e a maquica perde
     os detalhes. A luz de recorte fria separa oaco do fundo claro. */
  scene.add(new THREE.HemisphereLight(0xe8f0f5, 0x35423c, 1.5));

  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(5, 8, 6);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xcfe6ff, 1.15);
  rim.position.set(-6, 3, -5);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0xffffff, 0.7);
  fill.position.set(-3, -2, 6);
  scene.add(fill);

  /* ---------- Piso: apenas uma malha de referencia discreta ---------- */
  const grid = new THREE.GridHelper(1, 20, 0x0b4f30, 0x9ba39e);
  grid.material.transparent = true;
  grid.material.opacity = 0.14;
  grid.material.depthWrite = false;
  grid.visible = false;
  scene.add(grid);

  /* ---------- Controles ---------- */
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.enablePan = false;
  controls.enableZoom = false;          // zoom por scroll/prisma rouba o scroll da pagina
  controls.rotateSpeed = 0.55;
  controls.autoRotate = !REDUCED.matches;
  controls.autoRotateSpeed = 0.62;
  controls.minPolarAngle = 0.32;
  controls.maxPolarAngle = 1.42;
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.ROTATE };

  /* ---------- Modelo ---------- */
  let model = null;
  let maxDim = 1;

  /* Modelo original em Draco, o mesmo arquivo que o site da Tornaria Zico usa.
   O DRACOLoader decodifica num Worker via blob:, liberado pela diretiva
   worker-src da CSP; o decoder e auto-hospedado em assets/vendor/three/draco.
   Nao ha versao reduzida: a geometria tem pontos extremos que impedem o
   meshopt de simplificar, e cortar a geometria quebrava pecas da maquina. */
const loader = new THREE.GLTFLoader();
if (window.THREE.DRACOLoader) {
  const draco = new THREE.DRACOLoader();
  draco.setDecoderPath("assets/vendor/three/draco/");
  loader.setDRACOLoader(draco);
}

const SRC_MODEL = "assets/models/hero.glb";

loader.load(SRC_MODEL, onModel, onProgress, onError);

  function onProgress(ev) {
    if (!ev.total || !status) return;
    const pct = Math.min(99, Math.round((ev.loaded / ev.total) * 100));
    status.textContent = "Carregando modelo 3D " + pct + "%";
  }

  function onError(err) {
    host.classList.add("is-fallback");
    if (status) status.textContent = "ERRO: " + ((err && err.message) || String(err) || "?").slice(0, 120);
  }

  function onModel(gltf) {
    model = gltf.scene;

    /* As cores e o acabamento originais sao preservados: e o que faz o modelo
       parecer com a maquina real. So o acabamento e ajustado, porque os
       materiais vieram sem envMap e ficariam escuros. */
    model.traverse(o => {
      if (!o.isMesh) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach(m => {
        if (!m) return;
        m.side = THREE.FrontSide;
        m.metalness = m.metalness != null ? m.metalness : 0.4;
        m.roughness = m.roughness != null ? m.roughness : 0.55;
        m.envMapIntensity = 0.6;
      });
    });

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    /* Normaliza a escala (o arquivo vem em mm, com a maquina gigante) e apoia
       no chao, para o enquadramento nao depender da unidade do SolidWorks. */
    const TARGET = 4;
    maxDim = Math.max(size.x, size.y, size.z) || 1;
    const autoScale = TARGET / maxDim;
    model.scale.setScalar(autoScale);
    model.position.set(
      -center.x * autoScale,
      -box.min.y * autoScale,
      -center.z * autoScale
    );
    model.updateMatrixWorld(true);

    /* Enquadramento pela esfera envolvente, que e o que funciona para este
       tipo de objeto: garante folga igual em qualquer angulo de giro. */
    const fit = new THREE.Box3().setFromObject(model);
    const sphere = fit.getBoundingSphere(new THREE.Sphere());
    const radius = Math.max(sphere.radius, 0.001);

    const vFov = (camera.fov * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * Math.max(camera.aspect, 0.4));
    const dist = (radius / Math.sin(Math.min(vFov, hFov) / 2)) * 0.86;

    controls.minDistance = radius * 0.12;
    controls.maxDistance = dist * 8;
    controls.target.copy(sphere.center);

    // Vista isometrica: a diagonal mostra as tres correntes e o motorredutor
    const dir = new THREE.Vector3(1, 0.72, 1).normalize();
    camera.position.copy(sphere.center).add(dir.multiplyScalar(dist));
    camera.near = Math.max(0.01, dist / 500);
    camera.far = dist * 40;
    camera.updateProjectionMatrix();
    controls.update();

    // Malha de referencia no piso, logo abaixo da maquina
    grid.position.y = -TARGET * 0.004;
    grid.scale.setScalar(TARGET * 0.5);
    grid.visible = true;

    scene.add(model);
    host.classList.add("is-ready");
    if (status) status.textContent = "";
    resize();

    // Primeiro quadro imediato: o bloco nunca fica vazio esperando o observer.
    controls.update();
    renderer.render(scene, camera);
    // Se o observer nao disparar (ou o bloco ja esta na tela), o loop comeca aqui.
    if (!running && (visible || inViewport())) start();
  }

  function inViewport() {
    const r = host.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight;
  }

  /* ---------- Tamanho e nitidez ---------- */
  function sizeCap() {
    // Telas pequenas e economizadas de energia nao devem pagar por 3x DPR.
    const mem = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const px = window.innerWidth * window.innerHeight * Math.pow(window.devicePixelRatio || 1, 2);
    let cap = 2;
    if (COARSE.matches || mem <= 4 || cores <= 4) cap = 1.5;
    if (px > 4.2e6) cap = Math.min(cap, 1.5);
    if (px > 8e6) cap = Math.min(cap, 1.25);
    return cap;
  }

  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, sizeCap()));
    renderer.setSize(w, h, !COARSE.matches);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(host);
  addEventListener("resize", resize, { passive: true });
  addEventListener("orientationchange", () => setTimeout(resize, 220));
  resize();

  /* ---------- Loop: so roda quando o bloco esta visivel ---------- */
  let visible = false;
  let running = false;
  let raf = 0;

  function frame() {
    raf = 0;
    if (!running) return;
    controls.update();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || !model) return;
    running = true;
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      en => {
        visible = en[0].isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0.02 }
    ).observe(host);
  } else {
    visible = true;
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (visible) start();
  });

  // Rede slow ou economia de dados: fica so com o modelo leve, sem upgrade.
  const conn = navigator.connection;
  if (conn) {
    if (conn.saveData) {
      renderer.setPixelRatio(1);
      controls.autoRotate = false;
    }
    conn.addEventListener && conn.addEventListener("change", () => {
      if (conn.saveData) controls.autoRotate = false;
      resize();
    });
  }

  /* ---------- Botao play/pausa ---------- */
  if (toggle) {
    const sync = () => {
      const on = controls.autoRotate;
      toggle.setAttribute("aria-pressed", String(on));
      toggle.dataset.state = on ? "on" : "off";
      const label = toggle.querySelector("span");
      if (label) label.textContent = on ? "Pausar" : "Girar";
      const ico = toggle.querySelector("svg use");
      if (ico) ico.setAttribute("href", on ? "#i-pause" : "#i-play");
    };
    toggle.addEventListener("click", () => {
      controls.autoRotate = !controls.autoRotate;
      sync();
      if (controls.autoRotate) start();
    });
    sync();
  }

  // prefers-reduced-motion desligado no meio da sessao
  const onMotionChange = () => {
    controls.autoRotate = !REDUCED.matches;
    if (REDUCED.matches) stop();
    else if (visible && !document.hidden) start();
  };
  REDUCED.addEventListener ? REDUCED.addEventListener("change", onMotionChange) : REDUCED.addListener(onMotionChange);
})();