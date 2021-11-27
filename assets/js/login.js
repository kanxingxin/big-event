$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    let form = layui.form
    let layer = layui.layer
    form.verify(
        {
            pwd: [
                /^[\S]{6,12}$/
                , '密码必须6到12位，且不能出现空格'
            ],
            repwd: function (value) {
                let pwd = $('#pwd').val()
                if (pwd !== value) {
                    return '两次输入的密码不一致'
                }
            }
        }
    )

    // 监听注册提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认的提交行为
        e.preventDefault()
        let data = {
            username: $('#username').val(),
            password: $('#pwd').val()
        }
        // 发起Ajax的POST请求
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)

            }
            layer.msg('注册成功，请登入')
            // 模拟人点击行为
            $('#link_login').click()
        })
    })
    // 监听登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单里的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登入成功')
                // 将登录成功的token字符保存在localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})