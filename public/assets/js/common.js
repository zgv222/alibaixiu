/*用来存放公共的逻辑处理的函数*/
var logout = $('#logout')
logout.on('click', function () {
    var isConfirm = confirm('您真的要退出吗？')
    if (isConfirm) {
        $.ajax({
            url: '/logout',
            type: 'post',
            success: function (response) {
                console.log(response);
                location.href = 'login.html';
            },
            error: function () {
                alert('退出失败')
            }

        })
    }
})

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 向服务器端发送请求，索要登陆用户信息
$.ajax({
    url: '/users/' + userId,
    //userid已经通过scrit标签获取到
    type: 'get',
    success: function (response) {
        // console.log(response);
        $('.avatar').prop('src', response.avatar);
        $('.name').html(response.nickName)
    }
})

