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
  const camera = new THREE.PerspectiveCamera(34, 1, 1, 4000);

  /* ---------- Iluminacao ---------- */
  scene.add(new THREE.HemisphereLight(0xdfe8e2, 0x2a332f, 0.62));

  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(1.1, 1.5, 1);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xbfe8cf, 0.75);
  rim.position.set(-1.2, 0.6, -1.1);
  scene.add(rim);

  const bounce = new THREE.DirectionalLight(0xffffff, 0.32);
  bounce.position.set(0.2, -1, 0.4);
  scene.add(bounce);

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

  const loader = new THREE.GLTFLoader();
  // Sem compressor: o GLB ja vem quantizado (KHR_mesh_quantization), entao
  // nenhum Worker/blob e necessario e a CSP restritiva do site continua valendo.
  // O modelo completo so entra em telas grandes e com folga de memoria.
  const heavy =
    !COARSE.matches &&
    innerWidth >= 1024 &&
    (navigator.deviceMemory || 4) >= 8 &&
    (navigator.hardwareConcurrency || 4) >= 8;
  const SRC_MODEL = heavy ? "assets/models/esteira-full.glb" : "assets/models/esteira-lite.glb";

  loader.load(SRC_MODEL, onModel, onProgress, onError);

  function onProgress(ev) {
    if (!ev.total || !status) return;
    const pct = Math.min(99, Math.round((ev.loaded / ev.total) * 100));
    status.textContent = "Carregando modelo 3D " + pct + "%";
  }

  function onError() {
    host.classList.add("is-fallback");
    if (status) status.textContent = "";
  }

  function onModel(gltf) {
    model = gltf.scene;

    // O arquivo nao tem normais (foram removidas na otimizacao): recalcula.
    model.traverse(o => {
      if (!o.isMesh) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach(m => {
        if (!m) return;
        m.flatShading = false;
        m.side = THREE.DoubleSide;
        m.color.setHex(0x8e9a94);
        m.metalness = 0.55;
        m.roughness = 0.48;
      });
      if (!o.geometry.getAttribute("normal")) o.geometry.computeVertexNormals();
    });

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    model.position.sub(center);
    model.updateMatrixWorld(true);

    maxDim = Math.max(size.x, size.y, size.z) || 1;

    // A maquina e longa e baixa. A esfera envolvente contem muito ar em cima e
    // embaixo, entao o enquadramento usa a projecao da maquina no plano de
    // visao e sobe um pouco a camera para a diagonal caber na caixa.
    const vFov = (camera.fov * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    // Vista isometrica (diagonal 1,0.78,1) e a soma das projecoes dos lados
    const diag = Math.hypot(size.x, size.z) * 0.82 + size.y * 0.6;
    const dist = Math.max(diag / Math.tan(hFov / 2), diag / Math.tan(vFov / 2)) * 0.62;

    const dir = new THREE.Vector3(1, 0.78, 1).normalize();
    camera.position.copy(dir).multiplyScalar(dist);
    camera.near = Math.max(0.001, dist / 800);
    camera.far = dist * 80;
    camera.updateProjectionMatrix();
    controls.target.set(0, size.y * 0.06, 0);
    controls.update();

    grid.position.y = -size.y / 2 - maxDim * 0.004;
    grid.scale.setScalar(maxDim * 0.26);
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