function Controller() {
    function setRowData(data, maxRow) {
        var dataSet = [];
        for (var i = 0; maxRow > i; i++) if (data[i]) {
            data[i].storyId = args._id;
            var row = Alloy.createController("storyRow", {
                data: data[i],
                window: $.storyWindow
            }).getView();
            dataSet.push(row);
        }
        return dataSet;
    }
    function dynamicLoad(tableView, data) {
        function beginUpdate() {
            updating = true;
            tableView.appendRow(loadingRow);
            loadingIcon.show();
            setTimeout(endUpdate, 500);
        }
        function endUpdate() {
            updating = false;
            loadingIcon.hide();
            tableView.deleteRow(lastRowIndex - 1, {
                animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
            });
            var nextRowIndex = lastRowIndex - 1 + MAX_DISPLAY_ROW;
            nextRowIndex > data.length && (nextRowIndex = data.length);
            for (var i = lastRowIndex - 1; nextRowIndex > i; i++) {
                var row = Alloy.createController("storyRow", {
                    data: data[i],
                    window: $.storyWindow
                }).getView();
                tableView.appendRow(row, {
                    animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
                });
            }
            lastRowIndex += MAX_DISPLAY_ROW;
            tableView.scrollToIndex(lastRowIndex - MAX_DISPLAY_ROW, {
                animated: true,
                position: Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
            });
        }
        var loadingIcon = Titanium.UI.createActivityIndicator({
            style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
        });
        var loadingView = Titanium.UI.createView();
        loadingView.add(loadingIcon);
        var loadingRow = Ti.UI.createTableViewRow({
            height: 40
        });
        loadingRow.add(loadingView);
        var lastRowIndex = tableView.data[0].rowCount;
        var updating = false;
        var lastDistance = 0;
        tableView.addEventListener("scroll", function(e) {
            lastRowIndex = tableView.data[0].rowCount;
            var offset = e.contentOffset.y;
            var height = e.size.height;
            var total = offset + height;
            var theEnd = e.contentSize.height;
            var distance = theEnd - total;
            if (lastDistance > distance) {
                var nearEnd = 1 * theEnd;
                !updating && total >= nearEnd && data.length > lastRowIndex && tableView.data[0].rows[0].chapterId == data[0]._id && tableView.data[0].rows[1] && tableView.data[0].rows[1].chapterId == data[1]._id && tableView.data[0].rows[lastRowIndex - 1].chapterId != data[data.length - 1]._id && lastRowIndex >= MAX_DISPLAY_ROW && beginUpdate();
            }
            lastDistance = distance;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.storyWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "storyWindow"
    });
    $.__views.storyWindow && $.addTopLevelView($.__views.storyWindow);
    $.__views.wrapper = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        top: 0,
        layout: "vertical",
        id: "wrapper"
    });
    $.__views.storyWindow.add($.__views.wrapper);
    $.__views.storyInfoView = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: 120,
            backgroundColor: "#d8cdc0",
            backgroundImage: "/common/whitePaper.png",
            layout: "horizontal"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 240,
            backgroundColor: "#d8cdc0",
            backgroundImage: "/common/whitePaper.png",
            layout: "horizontal"
        });
        _.extend(o, {
            id: "storyInfoView"
        });
        return o;
    }());
    $.__views.wrapper.add($.__views.storyInfoView);
    $.__views.bookBackgroundView = Ti.UI.createView({
        width: "25%",
        height: "86%",
        top: "7%",
        left: 5,
        backgroundImage: "/common/book1.png",
        id: "bookBackgroundView"
    });
    $.__views.storyInfoView.add($.__views.bookBackgroundView);
    $.__views.bookCover = Ti.UI.createImageView({
        width: "78%",
        height: "94%",
        defaultImage: "/common/default_image.jpg",
        top: 0,
        left: "14%",
        id: "bookCover"
    });
    $.__views.bookBackgroundView.add($.__views.bookCover);
    $.__views.bookDetails = Ti.UI.createView({
        width: "69%",
        height: "100%",
        backgroundColor: "transparent",
        layout: "vertical",
        left: 5,
        id: "bookDetails"
    });
    $.__views.storyInfoView.add($.__views.bookDetails);
    $.__views.bookTitle = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 19,
                fontFamily: "Chalkboard SE"
            },
            left: 0
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 38,
                fontFamily: "Chalkboard SE"
            },
            left: 0
        });
        _.extend(o, {
            id: "bookTitle"
        });
        return o;
    }());
    $.__views.bookDetails.add($.__views.bookTitle);
    $.__views.bookAuthor = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 16,
                fontStyle: "italic"
            },
            left: 0
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: 32,
                fontStyle: "italic"
            },
            left: 0
        });
        _.extend(o, {
            id: "bookAuthor"
        });
        return o;
    }());
    $.__views.bookDetails.add($.__views.bookAuthor);
    $.__views.shortDesc = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            font: {
                fontSize: 14
            },
            height: "55%",
            bottom: 20
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            font: {
                fontSize: 28
            },
            height: "55%",
            bottom: 40
        });
        _.extend(o, {
            id: "shortDesc"
        });
        return o;
    }());
    $.__views.bookDetails.add($.__views.shortDesc);
    $.__views.searchView = Ti.UI.createView({
        backgroundColor: "transparent",
        height: 40,
        backgroundImage: "/common/setting_bg.png",
        top: 0,
        id: "searchView"
    });
    $.__views.wrapper.add($.__views.searchView);
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
        opacity: .7,
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
    $.__views.advView = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: 50
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 66
        });
        _.extend(o, {
            id: "advView"
        });
        return o;
    }());
    $.__views.wrapper.add($.__views.advView);
    $.__views.bookShellTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "bookShellTable"
    });
    $.__views.wrapper.add($.__views.bookShellTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var MAX_DISPLAY_ROW = 10;
    var table = $.bookShellTable;
    var search = $.searchButton;
    exports.openMainWindow = function() {
        Alloy.Globals.CURRENT_TAB.open($.storyWindow);
        $.storyWindow.leftNavButton = Alloy.Globals.backButton($.storyWindow);
        Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
            $.advView.add(advImage);
        });
        var favoriteButton = Titanium.UI.createButton({
            text: "favorite",
            color: "#fff",
            height: 40,
            width: 40,
            itemId: args._id,
            backgroundColor: "transparent",
            backgroundImage: "/common/favorites_dark.png"
        });
        var favoritedButton = Titanium.UI.createButton({
            text: "favorite",
            color: "#fff",
            height: 40,
            width: 40,
            backgroundColor: "transparent",
            backgroundImage: "/common/favorites_color.png"
        });
        favoriteButton.addEventListener("click", function() {
            if (0 == Alloy.Globals.facebook.loggedIn) {
                Alloy.Globals.facebook.authorize();
                Alloy.Globals.facebook.addEventListener("login", function(e) {
                    e.success ? Alloy.Globals.addFavorite(favoriteButton.itemId, 0, e.data, args.title, Alloy.Globals.SERVER + args.folder + "/cover.jpg", function() {
                        $.storyWindow.rightNavButton = favoritedButton;
                    }) : e.error ? alert(e.error) : e.cancelled && alert("Cancelled");
                });
            } else Alloy.Globals.facebook.requestWithGraphPath("/" + Alloy.Globals.facebook.getUid(), {}, "GET", function(user) {
                Alloy.Globals.addFavorite(favoriteButton.itemId, 0, JSON.parse(user.result), args.title, Alloy.Globals.SERVER + args.folder + "/cover.jpg", function() {
                    $.storyWindow.rightNavButton = favoritedButton;
                });
            });
        });
        var listChapters = args.chapters;
        $.storyWindow.rightNavButton = args.favorite ? favoritedButton : favoriteButton;
        $.storyWindow.title = args.title;
        $.bookCover.image = Alloy.Globals.SERVER + args.folder + "/cover.jpg";
        $.bookTitle.text = args.title;
        $.bookAuthor.text = "Tác Giả: " + args.author;
        $.shortDesc.text = args.shortDes;
        var tbl_data = setRowData(listChapters, MAX_DISPLAY_ROW);
        table.data = tbl_data;
        dynamicLoad(table, listChapters);
        search.addEventListener("change", function(e) {
            var results = [];
            var regexValue = new RegExp(Alloy.Globals.removeUTF8(e.value), "i");
            for (var i in listChapters) regexValue.test(listChapters[i].chapter) && results.push(listChapters[i]);
            tbl_data = setRowData(results, results.length);
            table.setData([]);
            table.setData(tbl_data);
        });
        search.addEventListener("focus", function() {
            search.showCancel = true;
        });
        search.addEventListener("return", function() {
            search.showCancel = false;
            search.blur();
        });
        search.addEventListener("cancel", function() {
            search.showCancel = false;
            search.blur();
        });
        var optionsDialogOpts = {
            options: [ "A -> Z", "Z -> A" ],
            selectedIndex: 0,
            title: "SORT BY"
        };
        var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
        dialog.addEventListener("click", function(e) {
            switch (e.index) {
              case 0:
                listChapters.sort(Alloy.Globals.dynamicSort("chapter", 1));
                break;

              case 1:
                listChapters.sort(Alloy.Globals.dynamicSort("chapter", -1));
            }
            table.setData([]);
            table.setData(setRowData(listChapters, MAX_DISPLAY_ROW));
        });
        $.sortButton.addEventListener("singletap", function() {
            dialog.show();
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;