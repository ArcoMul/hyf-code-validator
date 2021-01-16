# HYF Code Validator

Browser extension to validate (simple) webpages. Validating on HTML and CSS syntax errors and code standards.

## Setup

1. Clone this repo
2. Go to browser extension settings and load this extension's manifest.json file in the source folder
3. A new debug tools panel should appear where validation results appear of that page

## Validation rules

### ✅ Valid HTML

HtML gets send to https://validator.w3.org/nu/

Checked if there is an `<h1>`

### ✅ Descriptive CSS classnames

Finds and validates CSS classnames

**TODO**

- [ ] Add more non-descriptive classnames
- [ ] Improve detection using partial match

### ✅ DRY CSS

Duplicate CSS is found by comparing all CSS code blocks with eachother

### ❌ Magic numbers

Try to detect use of magic numbers (like `margin-left: 23.5%`)

### ❌ Mixing rem and pixels

`font-size` which are sometimes defined in rem and sometimes in px

### ❌ Semantic HTML

Maybe find a menu element which is not a `<nav>`

### ❌ Unecesarry usage of ids

Classes all the way except when there is no other way

### ❌ Classnames or ids written with capitals

Detect classnames and ids written with capitals

### ❌ Out commented HTML or CSS

Try to detect comment which are not informative, but just 'old' code