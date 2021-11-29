$(function () {
    getUserinfo()

    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登入?', { icon: 3, title: '提示' }, function (index) {
            // 清除本地存储的数据
            localStorage.removeItem('token');
            // 重新跳转登录页面
            location.href = '/login.html'

            layer.close(index);
        });

    })

})

// 获取用户的基本信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        },
        // 无论成功或者失败，都会执行cpmplete
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    // 获取用户姓名
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        // 让字母变成大写

        let first = name[0].toUpperCase()

        $('.text-avatar').html(first).show()
    }
}