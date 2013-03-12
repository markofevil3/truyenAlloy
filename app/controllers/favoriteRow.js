var args = arguments[0] || {};

$.row.dataId = args._id;
$.row.dataType = args.bookType;
var coverLink;
if (args.bookType == 0) {
	coverLink = Alloy.Globals.SERVER + args.folder + '/cover.jpg';
} else {
	coverLink = Alloy.Globals.SERVER + '/images/story/sample/cover.jpg';
}
$.bookCover.image = coverLink;
$.bookTitle.text = args.title;
$.newestChapter.text = 'Newest: ' + args.chapters[args.chapters.length - 1].chapter;
$.bookType.text = 'Thể loại: ' + getTypeText(args.bookType);
$.bookCoverView.backgroundImage = (args.bookType == 0) ? '/common/book5.png' : '/common/book5.png';
selectItem($.row, args.bookType);

function selectItem(item, type) {
	item.addEventListener('click', function(e) {
		if (type == 0) {
			console.log('manga');
			Alloy.Globals.getAjax('/manga', {
				'id': item.dataId,
				'userId': Titanium.Facebook.getUid()
			},
			function(response) {
				var json = JSON.parse(response);
				var mangaController = Alloy.createController('manga', json.data);
				mangaController.openMainWindow();
			});
		} else {
			Alloy.Globals.getAjax('/getStory', {
				'id': item.dataId,
				'userId': Titanium.Facebook.getUid()
			},
			function(response) {
				var json = JSON.parse(response);
				var storyController = Alloy.createController('story', json.data);
				storyController.openMainWindow();
			});
		}
	});
};

function getTypeText(type) {
	switch(type) {
		case 0:
			return 'Truyện Tranh';
			break;
		case 1:
			return 'Truyện Chữ';
			break;
	}
};