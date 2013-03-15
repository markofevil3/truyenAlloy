function Controller() {
    function selectMenu(e) {
        var selectedMenuController = Alloy.createController(e.rowData.dataName);
        selectedMenuController.openMainWindow();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.homeWindow = Ti.UI.createWindow({
        backgroundImage: "/common/setting_bg.png",
        barImage: "/common/top.png",
        id: "homeWindow",
        title: "Home"
    });
    $.__views.advertise = Ti.UI.createTableViewRow({
        width: "100%",
        height: 40,
        backgroundColor: "#fff",
        selectedBackgroundColor: "transparent",
        name: "Advertise",
        id: "advertise"
    });
    var __alloyId0 = [];
    __alloyId0.push($.__views.advertise);
    $.__views.MangaList = Ti.UI.createTableViewRow({
        height: 120,
        backgroundColor: "transparent",
        backgroundImage: "/common/bookshelfBackground.png",
        id: "MangaList",
        dataName: "mangaList"
    });
    __alloyId0.push($.__views.MangaList);
    selectMenu ? $.__views.MangaList.addEventListener("click", selectMenu) : __defers["$.__views.MangaList!click!selectMenu"] = !0;
    $.__views.__alloyId1 = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundImage: "/common/bookShelf.png",
        id: "__alloyId1"
    });
    $.__views.MangaList.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "Chalkboard SE"
        },
        zIndex: 2,
        text: "Manga",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createImageView({
        width: 181,
        height: 45,
        image: "/common/bg_paper_tournament.png",
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    $.__views.StoryList = Ti.UI.createTableViewRow({
        height: 120,
        backgroundColor: "transparent",
        backgroundImage: "/common/bookshelfBackground.png",
        id: "StoryList",
        dataName: "storyList"
    });
    __alloyId0.push($.__views.StoryList);
    selectMenu ? $.__views.StoryList.addEventListener("click", selectMenu) : __defers["$.__views.StoryList!click!selectMenu"] = !0;
    $.__views.__alloyId4 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "Chalkboard SE"
        },
        zIndex: 2,
        text: "Truyen Chu",
        id: "__alloyId4"
    });
    $.__views.StoryList.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createImageView({
        width: 181,
        height: 45,
        image: "/common/bg_paper_tournament.png",
        id: "__alloyId5"
    });
    $.__views.StoryList.add($.__views.__alloyId5);
    $.__views.FunnyList = Ti.UI.createTableViewRow({
        height: 120,
        backgroundColor: "transparent",
        backgroundImage: "/common/bookshelfBackground.png",
        id: "FunnyList",
        dataName: "funnyList"
    });
    __alloyId0.push($.__views.FunnyList);
    selectMenu ? $.__views.FunnyList.addEventListener("click", selectMenu) : __defers["$.__views.FunnyList!click!selectMenu"] = !0;
    $.__views.__alloyId6 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "Chalkboard SE"
        },
        zIndex: 2,
        text: "Truyen Cuoi",
        id: "__alloyId6"
    });
    $.__views.FunnyList.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createImageView({
        width: 181,
        height: 45,
        image: "/common/bg_paper_tournament.png",
        id: "__alloyId7"
    });
    $.__views.FunnyList.add($.__views.__alloyId7);
    $.__views.homeTableView = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        data: __alloyId0,
        id: "homeTableView"
    });
    $.__views.homeWindow.add($.__views.homeTableView);
    $.__views.homeTab = Ti.UI.createTab({
        window: $.__views.homeWindow,
        id: "homeTab",
        icon: "/common/home.png"
    });
    $.addTopLevelView($.__views.homeTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
        $.advertise.add(advImage);
    });
    $.homeWindow.addEventListener("focus", function(e) {
        Alloy.Globals.CURRENT_TAB = $.homeTab;
    });
    __defers["$.__views.MangaList!click!selectMenu"] && $.__views.MangaList.addEventListener("click", selectMenu);
    __defers["$.__views.StoryList!click!selectMenu"] && $.__views.StoryList.addEventListener("click", selectMenu);
    __defers["$.__views.FunnyList!click!selectMenu"] && $.__views.FunnyList.addEventListener("click", selectMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;