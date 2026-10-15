// Terminal theme: paper thumbnails, the typed prompt, the KV-cache demo and the email copy button.
// Everything here is decoration on top of content that is already in the HTML.
(function () {
  var root = document.documentElement;
  var css = function (name) { return getComputedStyle(root).getPropertyValue(name).trim(); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Small seeded RNG so the drawings look the same on every visit.
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function gauss(r) { var u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

  function setup(canvas, w, h) {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    var g = canvas.getContext("2d");
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
    return g;
  }

  /* ---- paper thumbnails ---- */
  var glyphs = {
    // token grid with evicted cells
    evict: function (g, s, A, M) {
      var r = rng(7), n = 7, cell = s / (n + 1), off = cell / 2;
      for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
        var x = off + i * cell + cell * 0.12, y = off + j * cell + cell * 0.12, w = cell * 0.76, v = r();
        if (v > 0.45) { g.globalAlpha = 0.35 + 0.65 * v; g.fillStyle = A; g.fillRect(x, y, w, w); }
        else { g.globalAlpha = 0.6; g.strokeStyle = M; g.lineWidth = 0.75; g.strokeRect(x + 0.5, y + 0.5, w - 1, w - 1); }
      }
      g.globalAlpha = 1;
    },
    // Gaussian mixture: samples and 1σ/2σ contours
    gmm: function (g, s, A, M) {
      var r = rng(11), comps = [[0.32, 0.38, 0.09, 0.06, 0.5], [0.66, 0.62, 0.07, 0.11, -0.4], [0.5, 0.24, 0.05, 0.04, 0]];
      comps.forEach(function (c) {
        g.save(); g.translate(c[0] * s, c[1] * s); g.rotate(c[4]);
        g.strokeStyle = M; g.lineWidth = 0.75; g.setLineDash([2, 2]);
        [1, 2].forEach(function (k) { g.beginPath(); g.ellipse(0, 0, c[2] * s * k, c[3] * s * k, 0, 0, Math.PI * 2); g.stroke(); });
        g.setLineDash([]); g.fillStyle = A; g.globalAlpha = 0.85;
        for (var i = 0; i < 26; i++) g.fillRect(gauss(r) * c[2] * s - 1, gauss(r) * c[3] * s - 1, 2, 2);
        g.restore();
      });
      g.globalAlpha = 1;
    },
    // one clean point, two decision boundaries, adversarial examples from two epochs
    mem: function (g, s, A, M) {
      g.lineWidth = 1; g.strokeStyle = M;
      g.setLineDash([3, 3]); g.beginPath(); g.moveTo(s * 0.25, s * 0.08); g.bezierCurveTo(s * 0.2, s * 0.6, s * 0.95, s * 0.5, s * 0.25, s * 0.92); g.stroke();
      g.setLineDash([6, 4]); g.beginPath(); g.moveTo(s * 0.55, s * 0.05); g.bezierCurveTo(s * 1.05, s * 0.3, s * 0.45, s * 0.6, s * 0.62, s * 0.95); g.stroke();
      g.setLineDash([]);
      var x = [s * 0.14, s * 0.62], a = [s * 0.58, s * 0.34], b = [s * 0.8, s * 0.66];
      g.strokeStyle = A;
      [a, b].forEach(function (p) { g.beginPath(); g.moveTo(x[0], x[1]); g.lineTo(p[0], p[1]); g.stroke(); });
      g.fillStyle = M; g.beginPath(); g.arc(x[0], x[1], 3, 0, 7); g.fill();
      g.fillStyle = A; [a, b].forEach(function (p) { g.beginPath(); g.arc(p[0], p[1], 3.2, 0, 7); g.fill(); });
    }
  };
  function drawThumbs() {
    var A = css("--t-accent"), M = css("--t-muted");
    document.querySelectorAll("canvas[data-glyph]").forEach(function (c) {
      var draw = glyphs[c.dataset.glyph];
      if (!draw) return;
      var s = c.getBoundingClientRect().width || 88;
      draw(setup(c, s, s), s, A, M);
    });
  }

  /* ---- hero figure: observations → latent space → predicted rollout ---- */
  var wm = document.getElementById("world-model");
  var drawWM = function () {};
  if (wm) {
    // observed latent states z1..z4 and the model's rollout beyond z4 (normalized coords)
    var observed = [[0.15, 0.50], [0.33, 0.38], [0.51, 0.45], [0.66, 0.29]];
    var rollout = [[0.66, 0.29], [0.80, 0.19], [0.91, 0.27]];
    var cloudRng = rng(5), cloud = [];
    [[0.30, 0.30, 0.10, 0.07], [0.62, 0.48, 0.12, 0.06], [0.82, 0.30, 0.07, 0.08]].forEach(function (c) {
      for (var i = 0; i < 46; i++) cloud.push([c[0] + gauss(cloudRng) * c[2], c[1] + gauss(cloudRng) * c[3]]);
    });
    var frameRng = rng(9), frames = observed.map(function () {
      var cells = []; for (var i = 0; i < 16; i++) cells.push(frameRng()); return cells;
    });
    var t0 = performance.now();

    drawWM = function (now) {
      var w = wm.getBoundingClientRect().width || 224, h = w * 16 / 14;
      var g = setup(wm, w, h), A = css("--t-accent"), M = css("--t-muted"), L = css("--t-line");
      var X = function (p) { return p[0] * w; }, Y = function (p) { return p[1] * h; };
      g.font = '10px "IBM Plex Mono", ui-monospace, monospace'; g.textBaseline = "alphabetic";

      // latent space: a faint cloud of past encodings
      g.fillStyle = M; g.globalAlpha = 0.32;
      cloud.forEach(function (p) { if (p[1] > 0.08 && p[1] < 0.64) g.fillRect(X(p) - 0.75, Y(p) - 0.75, 1.5, 1.5); });
      g.globalAlpha = 1; g.fillText("latent space", 8, 14);

      // observations along the bottom, each encoded up into its latent state
      var fs = w * 0.14, fy = h * 0.8;
      observed.forEach(function (p, k) {
        var fx = X(p) - fs / 2, cell = fs / 4;
        g.strokeStyle = M; g.globalAlpha = 0.5; g.setLineDash([2, 3]); g.lineWidth = 1;
        g.beginPath(); g.moveTo(X(p), fy - 2); g.lineTo(X(p), Y(p) + 5); g.stroke(); g.setLineDash([]);
        frames[k].forEach(function (v, i) {
          g.globalAlpha = 0.15 + 0.6 * v; g.fillStyle = A;
          g.fillRect(fx + (i % 4) * cell, fy + Math.floor(i / 4) * cell, cell - 0.5, cell - 0.5);
        });
        g.globalAlpha = 1; g.strokeStyle = L; g.strokeRect(fx - 0.5, fy - 0.5, fs + 1, fs + 1);
      });
      g.fillStyle = M; g.fillText("observations", 8, h - 8);

      // observed trajectory
      g.strokeStyle = A; g.lineWidth = 1.5; g.beginPath();
      observed.forEach(function (p, i) { if (i) g.lineTo(X(p), Y(p)); else g.moveTo(X(p), Y(p)); });
      g.stroke();
      g.fillStyle = A; observed.forEach(function (p) { g.beginPath(); g.arc(X(p), Y(p), 3, 0, 7); g.fill(); });

      // predicted rollout: dashed, with growing uncertainty
      g.setLineDash([4, 4]); g.lineWidth = 1.2; g.beginPath();
      rollout.forEach(function (p, i) { if (i) g.lineTo(X(p), Y(p)); else g.moveTo(X(p), Y(p)); });
      g.stroke(); g.setLineDash([]);
      rollout.slice(1).forEach(function (p, i) {
        g.globalAlpha = 0.45; g.lineWidth = 1;
        g.beginPath(); g.ellipse(X(p), Y(p), w * (0.035 + 0.025 * i), h * (0.03 + 0.02 * i), 0, 0, Math.PI * 2); g.stroke();
      });
      g.globalAlpha = 1;
      g.fillStyle = M;
      g.fillText("zₜ", X(observed[3]) - 16, Y(observed[3]) - 8);
      g.fillText("rollout", X(rollout[2]) - 34, Y(rollout[2]) + 26);

      // a pulse travelling along the rollout
      if (!reduceMotion && now) {
        var u = ((now - t0) / 2400) % 1, seg = u < 0.5 ? 0 : 1, f = (u - seg * 0.5) * 2;
        var a = rollout[seg], b = rollout[seg + 1];
        g.fillStyle = A; g.globalAlpha = 1 - 0.6 * u;
        g.beginPath(); g.arc(X(a) + (X(b) - X(a)) * f, Y(a) + (Y(b) - Y(a)) * f, 2.6, 0, 7); g.fill();
        g.globalAlpha = 1;
      }
    };

    if (!reduceMotion) {
      // skip drawing while the figure is hidden (small screens)
      var tick = function (now) { if (wm.offsetParent !== null) drawWM(now); requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }
  }

  /* ---- KV-cache eviction demo (toy: synthetic heavy-tailed attention scores) ---- */
  var kv = document.getElementById("kv");
  var drawKV = function () {};
  if (kv) {
    var FRAMES = 24, PER = 12;
    var r = rng(42), scores = [];
    for (var i = 0; i < FRAMES * PER; i++) {
      var s = Math.exp(1.5 * gauss(r));
      if (i % PER === 0) s *= 4;          // one anchor-like token per frame
      if (i < PER) s *= 2.5;              // the first frame is the reference view
      scores.push(s);
    }
    var maxScore = Math.max.apply(null, scores);
    var budgetEl = document.getElementById("kv-budget");
    var shown = FRAMES, timer = null;

    var keptSet = function (n, B) {
      var idx = [];
      for (var i = 0; i < n * PER; i++) idx.push(i);
      if (idx.length <= B) return { keep: new Set(idx), mass: 1 };
      idx.sort(function (a, b) { return scores[b] - scores[a]; });
      var keep = new Set(idx.slice(0, B)), total = 0, kept = 0;
      for (var j = 0; j < n * PER; j++) { total += scores[j]; if (keep.has(j)) kept += scores[j]; }
      return { keep: keep, mass: kept / total };
    };

    drawKV = function () {
      var w = kv.parentElement.clientWidth, cell = w / FRAMES, h = cell * PER + 18;
      var g = setup(kv, w, h), A = css("--t-accent"), M = css("--t-muted"), L = css("--t-line");
      var B = +budgetEl.value, res = keptSet(shown, B);
      for (var i = 0; i < FRAMES * PER; i++) {
        var f = Math.floor(i / PER), k = i % PER, x = f * cell, y = k * cell;
        var pad = Math.max(1, cell * 0.12), w2 = cell - pad * 2;
        if (f >= shown) { g.globalAlpha = 1; g.strokeStyle = L; g.lineWidth = 1; g.strokeRect(x + pad + 0.5, y + pad + 0.5, w2 - 1, w2 - 1); continue; }
        if (res.keep.has(i)) {
          g.globalAlpha = 0.28 + 0.72 * Math.min(1, Math.sqrt(scores[i] / maxScore) * 1.6);
          g.fillStyle = A; g.fillRect(x + pad, y + pad, w2, w2);
        } else {
          g.globalAlpha = 0.35; g.fillStyle = M; g.fillRect(x + cell / 2 - 1, y + cell / 2 - 1, 2, 2);
        }
      }
      g.globalAlpha = 1; g.fillStyle = M; g.textBaseline = "bottom";
      g.font = '11px "IBM Plex Mono", ui-monospace, monospace';
      var last = "frame " + FRAMES, mid = "→ time";
      g.fillText("frame 1", 0, h);
      g.fillText(last, w - g.measureText(last).width, h);
      g.fillText(mid, w / 2 - g.measureText(mid).width / 2, h);

      var n = shown * PER;
      document.getElementById("kv-full").textContent = n + " tok";
      document.getElementById("kv-kept").textContent = Math.min(n, B) + " tok";
      document.getElementById("kv-mass").textContent = (res.mass * 100).toFixed(1) + "%";
      document.getElementById("kv-budget-out").textContent = B;
    };

    budgetEl.addEventListener("input", drawKV);
    document.getElementById("kv-play").addEventListener("click", function () {
      clearInterval(timer);
      if (reduceMotion) { shown = FRAMES; drawKV(); return; }
      shown = 1; drawKV();
      timer = setInterval(function () { shown++; drawKV(); if (shown >= FRAMES) clearInterval(timer); }, 140);
    });
    document.getElementById("kv-reset").addEventListener("click", function () {
      clearInterval(timer); shown = FRAMES; budgetEl.value = 132; drawKV();
    });
  }

  /* ---- typed prompt (decorative: the first command is already in the HTML) ---- */
  var typed = document.getElementById("typed");
  if (typed && !reduceMotion) {
    var cmds = (typed.dataset.commands || "").split("|").filter(Boolean);
    if (cmds.length > 1) {
      var ci = 0, pos = cmds[0].length, deleting = true;
      var step = function () {
        if (deleting) {
          pos--;
          if (pos <= 0) { deleting = false; ci = (ci + 1) % cmds.length; }
        } else {
          pos++;
          if (pos >= cmds[ci].length) { deleting = true; typed.textContent = cmds[ci]; return setTimeout(step, 2600); }
        }
        typed.textContent = cmds[ci].slice(0, Math.max(0, pos));
        setTimeout(step, deleting ? 28 : 55);
      };
      setTimeout(step, 3000);
    }
  }

  /* ---- copy email ---- */
  var copyBtn = document.getElementById("copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var el = document.getElementById("email");
      var done = function () { copyBtn.textContent = "copied"; setTimeout(function () { copyBtn.textContent = "copy"; }, 1500); };
      var select = function () {
        var sel = window.getSelection(), range = document.createRange();
        range.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(range);
        copyBtn.textContent = "selected";
      };
      if (navigator.clipboard) navigator.clipboard.writeText(el.textContent).then(done, select); else select();
    });
  }

  function redrawAll() { drawThumbs(); drawKV(); drawWM(); }
  redrawAll();
  window.addEventListener("resize", redrawAll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redrawAll);
  // theme.js flips data-theme on <html>; redraw canvases in the new palette
  new MutationObserver(redrawAll).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
})();
