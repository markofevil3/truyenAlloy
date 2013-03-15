function Controller() {
    function selectItem(item) {
        item.addEventListener("click", function(e) {
            Alloy.Globals.getAjax("/manga", {
                id: item.dataId,
                userId: Titanium.Facebook.getUid()
            }, function(response) {
                var json = JSON.parse(response), mangaController = Alloy.createController("manga", json.data);
                mangaController.openMainWindow();
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        height: 120,
        backgroundColor: "transparent",
        backgroundImage: "/common/bookshelfBackground.png",
        selectedBackgroundColor: "transparent",
        layout: "horizontal",
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    $.__views.bookInfoView1 = Ti.UI.createView({
        width: 90,
        left: 12.5,
        layout: "vertical",
        selectedBackgroundColor: "blue",
        id: "bookInfoView1"
    });
    $.__views.row.add($.__views.bookInfoView1);
    $.__views.__alloyId11 = Ti.UI.createView({
        backgroundImage: "/common/bg_paper_tournament.png",
        height: "25%",
        top: 0,
        width: "100%",
        id: "__alloyId11"
    });
    $.__views.bookInfoView1.add($.__views.__alloyId11);
    $.__views.bookName1 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 13,
            fontWeight: "bold",
            fontFamily: "Chalkboard SE"
        },
        textAlign: "center",
        horizontalWrap: !0,
        id: "bookName1"
    });
    $.__views.__alloyId11.add($.__views.bookName1);
    $.__views.__alloyId12 = Ti.UI.createView({
        width: "75%",
        height: "68%",
        backgroundImage: "/common/book2.png",
        id: "__alloyId12"
    });
    $.__views.bookInfoView1.add($.__views.__alloyId12);
    $.__views.coverLink1 = Ti.UI.createImageView({
        image: "http://localhost:3000/images/manga/9-faces-of-love/cover.jpg",
        width: "80%",
        height: 77,
        top: 0,
        left: 9,
        defaultImage: "/common/default_image.jpg",
        id: "coverLink1"
    });
    $.__views.__alloyId12.add($.__views.coverLink1);
    $.__views.bookInfoView2 = Ti.UI.createView({
        width: 90,
        left: 12.5,
        layout: "vertical",
        selectedBackgroundColor: "blue",
        id: "bookInfoView2"
    });
    $.__views.row.add($.__views.bookInfoView2);
    $.__views.__alloyId13 = Ti.UI.createView({
        backgroundImage: "/common/bg_paper_tournament.png",
        height: "25%",
        top: 0,
        width: "100%",
        id: "__alloyId13"
    });
    $.__views.bookInfoView2.add($.__views.__alloyId13);
    $.__views.bookName2 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 13,
            fontWeight: "bold",
            fontFamily: "Chalkboard SE"
        },
        textAlign: "center",
        horizontalWrap: !0,
        id: "bookName2"
    });
    $.__views.__alloyId13.add($.__views.bookName2);
    $.__views.__alloyId14 = Ti.UI.createView({
        width: "75%",
        height: "68%",
        backgroundImage: "/common/book2.png",
        id: "__alloyId14"
    });
    $.__views.bookInfoView2.add($.__views.__alloyId14);
    $.__views.coverLink2 = Ti.UI.createImageView({
        image: "http://localhost:3000/images/manga/9-faces-of-love/cover.jpg",
        width: "80%",
        height: 77,
        top: 0,
        left: 9,
        defaultImage: "/common/default_image.jpg",
        id: "coverLink2"
    });
    $.__views.__alloyId14.add($.__views.coverLink2);
    $.__views.bookInfoView3 = Ti.UI.createView({
        width: 90,
        left: 12.5,
        layout: "vertical",
        selectedBackgroundColor: "blue",
        id: "bookInfoView3"
    });
    $.__views.row.add($.__views.bookInfoView3);
    $.__views.__alloyId15 = Ti.UI.createView({
        backgroundImage: "/common/bg_paper_tournament.png",
        height: "25%",
        top: 0,
        width: "100%",
        id: "__alloyId15"
    });
    $.__views.bookInfoView3.add($.__views.__alloyId15);
    $.__views.bookName3 = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: 13,
            fontWeight: "bold",
            fontFamily: "Chalkboard SE"
        },
        textAlign: "center",
        horizontalWrap: !0,
        id: "bookName3"
    });
    $.__views.__alloyId15.add($.__views.bookName3);
    $.__views.__alloyId16 = Ti.UI.createView({
        width: "75%",
        height: "68%",
        backgroundImage: "/common/book2.png",
        id: "__alloyId16"
    });
    $.__views.bookInfoView3.add($.__views.__alloyId16);
    $.__views.coverLink3 = Ti.UI.createImageView({
        image: "http://localhost:3000/images/manga/9-faces-of-love/cover.jpg",
        width: "80%",
        height: 77,
        top: 0,
        left: 9,
        defaultImage: "/common/default_image.jpg",
        id: "coverLink3"
    });
    $.__views.__alloyId16.add($.__views.coverLink3);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    for (var i = 0; i < 3; i++) {
        var bookInfoView = $["bookInfoView" + (i + 1)];
        if (args.data[i]) {
            $["bookName" + (i + 1)].text = args.data[i].title;
            $["coverLink" + (i + 1)].image = Alloy.Globals.SERVER + args.data[i].folder + "/cover.jpg";
            bookInfoView.dataId = args.data[i]._id;
            selectItem(bookInfoView);
        } else bookInfoView.setVisible(!1);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;