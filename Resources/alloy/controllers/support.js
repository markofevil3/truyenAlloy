function Controller() {
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function() {
        $.supportWindow.leftNavButton = Alloy.Globals.backButton($.supportWindow);
        Alloy.Globals.CURRENT_TAB.open($.supportWindow);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;