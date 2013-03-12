function Controller() {
    function selectItem(item) {
        item.addEventListener("click", function(e) {
            Alloy.Globals.getAjax("/mangaReading", {
                id: item.mangaId,
                chapter: item.chapterId
            }, function(response) {
                var json = JSON.parse(response), mangaReadingController = Alloy.createController("mangaReading", json.data);
                mangaReadingController.openMainWindow();
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        height: 40,
        backgroundColor: "transparent",
        backgroundImage: "/common/bookshelfBackground.png",
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    $.__views.chapterTitle = Ti.UI.createLabel({
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
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
    var args = arguments[0] || {}, row = $.row;
    row.chapterId = args.data._id;
    row.mangaId = args.data.mangaId;
    $.chapterTitle.text = "Chapter " + args.data.chapter;
    selectItem(row);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;