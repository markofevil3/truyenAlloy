function Controller() {
    function setRowData(data, maxRow) {
        var dataSet = [];
        for (var i = 0; i < maxRow; i++) if (data[i]) {
            data[i].mangaId = args._id;
            var row = Alloy.createController("mangaRow", {
                data: data[i]
            }).getView();
            dataSet.push(row);
        }
        return dataSet;
    }
    function getNewestChapter(chapters) {
        var newest = 0;
        for (var i = 0; i < chapters.length; i++) chapters[i].chapter > newest && (newest = chapters[i].chapter);
        return newest;
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
            nextRowIndex > data.length && (nextRowIndex = data.length);
            for (var i = lastRowIndex - 1; i < nextRowIndex; i++) {
                var row = Alloy.createController("mangaRow", {
                    data: data[i]
                }).getView();
                tableView.appendRow(row, {
                    animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
                });
            }
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
            height: 40
        });
        loadingRow.add(loadingView);
        var lastRowIndex = tableView.data[0].rowCount, updating = !1, lastDistance = 0;
        tableView.addEventListener("scroll", function(e) {
            lastRowIndex = tableView.data[0].rowCount;
            var offset = e.contentOffset.y, height = e.size.height, total = offset + height, theEnd = e.contentSize.height, distance = theEnd - total;
            if (distance < lastDistance) {
                var nearEnd = theEnd * 1;
                !updating && total >= nearEnd && lastRowIndex < data.length && tableView.data[0].rows[0].chapterId == data[0]._id && tableView.data[0].rows[1] && tableView.data[0].rows[1].chapterId == data[1]._id && tableView.data[0].rows[lastRowIndex - 1].chapterId != data[data.length - 1]._id && lastRowIndex >= MAX_DISPLAY_ROW && beginUpdate();
            }
            lastDistance = distance;
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.mangaWindow = Ti.UI.createWindow({
        backgroundImage: "/common/setting_bg.png",
        barImage: "/common/top.png",
        layout: "vertical",
        id: "mangaWindow"
    });
    $.addTopLevelView($.__views.mangaWindow);
    $.__views.mangaInfoView = Ti.UI.createView({
        width: "100%",
        height: 120,
        backgroundColor: "#d8cdc0",
        backgroundImage: "/common/whitePaper.png",
        layout: "horizontal",
        id: "mangaInfoView"
    });
    $.__views.mangaWindow.add($.__views.mangaInfoView);
    $.__views.bookBackgroundView = Ti.UI.createView({
        width: "25%",
        height: "86%",
        top: "7%",
        left: 5,
        backgroundImage: "/common/book1.png",
        id: "bookBackgroundView"
    });
    $.__views.mangaInfoView.add($.__views.bookBackgroundView);
    $.__views.bookCover = Ti.UI.createImageView({
        width: "80%",
        height: "96%",
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
    $.__views.mangaInfoView.add($.__views.bookDetails);
    $.__views.bookTitle = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontWeight: "bold",
            fontSize: 19,
            fontFamily: "Chalkboard SE"
        },
        left: 0,
        id: "bookTitle"
    });
    $.__views.bookDetails.add($.__views.bookTitle);
    $.__views.bookAuthor = Ti.UI.createLabel({
        font: {
            fontSize: 16,
            fontStyle: "italic"
        },
        left: 0,
        id: "bookAuthor"
    });
    $.__views.bookDetails.add($.__views.bookAuthor);
    $.__views.newestChapter = Ti.UI.createLabel({
        font: {
            fontSize: 18,
            fontStyle: "bold"
        },
        left: 0,
        id: "newestChapter"
    });
    $.__views.bookDetails.add($.__views.newestChapter);
    $.__views.numView = Ti.UI.createView({
        id: "numView"
    });
    $.__views.bookDetails.add($.__views.numView);
    $.__views.numViewIcon = Ti.UI.createImageView({
        image: "/common/view.png",
        width: 20,
        height: 20,
        left: 0,
        id: "numViewIcon"
    });
    $.__views.numView.add($.__views.numViewIcon);
    $.__views.numViewText = Ti.UI.createLabel({
        left: 22,
        id: "numViewText"
    });
    $.__views.numView.add($.__views.numViewText);
    $.__views.searchView = Ti.UI.createView({
        backgroundColor: "transparent",
        height: 40,
        backgroundImage: "/common/setting_bg.png",
        top: 0,
        id: "searchView"
    });
    $.__views.mangaWindow.add($.__views.searchView);
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
        id: "advView"
    });
    $.__views.mangaWindow.add($.__views.advView);
    $.__views.bookShellTable = Ti.UI.createTableView({
        backgroundColor: "transparent",
        separatorColor: "transparent",
        style: Ti.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "bookShellTable"
    });
    $.__views.mangaWindow.add($.__views.bookShellTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, MAX_DISPLAY_ROW = 20, table = $.bookShellTable, search = $.searchButton;
    exports.openMainWindow = function() {
        Alloy.Globals.CURRENT_TAB.open($.mangaWindow);
        $.mangaWindow.leftNavButton = Alloy.Globals.backButton($.mangaWindow);
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
        }), favoritedButton = Titanium.UI.createButton({
            text: "favorite",
            color: "#fff",
            height: 40,
            width: 40,
            backgroundColor: "transparent",
            backgroundImage: "/common/favorites_color.png"
        });
        favoriteButton.addEventListener("click", function() {
            if (Titanium.Facebook.loggedIn == 0) {
                Ti.Facebook.authorize();
                Titanium.Facebook.addEventListener("login", function(e) {
                    e.success ? Alloy.Globals.addFavorite(favoriteButton.itemId, 0, e.data, function() {
                        $.mangaWindow.rightNavButton = favoritedButton;
                    }) : e.error ? alert(e.error) : e.cancelled && alert("Cancelled");
                });
            } else Titanium.Facebook.requestWithGraphPath("/" + Titanium.Facebook.getUid(), {}, "GET", function(user) {
                Util.addFavorite(favoriteButton.itemId, 0, JSON.parse(user.result), function() {
                    $.mangaWindow.rightNavButton = favoritedButton;
                });
            });
        });
        var listChapters = args.chapters;
        args.favorite ? $.mangaWindow.rightNavButton = favoritedButton : $.mangaWindow.rightNavButton = favoriteButton;
        $.mangaWindow.title = args.title;
        $.bookCover.image = Alloy.Globals.SERVER + args.folder + "/cover.jpg";
        $.bookTitle.text = args.title;
        $.bookAuthor.text = "Tác Giả: " + args.author;
        $.newestChapter.text = "Chapter Mới: " + getNewestChapter(listChapters);
        $.numViewText.text = args.numView;
        var tbl_data = setRowData(listChapters, MAX_DISPLAY_ROW);
        table.data = tbl_data;
        dynamicLoad(table, listChapters);
        search.addEventListener("change", function(e) {
            var results = [], regexValue = new RegExp(Alloy.Globals.removeUTF8(e.value), "i");
            for (var i in listChapters) regexValue.test(listChapters[i].chapter) && results.push(listChapters[i]);
            tbl_data = setRowData(results, results.length);
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
            options: [ "A -> Z", "Z -> A" ],
            selectedIndex: 0,
            title: "SORT BY"
        }, dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
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
        $.sortButton.addEventListener("singletap", function(e) {
            dialog.show();
        });
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;