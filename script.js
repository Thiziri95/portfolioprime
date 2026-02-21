(() => {
  const root = document.documentElement;

  // Year
  const year = new Date().getFullYear();
  const y1 = document.getElementById("year");
  const y2 = document.getElementById("year2");
  if (y1) y1.textContent = String(year);
  if (y2) y2.textContent = String(year);

  // Theme
  const themeBtn = document.getElementById("themeBtn");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  function updateThemeIcon() {
    const icon = themeBtn?.querySelector(".icon");
    if (!icon) return;
    const isLight = root.getAttribute("data-theme") === "light";
    icon.textContent = isLight ? "☀" : "☾";
  }
  updateThemeIcon();

  themeBtn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "light" ? "dark" : "light";
    if (next === "dark") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "light");
    localStorage.setItem("theme", next);
    updateThemeIcon();
  });

  // Drawer mobile
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("navDrawer");
  const closeDrawer = document.getElementById("closeDrawer");

  const openDrawer = () => {
    if (!drawer || !burger) return;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const hideDrawer = () => {
    if (!drawer || !burger) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  burger?.addEventListener("click", openDrawer);
  closeDrawer?.addEventListener("click", hideDrawer);
  drawer?.addEventListener("click", (e) => {
    if (e.target === drawer) hideDrawer();
  });

  drawer?.querySelectorAll("a")?.forEach(a => {
    a.addEventListener("click", hideDrawer);
  });

  // Smooth highlight active section in nav (desktop)
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = Array.from(document.querySelectorAll("section[id], main[id]"));

  const setActive = (id) => {
    navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))[0];
    if (!visible) return;
    const id = visible.target.getAttribute("id");
    if (id) setActive(id);
  }, { threshold: [0.35, 0.55, 0.7] });

  sections.forEach(s => observer.observe(s));

  // Reveal on scroll
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObs.observe(el));

  // Copy email
  const copyBtn = document.getElementById("copyEmail");
  const toast = document.getElementById("toast");
  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("thizirihamlaoui@gmail.com");
      if (toast) {
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 1100);
      }
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = "thizirihamlaoui@gmail.com";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      if (toast) {
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 1100);
      }
    }
  });
})();
