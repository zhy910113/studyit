$(function () {
	//获取cookie中的用户信息
	if(location.pathname != "/dashboard/login"){
		var userinfo = $.cookie('userinfo')
		userinfo = JSON.parse(userinfo)
		var str = template('profile-tpl',userinfo)
		// console.log(str);
		$("#profile").html(str)
	}
})