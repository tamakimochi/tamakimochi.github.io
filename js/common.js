/* =====================
  WAVEFORM (CSS animation)
===================== */
var WF_H = [58, 82, 48, 92, 65, 75, 55, 85, 70, 60, 80, 45, 72, 88, 62, 78, 50, 68];
var WF_D = [0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.12, 0.2, 0.28, 0.36, 0.44, 0.04, 0.52, 0.1, 0.18, 0.26, 0.34, 0.42];
function buildWF(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = "";
  for (var i = 0; i < 18; i++) {
    var b = document.createElement("div");
    b.className = "wb";
    var h = WF_H[i % WF_H.length];
    b.style.height = (h / 100) * 38 + "px";
    /* アニメーションを直接スタイルに付与 */
    var delay = WF_D[i % WF_D.length] + "s";
    b.style.animation = "wvAnim 1.4s ease-in-out " + delay + " infinite";
    el.appendChild(b);
  }
}
for (var wi = 0; wi < 6; wi++) buildWF("wf" + wi);

/* =====================
  PARTICLES
===================== */
(function () {
  var c = document.getElementById("particles");
  if (!c) return;
  var cols = ["#F2CA50", "#F2B84B", "#D96523", "#FFF3C4"];
  for (var i = 0; i < 16; i++) {
    var p = document.createElement("div");
    p.className = "pt";
    p.style.left = Math.random() * 100 + "vw";
    var s = 7 + Math.random() * 9;
    p.style.width = s + "px";
    p.style.height = s + "px";
    p.style.animationDuration = 10 + Math.random() * 12 + "s";
    p.style.animationDelay = Math.random() * 18 + "s";
    p.style.background = cols[Math.floor(Math.random() * cols.length)];
    p.style.opacity = ".5";
    c.appendChild(p);
  }
})();

/* =====================
  SMOOTH SCROLL (fixed header offset)
===================== */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    var href = this.getAttribute("href");
    if (href === "#" || !href) return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    var offset = 64; // header height
    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: "smooth" });
  });
});

/* =====================
  SCROLL REVEAL
===================== */
var rObs = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach(function (el) {
  rObs.observe(el);
});

/* =====================
  HAMBURGER
===================== */
var hbgEl = document.getElementById("hbg");
var mmEl = document.getElementById("mmenu");
hbgEl.addEventListener("click", function () {
  hbgEl.classList.toggle("open");
  mmEl.classList.toggle("open");
});
function cM() {
  hbgEl.classList.remove("open");
  mmEl.classList.remove("open");
}

/* =====================
  VOICE TABS
===================== */
document.querySelectorAll(".vt").forEach(function (tab) {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".vt").forEach(function (t) {
      t.classList.remove("active");
    });
    document.querySelectorAll(".vp").forEach(function (p) {
      p.classList.remove("active");
    });
    this.classList.add("active");
    document.getElementById("tab-" + this.dataset.tab).classList.add("active");
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.visible)").forEach(function (el) {
        rObs.observe(el);
      });
    }, 60);
  });
});

/* =====================
  WORKS CARD RENDER
===================== */
function mkCard(w, container) {
  var d = document.createElement("div");
  d.className = "wc";
  d.innerHTML =
    '<p class="wm">' + w.month + '</p><p class="wti">' + w.title + '</p><span class="wtg">' + w.tag + "</span>";
  d.addEventListener("click", function () {
    openMo(w.id);
  });
  container.appendChild(d);
}
var wGrid = document.getElementById("wGrid");
WD.slice(0, 6).forEach(function (w) {
  mkCard(w, wGrid);
});

/* =====================
  MODAL
===================== */
function openMo(id) {
  var w = WD.filter(function (x) {
    return x.id === id;
  })[0];
  if (!w) return;
  document.getElementById("mImg").src = w.img;
  document.getElementById("mDate").textContent = w.month;
  document.getElementById("mTitle").textContent = w.title;
  document.getElementById("mDesc").textContent = w.desc;
  document.getElementById("mTags").innerHTML = '<span class="mtg">' + w.tag + "</span>";
  document.getElementById("mMeta").innerHTML =
    '<div class="mmi"><p class="mml">Client</p><p class="mmv">' +
    w.client +
    "</p></div>" +
    '<div class="mmi"><p class="mml">Format</p><p class="mmv">' +
    w.format +
    "</p></div>" +
    '<div class="mmi"><p class="mml">Duration</p><p class="mmv">' +
    w.duration +
    "</p></div>" +
    '<div class="mmi"><p class="mml">Delivery</p><p class="mmv">' +
    w.delivery +
    "</p></div>";
  document.getElementById("mo").classList.add("open");
  document.body.style.overflow = "hidden";
}
function cMo() {
  document.getElementById("mo").classList.remove("open");
  document.body.style.overflow = "";
}
function oMOC(e) {
  if (e.target === document.getElementById("mo")) cMo();
}

/* =====================
  WORKS ALL
===================== */
var curFilt = "すべて";
function renderFilt() {
  var el = document.getElementById("wFilt");
  el.innerHTML = "";
  ALL_TAGS.forEach(function (tag) {
    var b = document.createElement("button");
    b.className = "fb" + (tag === curFilt ? " active" : "");
    b.textContent = tag;
    b.addEventListener("click", function () {
      curFilt = tag;
      renderFilt();
      renderAll();
    });
    el.appendChild(b);
  });
}
function renderAll() {
  var g = document.getElementById("wAllG");
  g.innerHTML = "";
  var list =
    curFilt === "すべて"
      ? WD
      : WD.filter(function (w) {
          return w.tag === curFilt;
        });
  list.forEach(function (w) {
    mkCard(w, g);
  });
}
function openAll() {
  curFilt = "すべて";
  renderFilt();
  renderAll();
  document.getElementById("wa").classList.add("open");
  document.body.style.overflow = "hidden";
}
function cAll() {
  document.getElementById("wa").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    cMo();
    cAll();
  }
});

/* =====================
  CONTACT
===================== */
(function () {
  var a = "tamakimochi1116" + "@" + "gmail.com";
  window._ma = a;
  var el = document.getElementById("ml");
  if (el) {
    el.href = "mailto:" + a;
    el.textContent = a;
  }
})();
function doSend() {
  var name = document.getElementById("fn").value.trim();
  var email = document.getElementById("fe").value.trim();
  var type = document.getElementById("ft").value || "未選択";
  var subj = document.getElementById("fs").value.trim();
  var msg = document.getElementById("fm").value.trim();
  if (!name || !email || !subj || !msg) {
    showT("⚠ 必須項目をすべて入力してください");
    return;
  }
  var body = "お名前：" + name + "\nメールアドレス：" + email + "\n種別：" + type + "\n\n" + msg;
  window.location.href =
    "mailto:" + window._ma + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
  showT("✉ メーラーを開いています…");
}

/* =====================
  TOAST
===================== */
function showT(msg) {
  var t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._t);
  t._t = setTimeout(function () {
    t.classList.remove("show");
  }, 3200);
}