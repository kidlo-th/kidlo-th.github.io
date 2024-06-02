// 在进入详情页时调用该函数
function fixHeaderPosition() {
        var header = document.querySelector('header');
        if (header) {
            header.style.position = 'fixed';
        header.style.top = '25px';
        header.style.left = '21%';
        header.style.width = '210px';
            // 根据需要设置其他样式，例如 top: 0; left: 0; width: 100%;
        }
    }
