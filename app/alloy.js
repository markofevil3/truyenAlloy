// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.SERVER = 'http://truyen.zapto.org';
Alloy.Globals.MAX_DISPLAY_ROW = 30;
Alloy.Globals.RATIO = 1;
Alloy.Globals.CURRENT_TAB = null;
Titanium.Facebook.appid = "514307815249030";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];

function log(para) {
	Ti.API.debug(JSON.stringify(para));
};

Alloy.Globals.isTablet = function() {
	var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	return isTablet;
};

Alloy.Globals.getDeviceType = function() {
	var isTablet = Alloy.Globals.isTablet();
	var device;
	if (isTablet) {
		return 1;
	} else {
		return 0;
	}
};

Alloy.Globals.backButton = function(window) {
	var backbutton = Titanium.UI.createButton({
		backgroundImage:'/common/back.png',
		width:50,
		height:30
	});
	backbutton.addEventListener('click', function() {
		window.close({animated:true});
	});
	return backbutton;
};

Alloy.Globals.getAjax = function(url, query, callback) {
	var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
	    Ti.API.debug(this.responseText);
	    if (callback) {
	      callback(this.responseText);
	    }
    },
    onerror: function(e) {
			Ti.API.debug(e.error);
    },
    timeout: 10000
	});
	var fullUrl = Alloy.Globals.SERVER + url;
	if (query) {
    if (isHash(query)) {
      var isFirstParameter = true;
      for (var key in query) {
        fullUrl += (isFirstParameter ? '?' : '&');
        isFirstParameter = false;

        fullUrl += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]);
      }
    } else if (query.length > 0) {
      fullUrl += '?' + query;
    }
  }
  
  fullUrl += '&timestamp=' + Date.now();
	xhr.open("GET", fullUrl);
	xhr.send();
};

Alloy.Globals.dynamicSort = function(property, type) {
  return function (a,b) {
    return (a[property] < b[property]) ? (-1 * type) : (a[property] > b[property]) ? (1 * type) : 0;
  }
};

Alloy.Globals.dynamicLoad = function(tableView, data) {
	var loadingIcon = Titanium.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
	});
	var loadingView = Titanium.UI.createView();
	loadingView.add(loadingIcon);
	var loadingRow = Ti.UI.createTableViewRow({
		height: 40,
	});
	loadingRow.add(loadingView);
	var lastRowIndex = tableView.data[0].rowCount;
	var updating = false;
	
	function beginUpdate() {
		updating = true;
		tableView.appendRow(loadingRow);
		loadingIcon.show();
		setTimeout(endUpdate, 500);
	};
	// function selectItem(item) {
		// item.addEventListener('click', function(e) {
			// var Window = require('ui/common/Reading');
			// new Window(item);
		// });
	// };
	function endUpdate() {
		updating = false;
		loadingIcon.hide();
		tableView.deleteRow(lastRowIndex - 1, { animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE });
		var nextRowIndex = lastRowIndex - 1 + Alloy.Globals.MAX_DISPLAY_ROW;
		if (nextRowIndex > data.length) {
			nextRowIndex = data.length;
		}
		for (var i = lastRowIndex - 1; i < nextRowIndex; i++) {
			var row = Ti.UI.createTableViewRow({
		    backgroundImage: '/common/bookshelfBackground.png',
				height: 40,
				chapterId: data[i]._id,
				id: tableView.id,
			});
			var labelChapter = Ti.UI.createLabel({
				text: 'Chapter ' + data[i].chapter,
				color: '#fff',
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				font: { fontWeight: 'bold', fontSize: 17, fontFamily: 'Chalkboard SE' }
			});
			var labelTitle = Ti.UI.createLabel({
				text: data[i].title,
				left: 105 * Alloy.Globals.RATIO
			});
			row.add(labelChapter);
			row.add(labelTitle);
			selectItem(row);
			tableView.appendRow(row, { animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE });
		}
		lastRowIndex += Alloy.Globals.MAX_DISPLAY_ROW;
		tableView.scrollToIndex(lastRowIndex - Alloy.Globals.MAX_DISPLAY_ROW,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
	};
	var lastDistance = 0;
	tableView.addEventListener('scroll',function(e) {
		lastRowIndex = tableView.data[0].rowCount;
		var offset = e.contentOffset.y;
		var height = e.size.height;
		var total = offset + height;
		var theEnd = e.contentSize.height;
		var distance = theEnd - total;
	
		if (distance < lastDistance) {
			var nearEnd = theEnd * 1;
			if (!updating && (total >= nearEnd) && lastRowIndex < data.length && tableView.data[0].rows[0].chapterId == data[0]._id 
			&& (tableView.data[0].rows[1] && tableView.data[0].rows[1].chapterId == data[1]._id)
			&& tableView.data[0].rows[lastRowIndex - 1].chapterId != data[data.length -1]._id && lastRowIndex >= Alloy.Globals.MAX_DISPLAY_ROW) {
				beginUpdate();
			}
		}
		lastDistance = distance;
	});
};

Alloy.Globals.addFavorite = function(itemId, itemType, user, callback) {
	Alloy.Globals.getAjax('/addFavorite', {
		userId: user.id,
		username: user.username,
		fullName: user.name,
		itemId: itemId,
		itemType: itemType,
	},
	function(response) {
		var data = JSON.parse(response).data;
		console.log(data);
		if (data == 'success') {
			callback();
		}
	});
};

Alloy.Globals.removeUTF8 = function(str) {
  str = str.toLowerCase();  
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");  
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");  
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");  
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");  
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");  
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");  
  str = str.replace(/đ/g,"d");  
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-"); 
  str= str.replace(/-+-/g,"-");
  str= str.replace(/^\-+|\-+$/g,"");
  return str;  
};

Alloy.Globals.adv = function(type, callback) {
	var advImage = Ti.UI.createImageView({
		width: '100%',
		height: 40,
		image: Alloy.Globals.SERVER + '/images/adv/adv1.jpg',
	});
	Alloy.Globals.getAjax('/adv', {
		'type': type
	},
	function(response) {
		var link = JSON.parse(response).data;
		advImage.addEventListener('click', function(e) {
			Titanium.Platform.openURL(link);
		});
		callback(advImage);
	});
};

function isHash(obj) {
  return obj.constructor == Object;
};