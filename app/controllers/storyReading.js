var args = arguments[0] || {};

exports.openMainWindow = function() {
	$.contentLabel.text = args.content;
	$.storyReadingWindow.open({ transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
};

function closeWindow() {
	var smallDown = Titanium.UI.create2DMatrix();
	smallDown = smallDown.scale(0);
	$.storyReadingWindow.close({ transform: smallDown, duration:300 });
};

function changeTextSize(e) {
	if (e.source.dataType == '0') {
		$.contentLabel.font = { fontSize: 18 };
	} else {
		$.contentLabel.font = { fontSize: 22 };
	}
};
