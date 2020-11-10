var uviPaycheckout_url = 'https://pay.uviba.com/checkout';
var uviPay_elements_url = 'https://pay.uviba.com/iframe_elements/v1';
var uviPayconnect_url = 'https://pay.uviba.com/uviba_connect_api';
var uvi$ = '';

function UviPay() {
    var othis = this;
    this.public_key = false;
    this.setKey = function setKey(public_key) {
        othis.public_key = public_key;
    }
    this.UviPayElement_num = 1;
    this.last_server_info = {};
    this.registered_receiveMessages = {};
    this.onModalClose = function onModalClose(func) {
        if (typeof func === "function") {
            othis.onModalClose = func;
        }
    }
    this.onConnectModalClose = function onConnectModalClose(func) {
        if (typeof func === "function") {
            othis.onConnectModalClose = func;
        }
    }
    this.form_num = 1;
    this.uviba_connect_form_num = 1;
    this.button_ready_forms = [];
    this.createCookie = function createCookie(name, value, days, domain) {
        var expires;
        if (days) {
            var date = new Date();
            var other_text = '';
            if (isset(domain)) {
                other_text = ';domain=' + domain;
            }
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString() + other_text;
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    }
    this.eraseCookie = function eraseCookie(name) {
        othis.createCookie(name, "", -1);
    }
    this.readcookie = function readCookie(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }
    this.renderUviPayButtons = function renderUviPayButtons() {
        var default_button_text = 'Pay by Card';
        var button_text = default_button_text;
        uvi$('.uviPay-button').each(function () {
            if (uvi$(this).hasClass('uviPay-Paybutton')) {
                return true;
            }
            if (uvi$(this).attr('rendered') == 1) {
                return true;
            } else {
                uvi$(this).attr('rendered', 1);
            }
            button_text = uvi$(this).attr('data-button-text')
            if (typeof button_text !== typeof undefined && button_text !== false) {
            } else {
                button_text = uvi$(this).attr('data-button_text')
                if (typeof button_text !== typeof undefined && button_text !== false) {
                } else {
                    button_text = default_button_text;
                }
            }
            var UviPayForm = uvi$(this).closest('form');
            UviPayForm.attr('data-form_num', othis.form_num);
            uvi$(this).attr('data-form_num', othis.form_num);
            var nodes = [], values = [];
            el = uvi$(this).get(0);
            var attr_str = "";
            var add_class = "";
            var add_onclick = "";
            for (var att, i = 0, atts = el.attributes, n = atts.length; i < n; i++) {
                att = atts[i];
                if (att.nodeName.toLowerCase() == 'class') {
                    if (att.nodeValue != 'uviPay-button') {
                        add_class += att.nodeValue;
                    }
                } else if (att.nodeName.toLowerCase() == 'onclick') {
                    add_onclick += att.nodeValue;
                } else {
                    attr_str += " " + att.nodeName + "=" + att.nodeValue + " ";
                }
            }
            var data_no_buton = uvi$(this).attr('data-no-button');
            if (!uvi_isset(data_no_buton)) {
                data_no_buton = uvi$(this).attr('data-nobutton');
            }
            if (data_no_buton == 1 || data_no_buton === true || data_no_buton == 'true') {
            } else {
                uvi$(this).hide();
                if (uvi$('.uviPay-Paybutton[data-form_num="' + othis.form_num + '"]').length == 0) {
                    uvi$(this).after('<button  onclick="uviPay_openPaymentModal(' + othis.form_num + ');event.preventDefault();' + add_onclick + '" class="uviPay-Paybutton ' + add_class + '"\
          data-form_num="' + othis.form_num + '" ><span>' + button_text + '<img src="https://www.uviba.com/favicon-16x16.png" style="\
    border-radius: 100%;\
    position: absolute;\
    top: 12px;\
    left: 11px;display:none;\
"><img src="https://www.uviba.com/favicon-16x16.png" style="\
    border-radius: 100%;\
    position: absolute;\
    top: 12px;\
    right: 11px;display:none;\
"></span></button>');
                }
            }
            othis.CallButtonReady(othis.form_num);
            othis.form_num++;
        });
    }
    this.renderUvibaConnectButtons = function renderUvibaConnectButtons() {
        var default_button_text = "Uviba Connect";
        uvi$('.uviPay-connect-button').each(function () {
            if (uvi$(this).attr('rendered') == 1) {
                return true;
            } else {
                uvi$(this).attr('rendered', 1);
            }
            button_text = uvi$(this).attr('data-button-text');
            if (typeof button_text !== typeof undefined && button_text !== false) {
            } else {
                button_text = default_button_text;
            }
            var UviPayForm = uvi$(this).closest('form');
            UviPayForm.attr('data-uviba_connect_form_num', othis.uviba_connect_form_num);
            uvi$(this).attr('data-uviba_connect_form_num', othis.uviba_connect_form_num);
            var data_no_buton = uvi$(this).attr('data-no-button');
            if (!uvi_isset(data_no_buton)) {
                data_no_buton = uvi$(this).attr('data-nobutton');
            }
            if (data_no_buton == 1 || data_no_buton === true || data_no_buton == 'true') {
                uvi$(this).hide();
            } else {
                uvi$(this).after('<button style="\
    border-radius: 50px !important;\
" onclick="uviPay_ConnectRequest(' + othis.uviba_connect_form_num + ');event.preventDefault();" class="uviPay-Connectbutton"\
          data-uviba_connect_form_num="' + othis.uviba_connect_form_num + '" ><span>' + button_text + '<img src="https://www.uviba.com/favicon-16x16.png" style="\
    border-radius: 100%;\
    position: absolute;\
    top: 12px;\
    left: 11px;display:none;\
"><img src="https://www.uviba.com/favicon-16x16.png" style="\
    border-radius: 100%;\
    position: absolute;\
    top: 12px;\
    right: 11px;display:none;\
"></span></button>');
            }
            othis.form_num++;
        });
    }
    this.render_buttons = function render_buttons() {
        othis.renderUviPayButtons();
        othis.renderUvibaConnectButtons();
    }
    this.CallButtonReady = function CallButtonReady(form_num) {
        othis.button_ready_forms.push(form_num);
        othis.onButtonReady(form_num);
    }
    this.onButtonReady = function onButtonReady(func_formNum) {
        if (typeof func_formNum === "function") {
            othis.onButtonReady = func_formNum;
            for (var i = 0; i < othis.button_ready_forms.length; i++) {
                othis.onButtonReady(othis.button_ready_forms[i]);
            }
        }
    }
    this.onPaymentSucceed = function onPaymentSucceed(func) {
        if (typeof func === "function") {
            othis.onPaymentSucceed = func;
        }
    }
    this.onUvibaConnectSucceed = function onUvibaConnectSucceed(func) {
        if (typeof func === "function") {
            othis.onPaymentSucceed = func;
        }
    }
    this.onAjaxSuccess = function onAjaxSuccess(form_num, data) {
        if (typeof form_num === "function") {
            othis.onAjaxSuccess = form_num;
        }
    }
    this.addFields = function addFields(new_fields_ar, form_num, params) {
        if (!uvi_isset(params)) {
            params = {};
        }
        if (!uvi_isset(params.return)) {
            params.return = false;
        }
        if (!uvi_isset(params.input_name)) {
            params.input_name = '';
        }
        if (!uvi_isset(params.input_fields)) {
            params.input_fields = '';
        }
        if (!uvi_isset(params.input_type)) {
            params.input_type = 'text';
        }
        uvi$.each(new_fields_ar, function (key, val) {
            var new_input_name = '';
            if (params.input_name == '') {
                new_input_name = key;
            } else {
                new_input_name = params.input_name + '[' + key + ']';
            }
            if (uvi$.isArray(val) || typeof val == 'object') {
                params.input_fields = params.input_fields + othis.addFields(val, form_num, {
                    'return': true,
                    'input_name': new_input_name,
                    'input_type': params.input_type
                });
            } else {
                params.input_fields = params.input_fields + '<input type="' + params.input_type + '" name="' + new_input_name + '" value="' + val + '" >';
            }
        });
        if (params.return === true) {
            return params.input_fields;
        } else {
            uvi$('.uviPay-button[data-form_num=' + form_num + ']').closest('form').append(params.input_fields);
        }
    }
    this.onAjaxFailed = function onAjaxFailed(form_num, data) {
        if (typeof form_num === "function") {
            othis.onAjaxFailed = form_num;
        }
    }
    this.getPrepareLoading = function getPrepareLoading() {
        return '<div class="fullscreen_elem prepare_login_loading_container_js"><div style="\
    position: absolute;\
    left: 50%;\
    top: 50%;\
    transform: translate(-50%, -50%);\
">\
<svg style="height:25px;    position: absolute;    left: 50%;    top: 50%;    transform: translate(-50%, -50%);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="401.998px" height="401.998px" viewBox="0 0 401.998 401.998" xml:space="preserve"><g><path d="M357.45,190.721c-5.331-5.33-11.8-7.993-19.417-7.993h-9.131v-54.821c0-35.022-12.559-65.093-37.685-90.218 C266.093,12.563,236.025,0,200.998,0c-35.026,0-65.1,12.563-90.222,37.688C85.65,62.814,73.091,92.884,73.091,127.907v54.821 h-9.135c-7.611,0-14.084,2.663-19.414,7.993c-5.33,5.326-7.994,11.799-7.994,19.417V374.59c0,7.611,2.665,14.086,7.994,19.417 c5.33,5.325,11.803,7.991,19.414,7.991H338.04c7.617,0,14.085-2.663,19.417-7.991c5.325-5.331,7.994-11.806,7.994-19.417V210.135 C365.455,202.523,362.782,196.051,357.45,190.721z M274.087,182.728H127.909v-54.821c0-20.175,7.139-37.402,21.414-51.675 c14.277-14.275,31.501-21.411,51.678-21.411c20.179,0,37.399,7.135,51.677,21.411c14.271,14.272,21.409,31.5,21.409,51.675V182.728 z" style="fill: rgb(47, 153, 58);"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>\
<div id="prepare_login_loading" ></div>\
</span></div>';
    }
    this.InsertPrepareLoading = function InsertPrepareLoading() {
        uvi$('body').append(othis.getPrepareLoading());
    }
    this.RemovePrepareLoading = function RemovePrepareLoading() {
        uvi$('.prepare_login_loading_container_js').remove();
    }
    this.create_autoOpen_iframe = function create_autoOpen_iframe(params) {
        uvi$('body').append('iframe');
    }
    this.openPaymentWindow = function openPaymentWindow(params) {
        othis.create_autoOpen_iframe(params);
    }
    this.runAfterReady_func_ar = [];
    this.runAfterReady_func_num = 1;
    this.runAfterJqueryReady = function runAfterJqueryReady(func) {
        var temp_func_num = othis.runAfterReady_func_num;
        othis.runAfterReady_func_ar[temp_func_num] = setInterval(function () {
            if (uvi$ != '') {
                if (othis.runAfterReady_func_ar[temp_func_num] != false) {
                    clearInterval(othis.runAfterReady_func_ar[temp_func_num]);
                    othis.runAfterReady_func_ar[temp_func_num] = false;
                    func();
                }
            }
        }, 100);
        othis.runAfterReady_func_num++;
    }
    var UviPayElement_num = 1;
    this.createElement = function createElement(selector, params) {
        var UviPayElement_num_temp = UviPayElement_num;
        othis.runAfterJqueryReady(function () {
            if (uvi_isset(params.public_key)) {
                othis.public_key = public_key;
            }
            var element_type = 'inline-card';
            if (uvi_isset(params.elementType)) {
                element_type = elementType;
            }
            var user_email = 'noemail@uviba.com';
            if (uvi_isset(params.user_email)) {
                user_email = params.user_email;
            }
            var prepared_get_send_data = '';
            for (var i in params) {
                prepared_get_send_data += '&' + i + '=' + params[i];
            }
            if (prepared_get_send_data != '') {
                prepared_get_send_data = '&' + prepared_get_send_data;
            }
            if (element_type == 'inline-card') {
                uvi$(selector).html('<iframe frameborder="0" allowtransparency="true" scrolling="no" \
            name="__UviPayElement_num' + UviPayElement_num_temp + '" id="__UviPayElement_num' + UviPayElement_num_temp + '"\
             allowpaymentrequest="true" \
             src="' + uviPay_elements_url + '?public_key=' + othis.public_key + '&user_email=' + user_email + '' + prepared_get_send_data + '"\
              title="Secure payment input frame" style="border: none !important; margin: 0px !important; padding: 0px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; user-select: none !important; height: 19.2px;"></iframe>');
                document.getElementById('__UviPayElement_num' + UviPayElement_num_temp).onload = (function () {
                    setTimeout(function () {
                        try {
                            var post_data = {};
                            post_data.from_uviba = 1;
                            post_data.UviPayElement_num = UviPayElement_num_temp;
                            post_data.parent_url = document.location.href;
                            XD.postMessage(JSON.stringify(post_data), uviPay_elements_url, document.getElementById('__UviPayElement_num' + UviPayElement_num_temp).contentWindow);
                        } catch (e) {
                        }
                    }, 100);
                    XD.receiveMessage(function (message) {
                        var mes_text = message.data;
                        if (mes_text == 'live') {
                            return;
                        }
                        var data = false;
                        try {
                            data = JSON.parse(mes_text);
                        } catch (e) {
                        }
                        if (data.type == 'event') {
                            try {
                                if (typeof othis.element_events_ar[data.UviPayElement_num][data.event_name] === "function") {
                                    othis.element_events_ar[data.UviPayElement_num][data.event_name](data.event_message);
                                }
                            } catch (e) {
                            }
                        }
                    }, document.getElementById('__UviPayElement_num' + UviPayElement_num_temp).contentWindow);
                });
            }
        });
        UviPayElement_num++;
        return UviPayElement_num_temp;
    }
    this.element_events_ar = {};
    this.elementOn = function elementOn(event_name, func, UviPayElement_num) {
        if (!uvi_isset(othis.element_events_ar[UviPayElement_num])) {
            othis.element_events_ar[UviPayElement_num] = {};
        }
        othis.element_events_ar[UviPayElement_num][event_name] = func;
    };
    this.runAfterElementReady = function runAfterElementReady(selector, func) {
        var temp_func_num = othis.runAfterReady_func_num;
        othis.runAfterJqueryReady(function () {
            othis.runAfterReady_func_ar[temp_func_num] = setInterval(function () {
                if (uvi$(selector).length != 0) {
                    func();
                    clearInterval(othis.runAfterReady_func_ar[temp_func_num]);
                }
            }, 100);
            othis.runAfterReady_func_num++;
        });
    }
    this.old_uviba_element_iframe_full_screen_style = '';
    this.createElementToken = function createElementToken(UviPayElement_num_temp, func, amount) {
        othis.runAfterElementReady('#__UviPayElement_num' + UviPayElement_num_temp, function () {
            var post_data = {};
            post_data.from_uviba = 1;
            post_data.UviPayElement_num = UviPayElement_num_temp;
            if (uvi_isset(amount)) {
                post_data.amount = amount;
            }
            post_data.createElementToken = 1;
            othis.elementOn('createElementToken', func, UviPayElement_num_temp);
            othis.elementOn('uviba_element_iframe_full_screen', function (active) {
                if (active == 1) {
                    othis.old_uviba_element_iframe_full_screen_style = $('#__UviPayElement_num' + UviPayElement_num_temp).attr('style');
                    $('#__UviPayElement_num' + UviPayElement_num_temp).attr('style', othis.old_uviba_element_iframe_full_screen_style + ';' + 'position: fixed !important;top: 0 !important;left: 0px !important;height: 100% !important;z-index: 999999999999999;width: 100% !important;')
                } else {
                    $('#__UviPayElement_num' + UviPayElement_num_temp).attr('style', othis.old_uviba_element_iframe_full_screen_style)
                }
            }, UviPayElement_num_temp);
            XD.postMessage(JSON.stringify(post_data), uviPay_elements_url, document.getElementById('__UviPayElement_num' + UviPayElement_num_temp).contentWindow);
        });
    };
}

var UviPay = new UviPay();

function uvi_isset(variablex) {
    if (typeof variablex != "undefined" && variablex !== null && variablex !== false) {
        return true;
    } else {
        return false;
    }
}

var XD = function () {
    var interval_id, last_hash, cache_bust = 1, attached_callback, window = this;
    return {
        postMessage: function (message, target_url, target) {
            if (!target_url) {
                return;
            }
            target = target || parent;
            if (window['postMessage']) {
                target['postMessage'](message, target_url.replace(/([^:]+:\/\/[^\/]+).*/, '$1'));
            } else if (target_url) {
                target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
            }
        }, receiveMessage: function (callback, source_origin) {
            if (window['postMessage']) {
                if (callback) {
                    attached_callback = function (e) {
                        if ((typeof source_origin === 'string' && e.origin !== source_origin) || (Object.prototype.toString.call(source_origin) === "[object Function]" && source_origin(e.origin) === !1)) {
                            return !1;
                        }
                        callback(e);
                    };
                }
                if (window['addEventListener']) {
                    window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, !1);
                } else {
                    window[callback ? 'attachEvent' : 'detachEvent']('onmessage', attached_callback);
                }
            } else {
                interval_id && clearInterval(interval_id);
                interval_id = null;
                if (callback) {
                    interval_id = setInterval(function () {
                        var hash = document.location.hash, re = /^#?\d+&/;
                        if (hash !== last_hash && re.test(hash)) {
                            last_hash = hash;
                            callback({data: hash.replace(re, '')});
                        }
                    }, 100);
                }
            }
        }
    };
}();
var uvipay_render_callback_allow = 0;
var uvipay_render_callback = function () {
    if (uvipay_render_callback_allow == 0) {
        return false;
    } else {
        uvipay_render_callback_allow = 0;
    }
    uvi$ = $.noConflict(true);
    uvi$('head').prepend('<style>\
        .uviPay-Paybutton,.uviPay-Connectbutton{\
\
 width: 200px;\
    height: 43px;\
    max-width: 100%;\
    overflow: hidden;\
    display: inline-block;\
    visibility: visible !important;\
    -webkit-font-smoothing: antialiased;\
    border: 0;\
    padding: 1px;\
    text-decoration: none;\
    -webkit-border-radius: 5px;\
    -moz-border-radius: 5px;\
    -ms-border-radius: 5px;\
    -o-border-radius: 5px;\
    border-radius: 5px;\
    -webkit-touch-callout: none;\
    -webkit-tap-highlight-color: transparent;\
    -webkit-user-select: none;\
    -moz-user-select: none;\
    -ms-user-select: none;\
    -o-user-select: none;\
    user-select: none;\
    cursor: pointer;background: #2d6cbb;\
    font-family: sans-serif;-webkit-transition: 0.2s all;-moz-transition: 0.2s all;-o-transition: 0.2s all;-ms-transition: 0.2s all;transition:0.2s all;\
\
	 }\
	 \
	.uviPay-Paybutton span,.uviPay-Connectbutton span{\
    display: block;\
    position: relative;\
    padding: 0 12px;\
    height: 30px;\
    line-height: 30px;\
    background: #2d6cbb;\
    font-size: 14px;\
    color: #fff;\
    font-weight: bold;\
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;\
    text-shadow: 0 -1px 0 rgba(0,0,0,0.25);\
    -webkit-border-radius: 4px;\
    -moz-border-radius: 4px;\
    -ms-border-radius: 4px;\
    -o-border-radius: 4px;\
    border-radius: 4px;\
    height: 100%;\
    padding: 5px;\
    font-family: sans-serif;-webkit-transition: 0.2s all;-moz-transition: 0.2s all;-o-transition: 0.2s all;-ms-transition: 0.2s all;transition:0.2s all;\
}\
.uviPay-Paybutton span:hover,.uviPay-Connectbutton span:hover{ \
   \
    background:#235aa0;\
}\
.uviPay-Paybutton span:active, .uviPay-Connectbutton span:active{ \
   -webkit-box-shadow: inset 0 1px 0 rgba(72, 66, 66, 0.25);\
    -moz-box-shadow: inset 0 1px 0 rgba(72, 66, 66, 0.25);\
    -ms-box-shadow: inset 0 1px 0 rgba(72, 66, 66, 0.25);\
    -o-box-shadow: inset 0 1px 0 rgba(72, 66, 66, 0.25);\
    box-shadow: inset 0 1px 0 rgba(72, 66, 66, 0.25);\
    background:#23518c;\
}\
.uviPay-Paybutton:focus,.uviPay-Connectbutton:focus{outline:none; \
   \
}\
.uviPay-Paybutton:active,.uviPay-Connectbutton:active{\
  outline:none; \
   -webkit-box-shadow: inset 0 1px 0 rgba(72, 66, 66, 0.25);\
    -moz-box-shadow: inset 0 1px 0 rgba(72, 66, 66, 0.25);\
    -ms-box-shadow: inset 0 1px 0 rgba(72, 66, 66, 0.25);\
    -o-box-shadow: inset 0 1px 0 rgba(72, 66, 66, 0.25);\
    box-shadow: inset 0 1px 0 rgba(72, 66, 66, 0.25);\
    background:#23518c;\
}\
\
.uviPay-Paybutton:hover,uviPay-Connectbutton:hover{ \
  \
    background:#235aa0;\
    background-color:#235aa0;\
}\
\
.uviPayCheckoutFrame,.uviPayConnectFrame,.fullscreen_elem{\
z-index: 2147483647;\
    display: block;\
    /*background: rgba(0, 0, 0, 0.004);*/\
    border: 0px none transparent;\
    overflow-x: hidden;\
    overflow-y: auto;\
    visibility: visible;\
    margin: 0px;\
    padding: 0px;\
    -webkit-tap-highlight-color: transparent;\
    position: fixed;\
    left: 0px;\
    top: 0px;\
    width: 100%;\
    height: 100%;\
}\
.fullscreen_elem{\
z-index:99999;\
\
}\
\
\
\
/* prepare_login_loading */\
@-webkit-keyframes prepare_login_loading {\
  to { -webkit-transform: rotate(360deg); }\
}\
@-moz-keyframes prepare_login_loading {\
	to { -moz-transform: rotate(360deg); }\
}\
@-ms-keyframes prepare_login_loading {\
	to { -ms-transform: rotate(360deg); }\
}\
@keyframes prepare_login_loading {\
	to { transform: rotate(360deg); }\
}\
\
/* Loader (*/\
#prepare_login_loading {\
\
	width: 40px;\
	height: 40px;\
	border-radius: 100%;\
	background: transparent;\
	\
    border-top: 4px solid #cbcbca;\
    border-right: 4px solid #cbcbca;\
    border-bottom: 4px solid #cbcbca;\
    border-left: 4px solid #2380be;\
	\
	-webkit-animation: prepare_login_loading 0.9s infinite linear;\
	-moz-animation: prepare_login_loading 0.9s infinite linear;\
	-ms-animation: prepare_login_loading 0.9s infinite linear;\
	animation: prepare_login_loading 0.9s infinite linear;\
	\
}\
\
\
\
\
\
	 </style>');
    UviPay.render_buttons();
}
var UvicheckTimeOut;

