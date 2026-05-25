/* ═══════════════════════════════════════════════════
   LONG HOA VĨ × KAIQIU — Interactive E-Commerce v2
   Search, Filter, Catalog Browser, Product Database
   ═══════════════════════════════════════════════════ */

// ═══ PRODUCT DATABASE ═══
const PRODUCTS = [
    { id:'dth-hammer', cat:'Búa Khoan', title:'Búa Khoan Ngầm DTH', img:'product_images/page_03.png', badge:'Chủ lực',
      desc:'Búa khoan áp lực cao/trung/thấp: DHD, COP, QL, SD, Mission, CIR. Đường kính 3"–12". Phục vụ khai mỏ, khoan giếng, xây dựng.',
      specs:['7–25 bar','55–260mm','4.5–210 kg'], pressure:['low','medium','high'], apps:['mining','well','construction','exploration'],
      images:['product_images/page_03.png','product_images/page_05.png','product_images/page_07.png','product_images/page_09.png'],
      models:'CIR68/70/80/90/110, DHD340/340A/350/360/380, SD5/6/8/10/12, QL40/50/60/80, COP44/54/64, BR1/2/3',
      detail:'Búa khoan ngầm DTH hoạt động bằng khí nén, búa đặt ngay trên mũi khoan tại đáy hố. Truyền năng lượng trực tiếp vào đá, giảm hao tổn, tăng tốc độ khoan.\n\n• Áp thấp (CIR): 7–17 bar — khoan giếng, khoan nông\n• Áp trung bình (BR/Mission): 10–21 bar — xây dựng, neo đất\n• Áp cao (DHD/SD/QL/COP): 17–25 bar — khai mỏ, khoan sâu',
      specDetail:[{l:'Dải áp suất',v:'7–25 bar'},{l:'ĐK ngoài',v:'55–260mm'},{l:'ĐK lỗ khoan',v:'58–381mm'},{l:'Kết nối ren',v:'CIR / API 2⅜"–6" / Remet / Metzke'},{l:'Trọng lượng',v:'4.5–210 kg'},{l:'Dòng sản phẩm',v:'CIR, DHD, SD, QL, COP, Mission, BR'}] },

    { id:'dth-bit', cat:'Mũi Khoan', title:'Mũi Khoan Ngầm DTH', img:'product_images/page_35.png', badge:'Đa dạng',
      desc:'Mũi khoan áp lực thấp/trung/cao. Mặt phẳng & lồi. Nút hợp kim cacbua vonfram chống mài mòn.',
      specs:['50–400mm','4–16 rãnh xả','WC buttons'], pressure:['low','medium','high'], apps:['mining','well','construction'],
      images:['product_images/page_35.png','product_images/page_36.png','product_images/page_37.png','product_images/page_39.png'],
      models:'CIR50/60/65/70/80/90/110/150/170, BR1/2/3, COP/DHD, QL40–80, SD5–12',
      detail:'Mũi khoan DTH gắn nút hợp kim cacbua vonfram (tungsten carbide) với độ cứng và khả năng chống mài mòn cao.\n\n• Áp thấp (CIR): ĐK 50–400mm\n• Áp trung bình (BR): ĐK 64–105mm\n• Áp cao (COP/DHD/QL/SD): ĐK 105–381mm\n\nMặt phẳng (flat face) hoặc mặt lồi (convex face) tùy loại đá.',
      specDetail:[{l:'Đường kính',v:'50–400mm'},{l:'Loại mặt',v:'Phẳng / Lồi'},{l:'Nút hợp kim',v:'Cacbua vonfram (WC)'},{l:'Kích thước nút',v:'φ8–φ22mm'},{l:'Số rãnh xả phoi',v:'4–16 rãnh'}] },

    { id:'drill-pipe', cat:'Phụ Kiện', title:'Cần Khoan DTH', img:'product_images/page_47.png', badge:'',
      desc:'Cần khoan ren API chuẩn quốc tế, chiều dài 1–6m. Thép hợp kim chịu mài mòn. Ren REG/IF.',
      specs:['API 2⅜"–4½"','1–6m dài','5.8–15.2 kg/m'], pressure:['low','medium','high'], apps:['mining','well','construction','exploration'],
      images:['product_images/page_47.png','product_images/page_48.png','product_images/page_49.png'],
      models:'API 2⅜" REG/IF, API 3½" REG/IF, API 4½" REG, Remet 3.5"–5", Metzke 4"–5"',
      detail:'Cần khoan DTH truyền lực xoay và khí nén từ máy khoan đến búa khoan tại đáy hố.\n\n• Ren API REG (Regular) và IF (Internal Flush)\n• Chiều dài: 1000–6000mm\n• Thép hợp kim, xử lý nhiệt toàn bộ\n• Mặt khóa (wrench flat) tháo lắp dễ dàng',
      specDetail:[{l:'Loại ren',v:'API REG / API IF / Remet / Metzke'},{l:'ĐK ngoài',v:'57–114mm'},{l:'ĐK trong',v:'38–76mm'},{l:'Chiều dài',v:'1000–6000mm'},{l:'Vật liệu',v:'Thép hợp kim tôi nhiệt'}] },

    { id:'rc-hammer', cat:'Búa Khoan', title:'Búa Tuần Hoàn Ngược RC', img:'product_images/page_31.png', badge:'Chuyên dụng',
      desc:'Khoan lấy mẫu tuần hoàn ngược cho thăm dò địa chất. RE004, RE542, RE543, RE545, PR52, PR54R.',
      specs:['4"–5.5"','200–500 PSI','52–81 kg'], pressure:['high'], apps:['exploration'],
      images:['product_images/page_31.png','product_images/page_32.png','product_images/page_33.png'],
      models:'RE 004, RE 542, RE 543, RE 545, PR 52, PR 54R',
      detail:'Búa RC thu hồi mẫu qua ống trong bằng luồng khí nén ngược chiều, đảm bảo mẫu không bị nhiễm bẩn.\n\n• Mẫu khoan sạch, đại diện chính xác\n• Thu hồi liên tục, không cần dừng khoan\n• Phù hợp thăm dò sâu hàng trăm mét',
      specDetail:[{l:'Kích thước',v:'4"–5.5"'},{l:'Chiều dài',v:'1191–1294mm'},{l:'Trọng lượng',v:'52–81 kg'},{l:'Áp suất khí',v:'200–500 PSI'},{l:'Ren',v:'Remet / Metzke'}] },

    { id:'casing-tool', cat:'Phụ Kiện', title:'Dụng Cụ Khoan Ống Chống', img:'product_images/page_40.png', badge:'',
      desc:'Khoan đồng tâm/lệch tâm kèm ống chống. Giải pháp cho địa tầng yếu, sạt lở.',
      specs:['Đồng tâm/Lệch tâm','89–324mm','DHD3.5–112'], pressure:['high'], apps:['well','construction'],
      images:['product_images/page_40.png','product_images/page_41.png','product_images/page_42.png'],
      models:'Đồng tâm DHD3.5/DHD340, Lệch tâm (ODEX) DHD350/360, Ring Bit + Casing Shoe',
      detail:'Khoan và lắp ống chống đồng thời. Đồng tâm (concentric) hoặc lệch tâm (eccentric/ODEX).\n\nPhụ kiện: ống chống, đế ống (casing shoe), vòng định vị (ring bit), khóa định vị.',
      specDetail:[{l:'Kiểu hệ thống',v:'Đồng tâm / Lệch tâm (ODEX)'},{l:'Tương thích búa',v:'DHD3.5–DHD112'},{l:'ĐK ống',v:'89–324mm'},{l:'Ứng dụng',v:'Đất yếu, cát chảy, sạt lở'}] },

    { id:'adapter', cat:'Phụ Kiện', title:'Đầu Nối Chuyển Đổi', img:'product_images/page_50.png', badge:'',
      desc:'Đầu nối ren API: Box-Pin, Box-Box, Pin-Pin. Tương thích đa dạng thiết bị.',
      specs:['2⅜"–4½" API','3 loại nối','CNC chính xác'], pressure:['low','medium','high'], apps:['mining','well','construction','exploration'],
      images:['product_images/page_50.png','product_images/page_51.png'],
      models:'Box–Pin, Box–Box, Pin–Pin: 2⅜"×2⅜", 2⅜"×3½", 3½"×3½", 3½"×4½", API REG↔IF, API↔Remet/Metzke',
      detail:'Đầu nối chuyển đổi kết nối giữa các thiết bị có kích thước ren khác nhau.\n\n• Box–Pin (Trong–Ngoài): Phổ biến nhất\n• Box–Box (Trong–Trong): Nối 2 cần cùng ren ngoài\n• Pin–Pin (Ngoài–Ngoài): Nối 2 cần cùng ren trong\n\nGia công CNC, thép hợp kim, ren API chuẩn.',
      specDetail:[{l:'Loại',v:'Box-Pin / Box-Box / Pin-Pin'},{l:'Ren',v:'2⅜"–4½" API REG/IF'},{l:'Vật liệu',v:'Thép hợp kim CNC'},{l:'Mặt khóa',v:'65–120mm'}] },

    { id:'tapered-tool', cat:'Mũi Khoan', title:'Dụng Cụ Khoan Côn', img:'product_images/page_55.png', badge:'',
      desc:'Mũi khoan côn 7°/11°/12° chữ thập và nút. Cần khoan côn H22 thép tôi thấm cacbon.',
      specs:['7°/11°/12°','28–45mm','610–8000mm'], pressure:['low','medium'], apps:['construction'],
      images:['product_images/page_53.png','product_images/page_54.png','product_images/page_55.png'],
      models:'Mũi côn 7°/11°/12° chữ thập 28–40mm, Mũi côn nút 34–45mm, Cần H22: 610–8000mm',
      detail:'Dụng cụ khoan côn cho lỗ nhỏ (dưới 50mm) trong xây dựng, khai thác đá khối, neo đất.\n\n• Mũi khoan côn: chữ thập (cross) hoặc nút (button)\n• Cần khoan côn H22: thân lục giác 22mm\n• Ưu điểm: nhẹ, tháo lắp nhanh, phù hợp máy cầm tay',
      specDetail:[{l:'Góc côn',v:'7° / 11° / 12°'},{l:'Loại mũi',v:'Chữ thập / Nút'},{l:'ĐK mũi',v:'28–45mm'},{l:'Cần khoan',v:'H22, 610–8000mm'},{l:'Vật liệu',v:'Thép tôi thấm cacbon'}] }
];

