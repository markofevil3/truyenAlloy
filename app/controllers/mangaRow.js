var args = arguments[0] || {};

function selectItem(item) {
	item.addEventListener('click', function(e) {
		Alloy.Globals.getAjax('/mangaReading', {
			'id': item.mangaId,
			'chapter': item.chapterId
		},
		function(response) {
			var json = JSON.parse(response);
			// json.data.next = item.next;
			// json.data.prev = item.prev;
			json.data.next = json.nextPrevChapters.next;
			json.data.prev = json.nextPrevChapters.prev;
			json.data.mangaId = item.mangaId;
			var mangaReadingController = Alloy.createController('mangaReading', json.data);
			mangaReadingController.openMainWindow();
		});
	});
};

var row = $.row;
row.chapterId = args.data._id;
row.mangaId = args.data.mangaId;
row.next = args.data.next;
row.prev = args.data.prev;
$.chapterTitle.text = 'Chapter ' +  args.data.chapter;
selectItem(row);
