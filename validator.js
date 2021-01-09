const nondescriptClassNames = ["first", "second", "box"];

async function validate() {
  await validateHtml();
  validateDescriptiveClassnames();
  validateHasH1();
  validateHasStyleSheet();
  validateDRYCss();
}

async function validateHtml() {
  const outerHTML = document.documentElement.outerHTML;
  const htmlNoScripts = outerHTML.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g,
    ""
  );

  console.log("*** Start of HTML Validation");
  const res = await fetch("https://validator.w3.org/nu/?out=text", {
    method: "POST",
    body: `<!DOCTYPE html>\n${htmlNoScripts}`,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
  const result = await res.text();
  console.log(result);
  console.log("*** End of HTML Validation");
}

const isDescriptiveClassName = (className) =>
  !nondescriptClassNames.includes(className);

function validateDescriptiveClassnames() {
  const allClasses = new Set();
  const allElements = document.querySelectorAll("*");
  allElements.forEach((element) => {
    const classNames = element.className.split(/\s+/);
    classNames.forEach((className) => allClasses.add(className));
  });
  allClasses.forEach((className) => {
    if (!isDescriptiveClassName(className)) {
      console.log(`"${className}" is a non-descriptive class`);
    }
  });
}

function validateHasH1() {
  const h1s = document.querySelectorAll("h1");
  if (h1s.length === 0) {
    console.log("Document should have an h1");
  }
}

function validateHasStyleSheet() {
  if (document.styleSheets.length === 0) {
    console.log("Document has no (external) stylesheet");
  }
}

function validateDRYCss() {
  const rulesCache = [];
  for (const sheet of Array.from(document.styleSheets)) {
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
        console.log(
          `Duplicate CSS found, for "${duplicate.selectorText}" and "${rule.selectorText}"`
        );
      }
      rulesCache.push({ selectorText: rule.selectorText, content });
    }
  }
}

window.addEventListener("load", () => {
  const validateContainer = document.createElement("div");
  Object.assign(validateContainer.style, {
    position: "absolute",
    left: "50%",
    top: "5px",
  });
  const validateHTML = document.createElement("button");
  validateHTML.innerHTML = "validate";
  validateHTML.onclick = validate;
  validateContainer.appendChild(validateHTML);
  document.body.insertBefore(validateContainer, document.body.firstChild);
});
