function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.accountWindow = Ti.UI.createWindow({
        backgroundImage: "/common/setting_bg.png",
        barImage: "/common/top.png",
        id: "accountWindow",
        title: "Tài Khoản"
    });
    $.addTopLevelView($.__views.accountWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.openMainWindow = function() {
        $.accountWindow.leftNavButton = Alloy.Globals.backButton($.accountWindow);
        Alloy.Globals.CURRENT_TAB.open($.accountWindow);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;