// ═══ CATALOG TOC ═══
const CATALOG_TOC = [
    {label:'Bìa & Giới thiệu',pages:[1,2]},
    {label:'Búa DTH áp thấp CIR',pages:[3,4,5,6]},
    {label:'Búa DTH áp cao DHD',pages:[7,8,9,10,11,12]},
    {label:'Búa DTH SD Series',pages:[13,14,15,16,17,18]},
    {label:'Búa DTH QL Series',pages:[19,20,21,22]},
    {label:'Búa DTH COP/Mission',pages:[23,24,25,26,27,28]},
    {label:'Búa DTH áp trung BR',pages:[29,30]},
    {label:'Búa RC tuần hoàn ngược',pages:[31,32,33,34]},
    {label:'Mũi khoan DTH',pages:[35,36,37,38,39]},
    {label:'Dụng cụ ống chống',pages:[40,41,42,43,44,45,46]},
    {label:'Cần khoan DTH',pages:[47,48,49]},
    {label:'Đầu nối chuyển đổi',pages:[50,51,52]},
    {label:'Dụng cụ khoan côn',pages:[53,54,55]},
];
let currentPage = 1;
const TOTAL_PAGES = 55;

// ═══ SEARCH INDEX ═══
const SEARCH_INDEX = [];
PRODUCTS.forEach(p => {
    SEARCH_INDEX.push({type:'product',id:p.id,title:p.title,cat:p.cat,keywords:`${p.title} ${p.models} ${p.desc} ${p.cat}`});
});
// Add individual models
const MODEL_ENTRIES = [
    {model:'CIR68',cat:'Búa DTH',link:'dth-hammer'},{model:'CIR70',cat:'Búa DTH',link:'dth-hammer'},{model:'CIR80',cat:'Búa DTH',link:'dth-hammer'},
    {model:'CIR90',cat:'Búa DTH',link:'dth-hammer'},{model:'CIR110',cat:'Búa DTH',link:'dth-hammer'},
    {model:'DHD340',cat:'Búa DTH',link:'dth-hammer'},{model:'DHD340A',cat:'Búa DTH',link:'dth-hammer'},
    {model:'DHD350',cat:'Búa DTH',link:'dth-hammer'},{model:'DHD360',cat:'Búa DTH',link:'dth-hammer'},{model:'DHD380',cat:'Búa DTH',link:'dth-hammer'},
    {model:'SD5',cat:'Búa DTH',link:'dth-hammer'},{model:'SD6',cat:'Búa DTH',link:'dth-hammer'},{model:'SD8',cat:'Búa DTH',link:'dth-hammer'},
    {model:'SD10',cat:'Búa DTH',link:'dth-hammer'},{model:'SD12',cat:'Búa DTH',link:'dth-hammer'},
    {model:'QL40',cat:'Búa DTH',link:'dth-hammer'},{model:'QL50',cat:'Búa DTH',link:'dth-hammer'},
    {model:'QL60',cat:'Búa DTH',link:'dth-hammer'},{model:'QL80',cat:'Búa DTH',link:'dth-hammer'},
    {model:'RE 004',cat:'Búa RC',link:'rc-hammer'},{model:'RE 542',cat:'Búa RC',link:'rc-hammer'},
    {model:'RE 543',cat:'Búa RC',link:'rc-hammer'},{model:'RE 545',cat:'Búa RC',link:'rc-hammer'},
    {model:'PR 52',cat:'Búa RC',link:'rc-hammer'},{model:'PR 54R',cat:'Búa RC',link:'rc-hammer'},
    {model:'BR1',cat:'Mũi khoan',link:'dth-bit'},{model:'BR2',cat:'Mũi khoan',link:'dth-bit'},{model:'BR3',cat:'Mũi khoan',link:'dth-bit'},
];
MODEL_ENTRIES.forEach(m => {
    SEARCH_INDEX.push({type:'model',id:m.link,title:m.model,cat:m.cat,keywords:`${m.model} ${m.cat}`});
});

