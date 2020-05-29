$.ajax({
    url: '/categories',
    type: 'get',
    success: function (response) {
        var html = template('categoryTpl', {
            categories: response,
        })
        $('#categoriesBox').html(html)
    }
})
$('#categoriesForm').on('submit', function () {
    var categoriesData = $(this).serialize();

    $.ajax({
        url: '/categories',
        type: 'post',
        data: categoriesData,
        success: function () {


            location.reload();
        }
    })
    return false;
})

//事件委托，给编辑键添加点击事件
$('#categoriesBox').on('click', '.edit', function () {
    var id = $(this).data('id');
    $.ajax({
        url: '/categories/' + id,
        type: 'get',
        success: function (response) {
            var html = template('modifyCategoryTpl', {
                category: response
            })
            $('#modifyCategories').html(html);
        }
    })

})

$('#modifyCategories').on('submit', '#categoriesForm', function () {
    if (confirm('确认修改？')) {
        var id = $(this).data('id')
        var data = $(this).serialize();

        $.ajax({
            url: '/categories/' + id,
            data,
            type: 'put',
            success: function () {

                location.reload();
            }
        })
    }
    return false;
})

//事件委托，删除键添加点击事件
$('#categoriesBox').on('click', '.delete', function () {
    if (confirm('确认要删除该用户？')) {
        var id = $(this).data('id');
        $.ajax({
            url: '/categories/' + id,
            type: 'DELETE',
            success: function (response) {
                location.reload();
                console.log();

            }
        })
    }

})

var deleteAll = $('#deleteAll')
var selectAll = $('#selectAll')
// 全选按钮
selectAll.on('change', function () {

    //全选框的状态
    var statu = $(this).prop('checked')
    if (statu) {
        deleteAll.show();
        $('#categoriesBox').find('input:checkbox').prop('checked', true)
    }
    else {
        deleteAll.hide();
        $('#categoriesBox').find('input:checkbox').prop('checked', false)
    }


})


//批量删除
$('#categoriesBox').on('change', 'input', function () {
    var haschecked = $('#categoriesBox').find('input').filter(':checked').length
    //没有选中的
    if (haschecked == 0) {
        // 将批量删除按钮隐藏
        deleteAll.hide();

    }
    else if (haschecked != 0) {
        deleteAll.show();
    }

    if (haschecked != $('#categoriesBox').find('input').length) {
        selectAll.prop('checked', false)
    }
    else if (haschecked == $('#categoriesBox').find('input').length) {
        selectAll.prop('checked', true)
    }

})

deleteAll.on('click', function () {
    if (confirm('您确定要删除所选项？')) {
        var select = $('#categoriesBox').find('input').filter(':checked')
        var ids = [];
        select.each(function (index, value) {
            ids.push($(value).data('id'))
        })
        var URL = '/categories/';
        URL += ids.join('-');

        $.ajax({
            url: URL,
            type: 'delete',
            success: function () {
                location.reload();
            }
        })

    }

})