//## ADVERTISE
Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
	$.advertise.add(advImage);
});
Alloy.Globals.CURRENT_TAB = $.homeTab;
function selectMenu(e) {
	var selectedMenuController = Alloy.createController(e.rowData.dataName);
	selectedMenuController.openMainWindow();
};