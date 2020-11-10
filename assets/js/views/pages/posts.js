function GetPosts() {
    Ajax({
        url: ApiHost + '/api/v1/user_posts',
        type: "GET",
        success: function (res) {
            var temp = $.trim($('#popular-posts').html())
            $('#popular-posts').html("");
            $.each(res.response, function (index, obj) {
                var x = temp.replace(/{title}/ig, obj.title).replace(/{id}/ig, obj.id);
                $('#popular-posts').append(x);
            });
        },
        error: function (res) {
            console.log(res.error)
        }
    });
}


function GetPost(link) {
    let id = GetPageIdFromUrl(/pages\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\/edit/i, link);
    if (id) {
        Ajax({
            url: ApiHost + '/api/v1/posts/' + id,
            type: "GET",
            success: function (res) {
                console.log(res);
                ViewPageEdit(res)
            },
            error: function (res) {
                console.log(res.error)
            }
        });
    }
}

function ViewPageEdit(res) {
    ReplaceValue('#page-title', /{title}/ig, res.response.title)
    ReplaceValue('#checkout-link-way-one-link', /{checkout-link}/ig, joinUrl(link, "/checkout/" + res.response.id))


    SetValue("page-edit-description", "placeholder", res.response.description)
    SetValue("page-edit-description", "value", res.response.description)
    SetValue("page-edit-price", "placeholder", res.response.price)
    SetValue("page-edit-price", "value", res.response.price)
    SetValue("page-edit-title", "placeholder", res.response.title)
    SetValue("page-edit-title", "value", res.response.title)
    SetValue("page-edit-content", "placeholder", res.response.content)
    SetValue("page-edit-content", "value", res.response.content)


    SetValue("checkout-link-way-one-link-button", "data-clipboard-text", joinUrl(link, "/checkout/" + res.response.id))
    SetValue("checkout-link-way-one-link", "href", joinUrl(link, "/checkout/" + res.response.id))
    SetValue("page-edit-title", "value", res.response.title)
    SetValue("page-edit-price", "value", res.response.price)
}

function PutPost(item, type) {
    console.log("开始更新")
    console.log(item)
    let id = GetPageIdFromUrl(/pages\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\/edit/i, link)
    if (id) {
        console.log(id)
        Ajax({
            url: ApiHost + '/api/v1/posts/' + id,
            type: "PUT",
            data: {
                'post': item,
                'type': type,
            },
            success: function (res) {
                ViewPageEdit(res)
            },
            error: function (res) {
                console.log(res.error)
            }
        });
    }
}

function UpdatePost(tab) {
    switch (tab) {
        case "tab-edit":
            let title = document.getElementById("page-edit-title").value;
            let price = document.getElementById("page-edit-price").value;
            let description = document.getElementById("page-edit-description").value;
            let content = document.getElementById("page-edit-content").value;

            PutPost({
                'title': title,
                'price': price,
                'description': description,
                'content': content
            }, "base");
            break;
        case "tab-fields":
            console.log("表单收集信息提交")
            break
        case "tab-variants":
            console.log("宝贝属性信息提交");
            break;
        case "tab-edit-more":
            console.log("更多设置信息提交");
            break
    }
}