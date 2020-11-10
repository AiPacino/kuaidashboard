function GetCheckOut(link) {
    let id = GetPageIdFromUrl(/checkout\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i, link);
    if (id) {
        Ajax({
            url: ApiHost + '/api/v1/checkout/' + id,
            type: "GET",
            success: function (res) {
                ViewCheckOut(res)
            },
            error: function (res) {
                console.log(res.error)
            }
        });
    }
}

function NewOrder(pay_type) {
    let id = GetPageIdFromUrl(/checkout\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i, link);
    if (id) {
        Ajax({
            url: ApiHost + '/api/v1/orders/' + id,
            type: "POST",
            data: {
                "body": {
                    "type": pay_type,
                    "address": "河北省",
                    "phone": "18330267767",
                }
            },
            success: function (res) {
                switch (pay_type) {
                    case "AliPay":
                        if (res.response["action"]["type"] === "GET" && res.response["action"]["method"] === "redirect") {
                            window.location.href = res.response["action"]["url"];
                        }
                        break
                    case "WeChatPay":
                        break
                    default:
                        break
                }
            },
            error: function (res) {
                console.log(res.error)
            }
        });
    }
}