function uviPay_openPaymentModal(form_num) {
    var iframe_id = 'uviPayCheckoutFrame' + form_num;
    var description = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-description');
    if (!uvi_isset(description)) {
        description = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-description');
    }
    var data_image = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-image');
    if (!uvi_isset(data_image)) {
        data_image = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-image');
    }
    var data_name = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-name');
    if (!uvi_isset(data_name)) {
        data_name = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-name');
    }
    var data_email = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-email');
    if (!uvi_isset(data_email)) {
        data_email = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-email');
    }
    var data_amount = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-amount');
    if (!uvi_isset(data_amount)) {
        data_amount = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-amount');
    }
    var data_verify = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-verify');
    if (!uvi_isset(data_verify)) {
        data_verify = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-verify');
    }
    var data_amount_string = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-amount_string');
    if (!uvi_isset(data_amount_string)) {
        data_amount_string = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-amount_string');
    }
    var data_custom_pay_text = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-custom_pay_text');
    if (!uvi_isset(data_custom_pay_text)) {
        data_custom_pay_text = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-custom_pay_text');
    }
    var data_save = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-save');
    if (!uvi_isset(data_save)) {
        data_save = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-save');
    }
    if (!uvi_isset(data_save)) {
        data_save = false;
    } else {
        if (data_save == 1 || data_save == true || data_save == 'true') {
            data_save = true;
        } else {
            data_save = false;
        }
    }
    var data_public_key = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-public_key');
    if (!uvi_isset(data_public_key)) {
        data_public_key = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-key');
    }
    if (!uvi_isset(data_public_key)) {
        data_public_key = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-public_key');
        if (!uvi_isset(data_public_key)) {
            data_public_key = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-key');
        }
    }
    if (!uvi_isset(data_public_key)) {
        alert("Please define public key, you can find it from dashboard of UviPay. \
		You can define it setting 'data-public_key' attribute to script element which has 'uviPay-button' class and form number " + form_num);
        return false;
    }
    var subscription = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-subscription');
    if (!uvi_isset(subscription) && subscription != false) {
        subscription = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-subscription');
    }
    var subs_trial_days = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-subs_trial_days');
    if (!uvi_isset(subs_trial_days)) {
        subs_trial_days = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-subs_trial_days');
    }
    var subs_trial_ends = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-subs_trial_ends');
    if (!uvi_isset(subs_trial_ends)) {
        subs_trial_ends = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-subs_trial_ends');
    }
    var connected_subs_id = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-connected_subs_id');
    if (!uvi_isset(connected_subs_id)) {
        connected_subs_id = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-connected_subs_id');
    }
    if (!uvi_isset(connected_subs_id)) {
        connected_subs_id = '';
    }
    var subs_plan = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-subs_plan');
    if (!uvi_isset(subs_plan)) {
        subs_plan = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-subs_plan');
    }
    var subs_package_name = uvi$('.uviPay-button[data-form_num=' + form_num + ']').attr('data-subs_package_name');
    if (!uvi_isset(subs_package_name)) {
        subs_package_name = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-subs_package_name');
    }
    var data_of_original_form = uvi$('.uviPay-button[data-form_num=' + form_num + ']').data();
    var data_of_general_script_tag = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').data();
    var data_of_current_form = uvi$.extend({}, data_of_general_script_tag, data_of_original_form);
    if (!uvi_isset(subs_package_name)) {
        subs_package_name = '';
    }
    if (!uvi_isset(subs_plan)) {
        subs_plan = '';
    }
    if (!uvi_isset(subs_trial_ends)) {
        subs_trial_ends = '';
    }
    if (!uvi_isset(subs_trial_days)) {
        subs_trial_days = '';
    }
    if (!uvi_isset(subscription)) {
        subscription = false;
    }
    if (!uvi_isset(description)) {
        description = '';
    }
    if (!uvi_isset(data_email)) {
        data_email = '';
    }
    if (!uvi_isset(data_image)) {
        data_image = '';
    }
    if (!uvi_isset(data_name)) {
        data_name = '';
    }
    if (subscription == true) {
        if (subs_plan == '') {
            alert('Please define data-subs_plan="{ monthly | yearly } to create subscription charge."');
            return false;
        }
    }
    var only_verify = false;
    if (data_verify == "verify_card") {
        only_verify = true;
    }
    if (!uvi_isset(data_amount) && only_verify == false && data_save == false) {
        if (data_public_key.indexOf('pk_test') !== -1) {
            alert("\
    Please set 'data-amount' attribute to script element which has 'uviPay-button' class.\
     None beside you will be able to set data-amount because amount also will be checked in backend.\
     data-amount in front-end and in backend should be exactly the same, otherwise payment will fail and our API will help\
     you catch the error.\
    ");
        } else {
        }
        return false;
        data_amount = '';
    } else if (data_amount < 51 && only_verify == false && data_save == false) {
        alert("data-amount should be more than 51 (cents or smallest possible unit) because we don't want you to lose money due to fees.");
        return false;
    }
    if (!uvi_isset(data_amount_string)) {
        data_amount_string = '';
    }
    var manipulate_url = '';
    UviPay.InsertPrepareLoading();
    try {
        clearTimeout(UvicheckTimeOut);
    } catch (e) {
    }
    UvicheckTimeOut = setTimeout(function () {
    }, 18500);
    setTimeout(function () {
        var prepared_get_send_data = '';
        for (var i in data_of_current_form) {
            prepared_get_send_data += '&' + i + '=' + data_of_current_form[i];
        }
        uvi$('<iframe>', {
            src: uviPaycheckout_url + '?public_key=' + data_public_key + prepared_get_send_data + manipulate_url + '#' + encodeURIComponent(document.location.href),
            class: 'uviPayCheckoutFrame',
            id: iframe_id,
            frameborder: 0,
            scrolling: 'no',
            onerror: function () {
            }
        }).appendTo('body');
        document.getElementById(iframe_id).onload = (function () {
            clearTimeout(UvicheckTimeOut);
            UviPay.RemovePrepareLoading()
            var post_data = {};
            post_data['data_save'] = data_save;
            post_data['data_image'] = data_image;
            post_data['data_name'] = data_name;
            post_data['data_email'] = data_email;
            post_data['data_amount'] = data_amount;
            post_data['data_verify'] = data_verify;
            post_data['data_amount_string'] = data_amount_string;
            post_data['description'] = description;
            post_data['data_public_key'] = data_public_key;
            post_data['data_custom_pay_text'] = data_custom_pay_text;
            post_data['subs_package_name'] = subs_package_name;
            post_data['subs_plan'] = subs_plan;
            post_data['subs_trial_ends'] = subs_trial_ends;
            post_data['subs_trial_days'] = subs_trial_days;
            post_data['subscription'] = subscription;
            post_data['connected_subs_id'] = connected_subs_id;
            post_data['isLive'] = true;
            try {
                XD.postMessage(JSON.stringify(post_data), uviPaycheckout_url, document.getElementById(iframe_id).contentWindow);
            } catch (e) {
            }
            UvicheckTimeOut = setTimeout(function () {
            }, 18500);
            if (!uvi_isset(UviPay.registered_receiveMessages[form_num])) {
                UviPay.registered_receiveMessages[form_num] = true;
                XD.receiveMessage(function (message) {
                    var mes_text = message.data;
                    if (mes_text == 'live') {
                        clearTimeout(UvicheckTimeOut);
                    }
                    if (mes_text == 'close' || mes_text == 'success_close') {
                        var user_did = true;
                        if (mes_text == 'success_close') {
                            user_did = false;
                        }
                        UviPay.onModalClose(form_num, user_did, UviPay.last_server_info[form_num]);
                        uvi$('#' + iframe_id).remove();
                    }
                    if (mes_text == 'success_close') {
                        var server_data = UviPay.last_server_info[form_num];
                        if (server_data.error != false) {
                            alert('Payment declined');
                        } else {
                            if (uvi_isset(server_data.token)) {
                                var onPaymentSucceed_callback = UviPay.onPaymentSucceed(form_num, server_data.token);
                                if (onPaymentSucceed_callback === false) {
                                    return false;
                                }
                                var TargetForm = uvi$('form[data-form_num="' + form_num + '"]');
                                var ajax_submit = uvi$('.uviPay-button[data-form_num="' + form_num + '"]').attr('data-submit-ajax');
                                if (!uvi_isset(ajax_submit)) {
                                    ajax_submit = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-submit-ajax');
                                }
                                if (UviPay.readcookie('uviba_params')) {
                                    var uviba_params_fields = '';
                                    try {
                                        uviba_params_fields = JSON.parse(UviPay.readcookie('uviba_params'));
                                    } catch (e) {
                                    }
                                    UviPay.addFields({'uviba_params': uviba_params_fields}, form_num, {'input_type': 'hidden'});
                                    eraseCookie('uviba_params');
                                }
                                if (ajax_submit == 1 || ajax_submit === true || ajax_submit == 'true') {
                                    var datastring = TargetForm.serialize();
                                    if (uvi$.trim(datastring) != '') {
                                        datastring += '&';
                                    }
                                    datastring += 'UvibaToken=' + server_data.token
                                    var request_mod = 'GET';
                                    if (uvi_isset(TargetForm.attr('method'))) {
                                        request_mod = TargetForm.attr('method');
                                    }
                                    uvi$.ajax({
                                        type: request_mod,
                                        url: TargetForm.attr('action'),
                                        data: datastring,
                                        success: function (server_data) {
                                            UviPay.onAjaxSuccess(form_num, server_data);
                                        },
                                        error: function () {
                                            UviPay.onAjaxFailed(form_num);
                                        }
                                    });
                                } else {
                                    TargetForm.append('<input type="hidden" name="UvibaToken" value="' + server_data.token + '" />');
                                    TargetForm.submit();
                                }
                            } else {
                                alert('Payment declined');
                            }
                        }
                    }
                    try {
                        var data = JSON.parse(mes_text);
                        if (uvi_isset(data.server_data)) {
                            UviPay.last_server_info[form_num] = data.server_data;
                        }
                    } catch (e) {
                    }
                }, document.getElementById(iframe_id).contentWindow);
            }
        });
    }, 200);
}

