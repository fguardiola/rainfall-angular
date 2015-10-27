angular.module('CustomFilters',[])
	.filter('keyFilter',function(){
		return function(obj,query){
			var result={};
			angular.forEach(obj,function(val,key){
				if (key !== query){
					result[key]=val;
				}
			});
			return result;
		};
	});