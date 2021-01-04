window.onload = () => {
  const validateContainer = document.createElement("div");
  validateContainer.style = "position: absolute; left: 50%; top: 5px";

  const validateHTML = document.createElement("button");
  validateHTML.innerHTML = "validate";
  validateHTML.onclick = validate;
  validateContainer.appendChild(validateHTML);

  document.body.insertBefore(validateContainer, document.body.firstChild);
};

function validate() {
  validateDescriptiveClassnames();
  validateHasH1();
  validateHasStyleSheet();
  validateDRYCss();
}

function validateDescriptiveClassnames() {
  const isDescriptiveClassname = (className) =>
    className !== "first" && className !== "box" && className !== "second";

  var allClasses = [];
  var allElements = document.querySelectorAll("*");
  for (var i = 0; i < allElements.length; i++) {
    var classes = allElements[i].className.toString().split(/\s+/);
    for (var j = 0; j < classes.length; j++) {
      var cls = classes[j];
      if (cls && allClasses.indexOf(cls) === -1) {
        allClasses.push(cls);
      }
    }
  }
  allClasses.forEach((className) => {
    if (!isDescriptiveClassname(className)) {
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
  const selectors = [];
  const rules = [];
  for (let i = 0; i < document.styleSheets.length; i++) {
    const sheet = document.styleSheets[i];
    for (let j = 0; j < sheet.cssRules.length; j++) {
      const rule = sheet.cssRules[j];
      const content = rule.cssText.match(/\{(.*)\}/)[1];

      for (let r = 0; r < rules.length; r++) {
        if (rules[r] === content) {
          console.log(
            `Duplicate CSS found, for "${selectors[r]}" and "${rule.selectorText}"`
          );
        }
      }

      selectors.push(rule.selectorText);
      rules.push(content);
    }
  }
}
