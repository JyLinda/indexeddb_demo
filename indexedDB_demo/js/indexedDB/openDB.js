if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
}

// 初始化数据库
initDB = function(){
	request = window.indexedDB.open(dbConfig.name,dbConfig.version);
	request.onerror = function(){
		console.info(request.error.name + ":" + request.error.message);
	}
	request.onsuccess = function(){
		console.info("初始化成功");
	}
	request.onupgradeneeded = function(){
		db = request.result;
		dbConfig.version = db.version;
		createUser();
		createDept();
	}
}

// 测试开启数据库
var request;
openDB = function(version,callbackFunc){
	if(!version)
		version = dbConfig.version;
	request = window.indexedDB.open(dbConfig.name,version)
	request.onerror=function(event){	
		errorObj = request.error;
		console.info(errorObj.name + ":" + errorObj.message)
	};
	request.onsuccess=function(event){
		db = request.result;
		dbConfig.version = db.version;
		if(callbackFunc)
			callbackFunc();
	};
	
	request.onupgradeneeded = function(event){
		db = event.target.result;
		dbConfig.version = db.version;
		if(callbackFunc)
			callbackFunc();
	}
}

// 删除数据库
deleteDB = function(){
	window.indexedDB.deleteDatabase(dbConfig.name);
}

// 使用keyPath 
createObjectStoreDemo1 = function(){
	openDB(dbConfig.version + 1, function(){
		// 创建对象存储空间，维护用户信息
		// user: id:唯一标识，name：姓名，email：邮箱
		var userStore = db.createObjectStore("user",{keyPath:"id"});
	
		// 创建索引
		// id 创建唯一索引
		userStore.createIndex("id","id",{unique:true});
		// name 创建索引，但不唯一
		userStore.createIndex("name","name",{unique:false});
	
		console.info(userStore);
	})
}

// 使用keyGenerate
createObjectStoreDemo2 = function(){
	openDB(dbConfig.version + 1 , function(){
		var deptStore = db.createObjectStore("dept",{autoIncrement:true});
	});
}

// 新增存储对象到指定的对象存储空间
saveFunc = function(tableName, saveObj){
	openDB(dbConfig.version,function(){
		var trans = db.transaction(tableName,"readwrite");
		trans.onerror = function(event){
			console.info(event);
		}
		var objStore = trans.objectStore(tableName);
		objStore.add(saveObj);
	});
	
}

// 根据key获取指定存储空间的数据
getFunc = function(tableName,key){
	var result;
	openDB(dbConfig.version,function(){
		var getRequest = db.transaction(tableName).objectStore(tableName).get(key);
		getRequest.onerror = function(event){
			console.info(event);
		}
		
		getRequest.onsuccess = function(event){
			result = event.target.result;
		}
	})
	return result;
}
