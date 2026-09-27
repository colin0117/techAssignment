const fs = require('fs');
const path = require('path');

/**
 * Format milliseconds into human-readable string (e.g. "1.23s", "450ms")
 */
function formatDuration(ms) {
	if (!ms && ms !== 0) return '0ms';
	if (ms < 1000) return `${Math.round(ms)}ms`;
	const seconds = (ms / 1000).toFixed(2);
	if (seconds < 60) return `${seconds}s`;
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = (seconds % 60).toFixed(1);
	return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Escape HTML characters
 */
function escapeHtml(str) {
	if (!str) return '';
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * Generates the HTML report content
 */
function createHtmlReport(data) {
	const {
		stats,
		runs,
		cypressVersion,
		browserName,
		browserVersion,
		osName,
		osVersion,
		startedTestsAt,
		endedTestsAt,
		totalDuration,
		baseUrl
	} = data;

	const passRate = stats.totalTests > 0
		? Math.round((stats.totalPassed / stats.totalTests) * 100)
		: 0;

	const statusColor = stats.totalFailed > 0 ? '#ef4444' : '#10b981';
	const statusText = stats.totalFailed > 0 ? `${stats.totalFailed} Failed` : 'All Passed';

	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cypress Test Execution Report</title>
  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --card-border: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --pass: #10b981;
      --pass-bg: rgba(16, 185, 129, 0.12);
      --fail: #ef4444;
      --fail-bg: rgba(239, 68, 68, 0.12);
      --pending: #f59e0b;
      --pending-bg: rgba(245, 158, 11, 0.12);
      --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-family);
      line-height: 1.5;
      padding: 24px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--card-border);
      margin-bottom: 24px;
    }

    .title-group h1 {
      font-size: 26px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .title-badge {
      font-size: 13px;
      padding: 4px 10px;
      border-radius: 9999px;
      background: ${stats.totalFailed > 0 ? 'var(--fail-bg)' : 'var(--pass-bg)'};
      color: ${stats.totalFailed > 0 ? 'var(--fail)' : 'var(--pass)'};
      border: 1px solid ${stats.totalFailed > 0 ? 'var(--fail)' : 'var(--pass)'};
      font-weight: 600;
    }

    .title-group p {
      color: var(--text-muted);
      font-size: 14px;
      margin-top: 4px;
    }

    .header-links {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      background-color: var(--card-bg);
      color: var(--text);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-link:hover {
      background-color: #273549;
      border-color: var(--accent);
      color: var(--accent);
    }

    /* Meta Info Bar */
    .meta-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
      font-size: 13px;
    }

    .meta-chip {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      padding: 6px 12px;
      border-radius: 6px;
      color: var(--text-muted);
    }

    .meta-chip strong {
      color: var(--text);
    }

    /* Metrics Grid */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .metric-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .metric-label {
      font-size: 13px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    .metric-value {
      font-size: 32px;
      font-weight: 700;
    }

    .metric-card.passed .metric-value { color: var(--pass); }
    .metric-card.failed .metric-value { color: var(--fail); }
    .metric-card.pending .metric-value { color: var(--pending); }
    .metric-card.rate .metric-value { color: var(--accent); }

    .progress-bar-container {
      width: 100%;
      height: 8px;
      background: #334155;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 8px;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--pass) 0%, var(--accent) 100%);
      width: ${passRate}%;
    }

    /* Filter Toolbar */
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      padding: 12px 16px;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .filters {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-btn {
      background: transparent;
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .filter-btn.active, .filter-btn:hover {
      background: #334155;
      color: var(--text);
      border-color: var(--accent);
    }

    .search-input {
      background: #0f172a;
      border: 1px solid var(--card-border);
      color: var(--text);
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 13px;
      min-width: 240px;
      outline: none;
    }

    .search-input:focus {
      border-color: var(--accent);
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      background: transparent;
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
    }

    .action-btn:hover {
      color: var(--text);
      background: #334155;
    }

    /* Spec Cards */
    .spec-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      margin-bottom: 16px;
      overflow: hidden;
      transition: border-color 0.2s;
    }

    .spec-header {
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid transparent;
    }

    .spec-header:hover {
      background: rgba(255, 255, 255, 0.04);
    }

    .spec-card.expanded .spec-header {
      border-bottom-color: var(--card-border);
    }

    .spec-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .spec-icon {
      font-size: 16px;
      transition: transform 0.2s;
    }

    .spec-card.expanded .spec-icon {
      transform: rotate(90deg);
    }

    .spec-name {
      font-size: 15px;
      font-weight: 600;
      color: var(--text);
      font-family: monospace;
    }

    .spec-badges {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .badge {
      font-size: 12px;
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 600;
    }

    .badge-pass { background: var(--pass-bg); color: var(--pass); border: 1px solid rgba(16, 185, 129, 0.3); }
    .badge-fail { background: var(--fail-bg); color: var(--fail); border: 1px solid rgba(239, 68, 68, 0.3); }
    .badge-pending { background: var(--pending-bg); color: var(--pending); border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-duration { background: #334155; color: var(--text-muted); }

    /* Test List */
    .test-list {
      display: none;
      padding: 8px 0;
    }

    .spec-card.expanded .test-list {
      display: block;
    }

    .test-row {
      padding: 12px 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      border-bottom: 1px solid rgba(51, 65, 85, 0.5);
      transition: background 0.15s;
    }

    .test-row:last-child {
      border-bottom: none;
    }

    .test-row:hover {
      background: rgba(255, 255, 255, 0.02);
    }

    .test-main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .test-title-area {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    }

    .status-indicator {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .status-indicator.passed {
      background: var(--pass-bg);
      color: var(--pass);
      border: 1px solid var(--pass);
    }

    .status-indicator.failed {
      background: var(--fail-bg);
      color: var(--fail);
      border: 1px solid var(--fail);
    }

    .status-indicator.pending, .status-indicator.skipped {
      background: var(--pending-bg);
      color: var(--pending);
      border: 1px solid var(--pending);
    }

    .test-title {
      font-size: 14px;
      color: var(--text);
    }

    .test-suite {
      color: var(--text-muted);
      font-size: 13px;
      margin-right: 6px;
    }

    .test-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    .test-duration {
      font-size: 13px;
      color: var(--text-muted);
      font-family: monospace;
    }

    /* Error and details */
    .error-box {
      margin-top: 6px;
      padding: 12px 16px;
      background: rgba(239, 68, 68, 0.08);
      border-left: 4px solid var(--fail);
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      color: #fca5a5;
      white-space: pre-wrap;
      word-break: break-all;
    }

    .screenshot-thumb {
      margin-top: 8px;
    }

    .screenshot-thumb img {
      max-width: 320px;
      border-radius: 6px;
      border: 1px solid var(--card-border);
      cursor: pointer;
      transition: transform 0.2s;
    }

    .screenshot-thumb img:hover {
      transform: scale(1.02);
    }

    /* Lightbox Modal */
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.85);
      justify-content: center;
      align-items: center;
    }

    .modal img {
      max-width: 90%;
      max-height: 90%;
      border-radius: 8px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }

    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid var(--card-border);
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <div class="title-group">
        <h1>
          Cypress Test Execution Report
          <span class="title-badge">${statusText}</span>
        </h1>
        <p>Comprehensive report of executed end-to-end and BDD feature scenarios</p>
      </div>
      <div class="header-links">
        <a href="cucumber-report.html" class="btn-link" target="_blank" title="View BDD Cucumber HTML Report">
          🥒 Cucumber BDD Report
        </a>
        <a href="test-results.json" class="btn-link" target="_blank" title="View Raw JSON Results">
          📄 Raw JSON Results
        </a>
      </div>
    </header>

    <!-- Metadata Bar -->
    <div class="meta-bar">
      <div class="meta-chip">📅 Date: <strong>${new Date(startedTestsAt || Date.now()).toLocaleString()}</strong></div>
      <div class="meta-chip">⏱️ Total Duration: <strong>${formatDuration(totalDuration)}</strong></div>
      <div class="meta-chip">🌐 Browser: <strong>${escapeHtml(browserName)} ${escapeHtml(browserVersion)}</strong></div>
      <div class="meta-chip">🌲 Cypress: <strong>v${escapeHtml(cypressVersion)}</strong></div>
      <div class="meta-chip">💻 OS: <strong>${escapeHtml(osName)} ${escapeHtml(osVersion)}</strong></div>
      ${baseUrl ? `<div class="meta-chip">🎯 Target URL: <strong>${escapeHtml(baseUrl)}</strong></div>` : ''}
    </div>

    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <div class="metric-card">
        <span class="metric-label">Total Tests</span>
        <span class="metric-value">${stats.totalTests}</span>
      </div>
      <div class="metric-card passed">
        <span class="metric-label">Passed</span>
        <span class="metric-value">${stats.totalPassed}</span>
      </div>
      <div class="metric-card failed">
        <span class="metric-label">Failed</span>
        <span class="metric-value">${stats.totalFailed}</span>
      </div>
      <div class="metric-card pending">
        <span class="metric-label">Skipped / Pending</span>
        <span class="metric-value">${stats.totalPending + stats.totalSkipped}</span>
      </div>
      <div class="metric-card rate">
        <span class="metric-label">Pass Rate</span>
        <span class="metric-value">${passRate}%</span>
        <div class="progress-bar-container">
          <div class="progress-bar-fill"></div>
        </div>
      </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="toolbar">
      <div class="filters">
        <button class="filter-btn active" data-filter="all">All (${stats.totalTests})</button>
        <button class="filter-btn" data-filter="passed">Passed (${stats.totalPassed})</button>
        <button class="filter-btn" data-filter="failed">Failed (${stats.totalFailed})</button>
        <button class="filter-btn" data-filter="skipped">Skipped (${stats.totalPending + stats.totalSkipped})</button>
      </div>
      <input type="text" id="searchInput" class="search-input" placeholder="Search tests or specs...">
      <div class="actions">
        <button id="expandAllBtn" class="action-btn">Expand All</button>
        <button id="collapseAllBtn" class="action-btn">Collapse All</button>
      </div>
    </div>

    <!-- Specs List -->
    <div id="specsContainer">
      ${runs.map((run, runIndex) => {
				const specRelative = run.spec.relative || run.spec.name;
				const specStats = run.stats;
				const isSpecPassing = specStats.failures === 0;

				return `
        <div class="spec-card expanded" data-spec-path="${escapeHtml(specRelative)}">
          <div class="spec-header" onclick="toggleSpec(this)">
            <div class="spec-title-group">
              <span class="spec-icon">▶</span>
              <span class="spec-name">${escapeHtml(specRelative)}</span>
            </div>
            <div class="spec-badges">
              <span class="badge ${isSpecPassing ? 'badge-pass' : 'badge-fail'}">
                ${specStats.passes}/${specStats.tests} Passed
              </span>
              ${specStats.failures > 0 ? `<span class="badge badge-fail">${specStats.failures} Failed</span>` : ''}
              ${specStats.pending > 0 ? `<span class="badge badge-pending">${specStats.pending} Pending</span>` : ''}
              <span class="badge badge-duration">${formatDuration(specStats.duration || specStats.wallClockDuration)}</span>
            </div>
          </div>
          <div class="test-list">
            ${(run.tests || []).map((test) => {
					const state = test.state || (test.displayError ? 'failed' : 'passed');
					const testTitle = Array.isArray(test.title) ? test.title.join(' › ') : test.title;
					const durationText = formatDuration(test.duration);
					const isPass = state === 'passed';
					const isFail = state === 'failed';
					const isPending = state === 'pending' || state === 'skipped';
					const indicatorSymbol = isPass ? '✓' : isFail ? '✕' : '○';

					// Check for screenshot matching this test
					const screenshot = (run.screenshots || []).find((s) => s.path && s.path.includes(test.title[test.title.length - 1]));

					return `
              <div class="test-row" data-state="${state}" data-search="${escapeHtml(testTitle.toLowerCase())} ${escapeHtml(specRelative.toLowerCase())}">
                <div class="test-main">
                  <div class="test-title-area">
                    <span class="status-indicator ${state}">${indicatorSymbol}</span>
                    <span class="test-title">${escapeHtml(testTitle)}</span>
                  </div>
                  <div class="test-meta">
                    <span class="badge ${isPass ? 'badge-pass' : isFail ? 'badge-fail' : 'badge-pending'}">${state.toUpperCase()}</span>
                    <span class="test-duration">${durationText}</span>
                  </div>
                </div>
                ${test.displayError ? `<div class="error-box">${escapeHtml(test.displayError)}</div>` : ''}
                ${screenshot ? `
                  <div class="screenshot-thumb">
                    <img src="${escapeHtml(path.relative(path.resolve('cypress/reports'), screenshot.path))}" alt="Failure Screenshot" onclick="openModal(this.src)">
                  </div>
                ` : ''}
              </div>
            `;
				}).join('')}
          </div>
        </div>
      `;
			}).join('')}
    </div>

    <!-- Footer -->
    <footer class="footer">
      Generated automatically at the end of the test run by Cypress Test Reporter &bull; SauceDemo Automation Suite
    </footer>
  </div>

  <!-- Screenshot Modal -->
  <div id="imageModal" class="modal" onclick="closeModal()">
    <img id="modalImg" src="" alt="Zoomed Screenshot">
  </div>

  <script>
    function toggleSpec(header) {
      const card = header.closest('.spec-card');
      card.classList.toggle('expanded');
    }

    function openModal(src) {
      const modal = document.getElementById('imageModal');
      const img = document.getElementById('modalImg');
      img.src = src;
      modal.style.display = 'flex';
    }

    function closeModal() {
      document.getElementById('imageModal').style.display = 'none';
    }

    // Filter by status
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        applyFilters();
      });
    });

    // Search filter
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      applyFilters();
    });

    function applyFilters() {
      const query = searchInput.value.toLowerCase().trim();
      const specCards = document.querySelectorAll('.spec-card');

      specCards.forEach(card => {
        let visibleInSpec = 0;
        const testRows = card.querySelectorAll('.test-row');

        testRows.forEach(row => {
          const state = row.dataset.state;
          const searchContent = row.dataset.search;

          const matchesFilter = currentFilter === 'all' || 
            (currentFilter === 'passed' && state === 'passed') ||
            (currentFilter === 'failed' && state === 'failed') ||
            (currentFilter === 'skipped' && (state === 'pending' || state === 'skipped'));

          const matchesQuery = !query || searchContent.includes(query);

          if (matchesFilter && matchesQuery) {
            row.style.display = 'flex';
            visibleInSpec++;
          } else {
            row.style.display = 'none';
          }
        });

        // Hide spec card if no tests match
        card.style.display = visibleInSpec > 0 ? 'block' : 'none';
      });
    }

    // Expand / Collapse all
    document.getElementById('expandAllBtn').addEventListener('click', () => {
      document.querySelectorAll('.spec-card').forEach(c => c.classList.add('expanded'));
    });

    document.getElementById('collapseAllBtn').addEventListener('click', () => {
      document.querySelectorAll('.spec-card').forEach(c => c.classList.remove('expanded'));
    });
  </script>
