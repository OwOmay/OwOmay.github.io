Object.defineProperty(window, "drawScale", {
  get: () => scale,
  set: (val) => {
    scale = val;
  },
});

let scale = 1;

function initWindow() {
  resize();
  // @ts-ignore
  document.getElementById("loader").style.display = "none";
}

function resize() {
  scale = Math.min(window.innerWidth / 640, window.innerHeight / 480);
  document.body.style.transform = `scale(${scale})`;
}

window.addEventListener("load", initWindow);
window.addEventListener("resize", resize);
