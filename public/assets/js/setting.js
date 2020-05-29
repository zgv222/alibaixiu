$('#logoFile').on('change', function () {
    var formdata = new FormData();
    formdata.append('avatar', this.files[0]);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response[0].avatar);

            $('#logo').val(response[0].avatar)
            $('#img').prop('src', response[0].avatar)

        }
    })
})


// 当网站设置表单发生提交行为时
$('#settingsForm').on('submit', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 实现网站设置数据添加功能
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function () {
            location.reload();
        }
    })

    // 阻止表单默认提交行为
    return false;
})

$.ajax({
    url: '/settings',
    type: 'get',
    success: function (response) {
        $('#logo').val(response.logo)
        $('#img').attr('src', response.logo)
        $('#title').val(response.title)
        $('#comment').prop('checked', response.comment)
        $('#review').prop('checked', response.review)
        // 将是否开启评论功能显示在页面中
        $('input[name="comment"]').prop('checked', response.comment)
        // 将评论是否经过人工审核显示在页面中
        $('input[name="review"]').prop('checked', response.review)
    }
})