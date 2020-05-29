//获取随机推荐的文章
$.ajax({
  url: '/posts/random',
  type: 'GET',
  success: function (response) {
    // console.log(response);
    var randomTpl = `
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
      {{/each}}
        `;
    var html = template.render(randomTpl, {
      data: response
    })
    // console.log(html);
    $('#randomBox').html(html)


  }
})


//获取最新评论
$.ajax({
  url: '/comments/lasted',
  type: 'get',
  success: function (response) {
    // console.log(response);
    var lastedCommentTpl = `
    {{each data}}
          <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
      {{/each}}
    `;

    var html = template.render(lastedCommentTpl, {
      data: response,
    })
    // console.log(html);
    $('#lastedCommentBox').html(html)


  }
})

// $.ajax({
//   url: '/comments',
//   type: 'post',
//   data: {
//     content: '楼主是个帅比',
//     post: '5ec9eb7dbd45fa17fc7be32f',
//     state: '1'

//   },
//   success: function (response) {
//     console.log(response);

//   }
// })


// 处理日期时间格式
function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//获取分类列表
$.ajax({
  url: '/categories',
  type: 'GET',
  success: function (response) {
    // console.log(response);
    var categoryTpl = `
    {{each data}}
    <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
    `;
    var html = template.render(categoryTpl, {
      data: response
    })
    // console.log(html);
    $('#categoriesBox').html(html)
    $('#topBox').html(html)
  }
})

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


$('.search form').on('submit', function () {

  var data = $(this).find('.keys').val();

  //跳转到查询页，并携带查询的参数
  location.href = 'search.html?name=' + data


  return false;
})

//获取登陆状态
$.ajax({
  url: '/login/status',
  type: 'get',
  success: function (response) {

    console.log(response);

  }
})

//获取网站配置信息
$.ajax({
  url: '/settings',
  type: 'get',
  success: function (response) {
    console.log(response);
    $('title').html(response.title)
    $('#logo').prop('src', response.logo)
  }
})

