const CONFIG = {
  spreadsheetId: "", // ID del foglio tra /d/ e /edit. Vuoto = dati di esempio.
  sheets: { cime: "Cime", ascese: "Ascese" },
};

const MOCK = {
  cime: [
    { id: "monte-bianco", nome: "Monte Bianco", altezza_m: 4808, dislivello_m: 1700, durata_h: 12, lat: 45.8326, lon: 6.8652 },
    { id: "punta-dufour", nome: "Punta Dufour", altezza_m: 4634, dislivello_m: 1800, durata_h: 14, lat: 45.9369, lon: 7.8668 },
    { id: "cervino", nome: "Cervino", altezza_m: 4478, dislivello_m: 1220, durata_h: 10, lat: 45.9766, lon: 7.6584 },
    { id: "grand-combin", nome: "Grand Combin", altezza_m: 4314, dislivello_m: 1550, durata_h: 11, lat: 45.9375, lon: 7.2992 },
    { id: "aiguille-verte", nome: "Aiguille Verte", altezza_m: 4122, dislivello_m: 1600, durata_h: 12, lat: 45.9349, lon: 6.97 },
    { id: "barre-ecrins", nome: "Barre des Écrins", altezza_m: 4102, dislivello_m: 1450, durata_h: 10.5, lat: 44.9222, lon: 6.36 },
    { id: "gran-paradiso", nome: "Gran Paradiso", altezza_m: 4061, dislivello_m: 1300, durata_h: 8.5, lat: 45.5183, lon: 7.2667 },
    { id: "piz-bernina", nome: "Piz Bernina", altezza_m: 4049, dislivello_m: 1400, durata_h: 11, lat: 46.3824, lon: 9.9081 },
    { id: "dent-geant", nome: "Dent du Géant", altezza_m: 4013, dislivello_m: 700, durata_h: 7, lat: 45.8628, lon: 6.9517 },
    { id: "grivola", nome: "Grivola", altezza_m: 3969, dislivello_m: 1650, durata_h: 11, lat: 45.592, lon: 7.268 },
    { id: "ortles", nome: "Ortles", altezza_m: 3905, dislivello_m: 1450, durata_h: 9, lat: 46.509, lon: 10.545 },
    { id: "monviso", nome: "Monviso", altezza_m: 3841, dislivello_m: 1600, durata_h: 10, lat: 44.6672, lon: 7.0903 },
    { id: "disgrazia", nome: "Monte Disgrazia", altezza_m: 3678, dislivello_m: 1500, durata_h: 9.5, lat: 46.2689, lon: 9.7311 },
    { id: "presanella", nome: "Presanella", altezza_m: 3558, dislivello_m: 1200, durata_h: 8, lat: 46.22, lon: 10.664 },
    { id: "adamello", nome: "Adamello", altezza_m: 3539, dislivello_m: 1100, durata_h: 8, lat: 46.155, lon: 10.496 },
    { id: "marmolada", nome: "Marmolada", altezza_m: 3343, dislivello_m: 900, durata_h: 6.5, lat: 46.4344, lon: 11.8611 },
    { id: "pizzo-badile", nome: "Pizzo Badile", altezza_m: 3308, dislivello_m: 1100, durata_h: 9, lat: 46.295, lon: 9.586 },
    { id: "antelao", nome: "Antelao", altezza_m: 3264, dislivello_m: 1600, durata_h: 8, lat: 46.437, lon: 12.261 },
  ],
  ascese: [
    { cima_id: "gran-paradiso", alpinista: "Marco", data: "2019-07-14" },
    { cima_id: "gran-paradiso", alpinista: "Luca", data: "2019-07-14" },
    { cima_id: "gran-paradiso", alpinista: "Sara", data: "2021-08-02" },
    { cima_id: "gran-paradiso", alpinista: "Elena", data: "2021-08-02" },
    { cima_id: "gran-paradiso", alpinista: "Paolo", data: "2023-07-22" },
    { cima_id: "gran-paradiso", alpinista: "Anna", data: "2024-08-11" },
    { cima_id: "monviso", alpinista: "Marco", data: "2018-08-19" },
    { cima_id: "monviso", alpinista: "Luca", data: "2020-07-26" },
    { cima_id: "monviso", alpinista: "Paolo", data: "2020-07-26" },
    { cima_id: "marmolada", alpinista: "Sara", data: "2017-09-03" },
    { cima_id: "marmolada", alpinista: "Elena", data: "2017-09-03" },
    { cima_id: "marmolada", alpinista: "Anna", data: "2022-08-15" },
    { cima_id: "marmolada", alpinista: "Marco", data: "2022-08-15" },
    { cima_id: "cervino", alpinista: "Luca", data: "2021-07-18" },
    { cima_id: "cervino", alpinista: "Marco", data: "2023-07-09" },
    { cima_id: "monte-bianco", alpinista: "Marco", data: "2022-08-28" },
    { cima_id: "monte-bianco", alpinista: "Luca", data: "2022-08-28" },
    { cima_id: "monte-bianco", alpinista: "Paolo", data: "2024-07-07" },
    { cima_id: "punta-dufour", alpinista: "Luca", data: "2024-07-20" },
    { cima_id: "ortles", alpinista: "Elena", data: "2019-06-30" },
    { cima_id: "ortles", alpinista: "Sara", data: "2019-06-30" },
    { cima_id: "ortles", alpinista: "Anna", data: "2023-07-16" },
    { cima_id: "presanella", alpinista: "Anna", data: "2018-08-04" },
    { cima_id: "presanella", alpinista: "Elena", data: "2020-08-09" },
    { cima_id: "presanella", alpinista: "Paolo", data: "2020-08-09" },
    { cima_id: "presanella", alpinista: "Sara", data: "2024-07-28" },
    { cima_id: "adamello", alpinista: "Paolo", data: "2018-07-12" },
    { cima_id: "adamello", alpinista: "Marco", data: "2021-07-03" },
    { cima_id: "adamello", alpinista: "Anna", data: "2021-07-03" },
    { cima_id: "grivola", alpinista: "Marco", data: "2024-08-03" },
    { cima_id: "grivola", alpinista: "Luca", data: "2024-08-03" },
    { cima_id: "piz-bernina", alpinista: "Luca", data: "2023-08-12" },
    { cima_id: "piz-bernina", alpinista: "Sara", data: "2025-07-19" },
    { cima_id: "barre-ecrins", alpinista: "Paolo", data: "2022-07-24" },
    { cima_id: "barre-ecrins", alpinista: "Elena", data: "2022-07-24" },
    { cima_id: "aiguille-verte", alpinista: "Luca", data: "2025-08-02" },
    { cima_id: "dent-geant", alpinista: "Marco", data: "2020-08-16" },
    { cima_id: "dent-geant", alpinista: "Sara", data: "2023-08-20" },
    { cima_id: "disgrazia", alpinista: "Elena", data: "2021-09-05" },
    { cima_id: "disgrazia", alpinista: "Anna", data: "2021-09-05" },
    { cima_id: "disgrazia", alpinista: "Paolo", data: "2024-09-01" },
    { cima_id: "pizzo-badile", alpinista: "Marco", data: "2025-07-06" },
    { cima_id: "antelao", alpinista: "Sara", data: "2016-08-21" },
    { cima_id: "antelao", alpinista: "Elena", data: "2018-08-12" },
    { cima_id: "grand-combin", alpinista: "Luca", data: "2022-07-10" },
  ],
};

