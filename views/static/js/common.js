define(["jquery", "template", "cookie"], function ($, template) {
    $(function () {
        //判断是否在登录页面，如果不在登录页面则跳转到登录页面.
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
                url: "/api/logout",
                type: "post",
                success: function (data) {
                    //请求成功，返回登录界面
                    if (data.code == 200) {
                        location.href = "/dashboard/login"
                    }
                }
            })
        })

        //点击课程管理显示下拉框（有下拉选项的导航都实现其功能，给有子元素的导航项添加点击事件）
        $(".navs>ul>li>ul").parent().click(function () {
            $(this).children('ul').slideToggle('fast')
        })
        //点击切换导航栏的导航信息，让当前页面的导航条高亮显示
        //当前页面的href地址和a标签中的href一致，a标签添加active属性
        var activeA = $(".navs a[href='" + location.pathname + "']")
        activeA.addClass('active')
        //点击导航是会跳转页面，下拉框会隐藏掉，判断当前页面的a标签是否属于导航菜单的子元素，如果是则显示子菜单。子菜单有一个兄弟元素
        if(activeA.parent().parent().siblings("a").length > 0){
            activeA.parent().parent().show()
        }
    })
})
