// users.html对应的逻辑处理代码

//发送ajax获取用户列表
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        //将数据渲染到模板中
        var html = template('userTpl', {
            users: response,
        })
        //渲染到tbody中
        $('#userTbody').html(html)

    }
})

$('#userForm').on('submit', function () {
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            // 刷新页面 
            location.reload();
        },
        error: function () {
            alert('用户添加失败')
        }
    })
    // 阻止表单的默认提交行为
    return false;
});



//当文件选择文件时触发
$('#modifyBox').on('change', '#avatar', function () {
    //用户选择的文件this.files[0]
    var formData = new FormData();
    formData.append('avatar', this.files[0])
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        //告诉$.ajax方法不要解析请求参数（因为ajax中会把data的对象解析成拼接字符串参数的格式）
        processData: false,
        //告诉$.ajax不要设置请求参数的类型（json/encoded），因为在formdata中已经设置了
        contentType: false,

        success: function (response) {
            console.log(response);
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAva').val(response[0].avatar)

        }

    })

})

//通过事件委托的方式为编辑按钮添加点击事件
$('#userTbody').on('click', '.edit', function () {

    var id = $(this).data('id')
    $.ajax({
        url: '/users/' + id,
        type: 'get',

        success: function (response) {
            var html = template('modifyTpl', {
                user: response,
            })

            $('#modifyBox').html(html)

        }
    })
})

$('#modifyBox').on('submit', '#modifyForm', function () {
    //修改表单中的数据
    var formdata = $(this).serialize();
    var id = $(this).data('id')

    $.ajax({
        url: '/users/' + id,
        type: 'put',
        data: formdata,
        success: function (response) {
            //重新载入界面
            location.reload();

        },

    })
    return false
})

$('#userTbody').on('click', '.delete', function () {
    //询问是否删除
    var isDelete = confirm('是否要删除该用户？')
    //确认删除
    if (isDelete) {
        var id = $(this).data('id')
        $.ajax({
            url: '/users/' + id,
            type: 'delete',
            success: function (response) {
                console.log(response);
                location.reload();
            },
            error: function (err) {
                alert('删除失败')
            }
        })

    }
})
//获取全选按钮
var selectAll = $('#selectAll');

// 获取批量删除按钮
var deleteMany = $('#deleteMany');

//全选按钮用鼠标点击后触发，通过其他方式改变时不会触发
selectAll.on('change', function () {
    //获取当前的状态
    var status = $(this).prop('checked')

    //将所有的用户的状态和全选按钮保持一致
    $('#userTbody').find('input').prop('checked', status)
    if (status) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }

})


// 全选键和单选框的联系
$('#userTbody').on('change', 'input:checkbox', function () {

    //获取到所有用户，在所有用户中过滤出选中的用户
    //判断选中用户的数量和所有用户数量是否一致
    //如果一致 就说明所有的用户都是选中的
    //否则 就是有用户没有被选中
    var inputs = $('#userTbody').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    }
    else (
        selectAll.prop('checked', false)
    )

    // 如果选中的复选框的数量大于0 就说明有选中的复选框
    if (inputs.filter(':checked').length > 0) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }


})


//批量删除的事件
deleteMany.on('click', function () {
    //ids用来存放要删除项的id值
    var ids = []
    var checkUser = $('#userTbody').find('input').filter(':checked')
    //循环所有的项，获取选中的项的id值
    checkUser.each(function (index, value) {
        ids.push($(value).data('id'))
    })
    var isDelete = confirm('确定删除所选项？')
    if (isDelete) {
        //拼接ajax url参数
        var URL = '/users/';

        URL += ids.join('-')

        console.log(URL);

        $.ajax({
            url: URL,
            type: 'delete',
            success: function (response) {
                console.log(response);

                location.reload();
            }
        })
    }

})
