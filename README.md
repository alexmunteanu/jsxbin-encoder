# JSXBIN encoder (Atom package)
For [VSCode](https://code.visualstudio.com), see [**Alex White**](https://github.com/axwt)'s [TextToJSXBIN](https://github.com/axwt/texttojsxbin) extension.

Encodes the selected JSX to JSXBIN.<br>
Uses **@esdebug** module from [ExtendScript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug).

![jsxbin-encoder demo encoding](https://github.com/alexmunteanu/jsxbin-encoder/blob/master/images/demo_encoding.gif?raw=true)

## Installation
- ### Via **apm**
  ```sh
  apm install jsxbin-encoder
  ```
- ### From **Atom**
  - `Settings` > `Install` > Search packages for `jsxbin-encoder`.
  - Click `Install` and then `reload` Atom.
- ### From **GitHub**
  - Download the [latest release](https://github.com/alexmunteanu/jsxbin-encoder/releases/latest) and extract the archive directly to `/users/YOUR_USERNAME/.atom/packages`.

## Usage
- Select a piece of your JSX.
- Then do one of the following:
  - Press `Ctrl + Alt + Q` on **Windows** or `Cmd + Alt + Q` on **Mac**.
  - Right click and choose `Encode to JSXBIN`.
  - From Atom's menu: `Packages` > `JSXBIN encoder` > `Encode to JSXBIN`.

## Features
- [**Script obfuscation**](https://github.com/javascript-obfuscator/javascript-obfuscator) before the JSXBIN encoding.
- **Script analysis** - a notification will pop-up:
  - if the script might become slower to process (_hardcoded: a percentage of `eval` uses out of the total number of script lines_)
  - if the selection already contains JSXBIN encoded lines
  - if the scripting language isn't supported (`.js`, `.jsx`, `.jsxinc` and `.jsxbin` only)
- **Auto-complete selections**:
  - the JSX selection will be updated automatically so that the entire start and end lines are being completely selected

## Utilities
- `JS multi-line comment`:
  - Description: comments the selection, in a multi-line comment style.
  - Keyboard shortcut: `Alt + C`
- `JS multi-line uncomment`:
  - Description: uncomments the selected multi-line comment.
  - Keyboard shortcut: `Alt + X`

## Options
- `Obfuscate`: Obfuscate the selection before encoding it to **JSXBIN**. Uses [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator). Default: `false`
- `eval() position`: Insert the `eval` method **above** or **under** the selection. Default: `under`
- `Quotes`: Use **single** or **double** quotes inside the `eval` method. Default: `single`
- `Comment style`: Use **single-line** or **multi-line** comment style to comment-out the selection. Default: `multi-line`
- `Grow selection`: Automatically grow the selection to the beginning and end of each selected line. Default: `true`
  - You can select incomplete lines and the selection will be grown automatically to the beginning and end of each line.
  - For a single line, no selection is required; the entire line will be selected automatically.
- `Auto-fold comments`: Auto-fold the newly commented selection. Default: `true`
- `Disable notifications`: Choose whether to show or not a pop-up notification after each completed task. Default: `false`
- `Disable warnings`: Choose whether to show or not a pop-up warning, if the script processing time might increase or if the current language isn\'t supported. Default: `false`

## Final notes
- Don't overuse it! 😎
