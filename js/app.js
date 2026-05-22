// ── State ──────────────────────────────────────────────────────────────────
let state = {
  view: 'home',       // 'home' | 'map' | 'detail'
  mapId: null,
  category: 'All',
  lineupId: null,
  screenshotIndex: 0,
  search: '',
  saved: JSON.parse(localStorage.getItem('cs2_saved') || '[]'),
  activeNav: 'lineups' // 'lineups' | 'guides' | 'saved'
};

function setState(patch) {
  Object.assign(state, patch);
  render();
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

function getMapData(id) {
  return CS2_DATA.maps.find(m => m.id === id);
}

function getLineup(id) {
  return CS2_DATA.lineups.find(l => l.id === id);
}

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

function typeIcon(type) {
  return { Smoke: 'ti-cloud', Flash: 'ti-bolt', Molotov: 'ti-flame', Guide: 'ti-book' }[type] || 'ti-circle';
}

// ── Render ─────────────────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  if (state.view === 'home') app.innerHTML = renderHome();
  else if (state.view === 'map') app.innerHTML = renderMap();
  else if (state.view === 'detail') app.innerHTML = renderDetail();
  bindEvents();
}

// ── Home view ──────────────────────────────────────────────────────────────
function renderHome() {
  const navContent = state.activeNav === 'saved' ? renderSavedSection() : renderMapsSection();
  return `
  <div class="screen-wrap">
    <div class="topbar">
      <div class="topbar-brand">
        <span class="brand-dot"></span>
        <span class="brand-name">CS2 Utility</span>
      </div>
      <span class="offline-badge">OFFLINE</span>
    </div>

    <div class="content-scroll">
      ${navContent}
    </div>

    ${renderBottomNav()}
  </div>`;
}

