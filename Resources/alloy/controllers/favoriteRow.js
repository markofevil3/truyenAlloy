function Controller() {
    function selectItem(item, type) {
        item.addEventListener("click", function(e) {
            Alloy.Globals.openLoading(args.window);
            if (type == 0) {
                console.log("manga");
                Alloy.Globals.getAjax("/manga", {
                    id: item.dataId,
                    userId: Titanium.Facebook.getUid()
                }, function(response) {
                    var json = JSON.parse(response), mangaController = Alloy.createController("manga", json.data);
                    Alloy.Globals.closeLoading(args.window);
                    mangaController.openMainWindow();
                });
            } else Alloy.Globals.getAjax("/getStory", {
                id: item.dataId,
                userId: Titanium.Facebook.getUid()
            }, function(response) {
                var json = JSON.parse(response), storyController = Alloy.createController("story", json.data);
                Alloy.Globals.closeLoading(args.window);
                storyController.openMainWindow();
            });
        });
    }
    function getTypeText(type) {
        switch (type) {
          case 0:
            return "Truyện Tranh";
          case 1:
            return "Truyện Chữ";
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        height: 100,
        backgroundColor: "transparent",
        backgroundImage: "/common/dark-background.png",
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    $.__views.bookCoverView = Ti.UI.createView({
        backgroundColor: "transparent",
        width: "19%",
        height: "90%",
        left: "1%",
        id: "bookCoverView"
    });
    $.__views.row.add($.__views.bookCoverView);
    $.__views.bookCover = Ti.UI.createImageView({
        width: "92%",
        height: "93%",
        top: "4%",
        left: "3%",
        id: "bookCover"
    });
    $.__views.bookCoverView.add($.__views.bookCover);
    $.__views.detailView = Ti.UI.createView({
        width: "75%",
        height: "100%",
        left: "24%",
        layout: "vertical",
        id: "detailView"
    });
    $.__views.row.add($.__views.detailView);
    $.__views.bookTitle = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 19,
            fontFamily: "Chalkboard SE"
        },
        left: 0,
        color: "#fff",
        id: "bookTitle"
    });
    $.__views.detailView.add($.__views.bookTitle);
    $.__views.newestChapter = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontStyle: "italic",
            fontFamily: "Chalkboard SE"
        },
        left: 0,
        color: "#fff",
        id: "newestChapter"
    });
    $.__views.detailView.add($.__views.newestChapter);
    $.__views.bookType = Ti.UI.createLabel({
        font: {
            fontStyle: "italic",
            fontSize: 15,
            fontFamily: "Chalkboard SE"
        },
        left: 0,
        color: "#fff",
        id: "bookType"
    });
    $.__views.detailView.add($.__views.bookType);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.dataId = args.data._id;
    $.row.dataType = args.data.bookType;
    var coverLink;
    args.data.bookType == 0 ? coverLink = Alloy.Globals.SERVER + args.data.folder + "/cover.jpg" : coverLink = Alloy.Globals.SERVER + "/images/story/sample/cover.jpg";
    $.bookCover.image = coverLink;
    $.bookTitle.text = args.data.title;
    $.newestChapter.text = "Newest: " + args.data.chapters[args.data.chapters.length - 1].chapter;
    $.bookType.text = "Thể loại: " + getTypeText(args.data.bookType);
    $.bookCoverView.backgroundImage = args.data.bookType == 0 ? "/common/book5.png" : "/common/book5.png";
    selectItem($.row, args.data.bookType);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;