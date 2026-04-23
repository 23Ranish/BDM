document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  if (!cursor || !ring) return;

  // 🔥 Start from saved position OR center
  let mx = parseFloat(localStorage.getItem("mx")) || window.innerWidth / 2;
  let my = parseFloat(localStorage.getItem("my")) || window.innerHeight / 2;

  let rx = mx;
  let ry = my;

  // 🔥 Set initial position BEFORE showing (prevents flash)
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";

  ring.style.left = mx + "px";
  ring.style.top = my + "px";

  // 🔥 Show after first frame (NO TOP-LEFT FLASH)
  requestAnimationFrame(() => {
    cursor.style.opacity = "1";
    ring.style.opacity = "1";
  });

  // Track mouse
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;

    // save position for next page
    localStorage.setItem("mx", mx);
    localStorage.setItem("my", my);

    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });

  // Smooth ring animation
  function animate() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;

    ring.style.left = rx + "px";
    ring.style.top = ry + "px";

    requestAnimationFrame(animate);
  }

  animate();

  // Hover effects
  document.addEventListener("mousemove", (e) => {
    const interactive = e.target.closest?.('a, button, [onclick]');

    if (interactive) {
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(201,168,76,0.6)';
    } else {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(245,243,239,0.5)';
    }
  });
});