function renderMapsSection() {
  const mapCards = CS2_DATA.maps.map(m => {
    const count = CS2_DATA.lineups.filter(l => l.map === m.id).length;
    return `<div class="map-card" data-action="openMap" data-map="${m.id}">
      <div class="map-emoji">${m.thumbnail}</div>
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
  if (!savedLineups.length) return `<div class="empty-state"><i class="ti ti-star"></i><p>No saved lineups yet</p><span>Tap the star on any lineup to save it here</span></div>`;
  return `
    <div class="section">
      <div class="section-label">Saved (${savedLineups.length})</div>
      <div class="lineup-rows">${savedLineups.map(l => renderLineupRow(l)).join('')}</div>
    </div>`;
}

// ── Map view ───────────────────────────────────────────────────────────────
function renderMap() {
  const map = getMapData(state.mapId);
  const lineups = getLineups(state.mapId, state.category, state.search);
  const cats = CS2_DATA.categories;

  const catPills = cats.map(c => {
    const count = c === 'All'
      ? CS2_DATA.lineups.filter(l => l.map === state.mapId).length
      : CS2_DATA.lineups.filter(l => l.map === state.mapId && l.type === c).length;
    if (count === 0 && c !== 'All') return '';
    return `<button class="cat-pill ${state.category === c ? 'active' : ''}" data-action="setCategory" data-cat="${c}">${c} <span class="cat-count">${count}</span></button>`;
  }).join('');

  const rows = lineups.length
    ? lineups.map(l => renderLineupRow(l)).join('')
    : `<div class="empty-state"><i class="ti ti-search"></i><p>No results</p></div>`;

  return `
  <div class="screen-wrap">
    <div class="topbar">
      <button class="back-btn" data-action="goHome"><i class="ti ti-arrow-left"></i></button>
      <div class="topbar-title">
        <span class="map-emoji-sm">${map.thumbnail}</span>
        <span>${map.name}</span>
      </div>
      <div style="width:36px"></div>
    </div>

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
  const saved = isSaved(l.id);
  const shots = l.screenshots || [];
  const idx = state.screenshotIndex;

  const dotNav = shots.length > 1
    ? `<div class="dot-nav">${shots.map((_, i) => `<button class="dot ${i === idx ? 'active' : ''}" data-action="setShot" data-i="${i}"></button>`).join('')}</div>`
    : '';

  const descHtml = (l.description || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

  const tags = (l.tags || []).map(t => `<span class="detail-tag">${t}</span>`).join('');

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
      ${l.youtube ? `
      <div class="video-section">
        <div class="video-label"><i class="ti ti-player-play"></i> Lineup video</div>
        <div class="video-wrap">
          <iframe src="${l.youtube}?rel=0&modestbranding=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            title="${l.title} video"></iframe>
        </div>
      </div>` : ''}

      ${shots.length ? `
      <div class="screenshots-section">
        <div class="video-label"><i class="ti ti-photo"></i> Screenshots ${shots.length > 1 ? `(${idx + 1}/${shots.length})` : ''}</div>
        <div class="shots-viewport">
          <img class="shot-img" src="${shots[idx]}" alt="Screenshot ${idx + 1}" />
          ${shots.length > 1 ? `
          <button class="shot-prev" data-action="prevShot" ${idx === 0 ? 'disabled' : ''}><i class="ti ti-chevron-left"></i></button>
          <button class="shot-next" data-action="nextShot" ${idx === shots.length - 1 ? 'disabled' : ''}><i class="ti ti-chevron-right"></i></button>` : ''}
        </div>
        ${dotNav}
      </div>` : ''}

      <div class="detail-body">
        <div class="detail-header-row">
          <div>
            <h2 class="detail-title">${l.title}</h2>
            <div class="detail-from"><i class="ti ti-map-pin"></i> From: ${l.from}</div>
          </div>
          <span class="type-tag ${typeColor(l.type)}">
            <i class="ti ${typeIcon(l.type)}"></i> ${l.type}
          </span>
        </div>

        <div class="detail-tags">${tags}</div>

        <div class="detail-desc">${descHtml}</div>
      </div>
    </div>

    ${renderBottomNav()}
  </div>`;
}

// ── Shared components ──────────────────────────────────────────────────────
function renderLineupRow(l) {
  const map = getMapData(l.map);
  const saved = isSaved(l.id);
  return `
  <div class="lineup-row" data-action="openLineup" data-id="${l.id}">
    <div class="lineup-icon ${typeColor(l.type)}">
      <i class="ti ${typeIcon(l.type)}"></i>
    </div>
    <div class="lineup-info">
      <div class="lineup-name">${l.title}</div>
      <div class="lineup-meta">
        ${state.view === 'home' ? `<span class="meta-map">${map.thumbnail} ${map.name} ·</span> ` : ''}${l.from}
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
    { id: 'guides',  icon: 'ti-book',        label: 'Guides' },
    { id: 'saved',   icon: 'ti-star',         label: 'Saved' }
  ];
  return `<nav class="bottom-nav" role="navigation" aria-label="Main navigation">
    ${items.map(i => `
    <button class="nav-item ${state.activeNav === i.id ? 'active' : ''}" data-action="setNav" data-nav="${i.id}" aria-label="${i.label}">
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
}

function handleAction(e) {
  const el = e.currentTarget;
  const action = el.dataset.action;
  if (action === 'openMap') setState({ view: 'map', mapId: el.dataset.map, category: 'All', search: '' });
  else if (action === 'openLineup') setState({ view: 'detail', lineupId: parseInt(el.dataset.id), screenshotIndex: 0 });
  else if (action === 'goHome') setState({ view: 'home' });
  else if (action === 'goMap') setState({ view: 'map', screenshotIndex: 0 });
  else if (action === 'setCategory') setState({ category: el.dataset.cat });
  else if (action === 'toggleSave') { e.stopPropagation(); toggleSaved(parseInt(el.dataset.id)); }
  else if (action === 'setShot') setState({ screenshotIndex: parseInt(el.dataset.i) });
  else if (action === 'prevShot') setState({ screenshotIndex: Math.max(0, state.screenshotIndex - 1) });
  else if (action === 'nextShot') setState({ screenshotIndex: Math.min(99, state.screenshotIndex + 1) });
  else if (action === 'setNav') {
    if (el.dataset.nav === 'guides') setState({ activeNav: 'guides', view: 'home' });
    else if (el.dataset.nav === 'saved') setState({ activeNav: 'saved', view: 'home' });
    else setState({ activeNav: 'lineups', view: state.view === 'detail' ? state.view : 'home' });
  }
}

// ── Boot ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => render());
