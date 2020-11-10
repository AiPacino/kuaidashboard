function NewPage() {
    let page_title = document.getElementById("page_title").value;
    let price = document.getElementById("price").value;

    Ajax({
        url: ApiHost + '/api/v1/posts',
        data: {
            'title': page_title,
            'price': price,
        },
        success: function (res) {
            location.reload();
        },
        error: function (res) {
            console.log(res.error)
        }
    });
}