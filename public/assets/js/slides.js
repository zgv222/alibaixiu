$('#file').on('change', function () {

    var formData = new FormData();
    formData.append('avatar', this.files[0])

    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            //图片预览
            $('#showImg').show()
            $('#showImg').prop('src', response[0].avatar)
            $('#image').val(response[0].avatar)
        }
    })
})

$('#slides').on('submit', function () {
    var data = $('#slides').serialize();
    console.log(data);

    $.ajax({
        url: '/slides',
        type: 'POST',
        data,
        success: function (response) {
            location.reload();

        }
    })
    return false
})

//渲染轮播图列表的模板
$.ajax({
    url: '/slides',
    type: 'get',
    success: function (response) {
        var html = template('slidesTpl', {
            slides: response
        })
        // console.log(html);
        $('#slidesBox').html(html)

    }
})

$('#slidesBox').on('click', '.delete', function () {
    var id = $(this).data('id')
    if (confirm("确定删除？")) {
        $.ajax({
            url: '/slides/' + id,
            type: 'DELETE',
            data: {
                id
            },
            success: function (response) {
                location.reload();
            }
        })
    }

})