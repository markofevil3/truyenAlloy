exports.openMainWindow = function() {
	$.supportWindow.leftNavButton = Alloy.Globals.backButton($.supportWindow);
	Alloy.Globals.CURRENT_TAB.open($.supportWindow);
};