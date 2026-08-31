const CONFIG = {
  spreadsheetId: "", // ID del foglio tra /d/ e /edit. Vuoto = dati di esempio.
  sheets: { cime: "Cime", ascese: "Ascese" },
};

const MOCK = {
  cime: [
    { id: "1", nome: "Monte Corno Grande, vetta occidentale", gruppo: "Gran Sasso", altezza_m: 2912, lat: 42.46961, lon: 13.56539 },
    { id: "2", nome: "Monte Corno Grande, vetta orientale", gruppo: "Gran Sasso", altezza_m: 2903, lat: 42.47217, lon: 13.57084 },
    { id: "3", nome: "Monte Corno Grande, vetta centrale", gruppo: "Gran Sasso", altezza_m: 2893, lat: 42.47108, lon: 13.5697 },
    { id: "4", nome: "Torrione Cambi", gruppo: "Gran Sasso", altezza_m: 2875, lat: 42.47056, lon: 13.56892 },
    { id: "5", nome: "Monte Corno Piccolo", gruppo: "Gran Sasso", altezza_m: 2655, lat: 42.47934, lon: 13.55999 },
    { id: "6", nome: "Pizzo d'Intermesoli", gruppo: "Gran Sasso", altezza_m: 2635, lat: 42.47279, lon: 13.52704 },
    { id: "7", nome: "Monte Corvo", gruppo: "Gran Sasso", altezza_m: 2623, lat: 42.47932, lon: 13.49331 },
    { id: "8", nome: "Punta dei Due", gruppo: "Gran Sasso", altezza_m: 2608, lat: 42.47555, lon: 13.56002 },
    { id: "9", nome: "Monte Camicia", gruppo: "Gran Sasso", altezza_m: 2564, lat: 42.43926, lon: 13.71835 },
    { id: "10", nome: "Monte Prena", gruppo: "Gran Sasso", altezza_m: 2561, lat: 42.44238, lon: 13.68321 },
    { id: "11", nome: "Monte Corvo, vetta occidentale", gruppo: "Gran Sasso", altezza_m: 2533, lat: 42.4508, lon: 13.52472 },
    { id: "12", nome: "Pizzo Cefalone", gruppo: "Gran Sasso", altezza_m: 2533, lat: 42.48275, lon: 13.48222 },
    { id: "13", nome: "Monte Aquila", gruppo: "Gran Sasso", altezza_m: 2494, lat: 42.45732, lon: 13.56743 },
    { id: "14", nome: "Pizzo d'Intermesoli, vetta settentrionale", gruppo: "Gran Sasso", altezza_m: 2483, lat: 42.48211, lon: 13.52323 },
    { id: "15", nome: "Monte Infornace", gruppo: "Gran Sasso", altezza_m: 2469, lat: 42.4386, lon: 13.67691 },
    { id: "16", nome: "Cima delle Malecoste", gruppo: "Gran Sasso", altezza_m: 2444, lat: 42.45756, lon: 13.49986 },
    { id: "17", nome: "Cima Giovanni Paolo II", gruppo: "Gran Sasso", altezza_m: 2425, lat: 42.45324, lon: 13.5146 },
    { id: "18", nome: "Monte Portella, anticima nord-est", gruppo: "Gran Sasso", altezza_m: 2422, lat: 42.45026, lon: 13.55441 },
    { id: "19", nome: "Monte Brancastello", gruppo: "Gran Sasso", altezza_m: 2385, lat: 42.44753, lon: 13.63982 },
    { id: "20", nome: "Monte Portella", gruppo: "Gran Sasso", altezza_m: 2385, lat: 42.44756, lon: 13.54595 },
  ],
  ascese: [
    { cima_id: "1", alpinista: "Marco", data: "2018-08-12" },
    { cima_id: "1", alpinista: "Luca", data: "2018-08-12" },
    { cima_id: "1", alpinista: "Sara", data: "2020-07-19" },
    { cima_id: "1", alpinista: "Elena", data: "2020-07-19" },
    { cima_id: "1", alpinista: "Paolo", data: "2022-08-06" },
    { cima_id: "1", alpinista: "Anna", data: "2024-07-21" },
    { cima_id: "2", alpinista: "Marco", data: "2019-08-03" },
    { cima_id: "2", alpinista: "Luca", data: "2019-08-03" },
    { cima_id: "3", alpinista: "Marco", data: "2021-07-25" },
    { cima_id: "3", alpinista: "Luca", data: "2021-07-25" },
    { cima_id: "3", alpinista: "Sara", data: "2023-08-13" },
    { cima_id: "4", alpinista: "Luca", data: "2023-08-13" },
    { cima_id: "5", alpinista: "Marco", data: "2017-09-10" },
    { cima_id: "5", alpinista: "Sara", data: "2019-06-30" },
    { cima_id: "5", alpinista: "Elena", data: "2019-06-30" },
    { cima_id: "6", alpinista: "Luca", data: "2020-08-16" },
    { cima_id: "6", alpinista: "Paolo", data: "2022-07-17" },
    { cima_id: "7", alpinista: "Elena", data: "2021-09-05" },
    { cima_id: "7", alpinista: "Anna", data: "2021-09-05" },
    { cima_id: "8", alpinista: "Paolo", data: "2024-08-18" },
    { cima_id: "9", alpinista: "Marco", data: "2022-08-28" },
    { cima_id: "9", alpinista: "Luca", data: "2022-08-28" },
    { cima_id: "9", alpinista: "Paolo", data: "2024-07-07" },
    { cima_id: "9", alpinista: "Sara", data: "2025-07-12" },
    { cima_id: "10", alpinista: "Sara", data: "2021-08-22" },
    { cima_id: "10", alpinista: "Anna", data: "2023-07-16" },
    { cima_id: "11", alpinista: "Sara", data: "2024-09-01" },
    { cima_id: "12", alpinista: "Elena", data: "2022-07-24" },
    { cima_id: "13", alpinista: "Marco", data: "2016-08-21" },
    { cima_id: "13", alpinista: "Luca", data: "2018-07-14" },
    { cima_id: "13", alpinista: "Sara", data: "2018-07-14" },
    { cima_id: "13", alpinista: "Elena", data: "2020-08-09" },
    { cima_id: "13", alpinista: "Paolo", data: "2020-08-09" },
    { cima_id: "14", alpinista: "Elena", data: "2025-08-02" },
    { cima_id: "15", alpinista: "Sara", data: "2023-08-20" },
    { cima_id: "16", alpinista: "Elena", data: "2024-07-28" },
    { cima_id: "16", alpinista: "Anna", data: "2024-07-28" },
    { cima_id: "17", alpinista: "Marco", data: "2025-07-06" },
    { cima_id: "18", alpinista: "Luca", data: "2024-07-20" },
    { cima_id: "19", alpinista: "Paolo", data: "2021-07-03" },
    { cima_id: "19", alpinista: "Anna", data: "2021-07-03" },
    { cima_id: "20", alpinista: "Marco", data: "2023-07-09" },
    { cima_id: "20", alpinista: "Luca", data: "2023-07-09" },
    { cima_id: "1", alpinista: "Marco", data: "2025-08-16" },
    { cima_id: "2", alpinista: "Marco", data: "2025-08-16" },
    { cima_id: "1", alpinista: "Luca", data: "2025-08-16" },
    { cima_id: "2", alpinista: "Luca", data: "2025-08-16" },
    { cima_id: "1", alpinista: "Paolo", data: "2025-08-16" },
    { cima_id: "2", alpinista: "Paolo", data: "2025-08-16" },
    { cima_id: "9", alpinista: "Elena", data: "2024-06-15" },
    { cima_id: "10", alpinista: "Elena", data: "2024-06-15" },
    { cima_id: "9", alpinista: "Anna", data: "2024-06-15" },
    { cima_id: "10", alpinista: "Anna", data: "2024-06-15" },
    { cima_id: "9", alpinista: "Sara", data: "2024-06-15" },
    { cima_id: "10", alpinista: "Sara", data: "2024-06-15" },
    { cima_id: "18", alpinista: "Marco", data: "2023-09-02" },
    { cima_id: "20", alpinista: "Marco", data: "2023-09-02" },
    { cima_id: "18", alpinista: "Luca", data: "2023-09-02" },
    { cima_id: "20", alpinista: "Luca", data: "2023-09-02" },
  ],
};

