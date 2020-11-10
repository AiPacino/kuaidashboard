let state = [];

function setDefaultState() {
    let baseState = [];

    // 将内容同步保存
    syncState(baseState);
}

function pushToState(title, status, id) {
    let baseState = getState();
    baseState[id] = {id: id, title: title, status: status};
    syncState(baseState);
}

// 改变状态
function setToDone(id) {
    let baseState = getState();
    if (baseState[id].status === 'new') {
        baseState[id].status = 'done'
    } else {
        baseState[id].status = 'new';
    }

    syncState(baseState);
}

// 删除todo
function deleteTodo(id) {
    let baseState = getState();
    delete baseState[id]
    syncState(baseState)
}

// 删除
function resetState() {
    localStorage.setItem("state", null);
}

// 将本地的数据上传
function syncState(state) {
    localStorage.setItem("state", JSON.stringify(state));
}

// 获取本地存储
function getState() {
    // 获取本地存储的内容
    return JSON.parse(localStorage.getItem("state"));
}

// 添加新的元素
function addOption(text, status, id, noUpdate) {

    // 准备好要添加的内容
    id = id ? id : generateID();
    let c = status === "done" ? "danger" : "";

    let item = '<div class="row gutters">' +
        '<div class="col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12">'+
        '<div class="form-group">'+
        '<label for="inputName">选项名</label>'+
        '<input type="text" class="form-control" id="VariantOptionName" placeholder="例如:(红色款,钻石VIP,永久会员等)">' +
        '</div>'+
        '</div>'+
        '<div class="col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12">' +
        '<div class="form-group">' +
        '<label for="inputReadOnly">额外收费金额</label>' +
        '<input class="form-control" type="text" placeholder="额外收费金额">' +
        '</div>' +
        '</div>' +
        '<div class="col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12">' +
        '<div class="form-group">' +
        '<label for="disabledInput">内部标志</label>' +
        '<input type="text" class="form-control" placeholder="内部标志">' +
        '</div>' +
        '</div>' +
        '<div class="col-xl-3 col-lglg-3 col-md-3 col-sm-3 col-12">' +
        '<div class="form-group">' +
        '<label for="disabledInput"></label><br>' +
        '<button onclick="DeleteVariants()" class="btn btn-danger" type="button">' +
        '删除 </button> ' +
        '</div>' +
        '</div>' +
        '</div>';

    $("#variant-options").append(item);


    $(".form-control").hasClass("hidden");
    if ("text" === "") {
        $(".err")
            .removeClass("hidden")
            .addClass("animated bounceIn");
    } else {
        $(".err").addClass("hidden");
        $(".variant-options").append(item);
    }

    $(".refresh").removeClass("hidden");

    $(".no-items").addClass("hidden");

    $(".form-control")
        .val("")
        .attr("placeholder", "✍添加...");
    setTimeout(function () {
        $(".todo-list li").removeClass("animated flipInX");
    }, 500);

    if (!noUpdate) {
        pushToState(text, "new", id);
    }
}


function addItem(text, status, id, noUpdate) {

    // 准备好要添加的内容
    // id = id ? id : generateID();
    // let c = status === "done" ? "danger" : "";
    // let item =
    //     '<li data-id="' +
    //     id +
    //     '" class="animated flipInX ' +
    //     c +
    //     '"><div class="checkbox"><span class="close"><i class="fa fa-times"></i></span><label><span class="checkbox-mask"></span><input type="checkbox" />' +
    //     text +
    //     "</label></div></li>";
    //
    // let isError = $(".form-control").hasClass("hidden");
    //
    // if (text === "") {
    //     $(".err")
    //         .removeClass("hidden")
    //         .addClass("animated bounceIn");
    // } else {
    //     $(".err").addClass("hidden");
    //     $(".todo-list").append(item);
    // }
    //
    // $(".refresh").removeClass("hidden");
    //
    // $(".no-items").addClass("hidden");
    //
    // $(".form-control")
    //     .val("")
    //     .attr("placeholder", "✍添加...");
    // setTimeout(function () {
    //     $(".todo-list li").removeClass("animated flipInX");
    // }, 500);
    //
    // if (!noUpdate) {
    //     pushToState(text, "new", id);
    // }
}

