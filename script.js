// Edit these on every release; the pipeline demo is: change VERSION, push, see it update live.
var VERSION = "v1.0";
var BUILD_DATE = "16 Oct 2026";
var ENVIRONMENT = "Production (AWS EC2 + k3s)";

function setText(id, text, cls) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  if (cls) el.classList.add(cls);
}

setText("version", VERSION);
setText("build", BUILD_DATE);
setText("env", ENVIRONMENT);
setText("time", new Date().toLocaleString());

function checkServer() {
  var start = performance.now();
  var pulse = document.getElementById("pulse");

  fetch("/?ping=" + Date.now(), { cache: "no-store" })
    .then(function (r) {
      var ms = Math.round(performance.now() - start);
      setText("latency", ms + " ms");
      if (r.ok) {
        setText("status-text", "Healthy", "ok");
        setText("heroStatus", "All systems operational");
        pulse.className = "pulse ok";
      } else {
        throw new Error("bad status");
      }
    })
    .catch(function () {
      setText("status-text", "Down", "bad");
      setText("heroStatus", "Server not responding");
      pulse.className = "pulse bad";
    });
}

checkServer();
setInterval(checkServer, 15000);
