browser.runtime.onMessage.addListener(handleMessage);

browser.runtime.sendMessage({
	tabId: browser.devtools.inspectedWindow.tabId,
	message: "validate",
});

function handleMessage(request, sender, sendResponse) {
	if (request.message === "validation-result") {
		renderErrors(request.errors);
	}
}

function renderErrors(errors) {
	document.getElementById("output").append(renderErrorsUl(errors));
}

function renderErrorsUl(errors) {
	const ul = document.createElement("ul");
	ul.append(
		...errors.map((error) => {
			const li = document.createElement("li");
			const p = document.createElement("p");
			p.innerText = error.message;
			li.append(p);
			if (error.errors) {
				li.append(renderErrorsUl(error.errors));
			}
			return li;
		})
	);
	return ul;
}
