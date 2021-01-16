(function () {
	const nondescriptClassNames = ["first", "second", "box"];

	async function validate() {
		try {
			const errors = [
				...(await validateHtml()),
				...validateDescriptiveClassnames(),
				...validateHasH1(),
				...validateHasStyleSheet(),
				...validateDRYCss(),
			].filter((i) => !!i);

			console.log(errors);

			browser.runtime.sendMessage({
				errors: errors,
				message: "validation-result",
			});
		} catch (err) {
			console.log(err);
		}
	}

	async function validateHtml() {
		const outerHTML = document.documentElement.outerHTML;
		const htmlNoScripts = outerHTML.replace(
			/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g,
			""
		);

		const res = await fetch("https://validator.w3.org/nu/?out=text", {
			method: "POST",
			body: `<!DOCTYPE html>\n${htmlNoScripts}`,
			headers: { "Content-Type": "text/html; charset=utf-8" },
		});
		const result = await res.text();
		return [{ message: "HTML validation", errors: [{ message: result }] }];
	}

	const isNondescriptiveClassName = (className) => {
		return nondescriptClassNames.includes(className);
	};

	function validateDescriptiveClassnames() {
		const errors = [];
		const allClasses = new Set();
		const allElements = document.querySelectorAll("*");
		allElements.forEach((element) => {
			console.log("ccc", element.className);
			if (typeof element.className === "string") {
				const classNames = element.className.split(/\s+/);
				classNames.forEach((className) => allClasses.add(className));
			}
		});
		allClasses.forEach((className) => {
			console.log('class:', className);
			if (isNondescriptiveClassName(className)) {
				errors.push({ message: `"${className}" is a non-descriptive class` });
			}
		});
		return errors;
	}

	function validateHasH1() {
		const h1s = document.querySelectorAll("h1");
		if (h1s.length === 0) {
			return [{ message: "Document should have an h1" }];
		}
		return [];
	}

	function validateHasStyleSheet() {
		if (document.styleSheets.length === 0) {
			return [{ message: "Document has no (external) stylesheet" }];
		}
		return [];
	}

	function validateDRYCss() {
		const errors = [];
		const rulesCache = [];
		for (const sheet of Array.from(document.styleSheets)) {
			// Let's ignore external stylesheets, as we'd have CORS problems
			if (new URL(sheet.href).host !== (location.host)) {
				continue;
			}
			const styleRules = Array.from(sheet.cssRules).filter(
				(rule) => "selectorText" in rule
			);
			for (const rule of styleRules) {
				const matches = rule.cssText.match(/\{(.*)\}/);
				if (!matches) {
					continue;
				}
				const content = matches[1];
				const duplicate = rulesCache.find((r) => r.content === content);
				if (duplicate) {
					errors.push({
						message: `Duplicate CSS found, for "${duplicate.selectorText}" and "${rule.selectorText}"`,
					});
				}
				rulesCache.push({ selectorText: rule.selectorText, content });
			}
		}
		return errors;
	}

	validate();
})();
