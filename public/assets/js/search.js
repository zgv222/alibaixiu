var name = getUrlParams('name')


$.ajax({
    url: '/posts/search/' + name,
    type: 'get',
    success: function (response) {
        console.log(response);
        var html = template('searchTpl', {
            data: response
        })

        console.log(html);
        $('#listBox').html(html)
    }
})