// ═══ RENDER PRODUCT CARDS ═══
function renderProductGrid() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = PRODUCTS.map(p => `
        <div class="product-card" data-id="${p.id}" data-pressure="${p.pressure.join(',')}" data-apps="${p.apps.join(',')}" onclick="showProductDetail('${p.id}')">
            <div class="card-image">
                <img src="${p.img}" alt="${p.title}" loading="lazy">
                <div class="card-overlay">${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}</div>
            </div>
            <div class="card-content">
                <div class="card-cat">${p.cat}</div>
                <h3 class="card-title">${p.title}</h3>
                <p class="card-desc">${p.desc}</p>
                <div class="card-specs">${p.specs.map(s => `<span>${s}</span>`).join('')}</div>
                <div class="card-footer">
                    <div class="card-action">Xem chi tiết →</div>
                    <button class="card-quote" onclick="event.stopPropagation();quickQuote('${p.title}')">Báo giá</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ═══ FILTER PRODUCTS ═══
let currentCategory = 'all';
function filterByCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('#category-filters .chip').forEach(c => c.classList.toggle('active', c.dataset.filter === cat));
    applyFilters();
}

function applyFilters() {
    const pressure = document.getElementById('pressure-filter').value;
    const app = document.getElementById('app-filter').value;
    const cards = document.querySelectorAll('.product-card');
    let count = 0;
    cards.forEach(card => {
        const id = card.dataset.id;
        const p = card.dataset.pressure;
        const a = card.dataset.apps;
        let show = true;
        if (currentCategory !== 'all' && id !== currentCategory) show = false;
        if (pressure !== 'all' && !p.includes(pressure)) show = false;
        if (app !== 'all' && !a.includes(app)) show = false;
        card.classList.toggle('hidden', !show);
        if (show) count++;
    });
    document.getElementById('result-count').textContent = count;
}

function filterProducts(cat) {
    document.getElementById('products').scrollIntoView({behavior:'smooth'});
    setTimeout(() => filterByCategory(cat), 300);
}

// ═══ SEARCH ═══
const globalSearch = document.getElementById('global-search');
const searchDropdown = document.getElementById('search-dropdown');

function performSearch(query) {
    if (!query || query.length < 2) { searchDropdown.classList.remove('open'); return; }
    const q = query.toLowerCase();
    const results = SEARCH_INDEX.filter(item => item.keywords.toLowerCase().includes(q)).slice(0, 8);
    if (results.length === 0) {
        searchDropdown.innerHTML = '<div class="search-no-result">Không tìm thấy sản phẩm. Thử tìm: DHD340, CIR, SD6, mũi khoan, cần khoan...</div>';
    } else {
        searchDropdown.innerHTML = results.map(r => `
            <div class="search-result" onclick="handleSearchClick('${r.id}','${r.type}')">
                <div class="search-result-icon">${r.type === 'model' ? '⚙' : '📦'}</div>
                <div class="search-result-text"><strong>${r.title}</strong><span>${r.cat}</span></div>
            </div>
        `).join('');
    }
    searchDropdown.classList.add('open');
}

function handleSearchClick(id, type) {
    searchDropdown.classList.remove('open');
    globalSearch.value = '';
    document.getElementById('products').scrollIntoView({behavior:'smooth'});
    setTimeout(() => { filterByCategory(id); showProductDetail(id); }, 300);
}

globalSearch?.addEventListener('input', e => performSearch(e.target.value));
globalSearch?.addEventListener('focus', e => { if (e.target.value.length >= 2) performSearch(e.target.value); });
document.addEventListener('click', e => { if (!e.target.closest('.search-wrap')) searchDropdown.classList.remove('open'); });

// Ctrl+K shortcut
document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        globalSearch?.focus();
    }
    if (e.key === 'Escape') searchDropdown.classList.remove('open');
});

// Hero search
function executeHeroSearch() {
    const input = document.getElementById('hero-search-input');
    const q = input.value.trim();
    if (!q) return;
    globalSearch.value = q;
    document.getElementById('products').scrollIntoView({behavior:'smooth'});
    setTimeout(() => performSearch(q), 300);
}
function quickSearch(term) {
    document.getElementById('hero-search-input').value = term;
    executeHeroSearch();
}
document.getElementById('hero-search-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') executeHeroSearch();
});

// Mobile search toggle
document.getElementById('nav-search-btn')?.addEventListener('click', () => {
    const wrap = document.getElementById('search-wrap');
    wrap.style.display = wrap.style.display === 'block' ? 'none' : 'block';
    wrap.style.position = 'absolute';
    wrap.style.top = '100%';
    wrap.style.left = '0';
    wrap.style.right = '0';
    wrap.style.padding = '8px 16px';
    wrap.style.background = 'var(--glass)';
    wrap.style.maxWidth = '100%';
    wrap.style.zIndex = '100';
    if (wrap.style.display === 'block') document.getElementById('global-search').focus();
});

// ═══ PRODUCT MODAL ═══
function showProductDetail(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('modal-body');
    const imgsHTML = p.images.map(i => `<img src="${i}" alt="${p.title}" loading="lazy">`).join('');
    const specsHTML = p.specDetail.map(s => `<div class="info-row"><span>${s.l}</span><strong>${s.v}</strong></div>`).join('');
    const detailHTML = p.detail.replace(/\n/g,'<br>').replace(/•/g,'<span style="color:var(--accent)">•</span>');
    body.innerHTML = `
        <h2>${p.title}</h2>
        <p class="modal-subtitle">${p.cat} — ${p.desc}</p>
        <div class="modal-images">${imgsHTML}</div>
        <div class="modal-desc">${detailHTML}</div>
        <div style="margin-bottom:20px"><h3 style="font-size:15px;font-weight:700;color:var(--accent);margin-bottom:10px">Thông Số Kỹ Thuật</h3>${specsHTML}</div>
        <div style="margin-bottom:20px"><h3 style="font-size:15px;font-weight:700;color:var(--accent);margin-bottom:10px">Models Có Sẵn</h3><p style="font-size:13px;color:var(--text2);line-height:1.7;font-family:'JetBrains Mono',monospace">${p.models}</p></div>
        <div class="modal-cta">
            <button class="btn btn-primary" onclick="quickQuote('${p.title}');closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Yêu cầu báo giá</button>
            <a href="tel:0385195501" class="btn" style="background:var(--bg4);color:var(--text);border:1px solid var(--border)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3"/></svg>Gọi ngay</a>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() { document.getElementById('product-modal').classList.remove('active'); document.body.style.overflow = ''; }
document.getElementById('product-modal')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ═══ QUICK QUOTE ═══
function quickQuote(product) {
    const input = document.getElementById('cf-product');
    if (input) input.value = product;
    document.getElementById('contact').scrollIntoView({behavior:'smooth'});
}

// ═══ CATALOG BROWSER ═══
function renderCatalogTOC() {
    const toc = document.getElementById('catalog-toc');
    if (!toc) return;
    toc.innerHTML = CATALOG_TOC.map(section =>
        `<a href="#" class="${section.pages.includes(currentPage)?'active':''}" onclick="goToCatalogPage(${section.pages[0]});return false">${section.label}</a>`
    ).join('');
}
function goToCatalogPage(page) { currentPage = page; updateCatalogView(); }
function changeCatalogPage(delta) {
    currentPage = Math.max(1, Math.min(TOTAL_PAGES, currentPage + delta));
    updateCatalogView();
}
function updateCatalogView() {
    const img = document.getElementById('catalog-image');
    const indicator = document.getElementById('page-indicator');
    if (img) img.src = `product_images/page_${String(currentPage).padStart(2,'0')}.png`;
    if (indicator) indicator.textContent = `Trang ${currentPage} / ${TOTAL_PAGES}`;
    renderCatalogTOC();
}

// ═══ SPEC TABLE FILTER ═══
function filterSpecTable() {
    const q = document.getElementById('spec-search').value.toLowerCase();
    document.querySelectorAll('.spec-table tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.classList.toggle('hidden-row', q.length >= 2 && !text.includes(q));
    });
}

