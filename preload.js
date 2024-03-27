const gw2map_waypoint = require("./waypoint.json");

// 保存输入的信息
var user_input;

// 保存查询结果
var waypoint_query_result;

// 保存传送点信息
var waypoint_info;

// 插件打开时执行
utools.onPluginEnter(({ code, type, payload }) => {

	// 设置子输入框
	utools.setSubInput(({ text }) => { user_input = text; }, '你好，指挥官');
}
)

utools.onPluginOut(() => {
	document.getElementById("tabletable").style.display = "none";
	document.getElementById("query_tips").style.display = "none";
	document.getElementById("waypoint").style.display = "none";
})

// 插件窗口加载后执行
window.onload = function () {

	document.addEventListener('keydown', (e) => {

		// 按下回车时执行
		if (e.code == 'Enter') {

			// 获取并保存查询传送点信息的结果
			const waypoint_query_result = gw2map_waypoint.waypoint.find(func_waypoint_query);

			// 赋值前端信息
			func_set_waypoint_info(waypoint_query_result);

			switch (waypoint_query_result.tips) {
				case '无':
					waypoint_info = waypoint_query_result.waypoint_name
						+ ' - ' + waypoint_query_result.waypoint_code
						+ ' - ' + waypoint_query_result.map_name
						+ ' - ' + waypoint_query_result.map_area;
					break;
				case '有':
					waypoint_info = waypoint_query_result.waypoint_name
						+ ' - ' + waypoint_query_result.waypoint_code;
					break;
				default:
					break;
			}
			// 将内容复制到系统剪贴板
			utools.copyText(waypoint_info);
			// 为显示在UI上做准备
			document.getElementById("waypoint").innerText = waypoint_info;
			// 显示 UI
			func_show();
		}
	})

	// 表格样式函数
	func_set_table_style();
}

// 查询传送点信息
function func_waypoint_query(input_waypoint_name) {
	// 返回查询信息
	if (input_waypoint_name.waypoint_pinyin == user_input) {
		return input_waypoint_name.waypoint_pinyin == user_input;
	} else {
		return input_waypoint_name.waypoint_name == user_input;
	}
}

function func_set_waypoint_info(waypoint_query_result) {

	document.getElementById("waypoint_name").innerText = waypoint_query_result.waypoint_name;
	document.getElementById("waypoint_code").innerText = waypoint_query_result.waypoint_code;
	document.getElementById("map_name").innerText = waypoint_query_result.map_name;
	document.getElementById("map_area").innerText = waypoint_query_result.map_area;

	document.getElementById("query_tips").style.display = "block";
	document.getElementById("query_tips").style.color = utools.isDarkColors() ? 'white' : 'black';

	document.getElementById("waypoint").style.display = "block";
	document.getElementById("waypoint").style.color = utools.isDarkColors() ? 'white' : 'black';

}

function func_show() {
	document.getElementById("tabletable").style.display = "block";

	utools.setSubInputValue('');
}

function func_set_table_style() {
	var tfrow = document.getElementById('tfhover').rows.length;
	var tbRow = [];
	for (var i = 1; i < tfrow; i++) {
		tbRow[i] = document.getElementById('tfhover').rows[i];
		tbRow[i].onmouseover = function () {
			this.style.backgroundColor = '#f3f8aa';
		};
		tbRow[i].onmouseout = function () {
			this.style.backgroundColor = '#ffffff';
		};
	}
}