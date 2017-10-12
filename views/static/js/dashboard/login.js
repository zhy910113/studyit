define(['jquery', 'cookie', 'form'], function ($) {
    $(function () {
        //获取登录框（用户名，密码）的内容，注册登录提交事件，向后台提交数据，后台接收数据后验证是否正确，跳转到主页面
        //直接给表单注册提交事件
        $("form").submit(function () {
            //判断如果用户名和密码为空，则提示用户输入用户名和密码
            if ($('input[name=tc_name]').val().trim() == "") {
                alert("请输入用户名")
                return false
            }
            if ($('input[name=tc_pass]').val().trim() == "") {
                alert("请输入密码")
                return false
            }
            //表单序列化获取表单数据（input必须要有name属性）
            var data = $(this).serialize()
            //发送ajax请求
            $(this).ajaxSubmit({
                url: '/api/login',
                type: 'post',
                // data:data,
                success: function (data) {
                    console.log(data);
                    //确认登录成功后跳转到首页,同时将后台返回来的用户名和头像保存在cookie中，后续在主页的侧边栏位置使用
                    if (data.code == 200) {
                        console.log(data.result);
                        //将返回的数据转成json字符串形式存储在cookie中
                        $.cookie('userinfo', JSON.stringify(data.result), {path: '/', expires: 365})
                        location.href = '/'
                    }
                }
            })
            return false
        })
    })
})