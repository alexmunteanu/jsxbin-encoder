# JSXBIN encoder (Atom package)

Atom package for encoding the selected code to evaluated JSXBIN.<br>
Uses **@esdebug** module from [ExtendScript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug).

![jsxbin-encoder](https://github.com/alexmunteanu/jsxbin-encoder/blob/master/images/JSXBIN_encoder.gif?raw=true)

## Installation
- ### From **Atom**
  - `Settings` > `Install` > Search packages for `jsxbin-encoder`
  - Click `Install` and then `reload` Atom.
  - [Package page](https://atom.io/packages/jsxbin-encoder)
- ### From **GitHub**
  - Download the repository and extract `JSXBIN_encoder-master.zip`.
  - Copy `JSXBIN_encoder-master` folder to `/users/YOUR_USERNAME/.atom/packages`

## Usage
- Select a portion of you JS code.
- Then do one of the following:
  - Press `Ctrl + Alt + Q` on **Windows** or `Cmd + Alt + Q` on **Mac**.
  - Right click and choose `Encode to JSXBIN`.
  - From Atom's menu: `Packages` > `JSXBIN Encoder` > `Encode to JSXBIN`

## Options
- `Block comment`: Switch between **block** or **inline** comment style to comment-out the selected code.
- `Double quotes`: Switch between **single** or **double** quotes inside the `eval` method.
- `Insert under`: Switch between inserting the `eval` method **above** or **under** the selected code.

## Utilities
- `JS block comment`:
  - description: block comments the selected code.
  - keyboard shortcut: `Alt + C`
- `JS block uncomment`:
  - description: uncomments the selected block comment.
  - keyboard shortcut: `Alt + X`

## Issues
- None (so far)
