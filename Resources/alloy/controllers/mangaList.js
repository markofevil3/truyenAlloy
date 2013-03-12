function Controller() {
    function setRowData(data) {
        var dataSet = [], dataLength = Math.round(data.length / 3);
        dataLength == 0 && (dataLength = 1);
        for (var i = 0; i < dataLength; i++) {
            var rowData = [];
            for (var j = 0; j < 3; j++) {
                var index = i * 3 + j;
                data[index] && rowData.push(data[index]);
            }
            var row = Alloy.createController("mangaListRow", {
                data: rowData
            }).getView();
            dataSet.push(row);
        }
        return dataSet;
    }
    function dynamicLoad(tableView, data) {
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
            nextRowIndex > Math.round(data.length / 3) && (nextRowIndex = Math.round(data.length / 3));
            var nextRowIndexs = data.slice((lastRowIndex - 1) * 3, nextRowIndex * 3), nextRows = setRowData(nextRowIndexs);
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
        }), loadingView = Titanium.UI.createView({
            backgroundColor: "transparent",
            backgroundImage: "NONE"
        });
        loadingView.add(loadingIcon);
        var loadingRow = Ti.UI.createTableViewRow({
            height: 40,
            backgroundColor: "transparent",
            backgroundImage: "NONE"
        });
        loadingRow.add(loadingView);
        var lastRowIndex = tableView.data[0].rowCount, updating = !1, lastDistance = 0;
        tableView.addEventListener("scroll", function(e) {
            lastRowIndex = tableView.data[0].rowCount;
            var offset = e.contentOffset.y, height = e.size.height, total = offset + height, theEnd = e.contentSize.height, distance = theEnd - total;
            if (distance < lastDistance) {
                var nearEnd = theEnd * 1;
                !updating && total >= nearEnd && lastRowIndex < Math.round(data.length / 3) && lastRowIndex >= MAX_DISPLAY_ROW && (search.value == null || search.value == "") && beginUpdate();
            }
            lastDistance = distance;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.mangaListWindow = Ti.UI.createWindow({
        backgroundImage: "/common/setting_bg.png",
        barImage: "/common/top.png",
        id: "mangaListWindow",
        title: "Manga"
    });
    $.addTopLevelView($.__views.mangaListWindow);
    $.__views.loading = Alloy.createWidget("com.appcelerator.loading", "widget", {
        id: "loading"
    });
    $.__views.loading.setParent($.__views.mangaListWindow);
    $.__views.searchView = Ti.UI.createView({
        backgroundColor: "transparent",
        height: 40,
        backgroundImage: "/common/setting_bg.png",
        top: 0,
        id: "searchView"
    });
    $.__views.mangaListWindow.add($.__views.searchView);
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
        height: 40,
        top: 40,
        id: "advView"
    });
    $.__views.mangaListWindow.add($.__views.advView);
    $.__views.bookShellTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        top: 80,
        id: "bookShellTable"
    });
    $.__views.mangaListWindow.add($.__views.bookShellTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var MAX_DISPLAY_ROW = 5, search = $.searchButton;
    exports.openMainWindow = function() {
        Alloy.Globals.CURRENT_TAB.open($.mangaListWindow);
        $.mangaListWindow.leftNavButton = Alloy.Globals.backButton($.mangaListWindow);
        var table = $.bookShellTable, listManga;
        $.loading.setOpacity(1);
        Alloy.Globals.getAjax("/mangaList", {
            "null": null
        }, function(response) {
            listManga = JSON.parse(response).data;
            var tbl_data = setRowData(listManga.slice(0, MAX_DISPLAY_ROW * 3));
            table.data = tbl_data;
            $.loading.setOpacity(0);
            dynamicLoad(table, listManga);
        });
        search.addEventListener("change", function(e) {
            var results = [], regexValue = new RegExp(Alloy.Globals.removeUTF8(e.value), "i");
            for (var i in listManga) {
                var removedUTF = Alloy.Globals.removeUTF8(listManga[i].title);
                regexValue.test(removedUTF) && results.push(listManga[i]);
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
                listManga.sort(Alloy.Globals.dynamicSort("title", 1));
                break;
              case 1:
                listManga.sort(Alloy.Globals.dynamicSort("numView", -1));
                break;
              case 2:
                listManga.sort(Alloy.Globals.dynamicSort("datePost", -1));
                break;
              case 3:
                listManga.sort(Alloy.Globals.dynamicSort("title", -1));
            }
            table.setData([]);
            table.setData(setRowData(listManga.slice(0, MAX_DISPLAY_ROW * 3)));
        });
        $.sortButton.addEventListener("singletap", function(e) {
            dialog.show();
        });
        Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
            $.advView.add(advImage);
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;