// ═══ CATALOG TABS ═══
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.catalog-table-wrap').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// ═══ NAV ═══
const nav = document.getElementById('main-nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    document.getElementById('back-to-top')?.classList.toggle('visible', window.scrollY > 400);
    // Active nav link
    let current = '';
    document.querySelectorAll('section[id]').forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    document.querySelectorAll('.nav-link').forEach(l => { l.classList.toggle('active', l.getAttribute('href') === `#${current}`); });
});

navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) { spans[0].style.transform='rotate(45deg) translate(5px,5px)'; spans[1].style.opacity='0'; spans[2].style.transform='rotate(-45deg) translate(5px,-5px)'; }
    else { spans[0].style.transform=''; spans[1].style.opacity=''; spans[2].style.transform=''; }
});
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle?.querySelectorAll('span');
    if (spans) { spans[0].style.transform=''; spans[1].style.opacity=''; spans[2].style.transform=''; }
}));

// ═══ COUNTERS ═══
function animateCounters() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target, target = parseInt(el.dataset.target), start = performance.now();
            (function update(now) {
                const p = Math.min((now - start) / 2000, 1), eased = 1 - Math.pow(1 - p, 4);
                el.textContent = Math.round(target * eased);
                if (p < 1) requestAnimationFrame(update);
            })(start);
            observer.unobserve(el);
        });
    }, {threshold:.5});
    document.querySelectorAll('.stat-number[data-target]').forEach(c => observer.observe(c));
}

