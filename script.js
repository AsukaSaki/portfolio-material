document.addEventListener('DOMContentLoaded', function() {
    
    // 获取所有需要的元素
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const closeButton = document.querySelector('.close-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // 为每个作品项添加点击事件
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // 获取数据
            const imgSrc = item.getAttribute('data-img-src');
            const title = item.getAttribute('data-title');
            const details = item.getAttribute('data-details');

            // 设置灯箱内容
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalDetails.textContent = details;
            
            // 显示灯箱
            modal.style.display = 'block';
        });
    });

    // 关闭灯箱的函数
    function closeModal() {
        modal.style.display = 'none';
    }

    // 点击关闭按钮
    closeButton.addEventListener('click', closeModal);

    // 点击灯箱外部区域
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // 按下 Escape 键
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});
// --- 新增功能：画作小电视 (Art TV) 幻灯片 ---

// 1. 获取所有需要的HTML元素
const artImages = document.querySelectorAll('.tv-screen img');
const prevBtn = document.querySelector('.tv-control.prev');
const nextBtn = document.querySelector('.tv-control.next');

// 2. 初始化变量
let currentArtIndex = 0; // 记录当前显示的是第几张图片
const totalImages = artImages.length;

// 3. 创建一个函数，用来显示指定索引的图片
function showArt(index) {
    // 隐藏所有图片
    artImages.forEach(img => {
        img.classList.remove('active');
    });
    // 只显示指定索引的图片
    artImages[index].classList.add('active');
}

// 4. 为“下一张”按钮添加点击事件
nextBtn.addEventListener('click', () => {
    // 索引加1，如果超过最后一张，就回到第一张（实现循环）
    currentArtIndex = (currentArtIndex + 1) % totalImages;
    showArt(currentArtIndex);
});

// 5. 为“上一张”按钮添加点击事件
prevBtn.addEventListener('click', () => {
    // 索引减1，如果小于第一张，就回到最后一张（实现循环）
    currentArtIndex = (currentArtIndex - 1 + totalImages) % totalImages;
    showArt(currentArtIndex);
});

// 6. 设置自动播放
// 每隔5秒（5000毫秒）自动触发一次“下一张”按钮的点击事件
setInterval(() => {
    nextBtn.click();
}, 5000);

// 7. 初始化，确保页面加载时第一张图片是显示的
showArt(currentArtIndex);
