function SetValue(key, type, value) {
    switch (type) {
        case "value":
            document.getElementById(key).innerText = value
            document.getElementById(key).value = value
            break
        default:
            document.getElementById(key).setAttribute(type, value)
    }
}

function SetValueByClassName(key, attr, value) {
    let elms = document.getElementsByClassName(key)
    for (let i = 0; i < elms.length; i++) {
        switch (attr) {
            case "value":
                elms[i].innerText = value
                elms[i].value = value
                break
            default:
                elms[i].setAttribute(attr, value)
        }
    }
}

function ReplaceValue(key, replace, value) {
    let temp = $(key).html()
    let x = temp.replace(replace, value);
    $(key).html("");
    $(key).append(x);
}