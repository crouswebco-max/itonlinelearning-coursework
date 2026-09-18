// A little real functionality behind the Google-Maps-style shell:
// the search box, the result list and the zoom buttons all genuinely
// change what the embedded map shows, by rewriting its src URL.

const mapFrame = document.getElementById('mapFrame');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultList = document.getElementById('resultList');
const resultCount = document.getElementById('resultCount');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');

const DEFAULT_QUERY = 'coffee shops near Covent Garden, London';
const DEFAULT_ZOOM = 15;
let currentZoom = DEFAULT_ZOOM;
// The full, location-qualified query behind the current map view. Kept
// separately from the search box's text, because after clicking a result
// the box shows just its short name ("Neal Street Espresso") — zooming
// from there needs the full query ("...Covent Garden, London") too, or
// the map could re-search a same-named place somewhere else entirely.
let currentQuery = DEFAULT_QUERY;

function loadMap(query, zoom) {
  currentQuery = query;
  currentZoom = Math.min(20, Math.max(3, zoom));
  const url = 'https://www.google.com/maps?q=' + encodeURIComponent(query) + '&z=' + currentZoom + '&output=embed';
  mapFrame.src = url;
}

// Search: typing a new place and submitting searches that instead
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;
  resultCount.textContent = 'Results for "' + query + '"';
  clearActiveResult();
  loadMap(query, DEFAULT_ZOOM);
});

// Clicking a result searches for that specific place, and zooms in closer
resultList.addEventListener('click', (event) => {
  const item = event.target.closest('.result');
  if (!item) return;
  selectResult(item);
});

resultList.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const item = event.target.closest('.result');
  if (!item) return;
  event.preventDefault();
  selectResult(item);
});

function selectResult(item) {
  clearActiveResult();
  item.classList.add('active');
  searchInput.value = item.querySelector('.result-name').textContent;
  loadMap(item.dataset.query, 17);
}

function clearActiveResult() {
  const active = resultList.querySelector('.result.active');
  if (active) active.classList.remove('active');
}

// Zoom controls actually change the map's zoom level
document.getElementById('zoomIn').addEventListener('click', () => {
  loadMap(currentQuery, currentZoom + 1);
});

document.getElementById('zoomOut').addEventListener('click', () => {
  loadMap(currentQuery, currentZoom - 1);
});

// Recenter: back to the original search and zoom level
document.getElementById('recenterBtn').addEventListener('click', () => {
  searchInput.value = DEFAULT_QUERY;
  resultCount.textContent = 'Coffee shops near Covent Garden';
  clearActiveResult();
  loadMap(DEFAULT_QUERY, DEFAULT_ZOOM);
});

// Hamburger button: show/hide the sidebar (mainly useful on phones,
// where the sidebar overlays the map instead of sharing the width)
menuToggle.addEventListener('click', () => {
  const isCollapsed = sidebar.classList.toggle('collapsed');
  menuToggle.setAttribute('aria-expanded', String(!isCollapsed));
});