const state = {
  cime: [],
  persone: [],
  mapFilter: "",
  personSort: "data",
  maps: { main: null, mini: null },
  mapTimers: [],
};

const appEl = document.getElementById("app");
const statusEl = document.getElementById("status");

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function parseGvizDate(value, formatted) {
  if (value == null || value === "") return "";
  if (typeof value === "string") {
    const m = value.match(/^Date\((\d+),(\d+),(\d+)/);
    if (m) {
      const y = Number(m[1]);
      const mo = String(Number(m[2]) + 1).padStart(2, "0");
      const d = String(Number(m[3])).padStart(2, "0");
      return `${y}-${mo}-${d}`;
    }
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof formatted === "string" && /^\d{4}-\d{2}-\d{2}/.test(formatted)) {
    return formatted.slice(0, 10);
  }
  return String(value);
}

function parseGviz(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("Risposta foglio non valida");
  const json = JSON.parse(text.slice(start, end + 1));
  if (json.status === "error") {
    const err0 = json.errors && json.errors[0];
    throw new Error((err0 && err0.detailed_message) || "Errore foglio");
  }
  const cols = json.table.cols.map((c) => (c.label || c.id || "").trim());
  return json.table.rows.map((row) => {
    const obj = {};
    cols.forEach((col, i) => {
      const cell = row.c && row.c[i];
      obj[col] = cell && cell.v != null ? cell.v : "";
      if (col === "data") obj[col] = parseGvizDate(cell && cell.v, cell && cell.f);
    });
    return obj;
  });
}

function gvizUrl(sheet) {
  const id = CONFIG.spreadsheetId;
  const name = encodeURIComponent(sheet);
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&sheet=${name}`;
}

async function fetchSheet(sheet) {
  const res = await fetch(gvizUrl(sheet));
  if (!res.ok) throw new Error(`HTTP ${res.status} su ${sheet}`);
  return parseGviz(await res.text());
}

function normalizeCima(raw) {
  return {
    id: String(raw.id || "").trim(),
    nome: String(raw.nome || "").trim(),
    gruppo: String(raw.gruppo || "").trim(),
    altezza_m: num(raw.altezza_m),
    lat: num(raw.lat),
    lon: num(raw.lon),
    ascese: [],
  };
}

function joinData(cimeRaw, asceseRaw) {
  const cime = cimeRaw.map(normalizeCima).filter((c) => c.id);
  const byId = new Map(cime.map((c) => [c.id, c]));
  const personeMap = new Map();

  for (const row of asceseRaw) {
    const cimaId = String(row.cima_id || "").trim();
    const nome = String(row.alpinista || "").trim();
    const data = parseGvizDate(row.data, row.data);
    if (!cimaId || !nome) continue;
    const cima = byId.get(cimaId);
    const ascesa = { cima_id: cimaId, alpinista: nome, data, cima };
    if (cima) cima.ascese.push(ascesa);
    if (!personeMap.has(nome)) personeMap.set(nome, { nome, ascese: [] });
    personeMap.get(nome).ascese.push(ascesa);
  }

  for (const cima of cime) {
    cima.ascese.sort((a, b) => (a.data || "").localeCompare(b.data || ""));
  }
  const persone = [...personeMap.values()].sort((a, b) => a.nome.localeCompare(b.nome, "it"));
  for (const p of persone) {
    p.ascese.sort((a, b) => (a.data || "").localeCompare(b.data || ""));
  }
  return { cime, persone };
}

function personStats(persona) {
  const peaks = persona.ascese.map((a) => a.cima).filter(Boolean);
  const dates = persona.ascese.map((a) => a.data).filter(Boolean).sort();
  const gruppi = new Set(peaks.map((c) => c.gruppo).filter(Boolean));
  return {
    n: persona.ascese.length,
    nGruppi: gruppi.size,
    quotaMax: peaks.reduce((m, c) => Math.max(m, c.altezza_m), 0),
    prima: dates[0] || "",
    ultima: dates[dates.length - 1] || "",
  };
}

function fmtDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fmtNum(n) {
  return Math.round(n).toLocaleString("it-IT");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function encodeName(name) {
  return encodeURIComponent(name);
}

function showStatus(msg, isError) {
  if (!msg) {
    statusEl.hidden = true;
    return;
  }
  statusEl.hidden = false;
  statusEl.textContent = msg;
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function climberCount(cima) {
  return new Set(cima.ascese.map((a) => a.alpinista)).size;
}

function markerColor(count, max) {
  if (count <= 0) return "#8a8478";
  const t = max <= 1 ? 1 : (count - 1) / Math.max(1, max - 1);
  if (t < 0.34) return "#4f7a62";
  if (t < 0.67) return "#c4a35a";
  return "#b4482a";
}

function circleIcon(color) {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:14px;height:14px;border-radius:50%;background:${color};border:2px solid #fbf8f1;box-shadow:0 1px 4px rgba(0,0,0,.35)"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

function destroyMaps() {
  state.mapTimers.forEach(clearTimeout);
  state.mapTimers = [];
  if (state.maps.main) {
    state.maps.main.remove();
    state.maps.main = null;
  }
  if (state.maps.mini) {
    state.maps.mini.remove();
    state.maps.mini = null;
  }
}

function hasLeaflet() {
  return typeof L !== "undefined";
}

function refreshMap(map) {
  if (!map) return;
  const bump = function () {
    if (!map || !map._loaded) return;
    try {
      map.invalidateSize();
    } catch (err) {}
  };
  requestAnimationFrame(bump);
  state.mapTimers.push(setTimeout(bump, 150));
  state.mapTimers.push(setTimeout(bump, 500));
}

function addTopoLayer(map) {
  const topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    maxZoom: 17,
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
  });
  const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  });
  let failed = 0;
  let switched = false;
  topo.on("tileerror", function () {
    failed += 1;
    if (switched || failed < 4) return;
    switched = true;
    map.removeLayer(topo);
    osm.addTo(map);
  });
  topo.addTo(map);
}

function peakPopup(cima) {
  const n = climberCount(cima);
  const who = n
    ? `Salita da ${n} ${n === 1 ? "alpinista" : "alpinisti"}`
    : "Non ancora salita dal gruppo";
  return `<p class="popup-title">${escapeHtml(cima.nome)}</p>
    <p class="popup-meta">${fmtNum(cima.altezza_m)} m${cima.gruppo ? " · " + escapeHtml(cima.gruppo) : ""} · ${who}</p>
    <a href="#/cima/${encodeURIComponent(cima.id)}">Scheda cima</a>`;
}

function renderMainMap(cime) {
  if (!hasLeaflet() || !document.getElementById("map-main")) return;
  const map = L.map("map-main", { scrollWheelZoom: true });
  addTopoLayer(map);
  const maxN = Math.max(1, ...state.cime.map(climberCount));
  const bounds = [];
  for (const cima of cime) {
    if (!cima.lat && !cima.lon) continue;
    const n = climberCount(cima);
    const marker = L.marker([cima.lat, cima.lon], {
      icon: circleIcon(markerColor(n, maxN)),
      title: cima.nome,
    }).addTo(map);
    marker.bindPopup(peakPopup(cima));
    bounds.push([cima.lat, cima.lon]);
  }
  if (bounds.length) map.fitBounds(bounds, { padding: [28, 28], maxZoom: 10 });
  else map.setView([45.9, 7.5], 7);
  state.maps.main = map;
  refreshMap(map);
}

function renderMiniMap(cima) {
  if (!hasLeaflet() || !document.getElementById("map-peak")) return;
  const map = L.map("map-peak", { scrollWheelZoom: false, attributionControl: false });
  addTopoLayer(map);
  map.setView([cima.lat, cima.lon], 11);
  const maxN = Math.max(1, ...state.cime.map(climberCount));
  L.marker([cima.lat, cima.lon], {
    icon: circleIcon(markerColor(climberCount(cima), maxN)),
  }).addTo(map);
  state.maps.mini = map;
  refreshMap(map);
}

function parseHash() {
  const raw = (location.hash || "#/mappa").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean);
  const view = parts[0] || "mappa";
  return { view, parts };
}

function setNav(view) {
  const key = {
    mappa: "mappa",
    cime: "cime",
    cima: "cime",
    diario: "diario",
    alpinisti: "alpinisti",
    alpinista: "alpinisti",
    confronta: "confronta",
    stats: "stats",
  }[view] || view;
  document.querySelectorAll("#nav a").forEach((a) => {
    a.classList.toggle("is-active", a.dataset.nav === key);
  });
  const active = document.querySelector("#nav a.is-active");
  if (active && active.scrollIntoView) {
    active.scrollIntoView({ inline: "nearest", block: "nearest" });
  }
}

function findCima(id) {
  return state.cime.find((c) => c.id === id);
}

function findPersona(nome) {
  return state.persone.find((p) => p.nome === nome);
}

function personSelect(id, selected) {
  const opts = [`<option value="">Scegli</option>`]
    .concat(
      state.persone.map(
        (p) =>
          `<option value="${escapeHtml(p.nome)}"${p.nome === selected ? " selected" : ""}>${escapeHtml(p.nome)}</option>`
      )
    )
    .join("");
  return `<select id="${id}">${opts}</select>`;
}

function viewMappa() {
  const maxN = Math.max(1, ...state.cime.map(climberCount));
  const filter = state.mapFilter;
  const cime = filter
    ? state.cime.filter((c) => c.ascese.some((a) => a.alpinista === filter))
    : state.cime;
  const opts = [`<option value="">Tutti</option>`]
    .concat(
      state.persone.map(
        (p) =>
          `<option value="${escapeHtml(p.nome)}"${p.nome === filter ? " selected" : ""}>${escapeHtml(p.nome)}</option>`
      )
    )
    .join("");
  appEl.innerHTML = `
    <section class="view-map">
      <div class="map-toolbar">
        <label>Alpinista ${`<select id="map-filter">${opts}</select>`}</label>
        <div class="legend">
          <span><i class="swatch" style="background:#8a8478"></i> Nessuno</span>
          <span><i class="swatch" style="background:${markerColor(1, maxN)}"></i> Pochi</span>
          <span><i class="swatch" style="background:${markerColor(Math.ceil(maxN / 2), maxN)}"></i> Alcuni</span>
          <span><i class="swatch" style="background:${markerColor(maxN, maxN)}"></i> Quasi tutti</span>
        </div>
      </div>
      <div id="map-main"></div>
    </section>`;
  document.getElementById("map-filter").addEventListener("change", (e) => {
    state.mapFilter = e.target.value;
    route();
  });
  renderMainMap(cime);
  if (!hasLeaflet()) {
    const mapEl = document.getElementById("map-main");
    if (mapEl) {
      mapEl.innerHTML = '<p class="empty">Mappa non disponibile: apri la lista Cime.</p>';
    }
    showStatus("Leaflet non e' stato caricato.", true);
  }
}

function viewCime() {
  const rows = [...state.cime]
    .sort((a, b) => b.altezza_m - a.altezza_m)
    .map((c) => {
      const n = climberCount(c);
      return `<a class="row" href="#/cima/${encodeURIComponent(c.id)}">
        <div>
          <div class="row-title">${escapeHtml(c.nome)}</div>
          <div class="muted">${fmtNum(c.altezza_m)} m${c.gruppo ? " · " + escapeHtml(c.gruppo) : ""}</div>
        </div>
        <div class="muted">${n} ${n === 1 ? "ascesa" : "ascese"}</div>
      </a>`;
    })
    .join("");
  appEl.innerHTML = `
    <section class="page">
      <p class="kicker">Registro</p>
      <h1 class="page-title">Cime</h1>
      <p class="lede">${state.cime.length} cime nel diario di gruppo.</p>
      <div class="list">${rows || `<p class="empty">Nessuna cima nel foglio.</p>`}</div>
    </section>`;
}

function peakIdNum(id) {
  const n = Number(id);
  return Number.isFinite(n) ? n : 0;
}

function buildDiario() {
  const all = [];
  for (const persona of state.persone) {
    const byDate = new Map();
    for (const a of persona.ascese) {
      if (!a.cima || !a.data) continue;
      if (!byDate.has(a.data)) byDate.set(a.data, []);
      const list = byDate.get(a.data);
      if (!list.some((c) => c.id === a.cima.id)) list.push(a.cima);
    }
    const dates = [...byDate.keys()].sort();
    const seen = new Set();
    let prevCount = 0;
    for (let i = 0; i < dates.length; i++) {
      const data = dates[i];
      const peaks = byDate.get(data).slice().sort((a, b) => {
        const na = peakIdNum(a.id);
        const nb = peakIdNum(b.id);
        if (na && nb && na !== nb) return na - nb;
        return a.nome.localeCompare(b.nome, "it");
      });
      for (const c of peaks) seen.add(c.id);
      const count = seen.size;
      all.push({
        persona: persona.nome,
        data: data,
        peaks: peaks,
        count: count,
        changed: count > prevCount,
      });
      prevCount = count;
    }
  }
  all.sort((a, b) => b.data.localeCompare(a.data) || a.persona.localeCompare(b.persona, "it"));
  const days = [];
  for (const entry of all) {
    const last = days[days.length - 1];
    if (!last || last.data !== entry.data) days.push({ data: entry.data, entries: [entry] });
    else last.entries.push(entry);
  }
  return days;
}

function viewDiario() {
  const days = buildDiario();
  const body = days
    .map((day) => {
      const cards = day.entries
        .map((e) => {
          const peaks = e.peaks
            .map(
              (c) =>
                `<a class="chip" href="#/cima/${encodeURIComponent(c.id)}">${escapeHtml(c.nome)}</a>`
            )
            .join("");
          const mark = e.changed
            ? `<span class="diary-mark diary-mark-up" title="Il totale è aumentato">↑</span>`
            : `<span class="diary-mark diary-mark-eq" title="Stesso totale della data precedente">=</span>`;
          return `<article class="diary-entry">
            <div>
              <a class="row-title" href="#/alpinista/${encodeName(e.persona)}">${escapeHtml(e.persona)}</a>
              <div class="diary-peaks">${peaks}</div>
            </div>
            <div class="diary-count">${e.count} ${mark}</div>
          </article>`;
        })
        .join("");
      return `<div class="diary-day">
        <h2>${fmtDate(day.data)}</h2>
        ${cards}
      </div>`;
    })
    .join("");
  appEl.innerHTML = `
    <section class="page">
      <p class="kicker">Cronaca</p>
      <h1 class="page-title">Diario</h1>
      <p class="lede">Dalla più recente. Più vette nello stesso giorno sono una sola uscita; il numero è il totale di cime distinte di quella persona.</p>
      ${body || `<p class="empty">Nessuna ascesa con data.</p>`}
    </section>`;
}

function viewCima(id) {
  const cima = findCima(id);
  if (!cima) {
    appEl.innerHTML = `<section class="page"><h1 class="page-title">Cima non trovata</h1></section>`;
    return;
  }
  const people = cima.ascese
    .map(
      (a) => `<a class="row" href="#/alpinista/${encodeName(a.alpinista)}">
        <div class="row-title">${escapeHtml(a.alpinista)}</div>
        <div class="muted">${fmtDate(a.data)}</div>
      </a>`
    )
    .join("");
  appEl.innerHTML = `
    <section class="page">
      <p class="kicker">${cima.gruppo ? escapeHtml(cima.gruppo) : "Cima"}</p>
      <h1 class="page-title">${escapeHtml(cima.nome)}</h1>
      <p class="lede">${fmtNum(cima.altezza_m)} m</p>
      <div class="stats-row">
        <div class="stat"><span>Quota</span><b>${fmtNum(cima.altezza_m)} m</b></div>
        <div class="stat"><span>Gruppo</span><b>${cima.gruppo ? escapeHtml(cima.gruppo) : "—"}</b></div>
        <div class="stat"><span>Ascese</span><b>${cima.ascese.length}</b></div>
      </div>
      <div id="map-peak" class="map-mini"></div>
      <h2 class="bar-block" style="margin-top:1.5rem">Chi l'ha salita</h2>
      <div class="list">${people || `<p class="empty">Nessuna ascesa registrata.</p>`}</div>
    </section>`;
  if (cima.lat || cima.lon) renderMiniMap(cima);
}

function viewAlpinisti() {
  const cards = state.persone
    .map((p) => {
      const s = personStats(p);
      return `<a class="card" href="#/alpinista/${encodeName(p.nome)}">
        <h2>${escapeHtml(p.nome)}</h2>
        <p class="muted">${s.n} cime · max ${fmtNum(s.quotaMax)} m</p>
      </a>`;
    })
    .join("");
  appEl.innerHTML = `
    <section class="page">
      <p class="kicker">Gruppo</p>
      <h1 class="page-title">Alpinisti</h1>
      <p class="lede">${state.persone.length} persone nel registro.</p>
      <div class="grid grid-cards">${cards || `<p class="empty">Nessun alpinista.</p>`}</div>
    </section>`;
}

function viewAlpinista(nome) {
  const persona = findPersona(nome);
  if (!persona) {
    appEl.innerHTML = `<section class="page"><h1 class="page-title">Alpinista non trovato</h1></section>`;
    return;
  }
  const s = personStats(persona);
  const sort = state.personSort;
  const rows = [...persona.ascese]
    .filter((a) => a.cima)
    .sort((a, b) => {
      if (sort === "quota") return b.cima.altezza_m - a.cima.altezza_m;
      if (sort === "gruppo") return (a.cima.gruppo || "").localeCompare(b.cima.gruppo || "", "it") || b.cima.altezza_m - a.cima.altezza_m;
      return (b.data || "").localeCompare(a.data || "");
    })
    .map(
      (a) => `<a class="row" href="#/cima/${encodeURIComponent(a.cima.id)}">
        <div>
          <div class="row-title">${escapeHtml(a.cima.nome)}</div>
          <div class="muted">${fmtNum(a.cima.altezza_m)} m${a.cima.gruppo ? " · " + escapeHtml(a.cima.gruppo) : ""}</div>
        </div>
        <div class="muted">${fmtDate(a.data)}</div>
      </a>`
    )
    .join("");
  const others = state.persone.filter((p) => p.nome !== persona.nome);
  const compareLinks = others
    .map((p) => `<a class="chip" href="#/confronta/${encodeName(persona.nome)}/${encodeName(p.nome)}">${escapeHtml(p.nome)}</a>`)
    .join("");
  appEl.innerHTML = `
    <section class="page">
      <p class="kicker">Alpinista</p>
      <h1 class="page-title">${escapeHtml(persona.nome)}</h1>
      <div class="stats-row">
        <div class="stat"><span>Cime</span><b>${s.n}</b></div>
        <div class="stat"><span>Gruppi</span><b>${s.nGruppi}</b></div>
        <div class="stat"><span>Quota max</span><b>${fmtNum(s.quotaMax)} m</b></div>
        <div class="stat"><span>Prima ascesa</span><b>${fmtDate(s.prima)}</b></div>
        <div class="stat"><span>Ultima ascesa</span><b>${fmtDate(s.ultima)}</b></div>
      </div>
      <div class="toolbar">
        <button class="sort-btn${sort === "data" ? " is-active" : ""}" data-sort="data">Data</button>
        <button class="sort-btn${sort === "quota" ? " is-active" : ""}" data-sort="quota">Quota</button>
        <button class="sort-btn${sort === "gruppo" ? " is-active" : ""}" data-sort="gruppo">Gruppo</button>
      </div>
      <div class="list">${rows}</div>
      <p class="lede" style="margin-top:1.5rem">Confronta con</p>
      <div class="chips">${compareLinks}</div>
    </section>`;
  appEl.querySelectorAll(".sort-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.personSort = btn.dataset.sort;
      viewAlpinista(nome);
    });
  });
}

function peakSet(persona) {
  return new Set(persona.ascese.filter((a) => a.cima).map((a) => a.cima.id));
}

function viewConfronta(nameA, nameB) {
  const a = nameA ? findPersona(nameA) : null;
  const b = nameB ? findPersona(nameB) : null;
  let body = "";
  if (a && b && a.nome === b.nome) {
    body = `<p class="empty">Scegli due alpinisti diversi.</p>`;
  } else if (a && b) {
    const setA = peakSet(a);
    const setB = peakSet(b);
    const onlyA = state.cime.filter((c) => setA.has(c.id) && !setB.has(c.id));
    const onlyB = state.cime.filter((c) => setB.has(c.id) && !setA.has(c.id));
    const both = state.cime.filter((c) => setA.has(c.id) && setB.has(c.id));
    const sa = personStats(a);
    const sb = personStats(b);
    const list = (arr) =>
      arr.length
        ? `<ul>${arr
            .map((c) => `<li><a href="#/cima/${encodeURIComponent(c.id)}">${escapeHtml(c.nome)}</a></li>`)
            .join("")}</ul>`
        : `<p class="empty">Nessuna</p>`;
    body = `
      <div class="compare-cols">
        <div class="compare-col only">
          <h3>Solo ${escapeHtml(a.nome)} (${onlyA.length})</h3>
          ${list(onlyA)}
        </div>
        <div class="compare-col common">
          <h3>In comune (${both.length})</h3>
          ${list(both)}
        </div>
        <div class="compare-col only">
          <h3>Solo ${escapeHtml(b.nome)} (${onlyB.length})</h3>
          ${list(onlyB)}
        </div>
      </div>
      <div class="stats-row">
        <div class="stat"><span>Cime</span><b>${sa.n} / ${sb.n}</b></div>
        <div class="stat"><span>Quota max</span><b>${fmtNum(sa.quotaMax)} / ${fmtNum(sb.quotaMax)} m</b></div>
      </div>`;
  } else {
    body = `<p class="empty">Scegli due alpinisti per vedere cime in comune e differenze.</p>`;
  }
  appEl.innerHTML = `
    <section class="page">
      <p class="kicker">Side by side</p>
      <h1 class="page-title">Confronta</h1>
      <div class="compare-picks">
        <label>A ${personSelect("cmp-a", (a && a.nome) || "")}</label>
        <label>B ${personSelect("cmp-b", (b && b.nome) || "")}</label>
      </div>
      ${body}
    </section>`;
  const go = () => {
    const va = document.getElementById("cmp-a").value;
    const vb = document.getElementById("cmp-b").value;
    if (va && vb) location.hash = `#/confronta/${encodeName(va)}/${encodeName(vb)}`;
    else if (va) location.hash = `#/confronta/${encodeName(va)}`;
    else location.hash = "#/confronta";
  };
  document.getElementById("cmp-a").addEventListener("change", go);
  document.getElementById("cmp-b").addEventListener("change", go);
}

