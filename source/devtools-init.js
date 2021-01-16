browser.devtools.panels
	.create(
		"My Panel", // title
		"icons/star.png", // icon
		"devtools-panel.html" // content
	)
	.then((newPanel) => {
		newPanel.onShown.addListener(initialisePanel);
		newPanel.onHidden.addListener(unInitialisePanel);
	});

function initialisePanel() {
	console.log("initializePanel");
}

function unInitialisePanel() {
	console.log("unInitializePanel");
}
