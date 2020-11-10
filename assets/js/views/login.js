function Login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    Ajax({
        url: ApiHost + '/api/v1/login',
        data: {
            'email': email,
            'password': password,
        },
        success: function (res) {
            if (res.response.token) {
                console.log("保存token")
                localStorage.setItem('token', "Bearer " + res.response.token);
                window.location.href = '/dashboard';
            }
        },
        error: function (res) {
            console.log(res.error)
            console.log('name repeat, please input anothor name');
        }
    });
}

function SignUp() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;

    Ajax({
        url: ApiHost + '/api/v1/users',
        data: {
            'email': email,
            'password': password,
            'username': username,
        },
        success: function (res) {
            alert("注册成功,跳转到登陆页面")
            window.location.href = '/login';
            console.log(res);
        },
        error: function (res) {
            console.log(res.error)
        }
    });
}

function SignOut() {
    localStorage.removeItem("token")
    window.location.href = '/';
}