</body>
</html>`;
}

/**
 * Print console summary table
 */
function printConsoleSummary(data, htmlReportPath) {
	const { stats, runs, totalDuration } = data;

	console.log('\n');
	console.log('================================================================================');
	console.log('                           TEST EXECUTION SUMMARY                               ');
	console.log('================================================================================');

	const colSpec = 44;
	const colTests = 8;
	const colPass = 8;
	const colFail = 8;
	const colTime = 10;

	const pad = (str, len) => String(str).padEnd(len);
	const padL = (str, len) => String(str).padStart(len);

	console.log(
		pad('  Spec', colSpec) +
		padL('Tests', colTests) +
		padL('Passing', colPass) +
		padL('Failing', colFail) +
		padL('Duration', colTime)
	);
	console.log('  ' + '─'.repeat(colSpec + colTests + colPass + colFail + colTime - 2));

	runs.forEach(run => {
		const specName = run.spec.relative || run.spec.name;
		const s = run.stats;
		const statusIcon = s.failures > 0 ? '✖' : '✔';
		const line =
			`  ${statusIcon} ${pad(specName.length > colSpec - 4 ? '...' + specName.slice(-(colSpec - 7)) : specName, colSpec - 4)}` +
			padL(s.tests, colTests) +
			padL(s.passes, colPass) +
			padL(s.failures > 0 ? s.failures : '-', colFail) +
			padL(formatDuration(s.duration || s.wallClockDuration), colTime);
		console.log(line);
	});

	console.log('  ' + '─'.repeat(colSpec + colTests + colPass + colFail + colTime - 2));
	const totalLine =
		`  Total (${runs.length} specs)` +
		' '.repeat(Math.max(0, colSpec - 16)) +
		padL(stats.totalTests, colTests) +
		padL(stats.totalPassed, colPass) +
		padL(stats.totalFailed > 0 ? stats.totalFailed : '-', colFail) +
		padL(formatDuration(totalDuration), colTime);
	console.log(totalLine);

	console.log('================================================================================');
	console.log(`  Report Generated: file://${path.resolve(htmlReportPath)}`);
	console.log('================================================================================\n');
}

