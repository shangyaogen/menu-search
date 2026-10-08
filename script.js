var menuData = [
    { name: "宫保鸡丁", price: 38, category: "hot", desc: "花生米、鸡胸肉、干辣椒", tags: ["微辣", "经典"] },
    { name: "鱼香肉丝", price: 36, category: "hot", desc: "猪里脊、木耳、胡萝卜", tags: ["微辣", "下饭"] },
    { name: "麻婆豆腐", price: 28, category: "hot", desc: "嫩豆腐、肉末、花椒", tags: ["麻辣", "经典"] },
    { name: "红烧排骨", price: 58, category: "hot", desc: "猪排骨、土豆、八角", tags: ["甜咸", "硬菜"] },
    { name: "清炒时蔬", price: 22, category: "hot", desc: "当季新鲜蔬菜", tags: ["清淡", "素菜"] },
    { name: "糖醋里脊", price: 42, category: "hot", desc: "猪里脊、番茄酱", tags: ["酸甜", "经典"] },
    { name: "回锅肉", price: 40, category: "hot", desc: "五花肉、青椒、蒜苗", tags: ["微辣", "下饭"] },
    { name: "水煮鱼", price: 68, category: "hot", desc: "草鱼、豆芽、花椒", tags: ["麻辣", "硬菜"] },
    { name: "凉拌黄瓜", price: 16, category: "cold", desc: "黄瓜、蒜末、香醋", tags: ["清爽", "开胃"] },
    { name: "皮蛋豆腐", price: 18, category: "cold", desc: "皮蛋、内酯豆腐、酱油", tags: ["清淡", "开胃"] },
    { name: "口水鸡", price: 36, category: "cold", desc: "鸡腿肉、花生碎、辣椒油", tags: ["麻辣", "经典"] },
    { name: "凉拌木耳", price: 18, category: "cold", desc: "黑木耳、青红椒、香菜", tags: ["清爽", "素菜"] },
    { name: "拍黄瓜", price: 14, category: "cold", desc: "黄瓜、蒜泥、辣椒", tags: ["清爽", "开胃"] },
    { name: "番茄蛋汤", price: 18, category: "soup", desc: "番茄、鸡蛋、香葱", tags: ["清淡", "家常"] },
    { name: "紫菜蛋花汤", price: 16, category: "soup", desc: "紫菜、鸡蛋", tags: ["清淡", "简单"] },
    { name: "酸辣汤", price: 22, category: "soup", desc: "豆腐、木耳、鸡蛋", tags: ["酸辣", "开胃"] },
    { name: "排骨莲藕汤", price: 48, category: "soup", desc: "排骨、莲藕、枸杞", tags: ["滋补", "慢炖"] },
    { name: "蛋炒饭", price: 18, category: "staple", desc: "鸡蛋、米饭、葱花", tags: ["经典", "快手"] },
    { name: "扬州炒饭", price: 24, category: "staple", desc: "虾仁、火腿、鸡蛋、青豆", tags: ["经典", "丰富"] },
    { name: "葱油拌面", price: 16, category: "staple", desc: "面条、葱油、酱油", tags: ["简单", "快手"] },
    { name: "酸辣粉", price: 20, category: "staple", desc: "红薯粉、花生、香菜", tags: ["酸辣", "小吃"] },
    { name: "小笼包", price: 22, category: "staple", desc: "猪肉馅、面皮", tags: ["经典", "早餐"] },
    { name: "柠檬水", price: 12, category: "drink", desc: "新鲜柠檬、蜂蜜", tags: ["清爽", "自制"] },
    { name: "酸梅汤", price: 10, category: "drink", desc: "乌梅、山楂、桂花", tags: ["解暑", "经典"] },
    { name: "豆浆", price: 8, category: "drink", desc: "黄豆现磨", tags: ["健康", "早餐"] },
    { name: "冰红茶", price: 8, category: "drink", desc: "红茶、柠檬", tags: ["冰饮", "简单"] }
];

var currentCategory = "all";

// 页面加载后渲染全部菜品
renderMenu(menuData);

function renderMenu(data) {
    var list = document.getElementById("menu-list");
    var noResult = document.getElementById("no-result");
    var countEl = document.getElementById("result-count");

    if (data.length === 0) {
        list.innerHTML = "";
        noResult.style.display = "block";
        countEl.textContent = "";
        return;
    }

    noResult.style.display = "none";
    countEl.textContent = "找到 " + data.length + " 道菜品";

    var html = "";
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        html += '<div class="menu-item">';
        html += '  <div class="item-info">';
        html += '    <div class="item-name">' + item.name + '</div>';
        html += '    <div class="item-desc">' + item.desc + '</div>';
        html += '    <div class="item-tags">';
        for (var j = 0; j < item.tags.length; j++) {
            html += '<span class="tag">' + item.tags[j] + '</span>';
        }
        html += '    </div>';
        html += '  </div>';
        html += '  <div class="item-price">' + item.price + '</div>';
        html += '</div>';
    }
    list.innerHTML = html;
}

function filterMenu() {
    var keyword = document.getElementById("search-input").value.trim().toLowerCase();
    var filtered = [];

    for (var i = 0; i < menuData.length; i++) {
        var item = menuData[i];

        // 先按分类过滤
        if (currentCategory !== "all" && item.category !== currentCategory) {
            continue;
        }

        // 如果没输关键词就全部显示
        if (keyword === "") {
            filtered.push(item);
            continue;
        }

        // 搜索菜名、描述、标签
        var match = false;
        if (item.name.toLowerCase().indexOf(keyword) !== -1) match = true;
        if (item.desc.toLowerCase().indexOf(keyword) !== -1) match = true;
        for (var j = 0; j < item.tags.length; j++) {
            if (item.tags[j].toLowerCase().indexOf(keyword) !== -1) match = true;
        }

        if (match) filtered.push(item);
    }

    renderMenu(filtered);
}

function filterByCategory(category, btn) {
    currentCategory = category;

    // 切换按钮高亮
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    btn.classList.add("active");

    // 重新过滤
    filterMenu();
}