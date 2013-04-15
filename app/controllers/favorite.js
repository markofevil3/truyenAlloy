var listFavorites;
var mangaRows;
var storyRows;
var tableView = $.bookShellTable;


function setRowData(data, type) {
	var dataSet = [];
	for (var i = 0; i < data.length; i++) {
		data[i].bookType = type;
		var row = Alloy.createController('favoriteRow', {data: data[i], window: $.favoriteWindow}).getView();
		dataSet.push(row);
	}
	return dataSet;
};

function getFavorites() {
	Alloy.Globals.getAjax('/getFavorites', {
		'userId': Titanium.Facebook.getUid()
	},
	function(response) {
		listFavorites = JSON.parse(response).data;
		mangaRows = setRowData(listFavorites['manga'], 0);
		storyRows = setRowData(listFavorites['story'], 1);
		tableView.data = mangaRows.concat(storyRows);
		$.filterTabbar.addEventListener('click', function(e) {
			switch (e.index) {
				case 0:
					var mangaRows = setRowData(listFavorites['manga'], 0);
					var storyRows = setRowData(listFavorites['story'], 1);
					tableView.data = mangaRows.concat(storyRows);
					break;
				case 1:
					tableView.data = setRowData(listFavorites['manga'], 0);
					break;
				case 2:
					tableView.data = setRowData(listFavorites['story'], 1);
					break;
			}
		});
	});
};

//## CHECK LOGIN TO GET FAVORITE LIST
// var facebookButton = Alloy.Globals.facebook.createLoginButton({
	// style: Ti.Facebook.BUTTON_STYLE_NORMAL,
// });
$.favoriteWindow.addEventListener('focus', function(f) {
	Alloy.Globals.CURRENT_TAB = $.favoriteTab;
	if (Alloy.Globals.facebook.loggedIn == 0) {
		Alloy.Globals.facebook.authorize();
		Alloy.Globals.facebook.addEventListener('login', function(e) {
	    if (e.success) {
				getFavorites();
	    } else if (e.error) {
        alert(e.error);
	    } else if (e.cancelled) {
        alert("You must login to use Favorites function!");
	    }
		});
	} else {
		getFavorites();
	}
});

//## ADVERTISE
Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
	$.advView.add(advImage);
});
