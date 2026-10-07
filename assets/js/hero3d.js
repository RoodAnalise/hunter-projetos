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

  /* Modelo original em Draco -- 1,28 mil triangulos, 6,7 MB. E o mesmo arquivo do
   site da Tornaria Zico, sem reducao: as versoes muito simplificadas perdiam
   detalhe visivel das correntes e do motorredutor.

   No celular entra uma versao reduzida (1,8 MB, 300 mil triangulos): os 6,7 MB
   sao pesado demais para 4G e o quadro ficava cinza. A diferenca de detalhe
   nestao tamanho so aparece girando muito perto. */
const loader = new THREE.GLTFLoader();
if (window.THREE.DRACOLoader) {
  const draco = new THREE.DRACOLoader();
  draco.setDecoderPath("assets/vendor/three/draco/");
  loader.setDRACOLoader(draco);
}

const isMobileView = COARSE.matches || innerWidth < 900;
const SRC_MODEL = isMobileView ? "assets/models/hero-mobile.glb" : "assets/models/hero.glb";
const MB = isMobileView ? 1.8 : 6.7;

loader.load(SRC_MODEL, onModel, onProgress, onError);

  /* O aviso nao bloqueia: se o modelo chegar depois, ele carrega do mesmo jeito.
     Serve para o usuario saber que a espera e o download, e nao um erro. */
  let settled = false;
  const giveUp = setTimeout(function () {
    if (settled) return;
    if (status) status.textContent = "3D carregando devagar — o arquivo tem " + MB + " MB";
  }, isMobileView ? 15000 : 10000);

  function onProgress(ev) {
    if (!ev.total || !status) return;
    const pct = Math.min(99, Math.round((ev.loaded / ev.total) * 100));
    status.textContent = "Carregando modelo 3D " + pct + "%";
  }

  function onError(err) {
    settled = true;
    clearTimeout(giveUp);
    host.classList.add("is-fallback");
    if (status) status.textContent = "3D indisponivel neste aparelho";
    if (window.console && console.warn) console.warn("[hero3d]", err);
  }

  /* Caixa que contem 96% dos vertices, em vez da que contem 100%.
     Ignora as pecas soltas sem precisar recortar a geometria -- cortar
     quebrava partes de verdade da maquina. */
  function robustBox(root) {
    const cols = [[], [], []];
    const v = new THREE.Vector3();
    let total = 0;

    root.updateMatrixWorld(true);
    root.traverse(o => {
      if (!o.isMesh) return;
      const pos = o.geometry.getAttribute("POSITION");
      if (!pos) return;
      total += pos.count;
      const step = Math.max(1, Math.floor(pos.count / 1500));  // amostra
      for (let i = 0; i < pos.count; i += step) {
        v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld);
        cols[0].push(v.x); cols[1].push(v.y); cols[2].push(v.z);
      }
    });

    if (!total) return new THREE.Box3().setFromObject(root);

    const q = (c, p) => {
      c.sort((a, b) => a - b);
      return c[Math.floor((p / 100) * (c.length - 1))];
    };
    const lo = cols.map(c => q(c, 2));
    const hi = cols.map(c => q(c, 98));
    const pad = cols.map((c, i) => Math.max((hi[i] - lo[i]) * 0.03, 1e-4));
    return new THREE.Box3(
      new THREE.Vector3(lo[0] - pad[0], lo[1] - pad[1], lo[2] - pad[2]),
      new THREE.Vector3(hi[0] + pad[0], hi[1] + pad[1], hi[2] + pad[2])
    );
  }

  function onModel(gltf) {
    settled = true;
    clearTimeout(giveUp);
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

    /* Enquadramento por percentis, e nao pela caixa completa. O arquivo tem
       pecas soltas (motor, redutor) longe do corpo da maquina; elas inflariam a
       bbox e deixariam a esteira pequena no meio do quadro. */
    const vFov = (camera.fov * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * Math.max(camera.aspect, 0.4));
    const dir = new THREE.Vector3(1, 0.72, 1).normalize();

    const tight = robustBox(model);
    const look = tight.getCenter(new THREE.Vector3());
    const half = tight.getSize(new THREE.Vector3()).multiplyScalar(0.5);

    // Eixos da camera, para medir quanto a maquina ocupa de cada lado
    const fwd = look.clone().sub(dir).normalize();
    const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
    const up = new THREE.Vector3().crossVectors(right, fwd).normalize();

    let halfW = 0;
    let halfH = 0;
    const corner = new THREE.Vector3();
    for (let i = 0; i < 8; i++) {
      corner.set(
        (i & 1 ? 0.5 : -0.5) * half.x * 2,
        (i & 2 ? 0.5 : -0.5) * half.y * 2,
        (i & 4 ? 0.5 : -0.5) * half.z * 2
      );
      halfW = Math.max(halfW, Math.abs(corner.dot(right)));
      halfH = Math.max(halfH, Math.abs(corner.dot(up)));
    }

    const dist = Math.max(halfW / Math.tan(hFov / 2), halfH / Math.tan(vFov / 2)) * 1.12;
    const radius = Math.max(halfW, halfH);

    controls.minDistance = radius * 0.12;
    controls.maxDistance = dist * 8;
    controls.target.copy(look);

    // Vista isometrica: a diagonal mostra as tres correntes e o motorredutor
    camera.position.copy(look).add(dir.multiplyScalar(dist));
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