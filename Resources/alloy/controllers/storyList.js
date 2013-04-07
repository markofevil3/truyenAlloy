function Controller() {
    function setRowData(data) {
        var dataSet = [];
        for (var i = 0; i < data.length; i++) {
            var row = Alloy.createController("storyListRow", {
                data: data[i],
                window: $.storyListWindow
            }).getView();
            dataSet.push(row);
        }
        return dataSet;
    }
    function createTabBar() {
        var tabBar = Titanium.UI.iOS.createTabbedBar({
            labels: [ "Tất cả", "Tr.ngắn", "Tr.dài" ],
            index: 0,
            backgroundColor: "#c69656",
            style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
            color: "#fff",
            font: {
                fontWeight: "bold"
            }
        }), cloneListStory = listStory.slice(0);
        tabBar.addEventListener("click", function(e) {
            switch (e.index) {
              case 0:
                listStory = cloneListStory.slice(0);
                break;
              case 1:
                listStory = [];
                for (var i = 0; i < cloneListStory.length; i++) cloneListStory[i].type == 0 && listStory.push(cloneListStory[i]);
                break;
              case 2:
                listStory = [];
                for (var i = 0; i < cloneListStory.length; i++) cloneListStory[i].type == 1 && listStory.push(cloneListStory[i]);
            }
            table.setData([]);
            table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
        });
        return tabBar;
    }
    function dynamicLoad(tableView) {
        function beginUpdate() {
            updating = !0;
            tableView.appendRow(loadingRow);
            loadingIcon.show();
            setTimeout(endUpdate, 500);
        }
        function endUpdate() {
            updating = !1;
            loadingIcon.hide();
            tableView.deleteRow(lastRowIndex - 1, {
                animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
            });
            var nextRowIndex = lastRowIndex - 1 + MAX_DISPLAY_ROW;
            nextRowIndex > listStory.length && (nextRowIndex = listStory.length);
            var nextRowIndexs = listStory.slice(lastRowIndex - 1, nextRowIndex), nextRows = setRowData(nextRowIndexs);
            for (var i = 0; i < nextRows.length; i++) tableView.appendRow(nextRows[i], {
                animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
            });
            lastRowIndex += MAX_DISPLAY_ROW;
            tableView.scrollToIndex(lastRowIndex - MAX_DISPLAY_ROW, {
                animated: !0,
                position: Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
            });
        }
        var loadingIcon = Titanium.UI.createActivityIndicator({
            style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
        }), loadingView = Titanium.UI.createView();
        loadingView.add(loadingIcon);
        var loadingRow = Ti.UI.createTableViewRow({
            height: 40 * Alloy.Globals.RATIO
        });
        loadingRow.add(loadingView);
        var lastRowIndex = tableView.data[0].rowCount, updating = !1, lastDistance = 0;
        tableView.addEventListener("scroll", function(e) {
            lastRowIndex = tableView.data[0].rowCount;
            var offset = e.contentOffset.y, height = e.size.height, total = offset + height, theEnd = e.contentSize.height, distance = theEnd - total;
            if (distance < lastDistance) {
                var nearEnd = theEnd * 1;
                !updating && total >= nearEnd && (search.value == null || search.value == "") && lastRowIndex < listStory.length && lastRowIndex >= MAX_DISPLAY_ROW && beginUpdate();
            }
            lastDistance = distance;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.storyListWindow = Ti.UI.createWindow({
        backgroundImage: "/common/setting_bg.png",
        barImage: "/common/top.png",
        id: "storyListWindow",
        title: "Story"
    });
    $.addTopLevelView($.__views.storyListWindow);
    $.__views.loading = Alloy.createWidget("com.appcelerator.loading", "widget", {
        id: "loading"
    });
    $.__views.loading.setParent($.__views.storyListWindow);
    $.__views.searchView = Ti.UI.createView({
        backgroundColor: "transparent",
        height: 40,
        backgroundImage: "/common/setting_bg.png",
        top: 0,
        id: "searchView"
    });
    $.__views.storyListWindow.add($.__views.searchView);
    $.__views.searchButton = Ti.UI.createSearchBar({
        barColor: "transparent",
        backgroundImage: "/common/setting_bg.png",
        hintText: "search",
        width: "70%",
        left: 16,
        id: "searchButton"
    });
    $.__views.searchView.add($.__views.searchButton);
    $.__views.sortButton = Ti.UI.createButton({
        color: "#fff",
        opacity: 0.7,
        height: 30,
        width: 30,
        right: "8%",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#9b652e",
        backgroundImage: "/common/sort-button2.png",
        id: "sortButton"
    });
    $.__views.searchView.add($.__views.sortButton);
    $.__views.advView = Ti.UI.createView({
        width: "100%",
        height: 50,
        top: 40,
        id: "advView"
    });
    $.__views.storyListWindow.add($.__views.advView);
    $.__views.bookShellTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        top: 100,
        id: "bookShellTable"
    });
    $.__views.storyListWindow.add($.__views.bookShellTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var MAX_DISPLAY_ROW = 5, search = $.searchButton, table = $.bookShellTable, listStory;
    exports.openMainWindow = function() {
        Alloy.Globals.CURRENT_TAB.open($.storyListWindow);
        $.storyListWindow.leftNavButton = Alloy.Globals.backButton($.storyListWindow);
        Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
            $.advView.add(advImage);
        });
        Alloy.Globals.getAjax("/storyList", {
            "null": null
        }, function(response) {
            listStory = JSON.parse(response).data;
            var tbl_data = setRowData(listStory.slice(0, MAX_DISPLAY_ROW));
            table.data = tbl_data;
            dynamicLoad(table);
            $.loading.setOpacity(0);
            $.storyListWindow.setTitleControl(createTabBar());
        });
        search.addEventListener("change", function(e) {
            var results = [], regexValue = new RegExp(Alloy.Globals.removeUTF8(e.value), "i");
            for (var i in listStory) {
                var removedUTF = Alloy.Globals.removeUTF8(listStory[i].title);
                regexValue.test(removedUTF) && results.push(listStory[i]);
            }
            tbl_data = setRowData(results);
            table.setData([]);
            table.setData(tbl_data);
        });
        search.addEventListener("focus", function(e) {
            search.showCancel = !0;
        });
        search.addEventListener("return", function(e) {
            search.showCancel = !1;
            search.blur();
        });
        search.addEventListener("cancel", function(e) {
            search.showCancel = !1;
            search.blur();
        });
        var optionsDialogOpts = {
            options: [ "A -> Z", "Most View", "Newest", "Z -> A" ],
            selectedIndex: 0,
            title: "SORT BY"
        }, dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
        dialog.addEventListener("click", function(e) {
            switch (e.index) {
              case 0:
                listStory.sort(Alloy.Globals.dynamicSort("title", 1));
                break;
              case 1:
                listStory.sort(Alloy.Globals.dynamicSort("numView", -1));
                break;
              case 2:
                listStory.sort(Alloy.Globals.dynamicSort("datePost", -1));
                break;
              case 3:
                listStory.sort(Alloy.Globals.dynamicSort("title", -1));
            }
            table.setData([]);
            table.setData(setRowData(listStory.slice(0, MAX_DISPLAY_ROW)));
        });
        $.sortButton.addEventListener("singletap", function(e) {
            dialog.show();
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;