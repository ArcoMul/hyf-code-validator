// eslint-disable-next-line import/no-unassigned-import
// import './options-storage';

function handleMessage(request, sender, sendResponse) {
	console.log("handleMessage", request.message);
	if (request.message === "validate") {
		browser.tabs
			.executeScript(request.tabId, {
				file: "validate.js",
			})
			.then(onExecuted, onError)
			.catch((err) => {
				console.log(err);
			});
	} else if (request.message === "validation-result") {
		browser.runtime.sendMessage({
			message: "validation-result",
			errors: request.errors,
		});
	} else {
		console.log("unknown message", request);
	}
}

function onExecuted() {
	console.log("executeScript", arguments);
}

function onError() {
	console.log("executeScript error", arguments);
}

browser.runtime.onMessage.addListener(handleMessage);