var UvibaConnectTimeOut;

function uviPay_ConnectRequest(form_num) {
    var iframe_id = 'uviPayConnectFrame' + form_num;
    var data_fullname = uvi$('.uviPay-connect-button[data-uviba_connect_form_num=' + form_num + ']').attr('data-fullname');
    if (!uvi_isset(data_fullname)) {
        data_fullname = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-fullname');
    }
    var data_email = uvi$('.uviPay-connect-button[data-uviba_connect_form_num=' + form_num + ']').attr('data-email');
    if (!uvi_isset(data_email)) {
        data_email = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-email');
    }
    var data_public_key = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-public_key');
    if (!uvi_isset(data_public_key)) {
        data_public_key = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-key');
    }
    if (!uvi_isset(data_public_key)) {
        data_public_key = uvi$('.uviPay-connect-button[data-uviba_connect_form_num=' + form_num + ']').attr('data-public_key');
        if (!uvi_isset(data_public_key)) {
            data_public_key = uvi$('.uviPay-connect-button[data-uviba_connect_form_num=' + form_num + ']').attr('data-key');
        }
    }
    if (!uvi_isset(data_public_key)) {
        alert("Please define public key, you can find it from dashboard of UviPay. \
    You can define it setting 'data-public_key' attribute to script element which has 'uviPay-button' class.");
        return false;
    }
    if (!uvi_isset(data_email)) {
        data_email = '';
    }
    if (!uvi_isset(data_fullname)) {
        data_name = '';
    }
    var manipulate_url = '';
    UviPay.InsertPrepareLoading();
    try {
        clearTimeout(UvibaConnectTimeOut);
    } catch (e) {
    }
    UvibaConnectTimeOut = setTimeout(function () {
    }, 18500);
    setTimeout(function () {
        uvi$('<iframe>', {
            src: uviPayconnect_url + '?fullname=' + data_fullname + '&data_email=' + data_email + '&public_key=' + data_public_key + manipulate_url + '#' + encodeURIComponent(document.location.href),
            class: 'uviPayConnectFrame',
            id: iframe_id,
            frameborder: 0,
            scrolling: 'no',
            onerror: function () {
            }
        }).appendTo('body');
        document.getElementById(iframe_id).onload = (function () {
            clearTimeout(UvibaConnectTimeOut);
            UviPay.RemovePrepareLoading()
            var post_data = {};
            post_data['data_fullname'] = data_fullname;
            post_data['data_email'] = data_email;
            post_data['data_public_key'] = data_public_key;
            post_data['isLive'] = true;
            try {
                XD.postMessage(JSON.stringify(post_data), uviPayconnect_url, document.getElementById(iframe_id).contentWindow);
            } catch (e) {
            }
            UvibaConnectTimeOut = setTimeout(function () {
            }, 18500);
            if (!uvi_isset(UviPay.registered_receiveMessages[form_num])) {
                UviPay.registered_receiveMessages[form_num] = true;
                XD.receiveMessage(function (message) {
                    var mes_text = message.data;
                    if (mes_text == 'live') {
                        clearTimeout(UvibaConnectTimeOut);
                    }
                    if (mes_text == 'close' || mes_text == 'success_close') {
                        var user_did = true;
                        if (mes_text == 'success_close') {
                            user_did = false;
                        }
                        UviPay.onConnectModalClose(form_num, UviPay.last_server_info[form_num], user_did);
                        uvi$('#' + iframe_id).remove();
                    }
                    if (mes_text == 'success_close') {
                        var server_data = UviPay.last_server_info[form_num];
                        if (server_data.error != false) {
                            alert("Connection Failed.");
                        } else {
                            if (uvi_isset(server_data.success_data.gateway_connection_token)) {
                                server_data.gateway_connection_token = server_data.success_data.gateway_connection_token;
                                var onPaymentSucceed_callback = UviPay.onUvibaConnectSucceed(form_num, server_data.gateway_connection_token);
                                if (onPaymentSucceed_callback === false) {
                                    return false;
                                }
                                var TargetForm = uvi$('form[data-uviba_connect_form_num="' + form_num + '"]');
                                var ajax_submit = uvi$('.uviPay-connect-button[data-uviba_connect_form_num="' + form_num + '"]').attr('data-submit-ajax');
                                if (!uvi_isset(ajax_submit)) {
                                    ajax_submit = uvi$('script[src="https://api.uviba.com/js/checkout.js"]').attr('data-submit-ajax');
                                }
                                if (ajax_submit == 1 || ajax_submit === true || ajax_submit == 'true') {
                                    var datastring = TargetForm.serialize();
                                    if (uvi$.trim(datastring) != '') {
                                        datastring += '&';
                                    }
                                    datastring += 'UvibaConnectionToken=' + server_data.gateway_connection_token
                                    var request_mod = 'GET';
                                    if (uvi_isset(TargetForm.attr('method'))) {
                                        request_mod = TargetForm.attr('method');
                                    }
                                    uvi$.ajax({
                                        type: request_mod,
                                        url: TargetForm.attr('action'),
                                        data: datastring,
                                        success: function (server_data) {
                                            UviPay.onAjaxSuccess(form_num, server_data);
                                        },
                                        error: function () {
                                            UviPay.onAjaxFailed(form_num);
                                        }
                                    });
                                } else {
                                    TargetForm.append('<input type="hidden" name="UvibaConnectionToken" value="' + server_data.gateway_connection_token + '" />');
                                    TargetForm.submit();
                                }
                            } else {
                                alert('Connection Failed');
                            }
                        }
                    }
                    try {
                        var data = JSON.parse(mes_text);
                        if (uvi_isset(data.server_data)) {
                            UviPay.last_server_info[form_num] = data.server_data;
                        }
                    } catch (e) {
                    }
                }, document.getElementById(iframe_id).contentWindow);
            }
        });
    }, 200);
}

if (uvi$ == '') {
    uvipay_render_callback_allow = 1;
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
    script.onload = uvipay_render_callback;
    document.getElementsByTagName('head')[0].appendChild(script);
}