function barChart(title, rows, cls) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  const bars = rows
    .map((r) => {
      const w = Math.max(4, (r.value / max) * 100);
      return `<div class="bar">
        <span>${escapeHtml(r.label)}</span>
        <div class="bar-track"><div class="bar-fill ${cls || ""}" style="width:${w}%"></div></div>
        <span>${escapeHtml(r.display)}</span>
      </div>`;
    })
    .join("");
  return `<div class="bar-block"><h2>${escapeHtml(title)}</h2>${bars}</div>`;
}

function viewStats() {
  const ranked = state.persone
    .map((p) => ({ p, s: personStats(p) }))
    .sort((a, b) => b.s.n - a.s.n);
  const byYear = new Map();
  for (const cima of state.cime) {
    for (const a of cima.ascese) {
      const y = (a.data || "").slice(0, 4);
      if (!y) continue;
      if (!byYear.has(y)) byYear.set(y, []);
      byYear.get(y).push(a);
    }
  }
  const years = [...byYear.keys()].sort((a, b) => b.localeCompare(a));
  const timeline = years
    .map((y) => {
      const items = byYear
        .get(y)
        .sort((a, b) => (a.data || "").localeCompare(b.data || ""))
        .map(
          (a) =>
            `<a class="chip" href="#/cima/${encodeURIComponent(a.cima_id)}">${escapeHtml(a.alpinista)} · ${escapeHtml((a.cima && a.cima.nome) || a.cima_id)}</a>`
        )
        .join("");
      return `<div class="year-block"><h3>${y} <span class="muted">(${byYear.get(y).length})</span></h3><div class="chips">${items}</div></div>`;
    })
    .join("");
  const byGruppo = new Map();
  for (const c of state.cime) {
    const g = c.gruppo || "—";
    byGruppo.set(g, (byGruppo.get(g) || 0) + 1);
  }
  const gruppiBars = [...byGruppo.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "it"))
    .map((entry) => ({ label: entry[0], value: entry[1], display: String(entry[1]) }));
  appEl.innerHTML = `
    <section class="page">
      <p class="kicker">Diario</p>
      <h1 class="page-title">Statistiche</h1>
      <p class="lede">${state.cime.length} cime, ${state.persone.length} alpinisti, ${state.cime.reduce((n, c) => n + c.ascese.length, 0)} ascese.</p>
      ${barChart(
        "Cime per persona",
        ranked.map((r) => ({ label: r.p.nome, value: r.s.n, display: String(r.s.n) }))
      )}
      ${barChart("Cime per gruppo", gruppiBars, "alt")}
      ${barChart(
        "Quota massima",
        [...ranked]
          .sort((a, b) => b.s.quotaMax - a.s.quotaMax)
          .map((r) => ({ label: r.p.nome, value: r.s.quotaMax, display: `${fmtNum(r.s.quotaMax)} m` })),
        "gold"
      )}
      <div class="bar-block"><h2>Ascese per anno</h2>${timeline || `<p class="empty">Nessuna data.</p>`}</div>
    </section>`;
}

