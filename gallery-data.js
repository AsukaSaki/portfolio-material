const galleryData = {
    "全部": [
        // 这个分类会自动包含所有其他分类的图片，你不需要手动添加
    ],
    "概念设计": [
        'images/概念设计/art_concept_01.jpg',
        'images/概念设计/art_concept_02.png',
        // 以后有新的“概念设计”作品，就把图片路径加在这里，最新的放最上面
    ],
    "角色插画": [
        'images/角色插画/char_illust_01.jpg',
        // 以后有新的“角色插画”作品，加在这里
    ],
    "场景原画": [
        'images/场景原画/env_art_01.jpg',
        // 以后有新的“场景原画”作品，加在这里
    ],
    "草稿": [
        'images/草稿/sketch_01.jpg',
        // 以后有新的“草稿”作品，加在这里
    ]
};

// --- 以下代码无需修改 ---
// 自动填充“全部”这个分类
Object.keys(galleryData).forEach(category => {
    if (category !== "全部") {
        galleryData["全部"].push(...galleryData[category]);
    }
});
