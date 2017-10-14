define(["jquery","template","utils","bootstrap","form","datepicker","datepickerCN"],function ($,template,utils) {
    //先解析页面的url地址
    var id = utils.getId("id")
    var data = {}
    //如果有id值执行编辑功能，如果没有id值执行添加功能
    if(id){
        //编辑
        data.title = "讲师编辑"
        data.btntext = "保 存"
        data.url = "/api/teacher/update"
        $.ajax({
            url:"/api/teacher/edit",
            data:{tc_id:id},
            success:function (msg) {
                if(msg.code == 200){
                    data.teacher = msg.result
                    console.log(data);
                    renderData()
                }
            }
        })
    }else{
        //添加
        data.title = "讲师添加"
        data.btntext = "添 加"
        data.url = "/api/teacher/add"
        data.teacher = {}
        renderData()
    }
    function renderData() {
        var html = template("teacher-manage-tpl",data)
        $(".teacher-manage").html(html)
        //插件选择时间
        $("input[name='tc_join_date']").datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: "zh-CN"
        });
        //注册表单提交事件
        $(".teacher-manage").on("submit","form",function () {
            $(this).ajaxSubmit({
                //编辑讲师中提交时需要多传一个讲师id,可以在html中增加一个隐藏的表单提交id值，也可在请求的时候传入
                // data:{tc_id:id},
                success:function(data) {
                    console.log(data);
                    if(data.code == 200){
                        location.href = "/teacher/list"
                    }
                }
            })
            return false
        })
    }
})
