$.ajax({
    url: '/posts',
    type: 'get',
    success: function (response) {

        var html = template('articleTpl', {
            records: response
        })

        $('#articleBox').html(html)
        var pagehtml = template('pageTpl', {
            page: response
        })

        $('#page').html(pagehtml)

    }

})

// 换页
function changePage(page) {
    $.ajax({
        url: '/posts',
        type: 'get',
        data: {
            page,
        },
        success: function (response) {

            var html = template('articleTpl', {
                records: response
            })

            $('#articleBox').html(html)
            var pagehtml = template('pageTpl', {
                page: response
            })

            $('#page').html(pagehtml)

        }

    })
}

$.ajax({
    url: '/categories',
    type: 'get',
    success: function (response) {
        var html = template('categoryTpl', {
            category: response
        })
        $('#categoriesBox').html(html)


    }
})

$('#choose').on('submit', function () {
    var data = $(this).serialize();
    console.log(data);

    $.ajax({
        url: '/posts',
        type: 'get',
        data,
        success: function (response) {

            var html = template('articleTpl', {
                records: response
            })

            $('#articleBox').html(html)
            var pagehtml = template('pageTpl', {
                page: response
            })

            $('#page').html(pagehtml)

        }
    })
    return false
})
$('#articleBox').on('click', '.delete', function () {
    if (confirm('您确定要删除吗？')) {
        var id = $(this).data('id')


        $.ajax({
            url: '/posts/' + id,
            type: 'delete',
            success: function (response) {
                console.log(response);

                location.reload();
            }
        })
    }



})