// ═══ SCROLL ANIMATIONS ═══
function initScrollAnimations() {
    const els = document.querySelectorAll('.product-card,.trust-item,.info-card,.contact-method,.section-header');
    els.forEach(el => el.classList.add('fade-in'));
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, {threshold:.1,rootMargin:'0px 0px -40px 0px'});
    els.forEach(el => observer.observe(el));
}

// ═══ PARTICLES ═══
function createParticles() {
    const c = document.getElementById('particles');
    if (!c) return;
    for (let i=0;i<24;i++) {
        const p = document.createElement('div');
        p.className='particle';
        p.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-duration:${3+Math.random()*5}s;animation-delay:${Math.random()*5}s;width:${2+Math.random()*2}px;height:${2+Math.random()*2}px;${Math.random()>.7?'background:#3b82f6':''}`;
        c.appendChild(p);
    }
}

// ═══ FORM ═══
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Đã gửi thành công!';
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; e.target.reset(); }, 3000);
}

// ═══ SMOOTH SCROLL ═══
function scrollTo(sel) { document.querySelector(sel)?.scrollIntoView({behavior:'smooth'}); }
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const t = document.querySelector(this.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    });
});

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
    renderProductGrid();
    renderCatalogTOC();
    createParticles();
    animateCounters();
    initScrollAnimations();
});
