function Controller() {
    function closeWindow() {
        var smallDown = Titanium.UI.create2DMatrix();
        smallDown = smallDown.scale(0);
        $.storyReadingWindow.close({
            transform: smallDown,
            duration: 300
        });
    }
    function changeTextSize(e) {
        e.source.dataType == "0" ? $.contentLabel.font = {
            fontSize: 18
        } : $.contentLabel.font = {
            fontSize: 22
        };
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.storyReadingWindow = Ti.UI.createWindow({
        backgroundColor: "#f3f3f3",
        id: "storyReadingWindow"
    });
    $.addTopLevelView($.__views.storyReadingWindow);
    $.__views.topBar = Ti.UI.createView({
        width: "100%",
        height: 40,
        backgroundColor: "#fff",
        top: 0,
        id: "topBar"
    });
    $.__views.storyReadingWindow.add($.__views.topBar);
    $.__views.textSmallButton = Ti.UI.createButton({
        width: 30,
        height: 30,
        right: 115,
        title: "A",
        color: "#fff",
        font: {
            fontWeight: "bold",
            fontSize: 13
        },
        backgroundColor: "#222",
        backgroundImage: "NONE",
        selectedColor: "#333",
        borderRadius: 3,
        id: "textSmallButton",
        dataType: "0"
    });
    $.__views.topBar.add($.__views.textSmallButton);
    changeTextSize ? $.__views.textSmallButton.addEventListener("click", changeTextSize) : __defers["$.__views.textSmallButton!click!changeTextSize"] = !0;
    $.__views.textBigButton = Ti.UI.createButton({
        width: 30,
        height: 30,
        right: 75,
        title: "A",
        color: "#fff",
        font: {
            fontWeight: "bold",
            fontSize: 19
        },
        backgroundColor: "#222",
        backgroundImage: "NONE",
        selectedColor: "#333",
        borderRadius: 3,
        id: "textBigButton",
        dataType: "1"
    });
    $.__views.topBar.add($.__views.textBigButton);
    changeTextSize ? $.__views.textBigButton.addEventListener("click", changeTextSize) : __defers["$.__views.textBigButton!click!changeTextSize"] = !0;
    $.__views.closeButton = Ti.UI.createButton({
        title: "close",
        width: 60,
        height: 30,
        right: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ffffff",
        backgroundColor: "#222",
        backgroundImage: "NONE",
        font: {
            fontWeight: "bold",
            fontSize: 14
        },
        selectedColor: "#333",
        color: "#CCCCCC",
        id: "closeButton"
    });
    $.__views.topBar.add($.__views.closeButton);
    closeWindow ? $.__views.closeButton.addEventListener("click", closeWindow) : __defers["$.__views.closeButton!click!closeWindow"] = !0;
    $.__views.contentView = Ti.UI.createScrollView({
        contentHeight: "auto",
        showVerticalScrollIndicator: !0,
        width: "100%",
        backgroundColor: "#fff",
        top: 40,
        id: "contentView"
    });
    $.__views.storyReadingWindow.add($.__views.contentView);
    $.__views.contentWrapper = Ti.UI.createView({
        width: "96%",
        id: "contentWrapper"
    });
    $.__views.contentView.add($.__views.contentWrapper);
    $.__views.contentLabel = Ti.UI.createLabel({
        id: "contentLabel"
    });
    $.__views.contentWrapper.add($.__views.contentLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    exports.openMainWindow = function() {
        $.contentLabel.text = args.content;
        $.storyReadingWindow.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
        });
    };
    __defers["$.__views.textSmallButton!click!changeTextSize"] && $.__views.textSmallButton.addEventListener("click", changeTextSize);
    __defers["$.__views.textBigButton!click!changeTextSize"] && $.__views.textBigButton.addEventListener("click", changeTextSize);
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;