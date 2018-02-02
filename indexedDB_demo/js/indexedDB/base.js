var db, // indexedDB 
	errorObj; // 错误信息

var dbConfig = {
	name: "jiaye_demo_one",
	version: 1
}

// 解决当一个webapp在另一个标签页被打开时，版本变更问题
useDatabase = function() {
	// 确保添加一个如果另一个页面请求一个版本变化时来被通知的处理程序。
	// 我们必须关闭这个数据库。这就允许其他页面对数据库进行升级。
	// 如果你不这么做的话，除非用户关闭标签页否则升级就不会发生。
	db.onversionchange = function(event) {
		db.close();
		alert("A new version of this page is ready. Please reload!");
	};

	// 其他针对数据库的处理
}