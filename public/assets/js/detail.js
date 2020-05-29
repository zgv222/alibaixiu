var id = getUrlParams("id");
var review;
$.ajax({
    url: '/posts/' + id,
    type: 'get',
    success: function (response) {
        console.log((response));

        var html = template('contentTpl', response)
        // console.log(html);
        $('#contentBox').html(html)
    }
})


$('#contentBox').on('click', '#like', function () {
    $.ajax({
        url: '/posts/fabulous/' + id,
        type: 'post',
        success: function () {
            // console.log(response);
            alert('点赞成功，感谢您的支持！')
        }
    })
})

// 获取网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        console.log(response);
        review = response.review

        // 判断管理员是否开启的评论功能
        if (response.comment) {
            // 管理员开启了评论功能 渲染评论模板
            var html = template('commentTpl');
            // 渲染评论模板
            $('#commentBox').html(html);
            // console.log(html);

        }
    }
})

$('#commentBox').on('submit', 'form', function () {
    //获取文本的内容
    var text = $(this).find('textarea').val();
    //代表评论的状态
    var state;
    //管理员设置了评论不需要审核
    if (review) {
        //直接将状态设置为未审核
        state = 0;
    }
    else {
        //将状态设置为已审核
        state = 1;
    }
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: text,
            post: id,
            state,
        },
        success: function (response) {
            alert('评论成功')
            location.reload();
        },
        error: function () {
            alert('评论失败,请检查登陆状态！')
        }


    })

    return false
})




