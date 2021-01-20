chrome.devtools.panels
	.create(
		"HYF Validator", // title
		"icon.png", // icon
		"devtools-panel.html" // content
	)
	.then(newPanel => {
		newPanel.onShown.addListener(initialisePanel);
		newPanel.onHidden.addListener(unInitialisePanel);
	});

function initialisePanel() {
	console.log("initializePanel");
}

function unInitialisePanel() {
	console.log("unInitializePanel");
}
