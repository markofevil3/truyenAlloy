function Controller() {
    function hideFuncBar() {
        $.funcBar.hide();
        $.funcBar.opacity = 0;
    }
    function showFuncBar() {
        if ($.funcBar.visible) $.funcBar.animate({
            opacity: 0,
            duration: 1000
        }, function() {
            $.funcBar.hide();
        }); else {
            $.funcBar.show();
            $.funcBar.animate({
                opacity: 1,
                duration: 1000
            }, function() {});
        }
    }
    function closeWindow() {
        var smallDown = Titanium.UI.create2DMatrix();
        smallDown = smallDown.scale(0);
        $.mangaReadingWindow.close({
            transform: smallDown,
            duration: 300
        });
    }
    function addImageView() {
        var maxZindex = listImages.length;
        for (var i = 0; i < listImages.length; i++) {
            var image = Ti.UI.createImageView({
                image: Alloy.Globals.SERVER + listImages[i],
                width: "100%",
                height: "100%"
            }), scrollView = Ti.UI.createScrollView({
                contentWidth: "100%",
                contentHeight: "100%",
                backgroundColor: "#000",
                showVerticalScrollIndicator: !0,
                showHorizontalScrollIndicator: !0,
                height: "100%",
                width: "100%",
                zIndex: maxZindex,
                index: i,
                maxZoomScale: 3,
                minZoomScale: 1
            });
            scrollView.add(image);
            images.push(scrollView);
            $.imageHolderView.add(scrollView);
            maxZindex--;
        }
    }
    function changePage() {
        $.mangaReadingWindow.addEventListener("swipe", function(e) {
            if (e.direction == "left") {
                var nextImage = images[currentPage.index + 1];
                nextImage && $.imageHolderView.animate({
                    view: nextImage,
                    transition: Ti.UI.iPhone.AnimationStyle.CURL_UP,
                    duration: 500
                }, function() {
                    nextImage.show();
                    currentPage = nextImage;
                    pageCount.text = currentPage.index + 1 + "/" + listImages.length;
                });
            }
            if (e.direction == "right") {
                var nextImage = images[currentPage.index - 1];
                if (nextImage) {
                    $.imageHolderView.animate({
                        view: nextImage,
                        transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN,
                        duration: 500
                    });
                    nextImage.show();
                    currentPage = nextImage;
                    pageCount.text = nextImage.index + "/" + listImages.length;
                }
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.mangaReadingWindow = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "mangaReadingWindow"
    });
    $.addTopLevelView($.__views.mangaReadingWindow);
    $.__views.funcBar = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        zIndex: 9999,
        id: "funcBar"
    });
    $.__views.mangaReadingWindow.add($.__views.funcBar);
    $.__views.topBar = Ti.UI.createView({
        backgroundColor: "#000",
        height: 40,
        top: 0,
        id: "topBar"
    });
    $.__views.funcBar.add($.__views.topBar);
    $.__views.closeButton = Ti.UI.createButton({
        title: "close",
        width: 60,
        height: 25,
        right: 10,
        font: {
            fontWeight: "bold",
            fontSize: 14
        },
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ffffff",
        backgroundColor: "#222",
        backgroundImage: "NONE",
        selectedColor: "#333",
        color: "#CCCCCC",
        id: "closeButton"
    });
    $.__views.topBar.add($.__views.closeButton);
    closeWindow ? $.__views.closeButton.addEventListener("click", closeWindow) : __defers["$.__views.closeButton!click!closeWindow"] = !0;
    $.__views.chapterTitle = Ti.UI.createLabel({
        color: "#CCCCCC",
        font: {
            fontWeight: "bold",
            fontSize: 17
        },
        id: "chapterTitle"
    });
    $.__views.topBar.add($.__views.chapterTitle);
    $.__views.pageCount = Ti.UI.createLabel({
        color: "#CCCCCC",
        left: 10,
        font: {
            fontSize: 17
        },
        id: "pageCount"
    });
    $.__views.topBar.add($.__views.pageCount);
    $.__views.advView2 = Ti.UI.createView({
        width: "100%",
        height: 40,
        bottom: 0,
        id: "advView2"
    });
    $.__views.funcBar.add($.__views.advView2);
    $.__views.imageHolderView = Ti.UI.createView({
        width: "100%",
        height: "100%",
        id: "imageHolderView"
    });
    $.__views.mangaReadingWindow.add($.__views.imageHolderView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, images = [], listImages, pageCount = $.pageCount, currentPage;
    exports.openMainWindow = function() {
        listImages = args.pages;
        $.mangaReadingWindow.title = "Chapter " + args.chapter;
        $.chapterTitle.text = "Chapter " + args.chapter;
        pageCount.text = "1/" + listImages.length;
        Alloy.Globals.adv(3, function(advImage) {
            $.advView2.add(advImage);
        });
        hideFuncBar();
        addImageView();
        currentPage = images[0];
        changePage();
        $.mangaReadingWindow.addEventListener("singletap", showFuncBar);
        $.mangaReadingWindow.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
        });
    };
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;