function refresh() {
    $(".todo-list li").each(function (i) {
        $(this)
            .delay(70 * i)
            .queue(function () {
                $(this).addClass("animated bounceOutLeft");
                $(this).dequeue();
            });
    });

    setTimeout(function () {
        $(".todo-list li").remove();
        $(".no-items").removeClass("hidden");
        $(".err").addClass("hidden");
    }, 800);
}

$(function () {
    // let err = $(".err"),
    //     formControl = $(".form-control"),
    //     isError = formControl.hasClass("hidden");
    //
    // if (!isError) {
    //     formControl.blur(function () {
    //         err.addClass("hidden");
    //     });
    // }
    //
    // $(".add-btn").on("click", function () {
    //     let itemVal = $(".form-control").val();
    //     addItem(itemVal);
    //     formControl.focus();
    // });
    //
    // $(".refresh").on("click", refresh);
    //
    // $(".todo-list").on("click", 'input[type="checkbox"]', function () {
    //     let li = $(this)
    //         .parent()
    //         .parent()
    //         .parent();
    //     li.toggleClass("danger");
    //     li.toggleClass("animated flipInX");
    //
    //     setToDone(li.data().id);
    //
    //     setTimeout(function () {
    //         li.removeClass("animated flipInX");
    //     }, 500);
    // });
    //
    // $(".todo-list").on("click", ".close", function () {
    //     let box = $(this)
    //         .parent()
    //         .parent();
    //
    //     if ($(".todo-list li").length == 1) {
    //         box.removeClass("animated flipInX").addClass("animated bounceOutLeft");
    //         setTimeout(function () {
    //             box.remove();
    //             $(".no-items").removeClass("hidden");
    //             $(".refresh").addClass("hidden");
    //         }, 500);
    //     } else {
    //         box.removeClass("animated flipInX").addClass("animated bounceOutLeft");
    //         setTimeout(function () {
    //             box.remove();
    //         }, 500);
    //     }
    //
    //     deleteTodo(box.data().id)
    // });
    //
    // $(".form-control").keypress(function (e) {
    //     if (e.which == 13) {
    //         let itemVal = $(".form-control").val();
    //         addItem(itemVal);
    //     }
    // });
});

function addVariantOption(){
    let name = document.getElementById("VariantOptionName").value;
    let amount = document.getElementById("VariantOptionAdditionalChargeAmount").value;
    let sku = document.getElementById("VariantOptionSku").value;

    console.log("新建选项", name, amount, sku)
    addOption()
}

function AddVariant(element, noUpdate) {

    let variant = '<div class="row gutters">' +
        '<div class="col-lg-12 col-md-12 col-sm-12">' +
        '<div class="table-responsive">' +
        '<table class="table custom-table">' +
        '<thead>' +
        '<tr>' +
        '<th>' + element.name + '</th>' +
        '<th>额外收费</th>' +
        '<th>内部货号</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>content</tbody></table></div></div></div>';

    let temp;
    element.VariantOptions.forEach(function (Option) {
        temp = temp + '<tr><td>'+ Option.name +'</td><td>'+Option.additionalChargeAmount+'</td><td>'+Option.sku+'</td></tr>';
    });

    variant = variant.replace("content",temp)

    $("#variant-options").append(variant);

}

function DeleteVariants(){

}

$(document).ready(function () {
    // 如果是初次打开
    let state = getState();

    // 则设置一个默认值
    if (!state) {
        setDefaultState();
        state = getState();
    }

    // 将存储的内容依次放入
    state.forEach(function (element) {
        AddVariant(element, true);
    });
});
