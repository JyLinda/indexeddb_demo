// 使用keyGenerate
// 创建用户存储空间（自增key）
		// user: id:唯一标识，name：姓名，email：邮箱
function createUser(){
	var userStore = db.createObjectStore("user",{autoIncrement:true});
	
	userStore.createIndex("dept_index","dept");
}

// 使用keyPath 
// 创建部门存储空间（以“name”属性为key）
function createDept(){
	var deptStore = db.createObjectStore("dept",{keyPath:"name"});
	
	// 创建唯一索引:createIndex(索引名，列名，是否唯一等)
	deptStore.createIndex("name_index","name",{unique:true});
	// 创建非唯一索引
	deptStore.createIndex("enCode_i","enCode",{unique:false});
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
