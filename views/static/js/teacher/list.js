define(["jquery", "template", "bootstrap"], function ($, template) {
    //获取后台讲师列表通过template展示在页面上，点击查看 编辑 注销 实现对应的功能
    //后台返回的数据只有出生日期要计算出年龄，使用模板过滤器
    // 语法：{{数据 | 过滤器名称}}
    template.defaults.imports.getage = function (value) {
        return new Date().getFullYear() - new Date(value).getFullYear() + 1
    }
    $.ajax({
        url: "/api/teacher",
        success: function (data) {
            if (data.code == 200) {
                console.log(data);
                var html = template("teacher-list-tpl", data)
                $("#teacher-list").html(html)
            }
        }
    })

    //点击实现查看功能，注册委托事件
    $("#teacher-list").on("click", ".btn-checkinfo", function () {
        var id = $(this).parent().data("id")
        $.ajax({
            url: "/api/teacher/view",
            data: {tc_id: id},
            success: function (data) {
                console.log(data);
                var html = template("teacher-info-tpl", data)
                $("#teacher-info").html(html)
                //模态框显示
                $("#teacherModal").modal("show")
            }
        })
    })
    //点击实现注销功能，注册委托事件。要求：发送后台请求注销或启用用户信息，改变按钮的状态及颜色显示
    //已启用： tc_status == 0     按钮： 注销
    //已注销： tc_status == 1     按钮： 启用
    $("#teacher-list").on("click", ".btn-status",function () {
        var id = $(this).parent().data("id")
        var status = $(this).data("status")
        var that = this
        $.ajax({
            url:"/api/teacher/handle",
            data:"post",
            data:{tc_id:id,tc_status:status},
            success:function (data) {
                console.log(data);
                $(that).text(data.result.tc_status == 0?"注 销":"启 用")
                $(that).addClass(data.result.tc_status == 0?"btn-warning":"btn-success")
                $(that).removeClass(data.result.tc_status == 0?"btn-success":"btn-warning")
                $(that).data("status",data.result.tc_status)
            }
        })
    })
})
