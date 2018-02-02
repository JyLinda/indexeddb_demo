if(!window.indexedDB) {
	window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}

// 初始化数据库
initDB = function() {
	request = window.indexedDB.open(dbConfig.name, dbConfig.version);
	request.onerror = function() {
		console.info(request.error.name + ":" + request.error.message);
	}
	request.onsuccess = function() {
		console.info("初始化成功");
	}
	request.onupgradeneeded = function() {
		db = request.result;
		dbConfig.version = db.version;
		createUser(db);
		createDept(db);
	}
}

// 开启数据库请求
var request;
openDB = function(version, callbackFunc) {
	if(!version)
		version = dbConfig.version;
	request = window.indexedDB.open(dbConfig.name, version)
	request.onerror = function(event) {
		errorObj = request.error;
		console.info(errorObj.name + ":" + errorObj.message)
	};
	request.onsuccess = function(event) {
		db = request.result;
		dbConfig.version = db.version;
		
		useDatabase();
		
		if(callbackFunc)
			callbackFunc(db);
	};

	request.onupgradeneeded = function(event) {
		db = event.target.result;
		dbConfig.version = db.version;
		
		useDatabase();
		
		if(callbackFunc)
			callbackFunc(db);
	}
}

// 删除数据库
deleteDB = function() {
	window.indexedDB.deleteDatabase(dbConfig.name);
}


// 新增存储对象到指定的对象存储空间
saveFunc = function(tableName, saveObj) {
	openDB(dbConfig.version, function() {
		var trans = db.transaction(tableName, "readwrite");
		trans.onerror = function(event) {
			console.info(event);
		}
		var objStore = trans.objectStore(tableName);
		objStore.add(saveObj);
	});

}

// 根据key获取指定存储空间的数据
getFunc = function(tableName, key) {
	var result;
	openDB(dbConfig.version, function() {
		var getRequest = db.transaction(tableName).objectStore(tableName).get(key);
		getRequest.onerror = function(event) {
			console.info(event);
		}

		getRequest.onsuccess = function(event) {
			result = event.target.result;
		}
	})
	return result;
}

/**
 * 获取指定存储空间的全部数据并进行处理
 * @param {String} tableName 指定存储空间
 * @param {Function} func 处理函数
 */
getAll = function(tableName, func) {
	openDB(dbConfig.version, function() {
		var openCursor = db.transaction(tableName).objectStore(tableName).openCursor();
		openCursor.onsuccess = function(event) {
			var cursor = event.target.result;
			if(cursor) {
				func(cursor.value);
				cursor.continue();
			}
		}
	})
}

/**
 * 根据指定索引获取指定存储空间的一个值（多个匹配，返回键值最小的那个）
 * @param {String} tableName 存储空间
 * @param {String} indexName:索引名
 * @param {String} indexValue:索引值
 * @param {Function} func 回调函数
 */
getOneByIndex = function(tableName, indexName, indexValue, func) {
	openDB(dbConfig.version, function() {
		var indexReq = db.transaction(tableName).objectStore(tableName).index(indexName).get(indexValue).onsuccess = function(e) {
			func(e.target.result);
		}
	})
}

/**
 * 根据索引查询列表
 * @param {String} tableName 存储空间名字
 * @param {String} indexName 索引名
 * @param {Function} func 回调函数
 * @param {IDBKeyRange} range 查询范围
 * @param {IDBCursor} sort 排序（IDBCursor.next:正序,IDBCursor.nextunique:正序去重,IDBCursor.prev:倒序,IDBCursor.prevunique:倒序去重）
 */
getListByIndex = function(tableName, indexName, func, range, sort) {
	openDB(dbConfig.version, function() {
		var cursorReq = db.transaction(tableName).objectStore(tableName).index(indexName).openCursor(range, sort);
		cursorReq.onsuccess = function(event) {
			var cursor = event.target.result;
			if(cursor) {
				func(cursor);
				cursor.continue();
			}
		}
	})
}