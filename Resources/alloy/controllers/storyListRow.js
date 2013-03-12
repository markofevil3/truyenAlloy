function Controller() {
    function selectItem(item) {
        item.addEventListener("click", function(e) {
            item.dataType == 0 ? Alloy.Globals.getAjax("/getStoryContent", {
                id: item.dataId,
                type: item.dataType,
                chapter: item.dataChapterId
            }, function(response) {
                var json = JSON.parse(response), storyReadingController = Alloy.createController("storyReading", json.data);
                storyReadingController.openMainWindow();
            }) : Alloy.Globals.getAjax("/getStory", {
                id: item.dataId,
                userId: Titanium.Facebook.getUid()
            }, function(response) {
                var json = JSON.parse(response), storyController = Alloy.createController("story", json.data);
                storyController.openMainWindow();
            });
        });
    }
    function getTypeText(type) {
        return type == 0 ? "Truyện ngắn" : "Truyện dài";
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
    $.__views.storyTitle = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 19,
            fontFamily: "Chalkboard SE"
        },
        left: 0,
        color: "#fff",
        id: "storyTitle"
    });
    $.__views.detailView.add($.__views.storyTitle);
    $.__views.storyAuthor = Ti.UI.createLabel({
        font: {
            fontSize: 17,
            fontStyle: "italic",
            fontFamily: "Chalkboard SE"
        },
        left: 0,
        color: "#fff",
        id: "storyAuthor"
    });
    $.__views.detailView.add($.__views.storyAuthor);
    $.__views.storyType = Ti.UI.createLabel({
        font: {
            fontStyle: "italic",
            fontSize: 15,
            fontFamily: "Chalkboard SE"
        },
        left: 0,
        color: "#fff",
        id: "storyType"
    });
    $.__views.detailView.add($.__views.storyType);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.dataId = args._id;
    $.row.dataType = args.type;
    $.bookCover.image = Alloy.Globals.SERVER + "/images/story/sample/cover.jpg";
    $.storyTitle.text = args.title;
    $.storyAuthor.text = "Tác giả: " + args.author;
    $.storyType.text = "Thể loại: " + getTypeText(args.type);
    $.bookCoverView.backgroundImage = args.type == 0 ? "/common/book5.png" : "/common/book5.png";
    selectItem($.row);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;