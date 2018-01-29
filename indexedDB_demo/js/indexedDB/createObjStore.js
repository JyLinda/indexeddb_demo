// 使用keyGenerate
// 创建用户存储空间（自增key）
		// user: id:唯一标识，name：姓名，email：邮箱
function createUser(){
	db.createObjectStore("user",{autoIncrement:true});
}

// 使用keyPath 
// 创建部门存储空间（以“name”属性为key）
function createDept(){
	var deptStore = db.createObjectStore("dept",{keyPath:"name"});
	
	// 创建唯一索引
	deptStore.createIndex("name","name_index",{unique:true});
	// 创建非唯一索引
	deptStore.createIndex("enCode","enCode_i",{unique:false});
}
