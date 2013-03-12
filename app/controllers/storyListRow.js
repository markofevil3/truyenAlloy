var args = arguments[0] || {};

$.row.dataId = args._id;
$.row.dataType = args.type;
$.bookCover.image = Alloy.Globals.SERVER + '/images/story/sample/cover.jpg';
$.storyTitle.text = args.title;
$.storyAuthor.text = 'Tác giả: ' + args.author;
$.storyType.text = 'Thể loại: ' + getTypeText(args.type);
$.bookCoverView.backgroundImage = (args.type == 0) ? '/common/book5.png' : '/common/book5.png';
selectItem($.row);

function selectItem(item) {
	item.addEventListener('click', function(e) {
		if (item.dataType == 0) {
			Alloy.Globals.getAjax('/getStoryContent', {
				'id': item.dataId,
				'type': item.dataType,
				'chapter': item.dataChapterId
			},
			function(response) {
				var json = JSON.parse(response);
				var storyReadingController = Alloy.createController('storyReading', json.data);
				storyReadingController.openMainWindow();
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
	if (type == 0) {
		return 'Truyện ngắn';
	} else {
		return 'Truyện dài';
	}
};