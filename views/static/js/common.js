define(["jquery", "template", "cookie"], function ($, template) {
    $(function () {
        //判断是否在登录页面，如果不在登录页面则跳转到登录页面
        //获取cookie中的用户信息
        if (location.pathname != "/dashboard/login") {
            //如果$.cookie("PHPSESSID") 存在则表示已经登录过了，如果不存在跳回登录界面
            if (!$.cookie("PHPSESSID")) {
                location.href = "/dashboard/login"
            }
            var userinfo = $.cookie('userinfo')
            userinfo = JSON.parse(userinfo)
            var str = template('profile-tpl', userinfo)
            // console.log(str);
            $("#profile").html(str)
        }

        //退出登录，退出后清除后台用户数据（ajax后台处理），跳转到登录界面
        $('#logout').click(function () {
            $.ajax({
                url: "api/logout",
                type: "post",
                success: function (data) {
                    //请求成功，返回登录界面
                    if (data.code == 200) {
                        location.href = "dashboard/login"
                    }
                }
            })
        })
    })
})
