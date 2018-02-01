/**
 * 自定义函数使用案例
 * @author jiaye
 * @version 1.0
 */

/**
 * getAll方法使用案例
 */
getAllDemo = function(){
	var listValue=new Array();
	
	getAll("dept",function(obj){
		listValue.push(obj);
	});
	
	console.info(listValue);
}

/**
 * getOneByIndex方法使用案例
 */
getOneByIndexDemo = function(){
	getOneByIndex("dept","enCode_i","cs_dept_2",function(obj){
		console.info(obj);
	});
}
