
//获取文章数量
$.ajax({
    url: '/posts/count',
    type: 'get',
    success: function (response) {
        var a = '<strong>' + response.postCount + '</strong>篇文章（<strong>' + response.draftCount + '</strong>篇草稿）'
        $('#artCount').html(a)

    }
})

//获取分类的数量
$.ajax({
    url: '/categories/count',
    type: 'get',
    success: function (response) {


        var a = '<strong>' + response.categoryCount + '</strong>个分类'
        $('#categoryCount').html(a)
    }
})

//获取评论的数量
$.ajax({
    url: '/comments/count',
    type: 'get',
    success: function (response) {

        var a = '<strong>' + response.commentCount + '</strong>条评论'
        $('#commentCount').html(a)

    }
})

//获取登陆状态
$.ajax({
    url: '/login/status',
    type: 'get',
    success: function (response) {

        console.log(response);

    }
})
