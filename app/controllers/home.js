//## ADVERTISE
Alloy.Globals.adv(Alloy.Globals.getDeviceType(), function(advImage) {
	$.advertise.add(advImage);
});

$.homeWindow.addEventListener('focus', function(e) {
	Alloy.Globals.CURRENT_TAB = $.homeTab;
});

function selectMenu(e) {
	if (e.rowData.dataName == "funnyList") {
		alert("Coming Soon!");
	} else {
		var selectedMenuController = Alloy.createController(e.rowData.dataName);
		selectedMenuController.openMainWindow();
	}
};