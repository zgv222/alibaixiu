//请求分类列表
$.ajax({
    url: '/categories',
    type: 'get',
    success: function (response) {

        var html = template('categoryTpl', {
            category: response,
        })

        $('#category').html(html)

    }
})

$('#feature').on('change', function () {
    var formdata = new FormData();
    formdata.append('avatar', this.files[0])

    $.ajax({
        url: '/upload',
        type: 'post',
        data: formdata,
        // ajax方法不要解析请求参数（因为ajax中会把data的对象解析成拼接字符串参数的格式）
        processData: false,
        //告诉$.ajax不要设置请求参数的类型（json/encoded），因为在formdata中已经设置了
        contentType: false,
        success: function (response) {

            $('#thumbnail').val(response[0].avatar)
        }
    })
})

var article = $('#article')
article.on('submit', function () {
    // console.log($('#created').val());

    $.ajax({
        url: '/posts',
        type: 'post',
        data: $(this).serialize(),
        success: function (response) {
            location.href = '/admin/posts.html'

        }
    })
    return false;
})



var id = getUrlParams('id')
//当前管理员是再做修改文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function (categories) {
                    response.categories = categories;

                    var html = template('modifyTpl', response);
                    console.log(html);
                    // console.log(response);
                    $('#parentBox').html(html)

                }
            })

        }
    })
}

//从浏览器的地址中获取查询的参数
function getUrlParams(name) {
    //截取索引为1到最后的字符
    var paramsAry = location.search.substr(1).split('&');

    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    //找不到说明不是修改操作
    return -1;
}
$('#parentBox').on('submit', '#modifyForm', function () {

    var data = $(this).serialize()
    //获取正在修改的id值
    var id = $(this).data('id')
    console.log(data);
    $.ajax({
        url: '/posts/' + id,
        type: 'put',
        data,
        success: function () {
            location.href = "/admin/posts.html"
        }
    })
    return false
})
