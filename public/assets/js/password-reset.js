var passForm = $('#passForm')

passForm.on('submit', function () {


    var old = $('#old')
    var password = $('#password')
    var conFirm = $('#confirm')

    if (old.val().trim().length == 0 || password.val().trim().length == 0 || conFirm.val().trim().length == 0) {
        alert('请输入完成信息')
        return false;
    }



    if (conFirm.val() != password.val()) {
        alert('两次输入的密码不一致')
        return false
    }

    //执行到此处说明通过验证了，再次询问
    if (confirm('确认修改密码？')) {

        $.ajax({
            url: '/users/password',
            type: 'put',
            data: passForm.serialize(),
            success: function (response) {
                console.log(response);
                location.reload();
            }
        })
    }

    return false
})