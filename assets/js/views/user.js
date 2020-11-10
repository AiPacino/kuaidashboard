function UpdateUserInfo() {
    let user_nickname = document.getElementById("change-nickname").value;
    let user_name = document.getElementById("change-username").value;
    let user_email = document.getElementById("change-email").value;
    let user_phone = document.getElementById("change-phone").value;
    let user_website = document.getElementById("change-website").value;
    let user_password = document.getElementById("change-password").value;

    Ajax({
        url: ApiHost + '/api/v1/users',
        type: "PUT",
        data: {
            nickname: user_nickname,
            username: user_name,
            email: user_email,
            phone: user_phone,
            website: user_website,
            password: user_password,
        },
        success: function (res) {
            location.reload();
        },
        error: function (res) {
            console.log(res.error)
        }
    });
}

function GetUserInfo() {
    Ajax({
        url: ApiHost + '/api/v1/status',
        success: function (res) {
            ViewUserInfo(res)
        },
        error: function (res) {
            console.log(res.error)
        }
    });
}

function GetStatus() {
    Ajax({
        url: ApiHost + '/api/v1/status',
        data: {},
        success: function (res) {
            ViewStatus(res)
        },
        error: function (res) {
            window.location.href = '/login';
        }
    });
}

function ViewStatus(res) {
    SetValueByClassName('user-name', "value", res.response.username)
    SetValueByClassName('username-bar', "value", res.response.username)
}

function ViewUserInfo(res) {
    SetValueByClassName("change-name", "value", res.response.username)
    SetValueByClassName("change-name", "placeholder", res.response.username)

    SetValueByClassName("change-nickname", "value", res.response.nickname)
    SetValueByClassName("change-nickname", "placeholder", res.response.nickname)

    SetValueByClassName("change-username", "value", res.response.username)
    SetValueByClassName("change-username", "placeholder", res.response.username)

    SetValueByClassName("change-email", "value", res.response.email)
    SetValueByClassName("change-email", "placeholder", res.response.email)

    SetValueByClassName("change-website", "value", res.response.website)
    SetValueByClassName("change-website", "placeholder", res.response.website)
    SetValueByClassName("change-website", "href", res.response.website)

    SetValueByClassName("change-phone", "value", res.response.phone)
    SetValueByClassName("change-phone", "placeholder", res.response.phone)
}
