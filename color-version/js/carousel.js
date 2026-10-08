(function () {
  var root = document.querySelector("[data-carousel]");
  if (!root) return;
  var track = root.querySelector(".carousel-track");
  var slides = Array.prototype.slice.call(track.children);
  var index = 0;
  var timer;

  function visible() {
    if (window.matchMedia("(max-width: 680px)").matches) return 1;
    if (window.matchMedia("(max-width: 980px)").matches) return 2;
    return 3;
  }

  function go(next) {
    var count = visible();
    var max = Math.max(0, slides.length - count);
    index = Math.max(0, Math.min(next, max));
    var card = slides[0].getBoundingClientRect().width;
    var gap = 14;
    track.style.transform = "translateX(" + (-index * (card + gap)) + "px)";
  }

  function start() {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(function () {
      var count = visible();
      var max = Math.max(0, slides.length - count);
      go(index >= max ? 0 : index + 1);
    }, 3800);
  }
  function stop() { clearInterval(timer); }

  root.querySelector(".prev").addEventListener("click", function () { go(index - 1); start(); });
  root.querySelector(".next").addEventListener("click", function () { go(index + 1); start(); });
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  window.addEventListener("resize", function () { go(index); });
  go(0);
  start();
})();
