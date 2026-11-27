(function () {
  var root = document.documentElement,
    btn = document.getElementById("themeBtn");
  var saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (e) {}
  var theme =
    saved ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  function apply(t) {
    root.setAttribute("data-theme", t);
    if (btn)
      btn.innerHTML =
        t === "dark"
          ? '<i class="fa-solid fa-sun"></i>'
          : '<i class="fa-solid fa-moon"></i>';
  }
  apply(theme);
  if (btn)
    btn.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      apply(theme);
      try {
        localStorage.setItem("theme", theme);
      } catch (e) {}
    });

  var header = document.querySelector(".header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  var burger = document.getElementById("burger"),
    menu = document.getElementById("menu");
  if (burger)
    burger.addEventListener("click", function () {
      menu.classList.toggle("open");
    });

  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll(".reveal").forEach(function (el, i) {
    el.style.transitionDelay = (i % 6) * 80 + "ms";
    io.observe(el);
  });

  var t = document.getElementById("typing");
  if (t) {
    var words = t.dataset.words.split("|"),
      w = 0,
      c = 0,
      del = false;
    (function tick() {
      var word = words[w];
      c += del ? -1 : 1;
      t.firstChild.textContent = word.slice(0, c);
      var d = del ? 45 : 90;
      if (!del && c === word.length) {
        del = true;
        d = 1400;
      } else if (del && c === 0) {
        del = false;
        w = (w + 1) % words.length;
        d = 400;
      }
      setTimeout(tick, d);
    })();
  }
})();
