$(document).ready(function () {
    let start = moment().subtract(29, 'days');
    let end = moment();

    let authPages = ["pageEdit", "pages", "dashboard", "account"]

    if (authPages.includes(getRouter(link))) {
        // 首先检查登陆状态
        GetStatus();
    }

    switch (getRouter(link)) {
        case "pages":
            break;
        case "pageEdit":
            try {
            } catch (e) {
            }
            try {
                GetPageAnalysis(start, end, link);
            } catch (e) {

            }
            break;
        case "dashboard":
            break;
        case "account":
            GetUserInfo();
            break;
        case "checkout":
            GetCheckOut(link);
            break;
        default:
            console.log("未知页面");
    }
});