function log(para) {
    Ti.API.debug(JSON.stringify(para));
}

function showRequestResult(e) {
    var s = "";
    if (e.success) {
        s = "SUCCESS";
        e.result && (s += "; " + e.result);
        e.data && (s += "; " + e.data);
        !e.result && !e.data && (s = "\"success\", but no data from FB.  I am guessing you cancelled the dialog.");
    } else if (e.cancelled) s = "CANCELLED"; else {
        s = "FAIL";
        e.error && (s += "; " + e.error);
    }
    alert(s);
}

function isHash(obj) {
    return obj.constructor == Object;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.SERVER = "http://truyen.zapto.org";

Alloy.Globals.MAX_DISPLAY_ROW = 30;

Alloy.Globals.NEW_TIME_MILLISECONDS = 259200000;

Alloy.Globals.RATIO = 1;

Alloy.Globals.CURRENT_TAB = null;

Alloy.Globals.currentLoadingView = null;

Alloy.Globals.FBPOST_LINK = "https://www.facebook.com/bui.p.quan?ref=tn_tnmn";

Titanium.Facebook.appid = "514307815249030";

Titanium.Facebook.permissions = [ "publish_stream", "read_stream" ];

var loadingIcon = Titanium.UI.createActivityIndicator({
    style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG
}), loadingView = Titanium.UI.createView({
    backgroundColor: "rgba(0,0,0,0.5)",
    backgroundImage: "NONE",
    width: Titanium.UI.FILL,
    height: Titanium.UI.FILL,
    id: "loadingView",
    top: 0,
    zIndex: 9999
});

loadingView.add(loadingIcon);

Alloy.Globals.fbPost = function(itemTitle, imageLink) {
    var data = {
        link: Alloy.Globals.FBPOST_LINK,
        name: "TruyệnAlloy",
        message: "Đang đọc truyện " + itemTitle + " trên điện thoại bằng ",
        caption: "Phần mềm đọc truyện hay nhất trên mobile và tablet",
        picture: imageLink,
        description: "Hãy tải phần mềm để có thể đọc truyện mọi lúc mọi nơi, update liên tục, thông báo mỗi khi có chapter mới và rất nhiều tính năng khác. FREEEEEEE!!!!!",
        test: [ {
            foo: "Encoding test",
            bar: "Durp durp"
        }, "test" ]
    };
    Titanium.Facebook.dialog("feed", data, showRequestResult);
};

Alloy.Globals.openLoading = function(window) {
    loadingIcon.show();
    Alloy.Globals.currentLoadingView = loadingView;
    window.add(loadingView);
};

Alloy.Globals.closeLoading = function(window) {
    window.remove(Alloy.Globals.currentLoadingView);
    Alloy.Globals.currentLoadingView = null;
};

Alloy.Globals.isNew = function(checkDate) {
    var today = new Date;
    return today.getTime() - checkDate.getTime() <= Alloy.Globals.NEW_TIME_MILLISECONDS ? !0 : !1;
};

Alloy.Globals.isTablet = function() {
    var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth, isTablet = osname === "ipad" || osname === "android" && (width > 899 || height > 899);
    return isTablet;
};

Alloy.Globals.getDeviceType = function() {
    var isTablet = Alloy.Globals.isTablet(), device;
    return isTablet ? 1 : 0;
};

Alloy.Globals.backButton = function(window) {
    var backbutton = Titanium.UI.createButton({
        backgroundImage: "/common/back.png",
        width: 50,
        height: 30
    });
    backbutton.addEventListener("click", function() {
        window.close({
            animated: !0
        });
    });
    return backbutton;
};

Alloy.Globals.getAjax = function(url, query, callback) {
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            Ti.API.debug(this.responseText);
            callback && callback(this.responseText);
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
        },
        timeout: 10000
    }), fullUrl = Alloy.Globals.SERVER + url;
    if (query) if (isHash(query)) {
        var isFirstParameter = !0;
        for (var key in query) {
            fullUrl += isFirstParameter ? "?" : "&";
            isFirstParameter = !1;
            fullUrl += encodeURIComponent(key) + "=" + encodeURIComponent(query[key]);
        }
    } else query.length > 0 && (fullUrl += "?" + query);
    fullUrl += "&timestamp=" + Date.now();
    xhr.open("GET", fullUrl);
    xhr.send();
};

Alloy.Globals.dynamicSort = function(property, type) {
    return function(a, b) {
        return a[property] < b[property] ? -1 * type : a[property] > b[property] ? 1 * type : 0;
    };
};

Alloy.Globals.dynamicLoad = function(tableView, data) {
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
        var nextRowIndex = lastRowIndex - 1 + Alloy.Globals.MAX_DISPLAY_ROW;
        nextRowIndex > data.length && (nextRowIndex = data.length);
        for (var i = lastRowIndex - 1; i < nextRowIndex; i++) {
            var row = Ti.UI.createTableViewRow({
                backgroundImage: "/common/bookshelfBackground.png",
                height: 40,
                chapterId: data[i]._id,
                id: tableView.id
            }), labelChapter = Ti.UI.createLabel({
                text: "Chapter " + data[i].chapter,
                color: "#fff",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                font: {
                    fontWeight: "bold",
                    fontSize: 17,
                    fontFamily: "Chalkboard SE"
                }
            }), labelTitle = Ti.UI.createLabel({
                text: data[i].title,
                left: 105 * Alloy.Globals.RATIO
            });
            row.add(labelChapter);
            row.add(labelTitle);
            selectItem(row);
            tableView.appendRow(row, {
                animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
            });
        }
        lastRowIndex += Alloy.Globals.MAX_DISPLAY_ROW;
        tableView.scrollToIndex(lastRowIndex - Alloy.Globals.MAX_DISPLAY_ROW, {
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
            !updating && total >= nearEnd && lastRowIndex < data.length && tableView.data[0].rows[0].chapterId == data[0]._id && tableView.data[0].rows[1] && tableView.data[0].rows[1].chapterId == data[1]._id && tableView.data[0].rows[lastRowIndex - 1].chapterId != data[data.length - 1]._id && lastRowIndex >= Alloy.Globals.MAX_DISPLAY_ROW && beginUpdate();
        }
        lastDistance = distance;
    });
};

Alloy.Globals.addFavorite = function(itemId, itemType, user, title, imageLink, callback) {
    Alloy.Globals.getAjax("/addFavorite", {
        userId: user.id,
        username: user.username,
        fullName: user.name,
        itemId: itemId,
        itemType: itemType
    }, function(response) {
        var data = JSON.parse(response).data;
        Alloy.Globals.fbPost(title, imageLink);
        data == "success" && callback();
    });
};

Alloy.Globals.removeUTF8 = function(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
};

Alloy.Globals.adv = function(type, callback) {
    var advImage = Ti.UI.iOS.createAdView({
        width: "auto",
        height: 50
    });
    Alloy.Globals.getAjax("/adv", {
        type: type
    }, function(response) {
        var link = JSON.parse(response).data;
        advImage.addEventListener("click", function(e) {
            Titanium.Platform.openURL(link);
        });
        callback(advImage);
    });
};

Alloy.createController("index");