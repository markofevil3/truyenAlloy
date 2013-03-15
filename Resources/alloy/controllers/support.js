function Controller() {
    function sendSupport() {
        if (textArea.value.length > 20) {
            sendButton.enabled = !1;
            Alloy.Globals.getAjax("/support", {
                content: textArea.value
            }, function(response) {
                alert("Yêu cầu của bạn đã được gửi đi!");
                sendButton.enabled = !0;
                textArea.value = "";
            });
        } else alert("Nội dung quá ngắn!");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.supportWindow = Ti.UI.createWindow({
        backgroundImage: "/common/setting_bg.png",
        barImage: "/common/top.png",
        id: "supportWindow",
        title: "Yêu Cầu Truyện"
    });
    $.addTopLevelView($.__views.supportWindow);
    $.__views.wrapperView = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        backgroundColor: "#eabf8b",
        backgroundImage: "/common/setting_bg.png",
        layout: "vertical",
        id: "wrapperView"
    });
    $.__views.supportWindow.add($.__views.wrapperView);
    $.__views.textLabel = Ti.UI.createLabel({
        text: "Để yêu cầu truyện, bạn nên cung cấp đầy đủ thông tin về truyện: tên truyện, tác giả, quốc gia, link truyện(nếu có) ...",
        color: "#fff",
        font: {
            fontSize: 15,
            fontStyle: "italic"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "textLabel"
    });
    $.__views.wrapperView.add($.__views.textLabel);
    $.__views.contentTextArea = Ti.UI.createTextArea({
        borderWidth: 2,
        borderColor: "#bbb",
        borderRadius: 5,
        color: "#000",
        font: {
            fontSize: 18
        },
        keyboardType: Ti.UI.KEYBOARD_DEFAULT,
        returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
        textAlign: "left",
        hintText: "Nội dung...",
        width: "95%",
        height: 170,
        top: 10,
        suppressReturn: !1,
        id: "contentTextArea"
    });
    $.__views.wrapperView.add($.__views.contentTextArea);
    $.__views.sendButton = Ti.UI.createButton({
        title: "Send",
        width: 70,
        height: 30,
        top: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        id: "sendButton"
    });
    $.__views.wrapperView.add($.__views.sendButton);
    sendSupport ? $.__views.sendButton.addEventListener("click", sendSupport) : __defers["$.__views.sendButton!click!sendSupport"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var textArea = $.contentTextArea, sendButton = $.sendButton;
    exports.openMainWindow = function() {
        $.supportWindow.leftNavButton = Alloy.Globals.backButton($.supportWindow);
        $.wrapperView.addEventListener("singletap", function(e) {
            textArea.blur();
        });
        Alloy.Globals.CURRENT_TAB.open($.supportWindow);
    };
    __defers["$.__views.sendButton!click!sendSupport"] && $.__views.sendButton.addEventListener("click", sendSupport);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;