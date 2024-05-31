window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("back-to-top-btn").style.display = "block";
	} else {
		document.getElementById("back-to-top-btn").style.display = "none";
	}
}
// 返回顶部
function topFunctionArrow() {
	// 获取当前滚动位置
	var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

	if (currentScroll > 0) {
		// requestAnimationFrame 实现平滑滚动
		window.requestAnimationFrame(topFunctionArrow);
		// 将滚动位置向上移动一定距离
		window.scrollTo(0, currentScroll - (currentScroll / 10));
	}
}

