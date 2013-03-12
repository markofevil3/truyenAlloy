var args = arguments[0] || {};
var images = [];
var listImages;
var pageCount = $.pageCount;
var currentPage;

exports.openMainWindow = function() {
	listImages = args.pages;
	$.mangaReadingWindow.title = "Chapter " + args.chapter;
	$.chapterTitle.text = 'Chapter ' + args.chapter;
	pageCount.text = '1/' + listImages.length;
	Alloy.Globals.adv(3, function(advImage) {
		$.advView2.add(advImage);
	});
	hideFuncBar();
	addImageView();
	currentPage = images[0];
	changePage();
	$.mangaReadingWindow.addEventListener('singletap', showFuncBar);
	$.mangaReadingWindow.open({ transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
};

function hideFuncBar() {
	$.funcBar.hide();
	$.funcBar.opacity = 0;
};

function showFuncBar() {
	if ($.funcBar.visible) {
		$.funcBar.animate({opacity: 0, duration: 1000}, function() {
			$.funcBar.hide();
		});
	} else {
		$.funcBar.show();
		$.funcBar.animate({opacity: 1, duration: 1000}, function() {
		});
	}
}

function closeWindow() {
	var smallDown = Titanium.UI.create2DMatrix();
	smallDown = smallDown.scale(0);
	$.mangaReadingWindow.close({ transform: smallDown, duration:300 });
};

function addImageView() {
	var maxZindex = listImages.length;
	for (var i = 0; i < listImages.length; i++) {
		var image = Ti.UI.createImageView({
			image: Alloy.Globals.SERVER + listImages[i],
			width: '100%',
			height: '100%',
		});
		var scrollView = Ti.UI.createScrollView({
		  contentWidth: '100%',
		  contentHeight: '100%',
		  backgroundColor: '#000',
		  showVerticalScrollIndicator: true,
		  showHorizontalScrollIndicator: true,
		  height: '100%',
		  width: '100%',
		  zIndex: maxZindex,
		  index: i,
		  maxZoomScale: 3,
			minZoomScale: 1
		});
		scrollView.add(image);
		// changePage(scrollView);
		images.push(scrollView);
		$.imageHolderView.add(scrollView);
		maxZindex--;
	}
};

function changePage() {
	$.mangaReadingWindow.addEventListener('swipe', function(e) {
		if (e.direction == 'left') {
			var nextImage = images[currentPage.index + 1];
			if (nextImage) {
				$.imageHolderView.animate({ view: nextImage, transition: Ti.UI.iPhone.AnimationStyle.CURL_UP, duration: 500 }, function() {
					nextImage.show();
					currentPage = nextImage;
					pageCount.text = (currentPage.index + 1) + '/' + listImages.length;
				});
			}
		}
		if (e.direction == 'right') {
			var nextImage = images[currentPage.index - 1];
			if (nextImage) {
				$.imageHolderView.animate({ view: nextImage, transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN, duration: 500 });
				nextImage.show();
				currentPage = nextImage;
				pageCount.text = nextImage.index + '/' + listImages.length;
			}
		}
	});
};