function route() {
  try {
    destroyMaps();
    const parsed = parseHash();
    const view = parsed.view;
    const parts = parsed.parts;
    setNav(view);
    if (view === "mappa") viewMappa();
    else if (view === "cime") viewCime();
    else if (view === "diario") viewDiario();
    else if (view === "cima") viewCima(decodeURIComponent(parts[1] || ""));
    else if (view === "alpinisti") viewAlpinisti();
    else if (view === "alpinista") viewAlpinista(decodeURIComponent(parts[1] || ""));
    else if (view === "confronta") {
      viewConfronta(
        parts[1] ? decodeURIComponent(parts[1]) : "",
        parts[2] ? decodeURIComponent(parts[2]) : ""
      );
    } else if (view === "stats") viewStats();
    else viewMappa();
  } catch (err) {
    showStatus("Errore in pagina: " + (err && err.message ? err.message : err), true);
  }
}

async function loadData() {
  if (!CONFIG.spreadsheetId) {
    return joinData(MOCK.cime, MOCK.ascese);
  }
  const [cime, ascese] = await Promise.all([
    fetchSheet(CONFIG.sheets.cime),
    fetchSheet(CONFIG.sheets.ascese),
  ]);
  return joinData(cime, ascese);
}

async function init() {
  try {
    const data = await loadData();
    state.cime = data.cime;
    state.persone = data.persone;
    if (!CONFIG.spreadsheetId) {
      showStatus("Dati di esempio: incolla l'ID del foglio Drive in CONFIG.spreadsheetId dentro app.js.");
    } else {
      showStatus("");
    }
  } catch (err) {
    const data = joinData(MOCK.cime, MOCK.ascese);
    state.cime = data.cime;
    state.persone = data.persone;
    showStatus(`Foglio non leggibile (${err.message}). Mostro i dati di esempio.`, true);
  }
  window.addEventListener("hashchange", route);
  if (!location.hash) location.hash = "#/mappa";
  else route();
}

init();
