document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // --- 模块一：动态主题切换功能 ---
    // =======================================================
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const themes = ['theme-day', 'theme-sunset', 'theme-night', 'theme-morning'];
    let currentThemeIndex = 0;

    function getThemeByTime() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 11) return 'theme-morning';
        if (hour >= 11 && hour < 17) return 'theme-day';
        if (hour >= 17 && hour < 20) return 'theme-sunset';
        return 'theme-night';
    }

    function applyTheme(themeName) {
        body.dataset.theme = themeName;
        currentThemeIndex = themes.indexOf(themeName);
    }

    themeToggleButton.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const nextTheme = themes[currentThemeIndex];
        applyTheme(nextTheme);
        localStorage.setItem('user-preferred-theme', nextTheme);
    });

    const savedTheme = localStorage.getItem('user-preferred-theme');
    if (savedTheme && themes.includes(savedTheme)) {
        applyTheme(savedTheme);
    } else {
        applyTheme(getThemeByTime());
    }

    // =======================================================
    // --- 模块二：动态作品集与翻页功能 ---
    // =======================================================
    const galleryGrid = document.querySelector('.gallery-grid');
    const paginationControls = document.querySelector('.pagination-controls');
    const filterChips = document.querySelectorAll('.filter-chips .chip');
    
    const ITEMS_PER_PAGE = 6;
    let currentPage = 1;
    let currentCategory = '全部';

    function renderGallery() {
        galleryGrid.innerHTML = '';
        paginationControls.innerHTML = '';

        const images = galleryData[currentCategory];
        if (!images || images.length === 0) {
            galleryGrid.innerHTML = '<p>这个分类下还没有作品哦。</p>';
            return;
        }

        const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginatedImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE);

        paginatedImages.forEach(imagePath => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const fileName = imagePath.split('/').pop().split('.').slice(0, -1).join('.');
            const title = fileName.replace(/[-_]/g, ' ');

            galleryItem.dataset.imgSrc = imagePath;
            galleryItem.dataset.title = title;

            galleryItem.innerHTML = `
                <img src="${imagePath}" alt="${title}">
                <div class="item-info">
                   <h3>${title}</h3>
                </div>
            `;
            galleryGrid.appendChild(galleryItem);
        });
        
        bindModalEvents();

        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.innerText = i;
                if (i === currentPage) {
                    pageButton.classList.add('active');
                }
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    renderGallery();
                    // Optional: scroll to the top of the gallery after changing page
                    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
                });
                paginationControls.appendChild(pageButton);
            }
        }
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            currentCategory = chip.dataset.category;
            currentPage = 1;
            renderGallery();
        });
    });

    // =======================================================
    // --- 模块三：图片弹窗功能 (Modal) ---
    // =======================================================
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const closeButton = document.querySelector('.close-button');
    
    function bindModalEvents() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // 确保点击的是图片项本身，而不是翻页按钮等
                if (e.target.closest('.gallery-item')) {
                    modalImg.src = item.dataset.imgSrc;
                    modalTitle.textContent = item.dataset.title;
                    modal.style.display = 'block';
                }
            });
        });
    }

    if(closeButton) {
        closeButton.addEventListener('click', () => modal.style.display = 'none');
    }
    window.addEventListener('click', (event) => {
        if (event.target == modal) modal.style.display = 'none';
    });
    
    // =======================================================
    // --- 初始化页面 ---
    // =======================================================
    // 初始渲染“全部”分类的第一页
    if(typeof galleryData !== 'undefined'){
        renderGallery();
    } else {
        console.error("gallery-data.js未能正确加载或galleryData未定义！");
    }
});
