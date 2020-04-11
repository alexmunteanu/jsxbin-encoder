## 1.8.0 (2020-04-11)

### Added:
- **new** `Obfuscate` option: Obfuscate the selection before encoding it to **JSXBIN**. Uses [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator).
- **new** `Grow selection` option: Automatically grow the selection to the beginning and end of each selected line.
	- You can select incomplete lines and the selection will be grown automatically to the beginning and end of each line.
	- For a single line, no selection is required; the entire line will be selected automatically.
- **new** `Auto-fold comments` option: Auto-fold the newly commented selection.
- **new** `Disable notifications` option: Choose whether to show or not a pop-up notification after each completed task.
- **new** `Disable warnings` option: Choose whether to show or not a pop-up warning, if the script processing time might increase or if the current language isn't supported.

### Changed:
- Improved code selection.
- Code evaluation:
	- Displays notifications if the script becomes slower to process, or if the current script language isn't supported.
	- Displays notifications after each completed task.
	- Warnings and notifications can be turned off from the package's settings page.

### Fixed:
- Indentation of multi-line comments.