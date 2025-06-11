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
