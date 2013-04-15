function Controller() {
    function selectMenu(e) {
        var selectedMenuController = Alloy.createController(e.rowData.id);
        selectedMenuController.openMainWindow();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.settingWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "settingWindow",
        title: "Settings"
    });
    $.__views.account = Ti.UI.createTableViewRow({
        height: 40,
        hasChild: true,
        color: "#fff",
        font: {
            fontWeight: "bold",
            fontSize: 16,
            fontFamily: "Chalkboard SE"
        },
        id: "account",
        title: "Tài Khoản"
    });
    var __alloyId17 = [];
    __alloyId17.push($.__views.account);
    selectMenu ? $.__views.account.addEventListener("click", selectMenu) : __defers["$.__views.account!click!selectMenu"] = true;
    $.__views.support = Ti.UI.createTableViewRow({
        height: 40,
        hasChild: true,
        color: "#fff",
        font: {
            fontWeight: "bold",
            fontSize: 16,
            fontFamily: "Chalkboard SE"
        },
        id: "support",
        title: "Yêu Cầu Truyện"
    });
    __alloyId17.push($.__views.support);
    selectMenu ? $.__views.support.addEventListener("click", selectMenu) : __defers["$.__views.support!click!selectMenu"] = true;
    $.__views.aboutUs = Ti.UI.createTableViewRow({
        height: 40,
        hasChild: true,
        color: "#fff",
        font: {
            fontWeight: "bold",
            fontSize: 16,
            fontFamily: "Chalkboard SE"
        },
        id: "aboutUs",
        title: "Giới Thiệu"
    });
    __alloyId17.push($.__views.aboutUs);
    selectMenu ? $.__views.aboutUs.addEventListener("click", selectMenu) : __defers["$.__views.aboutUs!click!selectMenu"] = true;
    $.__views.adv = Ti.UI.createTableViewRow({
        id: "adv"
    });
    __alloyId17.push($.__views.adv);
    $.__views.settingTableView = Ti.UI.createTableView({
        height: "50%",
        scrollable: false,
        backgroundColor: "transparent",
        top: 0,
        data: __alloyId17,
        id: "settingTableView"
    });
    $.__views.settingWindow.add($.__views.settingTableView);
    $.__views.facebookLikeBox = Ti.UI.createWebView({
        width: "100%",
        height: 150,
        bottom: 0,
        textAlign: "center",
        backgroundColor: "transparent",
        id: "facebookLikeBox"
    });
    $.__views.settingWindow.add($.__views.facebookLikeBox);
    $.__views.settingTab = Ti.UI.createTab({
        window: $.__views.settingWindow,
        id: "settingTab",
        icon: "/common/setting.png"
    });
    $.__views.settingTab && $.addTopLevelView($.__views.settingTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
        $.adv.add(advImage);
    });
    $.settingWindow.addEventListener("focus", function() {
        Alloy.Globals.CURRENT_TAB = $.settingTab;
    });
    $.facebookLikeBox.url = Alloy.Globals.SERVER + "/facebook?type=" + Alloy.Globals.isTablet();
    __defers["$.__views.account!click!selectMenu"] && $.__views.account.addEventListener("click", selectMenu);
    __defers["$.__views.support!click!selectMenu"] && $.__views.support.addEventListener("click", selectMenu);
    __defers["$.__views.aboutUs!click!selectMenu"] && $.__views.aboutUs.addEventListener("click", selectMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;