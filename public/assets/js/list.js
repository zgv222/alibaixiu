// 获取categoryId

var categoryId = getUrlParams("categoryId");
console.log(categoryId);


$.ajax({
    url: '/posts/category/' + categoryId,
    type: 'get',
    success: function (repsonse) {
        console.log(repsonse);

        var html = template('categoryTpl', {
            data: repsonse
        })
        // console.log(html);
        $('#categorizeBox').html(html)
        // $('#title').html(repsonse.category.title)
    }
})
//获取标题
$.ajax({
    url: '/categories/' + categoryId,
    type: 'get',
    success: function (response) {
        $('#title').html(response.title)

    }
})
