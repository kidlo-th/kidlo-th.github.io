window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("back-to-top-btn").style.display = "block";
	} else {
		document.getElementById("back-to-top-btn").style.display = "none";
	}
}
// 返回顶部的功能（带动画效果）
function topFunctionArrow() {
	// 获取当前滚动位置
	var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

	// 如果当前滚动位置大于0，则执行动画
	if (currentScroll > 0) {
		// 使用 requestAnimationFrame 实现平滑滚动效果
		window.requestAnimationFrame(topFunctionArrow);
		// 将滚动位置向上移动一定距离，这里使用了一个简单的缓动函数
		// 你也可以使用其他更复杂的缓动函数来实现更自然的动画效果
		window.scrollTo(0, currentScroll - (currentScroll / 10));
	}
}

