var args = arguments[0] || {};

function selectItem(item) {
	item.addEventListener('click', function(e) {
		Alloy.Globals.getAjax('/mangaReading', {
			'id': item.mangaId,
			'chapter': item.chapterId
		},
		function(response) {
			var json = JSON.parse(response);
			var mangaReadingController = Alloy.createController('mangaReading', json.data);
			mangaReadingController.openMainWindow();
		});
	});
};

var row = $.row;
row.chapterId = args.data._id;
row.mangaId = args.data.mangaId;
$.chapterTitle.text = 'Chapter ' +  args.data.chapter;
selectItem(row);
