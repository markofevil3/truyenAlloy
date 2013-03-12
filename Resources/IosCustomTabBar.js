function overrideTabs(tabGroup, backgroundOptions, selectedOptions, deselectedOptions) {
    deselectedOptions.top = deselectedOptions.bottom = selectedOptions.top = selectedOptions.bottom = backgroundOptions.left = backgroundOptions.right = backgroundOptions.bottom = 0;
    backgroundOptions.height = 50;
    var background = Ti.UI.createView(backgroundOptions);
    background.touchEnabled = !1;
    var increment = 100 / tabGroup.tabs.length;
    Alloy.Globals.isTablet() ? deselectedOptions.width = selectedOptions.width = 100 / 9 + "%" : deselectedOptions.width = selectedOptions.width = increment + "%";
    for (var i = 0, l = tabGroup.tabs.length; i < l; i++) {
        var tab = tabGroup.tabs[i];
        Alloy.Globals.isTablet() ? selectedOptions.left = deselectedOptions.left = 300 / 9 - 3 + (100 / 9 + 3) * i + "%" : selectedOptions.left = deselectedOptions.left = increment * i + "%";
        selectedOptions.title = deselectedOptions.title = tab.title;
        selectedOptions.image = deselectedOptions.image = tab.icon;
        selectedOptions.height = deselectedOptions.height = 50;
        tab.backgroundImage && (selectedOptions.backgroundImage = deselectedOptions.backgroundImage = tab.backgroundImage);
        tab.selectedBackgroundImage && (selectedOptions.backgroundImage = tab.selectedBackgroundImage);
        tab.deselectedBackgroundImage && (deselectedOptions.backgroundImage = tab.deselectedBackgroundImage);
        selectedOptions.visible = !1;
        background.add(tab.deselected = Ti.UI.createButton(deselectedOptions));
        background.add(tab.selected = Ti.UI.createButton(selectedOptions));
        Titanium.Gesture.addEventListener("orientationchange", function(e) {
            switch (Titanium.Gesture.orientation) {
              case Titanium.UI.LANDSCAPE_LEFT:
              case Titanium.UI.LANDSCAPE_RIGHT:
                background.width = "100%";
                break;
              case Titanium.UI.PORTRAIT:
              case Titanium.UI.UPSIDE_PORTRAIT:
                background.width = "100%";
            }
        });
    }
    tabGroup.overrideTabs ? tabGroup.remove(tabGroup.overrideTabs) : tabGroup.addEventListener("focus", overrideFocusTab);
    tabGroup.add(background);
    tabGroup.overrideTabs = background;
}

function overrideFocusTab(evt) {
    evt.previousIndex >= 0 && (evt.source.tabs[evt.previousIndex].selected.visible = !1);
    evt.tab.selected.visible = !0;
}

module.exports = overrideTabs;