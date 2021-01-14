## 1.9.8 (2021-01-15)

### Changed:
- Dependencies update.

***

## 1.9.6 (2020-05-25)

### Changed:
- Dependencies update.

***

## 1.9.4 (2020-04-27)

### Changed:
- `JS multi-line uncomment`: move the cursor inside a multi-line comment and run the utility (no need to select the entire block).

***

## 1.9.0 (2020-04-25)

### Changed:
- Dependencies update.
- Package options update.

***

## 1.8.2 (2020-04-24)

### Changed:
- Dependencies update.
- Package options grouping.

***

## 1.8.1 (2020-04-11)

### Fixed:
- Incorrect folding if `Auto-fold comments` option is checked and the `eval` method is placed above the selection.

***

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

***

## v1.1.1 - 2020-04-07

### Changed:
- corrected indentation of the commented section
- corrected indentation of the line with the `eval` method
- improved block comment utilities
- removed `path` module dependency

***

## v1.0.4 - 2020-04-06

### Fixed:
- `path is not defined`

### Changed:
- improved utilities
- minor code cleanup

***

## v1.0.0 - 2020-04-04

Initial release with the following features:
- JSXBIN encoding of the selected code (uses **@esdebug** module from [ExtendScript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug))
- Utilities:
  - JS block uncomment
  - JS block comment
