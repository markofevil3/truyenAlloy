function Controller() {
    function SetChangeChapterButtons(next, prev) {
        if (next != null) {
            $.nextButton.visible = !0;
            $.nextButton.chapterId = next;
        }
        if (prev != null) {
            $.prevButton.visible = !0;
            $.prevButton.chapterId = prev;
        }
    }
    function changeChapter(e) {
        log(e.source.chapterId);
        Alloy.Globals.getAjax("/mangaReading", {
            id: args.mangaId,
            chapter: e.source.chapterId
        }, function(response) {
            var json = JSON.parse(response);
            json.data.next = json.nextPrevChapters.next;
            json.data.prev = json.nextPrevChapters.prev;
            json.data.mangaId = args.mangaId;
            closeWindowNoAnimation();
            var mangaReadingController = Alloy.createController("mangaReading", json.data);
            mangaReadingController.openMainWindow();
        });
    }
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
    function closeWindowNoAnimation() {
        $.mangaReadingWindow.close();
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
                height: "auto"
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
    $.__views.topBar = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            backgroundColor: "#000",
            height: 40,
            top: 0
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            backgroundColor: "#000",
            height: 80,
            top: 0
        });
        _.extend(o, {
            id: "topBar"
        });
        return o;
    }());
    $.__views.funcBar.add($.__views.topBar);
    $.__views.closeButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
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
            color: "#CCCCCC"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            title: "close",
            width: 120,
            height: 50,
            right: 10,
            font: {
                fontWeight: "bold",
                fontSize: 28
            },
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#ffffff",
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#333",
            color: "#CCCCCC"
        });
        _.extend(o, {
            id: "closeButton"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.closeButton);
    closeWindow ? $.__views.closeButton.addEventListener("click", closeWindow) : __defers["$.__views.closeButton!click!closeWindow"] = !0;
    $.__views.chapterTitle = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#CCCCCC",
            font: {
                fontWeight: "bold",
                fontSize: 17
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#CCCCCC",
            font: {
                fontWeight: "bold",
                fontSize: 34
            }
        });
        _.extend(o, {
            id: "chapterTitle"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.chapterTitle);
    $.__views.pageCount = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            color: "#CCCCCC",
            left: 10,
            font: {
                fontSize: 17
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            color: "#CCCCCC",
            left: 10,
            font: {
                fontSize: 34
            }
        });
        _.extend(o, {
            id: "pageCount"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.pageCount);
    $.__views.buttonBar = Ti.UI.createView({
        top: 50,
        height: Titanium.UI.SIZE,
        id: "buttonBar"
    });
    $.__views.funcBar.add($.__views.buttonBar);
    $.__views.prevButton = Ti.UI.createButton({
        width: 120,
        height: 30,
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
        left: 10,
        visible: !1,
        id: "prevButton",
        title: "Chapter Trước"
    });
    $.__views.buttonBar.add($.__views.prevButton);
    changeChapter ? $.__views.prevButton.addEventListener("click", changeChapter) : __defers["$.__views.prevButton!click!changeChapter"] = !0;
    $.__views.nextButton = Ti.UI.createButton({
        width: 120,
        height: 30,
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
        right: 10,
        visible: !1,
        id: "nextButton",
        title: "Chapter Sau"
    });
    $.__views.buttonBar.add($.__views.nextButton);
    changeChapter ? $.__views.nextButton.addEventListener("click", changeChapter) : __defers["$.__views.nextButton!click!changeChapter"] = !0;
    $.__views.advView2 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: 40,
            bottom: 0
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 80,
            bottom: 0
        });
        _.extend(o, {
            id: "advView2"
        });
        return o;
    }());
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
        log(args);
        SetChangeChapterButtons(args.next, args.prev);
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
    __defers["$.__views.prevButton!click!changeChapter"] && $.__views.prevButton.addEventListener("click", changeChapter);
    __defers["$.__views.nextButton!click!changeChapter"] && $.__views.nextButton.addEventListener("click", changeChapter);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;