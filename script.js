(function () {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Optional: load all publications from assets/publications.json
  // Format:
  // [
  //   {"title":"...", "authors":"...", "venue":"...", "year":"2025", "link":"https://..."},
  //   ...
  // ]
  const allWrap = document.getElementById("all-publications");
  const listEl = document.getElementById("pubs-list");

  async function tryLoadAllPubs() {
    try {
      const res = await fetch("assets/publications.json", { cache: "no-store" });
      if (!res.ok) return;

      const pubs = await res.json();
      if (!Array.isArray(pubs) || pubs.length === 0) return;

      pubs.forEach((p) => {
        const li = document.createElement("li");

        const title = p.title ? `${p.title}` : "Untitled";
        const authors = p.authors ? `${p.authors}. ` : "";
        const venue = p.venue ? `${p.venue}` : "";
        const year = p.year ? ` (${p.year})` : "";

        if (p.link) {
          const a = document.createElement("a");
          a.href = p.link;
          a.target = "_blank";
          a.rel = "noreferrer";
          a.textContent = title;
          li.appendChild(document.createTextNode(authors));
          li.appendChild(a);
          li.appendChild(document.createTextNode(` — ${venue}${year}`));
        } else {
          li.textContent = `${authors}${title} — ${venue}${year}`;
        }

        listEl.appendChild(li);
      });

      allWrap.classList.remove("hidden");
    } catch (_) {
      // no-op
    }
  }

  if (allWrap && listEl) tryLoadAllPubs();
})();

