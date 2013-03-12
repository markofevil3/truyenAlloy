exports.openMainWindow = function() {
	$.accountWindow.leftNavButton = Alloy.Globals.backButton($.accountWindow);
	Alloy.Globals.CURRENT_TAB.open($.accountWindow);
};