/**
 * Main report generator invoked in after:run
 */
async function generateReport(results, config) {
	if (!results) {
		console.log('No test results received to generate report.');
		return;
	}

	const reportsDir = path.resolve(config.projectRoot || process.cwd(), 'cypress/reports');
	if (!fs.existsSync(reportsDir)) {
		fs.mkdirSync(reportsDir, { recursive: true });
	}

	// Format data
	const stats = {
		totalTests: results.totalTests || 0,
		totalPassed: results.totalPassed || 0,
		totalFailed: results.totalFailed || 0,
		totalPending: results.totalPending || 0,
		totalSkipped: results.totalSkipped || 0,
		totalSuites: results.totalSuites || 0,
	};

	const reportData = {
		stats,
		cypressVersion: results.cypressVersion || '14.5.3',
		browserName: results.browserName || 'Electron',
		browserVersion: results.browserVersion || '',
		osName: results.osName || process.platform,
		osVersion: results.osVersion || '',
		startedTestsAt: results.startedTestsAt || new Date().toISOString(),
		endedTestsAt: results.endedTestsAt || new Date().toISOString(),
		totalDuration: results.totalDuration || 0,
		baseUrl: config.baseUrl || '',
		runs: results.runs || []
	};

	// 1. Write JSON report
	const jsonReportPath = path.join(reportsDir, 'test-results.json');
	fs.writeFileSync(jsonReportPath, JSON.stringify(reportData, null, 2), 'utf8');

	// 2. Write HTML report
	const htmlReportPath = path.join(reportsDir, 'index.html');
	const htmlContent = createHtmlReport(reportData);
	fs.writeFileSync(htmlReportPath, htmlContent, 'utf8');

	// 3. Print terminal summary
	printConsoleSummary(reportData, htmlReportPath);
}

module.exports = {
	generateReport,
	createHtmlReport,
	formatDuration
};
