//向服务器索要轮播图所要的图片
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        // console.log(response)
        var html = template('slidesTpl', {
            data: response
        })
        // console.log(html);
        $('#slideBox').html(html)

        //
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

//获取最新发布数据
$.ajax({
    url: '/posts/lasted',
    type: 'get',
    success: function (response) {
        // console.log(response);
        var html = template('lastedTpl', {
            data: response
        })
        // console.log(html);
        $('#lastedBox').html(html)

    }
})