const state = {
  cime: [],
  persone: [],
  mapFilter: "",
  personSort: "data",
  maps: { main: null, mini: null },
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
    altezza_m: num(raw.altezza_m),
    dislivello_m: num(raw.dislivello_m),
    durata_h: num(raw.durata_h),
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
  return {
    n: persona.ascese.length,
    dislivello: peaks.reduce((s, c) => s + c.dislivello_m, 0),
    ore: peaks.reduce((s, c) => s + c.durata_h, 0),
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

function fmtHours(h) {
  const hours = Math.floor(h);
  const mins = Math.round((h - hours) * 60);
  if (!mins) return `${hours} h`;
  return `${hours} h ${mins} min`;
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
    map.invalidateSize();
  };
  requestAnimationFrame(bump);
  setTimeout(bump, 150);
  setTimeout(bump, 500);
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
    <p class="popup-meta">${fmtNum(cima.altezza_m)} m · ${who}</p>
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
          <div class="muted">${fmtNum(c.altezza_m)} m · dislivello ${fmtNum(c.dislivello_m)} m · ${fmtHours(c.durata_h)}</div>
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
      <p class="kicker">Cima</p>
      <h1 class="page-title">${escapeHtml(cima.nome)}</h1>
      <p class="lede">${fmtNum(cima.altezza_m)} m</p>
      <div class="stats-row">
        <div class="stat"><span>Dislivello</span><b>${fmtNum(cima.dislivello_m)} m</b></div>
        <div class="stat"><span>Durata</span><b>${fmtHours(cima.durata_h)}</b></div>
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
        <p class="muted">${s.n} cime · ${fmtNum(s.dislivello)} m D+ · max ${fmtNum(s.quotaMax)} m</p>
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
      if (sort === "dislivello") return b.cima.dislivello_m - a.cima.dislivello_m;
      return (b.data || "").localeCompare(a.data || "");
    })
    .map(
      (a) => `<a class="row" href="#/cima/${encodeURIComponent(a.cima.id)}">
        <div>
          <div class="row-title">${escapeHtml(a.cima.nome)}</div>
          <div class="muted">${fmtNum(a.cima.altezza_m)} m · D+ ${fmtNum(a.cima.dislivello_m)} m</div>
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
        <div class="stat"><span>Dislivello</span><b>${fmtNum(s.dislivello)} m</b></div>
        <div class="stat"><span>Ore</span><b>${fmtHours(s.ore)}</b></div>
        <div class="stat"><span>Quota max</span><b>${fmtNum(s.quotaMax)} m</b></div>
        <div class="stat"><span>Prima ascesa</span><b>${fmtDate(s.prima)}</b></div>
        <div class="stat"><span>Ultima ascesa</span><b>${fmtDate(s.ultima)}</b></div>
      </div>
      <div class="toolbar">
        <button class="sort-btn${sort === "data" ? " is-active" : ""}" data-sort="data">Data</button>
        <button class="sort-btn${sort === "quota" ? " is-active" : ""}" data-sort="quota">Quota</button>
        <button class="sort-btn${sort === "dislivello" ? " is-active" : ""}" data-sort="dislivello">Dislivello</button>
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
        <div class="stat"><span>Dislivello</span><b>${fmtNum(sa.dislivello)} / ${fmtNum(sb.dislivello)} m</b></div>
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
  appEl.innerHTML = `
    <section class="page">
      <p class="kicker">Diario</p>
      <h1 class="page-title">Statistiche</h1>
      <p class="lede">${state.cime.length} cime, ${state.persone.length} alpinisti, ${state.cime.reduce((n, c) => n + c.ascese.length, 0)} ascese.</p>
      ${barChart(
        "Cime per persona",
        ranked.map((r) => ({ label: r.p.nome, value: r.s.n, display: String(r.s.n) }))
      )}
      ${barChart(
        "Dislivello cumulato",
        [...ranked]
          .sort((a, b) => b.s.dislivello - a.s.dislivello)
          .map((r) => ({ label: r.p.nome, value: r.s.dislivello, display: `${fmtNum(r.s.dislivello)} m` })),
        "alt"
      )}
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
