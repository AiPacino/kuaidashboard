function Ajax() {
    let ajaxData = {
        type: arguments[0].type || "POST",
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "json",
        contentType: arguments[0].contentType || "application/json",
        beforeSend: arguments[0].beforeSend || function () {
        },
        success: arguments[0].success || function () {
        },
        error: arguments[0].error || function () {
        }
    }
    ajaxData.beforeSend()
    let xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    if (localStorage.getItem('token')) {
        xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
    }
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                ajaxData.success(xhr.response)
            } else if (xhr.status == 201) {
                ajaxData.success(xhr.response)
            } else {
                ajaxData.error(xhr)
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data) {
    return JSON.stringify(data)
}