let state = {
  view: 'home',
  mapId: null,
  category: 'All',
  lineupId: null,
  screenshotIndex: 0,
  search: '',
  saved: JSON.parse(localStorage.getItem('cs2_saved') || '[]'),
  activeNav: 'lineups'
};

function setState(patch) {
  const screenshotOnly =
    state.view === 'detail' &&
    Object.keys(patch).length === 1 &&
    'screenshotIndex' in patch;
  Object.assign(state, patch);
  screenshotOnly ? updateScreenshotOnly() : render();
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getLineups(mapId, category, search) {
  return CS2_DATA.lineups.filter(l => {
    if (l.map !== mapId) return false;
    if (category !== 'All' && l.type !== category) return false;
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
}

function getMapData(id) { return CS2_DATA.maps.find(m => m.id === id); }
function getLineup(id)  { return CS2_DATA.lineups.find(l => l.id === id); }

function toggleSaved(id) {
  let s = [...state.saved];
  if (s.includes(id)) s = s.filter(x => x !== id);
  else s.push(id);
  localStorage.setItem('cs2_saved', JSON.stringify(s));
  setState({ saved: s });
}

function isSaved(id) { return state.saved.includes(id); }

function typeColor(type) {
  return { Smoke: 'tag-smoke', Flash: 'tag-flash', Molotov: 'tag-molotov', Guide: 'tag-guide' }[type] || 'tag-smoke';
}

// Returns an <img> with the grenade icon, or falls back to a Tabler <i>
function grenadeIconHtml(type, size) {
  const icons = CS2_DATA.grenadeIcons || {};
  const src = icons[type];
  const px = size || 18;
  if (src) {
    return `<img src="${src}" style="width:${px}px;height:${px}px;object-fit:contain;display:block;" alt="${type}" />`;
  }
  const fallback = { Smoke: 'ti-cloud', Flash: 'ti-bolt', Molotov: 'ti-flame', Guide: 'ti-book' }[type] || 'ti-circle';
  return `<i class="ti ${fallback}" style="font-size:${px}px"></i>`;
}

// ── Partial screenshot update (no video reload) ────────────────────────────
function updateScreenshotOnly() {
  const l = getLineup(state.lineupId);
  const shots = l.screenshots || [];
  const idx = state.screenshotIndex;
  const img = document.querySelector('.shot-img');
  if (img) img.src = shots[idx];
  const label = document.querySelector('.shot-count-label');
  if (label) label.textContent = `(${idx + 1}/${shots.length})`;
  const prev = document.querySelector('.shot-prev');
  const next = document.querySelector('.shot-next');
  if (prev) prev.disabled = idx === 0;
  if (next) next.disabled = idx === shots.length - 1;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  bindShotButtons();
}

function bindShotButtons() {
  const prev = document.querySelector('.shot-prev');
  const next = document.querySelector('.shot-next');
  if (prev) prev.onclick = (e) => { e.stopPropagation(); setState({ screenshotIndex: Math.max(0, state.screenshotIndex - 1) }); };
  if (next) next.onclick = (e) => { e.stopPropagation(); setState({ screenshotIndex: Math.min(99, state.screenshotIndex + 1) }); };
}

// ── Render ─────────────────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  if (state.view === 'home')        app.innerHTML = renderHome();
  else if (state.view === 'map')    app.innerHTML = renderMap();
  else if (state.view === 'detail') app.innerHTML = renderDetail();
  bindEvents();
}

// ── Home ───────────────────────────────────────────────────────────────────
function renderHome() {
  const content = state.activeNav === 'saved' ? renderSavedSection() : renderMapsSection();
  return `
  <div class="screen-wrap">
    <div class="topbar">
      <div class="topbar-brand">
        <span class="brand-dot"></span>
        <span class="brand-name">CS2 Utility</span>
      </div>
      <span class="offline-badge">OFFLINE</span>
    </div>
    <div class="content-scroll">${content}</div>
    ${renderBottomNav()}
  </div>`;
}

function renderMapsSection() {
  const mapCards = CS2_DATA.maps.map(m => {
    const count = CS2_DATA.lineups.filter(l => l.map === m.id).length;
    const thumbStyle = m.thumb ? `style="background-image:url('${m.thumb}')"` : '';
    const iconHtml = m.icon
      ? `<img class="map-card-icon" src="${m.icon}" alt="${m.name}" />`
      : `<span class="map-card-emoji">${m.thumbnail}</span>`;
    return `<div class="map-card ${m.thumb ? 'map-card-has-thumb' : ''}" data-action="openMap" data-map="${m.id}" ${thumbStyle}>
      <div class="map-card-overlay"></div>
      ${iconHtml}
      <div class="map-card-name">${m.name}</div>
      <div class="map-card-count">${count} items</div>
    </div>`;
  }).join('');

  const recentLineups = CS2_DATA.lineups.slice(0, 3).map(l => renderLineupRow(l)).join('');

  return `
    <div class="section">
      <div class="section-label">Maps</div>
      <div class="map-grid">${mapCards}</div>
    </div>
    <div class="divider"></div>
    <div class="section">
      <div class="section-label">Recent</div>
      <div class="lineup-rows">${recentLineups}</div>
    </div>`;
}

function renderSavedSection() {
  const savedLineups = CS2_DATA.lineups.filter(l => state.saved.includes(l.id));
  if (!savedLineups.length) return `<div class="empty-state"><i class="ti ti-star"></i><p>No saved lineups yet</p><span>Tap ☆ on any lineup to save it here</span></div>`;

  const byMap = {};
  savedLineups.forEach(l => {
    if (!byMap[l.map]) byMap[l.map] = [];
    byMap[l.map].push(l);
  });

  const sections = Object.entries(byMap).map(([mapId, lineups]) => {
    const map = getMapData(mapId);
    const radarHtml = map.radar ? renderRadarWithMarkers(map, lineups) : '';
    const rows = lineups.map(l => renderLineupRow(l)).join('');
    return `
      <div class="saved-map-section">
        <div class="section-label saved-map-label">
          ${map.icon ? `<img class="label-icon" src="${map.icon}" />` : map.thumbnail}
          ${map.name}
        </div>
        ${radarHtml}
        <div class="lineup-rows">${rows}</div>
      </div>
      <div class="divider"></div>`;
  }).join('');

  return `<div class="section" style="padding-bottom:0">
    <div class="section-label">Saved (${savedLineups.length})</div>
  </div>${sections}`;
}

// ── Radar with markers ─────────────────────────────────────────────────────
function renderRadarWithMarkers(map, lineups) {
  const markers = lineups
    .filter(l => l.mapMarker)
    .map(l => `
      <div class="radar-marker" style="left:${l.mapMarker.x}%;top:${l.mapMarker.y}%"
           data-action="openLineup" data-id="${l.id}">
        <div class="radar-marker-icon ${typeColor(l.type)}">
          ${grenadeIconHtml(l.type, 16)}
        </div>
        <div class="radar-marker-label">${l.title}</div>
      </div>`).join('');

  return `
  <div class="radar-wrap">
    <img class="radar-img" src="${map.radar}" alt="${map.name} radar" />
    ${markers}
  </div>`;
}

// ── Map view ───────────────────────────────────────────────────────────────
function renderMap() {
  const map = getMapData(state.mapId);
  if (!map) { state.view = 'home'; render(); return; }
  const allLineups = CS2_DATA.lineups.filter(l => l.map === state.mapId);
  const filtered = getLineups(state.mapId, state.category, state.search);

  const radarHtml = map.radar ? `
    <div class="map-radar-header">
      ${renderRadarWithMarkers(map, filtered)}
    </div>` : '';

  const catPills = CS2_DATA.categories.map(c => {
    const count = c === 'All'
      ? allLineups.length
      : allLineups.filter(l => l.type === c).length;
    if (count === 0 && c !== 'All') return '';
    return `<button class="cat-pill ${state.category === c ? 'active' : ''}" data-action="setCategory" data-cat="${c}">${c} <span class="cat-count">${count}</span></button>`;
  }).join('');

  const rows = filtered.length
    ? filtered.map(l => renderLineupRow(l)).join('')
    : `<div class="empty-state"><i class="ti ti-search"></i><p>No results</p></div>`;

  return `
  <div class="screen-wrap">
    <div class="topbar">
      <button class="back-btn" data-action="goHome"><i class="ti ti-arrow-left"></i></button>
      <div class="topbar-title">
        ${map.icon ? `<img class="topbar-map-icon" src="${map.icon}" alt="${map.name}" />` : `<span class="map-emoji-sm">${map.thumbnail}</span>`}
        <span>${map.name}</span>
      </div>
      <div style="width:36px"></div>
    </div>

    ${radarHtml}

    <div class="search-wrap">
      <i class="ti ti-search search-icon"></i>
      <input class="search-input" type="text" placeholder="Search lineups…" value="${state.search}" data-action="search" />
    </div>
    <div class="cat-scroll">${catPills}</div>
    <div class="divider"></div>

    <div class="content-scroll">
      <div class="lineup-rows">${rows}</div>
    </div>
    ${renderBottomNav()}
  </div>`;
}

// ── Detail view ────────────────────────────────────────────────────────────
function renderDetail() {
  const l = getLineup(state.lineupId);
  const map = getMapData(l.map);
  const saved = isSaved(l.id);
  const shots = l.screenshots || [];
  const idx = state.screenshotIndex;

  const dotNav = shots.length > 1
    ? `<div class="dot-nav">${shots.map((_, i) =>
        `<button class="dot ${i === idx ? 'active' : ''}" data-action="setShot" data-i="${i}"></button>`
      ).join('')}</div>`
    : '';

  const descHtml = (l.description || '')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  const tags = (l.tags || []).map(t => `<span class="detail-tag">${t}</span>`).join('');

  // Radar with single marker for this lineup
  const singleRadarHtml = (map.radar && l.mapMarker) ? `
    <div class="detail-radar-section">
      <div class="video-label"><i class="ti ti-map-2"></i> Map position</div>
      <div class="radar-wrap radar-single">
        <img class="radar-img" src="${map.radar}" alt="${map.name} radar" />
        <div class="radar-marker" style="left:${l.mapMarker.x}%;top:${l.mapMarker.y}%">
          <div class="radar-marker-icon ${typeColor(l.type)}">
            ${grenadeIconHtml(l.type, 13)}
          </div>
          <div class="radar-marker-label">${l.title}</div>
          <div class="marker-pulse-ring"></div>
        </div>
      </div>
    </div>` : '';

  // Video block
  let videoHtml = '';
  if (l.video) {
    videoHtml = `
    <div class="video-section">
      <div class="video-label"><i class="ti ti-player-play"></i> Lineup video</div>
      <div class="video-wrap">
        <video controls playsinline preload="metadata">
          <source src="${l.video}" type="video/mp4">
        </video>
      </div>
    </div>`;
  } else if (l.youtube) {
    videoHtml = `
    <div class="video-section">
      <div class="video-label"><i class="ti ti-player-play"></i> Lineup video</div>
      <div class="video-wrap">
        <iframe src="${l.youtube}?rel=0&modestbranding=1"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen title="${l.title}"></iframe>
      </div>
    </div>`;
  }

  // Type badge — use grenade icon if available
  const typeBadgeHtml = `
    <span class="type-tag ${typeColor(l.type)}">
      ${grenadeIconHtml(l.type, 12)} ${l.type}
    </span>`;

  return `
  <div class="screen-wrap">
    <div class="topbar">
      <button class="back-btn" data-action="goMap"><i class="ti ti-arrow-left"></i></button>
      <div class="topbar-title detail-title-trunc">${l.title}</div>
      <button class="save-btn ${saved ? 'saved' : ''}" data-action="toggleSave" data-id="${l.id}">
        <i class="ti ${saved ? 'ti-star-filled' : 'ti-star'}"></i>
      </button>
    </div>

    <div class="content-scroll">

      ${singleRadarHtml}

      ${videoHtml}

      ${shots.length ? `
      <div class="screenshots-section">
        <div class="video-label">
          <i class="ti ti-photo"></i> Screenshots
          ${shots.length > 1 ? `<span class="shot-count-label">(${idx + 1}/${shots.length})</span>` : ''}
        </div>
        <div class="shots-viewport">
          <img class="shot-img" src="${shots[idx]}" alt="Screenshot ${idx + 1}" />
          ${shots.length > 1 ? `
          <button class="shot-prev" ${idx === 0 ? 'disabled' : ''}><i class="ti ti-chevron-left"></i></button>
          <button class="shot-next" ${idx === shots.length - 1 ? 'disabled' : ''}><i class="ti ti-chevron-right"></i></button>` : ''}
        </div>
        ${dotNav}
      </div>` : ''}

      <div class="detail-body">
        <div class="detail-header-row">
          <div>
            <h2 class="detail-title">${l.title}</h2>
            <div class="detail-from"><i class="ti ti-map-pin"></i> From: ${l.from}</div>
          </div>
          ${typeBadgeHtml}
        </div>
        <div class="detail-tags">${tags}</div>
        ${l.throwType ? `<div class="throw-badge"><i class="ti ti-hand-finger"></i> ${l.throwType}</div>` : ''}
        <div class="detail-desc">${descHtml}</div>
      </div>
    </div>

    ${renderBottomNav()}
  </div>`;
}

// ── Shared ─────────────────────────────────────────────────────────────────
function renderLineupRow(l) {
  const map = getMapData(l.map);
  const saved = isSaved(l.id);
  return `
  <div class="lineup-row" data-action="openLineup" data-id="${l.id}">
    <div class="lineup-icon ${typeColor(l.type)}">
      ${grenadeIconHtml(l.type, 30)}
    </div>
    <div class="lineup-info">
      <div class="lineup-name">${l.title}</div>
      <div class="lineup-meta">
        ${state.view === 'home' ? `<span class="meta-map">${map.icon ? `<img class="meta-map-icon" src="${map.icon}" style="width:14px;height:14px;object-fit:contain;display:inline-block;vertical-align:middle;margin-right:2px" />` : map.thumbnail} ${map.name} ·</span> ` : ''}${l.from}
      </div>
    </div>
    <div class="lineup-actions">
      <button class="row-save ${saved ? 'saved' : ''}" data-action="toggleSave" data-id="${l.id}" onclick="event.stopPropagation()">
        <i class="ti ${saved ? 'ti-star-filled' : 'ti-star'}"></i>
      </button>
      <i class="ti ti-chevron-right row-arrow"></i>
    </div>
  </div>`;
}

function renderBottomNav() {
  const items = [
    { id: 'lineups', icon: 'ti-layout-grid', label: 'Lineups' },
    { id: 'saved',   icon: 'ti-star',        label: 'Saved' }
  ];
  return `<nav class="bottom-nav">
    ${items.map(i => `
    <button class="nav-item ${state.activeNav === i.id ? 'active' : ''}" data-action="setNav" data-nav="${i.id}">
      <i class="ti ${i.icon}"></i>
      <span>${i.label}</span>
    </button>`).join('')}
  </nav>`;
}

// ── Events ─────────────────────────────────────────────────────────────────
function bindEvents() {
  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', handleAction);
  });
  const searchEl = document.querySelector('[data-action="search"]');
  if (searchEl) searchEl.addEventListener('input', e => setState({ search: e.target.value }));
  bindShotButtons();
}

function handleAction(e) {
  const el = e.currentTarget;
  const action = el.dataset.action;
  if      (action === 'openMap')     setState({ view: 'map', mapId: el.dataset.map, category: 'All', search: '' });
  else if (action === 'openLineup')  setState({ view: 'detail', lineupId: parseInt(el.dataset.id), screenshotIndex: 0 });
  else if (action === 'goHome')      setState({ view: 'home' });
  else if (action === 'goMap')       setState({ view: 'map' });
  else if (action === 'setCategory') setState({ category: el.dataset.cat });
  else if (action === 'toggleSave')  { e.stopPropagation(); toggleSaved(parseInt(el.dataset.id)); }
  else if (action === 'setShot')     setState({ screenshotIndex: parseInt(el.dataset.i) });
  else if (action === 'setNav') {
    if (el.dataset.nav === 'saved') setState({ activeNav: 'saved', view: 'home' });
    else setState({ activeNav: 'lineups', view: state.view === 'detail' ? state.view : 'home' });
  }
}

document.addEventListener('DOMContentLoaded', () => render());