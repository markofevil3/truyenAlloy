function Controller() {
    function setRowData(data, type) {
        var dataSet = [];
        for (var i = 0; data.length > i; i++) {
            data[i].bookType = type;
            var row = Alloy.createController("favoriteRow", {
                data: data[i],
                window: $.favoriteWindow
            }).getView();
            dataSet.push(row);
        }
        return dataSet;
    }
    function getFavorites() {
        Alloy.Globals.getAjax("/getFavorites", {
            userId: Titanium.Facebook.getUid()
        }, function(response) {
            listFavorites = JSON.parse(response).data;
            mangaRows = setRowData(listFavorites["manga"], 0);
            storyRows = setRowData(listFavorites["story"], 1);
            tableView.data = mangaRows.concat(storyRows);
            $.filterTabbar.addEventListener("click", function(e) {
                switch (e.index) {
                  case 0:
                    var mangaRows = setRowData(listFavorites["manga"], 0);
                    var storyRows = setRowData(listFavorites["story"], 1);
                    tableView.data = mangaRows.concat(storyRows);
                    break;

                  case 1:
                    tableView.data = setRowData(listFavorites["manga"], 0);
                    break;

                  case 2:
                    tableView.data = setRowData(listFavorites["story"], 1);
                }
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.favoriteWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "favoriteWindow",
        title: "Favorites"
    });
    $.__views.wrapper = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: 0,
        layout: "vertical",
        id: "wrapper"
    });
    $.__views.favoriteWindow.add($.__views.wrapper);
    $.__views.filterTabbar = Ti.UI.iOS.createTabbedBar({
        labels: [ "Tất Cả", "Truyện Tranh", "Truyện Chữ" ],
        index: 0,
        backgroundColor: "#c69656",
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        color: "#fff",
        top: 0,
        id: "filterTabbar"
    });
    $.__views.wrapper.add($.__views.filterTabbar);
    $.__views.advView = Ti.UI.createView({
        width: "100%",
        height: 50,
        id: "advView"
    });
    $.__views.wrapper.add($.__views.advView);
    $.__views.bookShellTable = Ti.UI.createTableView({
        editable: true,
        allowsSelectionDuringEditing: true,
        backgroundColor: "transparent",
        backgroundRepeat: true,
        separatorColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "bookShellTable"
    });
    $.__views.wrapper.add($.__views.bookShellTable);
    $.__views.favoriteTab = Ti.UI.createTab({
        window: $.__views.favoriteWindow,
        id: "favoriteTab",
        icon: "/common/favorite.png"
    });
    $.__views.favoriteTab && $.addTopLevelView($.__views.favoriteTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var listFavorites;
    var mangaRows;
    var storyRows;
    var tableView = $.bookShellTable;
    $.favoriteTab.addEventListener("focus", function() {
        Alloy.Globals.CURRENT_TAB = $.favoriteTab;
        if (0 == Alloy.Globals.facebook.loggedIn) {
            Alloy.Globals.facebook.authorize();
            Alloy.Globals.facebook.addEventListener("login", function(e) {
                e.success ? getFavorites() : e.error ? alert(e.error) : e.cancelled && alert("You must login to use Favorites function!");
            });
        } else getFavorites();
    });
    Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
        $.advView.add(advImage);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;