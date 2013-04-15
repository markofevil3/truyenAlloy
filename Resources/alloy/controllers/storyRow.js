function Controller() {
    function selectItem(item) {
        item.addEventListener("click", function() {
            Alloy.Globals.openLoading(args.window);
            Alloy.Globals.getAjax("/getStoryContent", {
                id: item.dataId,
                type: item.dataType,
                chapter: item.dataChapterId
            }, function(response) {
                var json = JSON.parse(response);
                var storyReadingController = Alloy.createController("storyReading", json.data);
                Alloy.Globals.closeLoading(args.window);
                storyReadingController.openMainWindow();
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        height: 40,
        backgroundColor: "transparent",
        backgroundImage: "/common/bookshelfBackground.png",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.chapterTitle = Ti.UI.createLabel({
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        left: 17,
        font: {
            fontWeight: "bold",
            fontSize: 17,
            fontFamily: "Chalkboard SE"
        },
        id: "chapterTitle"
    });
    $.__views.row.add($.__views.chapterTitle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var row = $.row;
    row.dataId = args.data.storyId;
    row.dataType = 1;
    row.dataChapterId = args.data._id;
    $.chapterTitle.text = "Chapter " + args.data.chapter;
    args.data.title && ($.chapterTitle.text += ": " + args.data.title);
    selectItem(row);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;