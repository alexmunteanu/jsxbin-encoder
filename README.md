# JSXBIN encoder (Atom package)

For [VSCode](https://code.visualstudio.com), see [VS Code Adobe Development Utils](https://marketplace.visualstudio.com/items?itemName=AlexMunteanu.adobe-dev-utils) extension ( [GitHub](https://github.com/alexmunteanu/VS-Code-Adobe-Development-Utils) ).

Encodes the selected JSX to JSXBIN.
For encoding, it uses the **@esdebug** module from [ExtendScript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug).

![jsxbin-encoder demo encoding](https://raw.githubusercontent.com/alexmunteanu/jsxbin-encoder/master/images/demo_encoding.gif)

## Installation

- Via **apm**

```sh
apm install jsxbin-encoder
```

- From **Atom**
  - `Settings` > `Install` > Search packages for `jsxbin-encoder`.
  - Click `Install` and then `reload` Atom.
- From **GitHub**
  - Download the [latest release](https://github.com/alexmunteanu/jsxbin-encoder/releases/latest) and extract the archive directly to `/users/YOUR_USERNAME/.atom/packages`.
  - Run `npm install`.

## Usage

- Select a piece of your JSX.
- Then do one of the following:
  - For **Encoding**:
    - Press `Ctrl + Alt + Q` on **Windows** or `Cmd + Alt + Q` on **Mac**.
    - Right click and choose `Encode to JSXBIN`.
    - From Atom's menu: `Packages` > `JSXBIN encoder` > `Encode to JSXBIN`.

## Features

- [**Script obfuscation**](https://github.com/javascript-obfuscator/javascript-obfuscator) before the JSXBIN encoding.
- **Script analysis** - a notification will pop-up:
  - if the script might become slower to process (_hardcoded: a percentage of `eval` uses out of the total number of script lines_)
  - if the selection already contains JSXBIN encoded lines
  - if the scripting language isn't supported (`.js`, `.jsx`, `.jsxinc` and `.jsxbin` only)
- **Auto-complete** selections:
  - the JSX selection will be updated automatically so that the entire start and end lines are being completely selected

## Utilities

- `JS multi-line comment`:
  - Description: comments the selection, in a multi-line comment style.
  - Keyboard shortcut: `Alt + C`
- `JS multi-line uncomment`:
  - Description:
    - uncomments the selected multi-line comment.
    - you can simply move the cursor inside a multi-line comment block and run the utility (no need to select the entire block).
  - Keyboard shortcut: `Alt + X`

## Options

- `Grow selection`: Automatically grow the selection to the beginning and end of each selected line. Default: `true`
  - You can select incomplete lines and the selection will be grown automatically to the beginning and end of each line.
  - For a single line, no selection is required; the entire line will be selected automatically.
- **Encoding**:
  - `Obfuscate`: Obfuscate the selection before encoding it to **JSXBIN**. Uses [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator). Default: `false`
  - `eval() position`: Insert the `eval` method **above** or **under** the selection. Default: `under`
  - `Quotes`: Use **single** or **double** quotes inside the `eval` method. Default: `single`
- **Comments**:
  - `Auto-fold`: Auto-fold the newly commented selection. Default: `true`
  - `Style`: Use **single-line** or **multi-line** comment style to comment-out the newly encoded selection. Default: `multi-line`
- **Messages**:
  - `Disable notifications`: Choose whether to show or not a pop-up notification after each completed task. Default: `false`
  - `Disable warnings`: Choose whether to show or not a pop-up warning, if the script processing time might increase or if the current language isn\'t supported. Default: `false`

## Final notes

- Don't overuse it! 😎

## Donate

[![Donate](https://img.shields.io/badge/Donate-PayPal-success?style=for-the-badge&link=https://www.paypal.com/donate?hosted_button_id=Z8FGYYW9L28YC)](https://www.paypal.com/donate?hosted_button_id=Z8FGYYW9L28YC)
