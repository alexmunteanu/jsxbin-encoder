'use babel';

import JsxbinEncoderView from './jsxbin-encoder-view';
import { CompositeDisposable } from 'atom';

export default
{
  jsxbinEncoderView: null,
  modalPanel: null,
  subscriptions: null,
  config: {
    doubleQuotes: {
      title: 'Double quotes',
      description: 'Switch between **single** or **double** quotes inside the `eval` method.',
      type: 'boolean',
      default: true
    },
    insertUnder: {
      title: 'Insert under',
      description: 'Switch between inserting the `eval` method **above** or **under** the selected code.',
      type: 'boolean',
      default: true
    },
    blockComment: {
      title: 'Block comment',
      description: 'Switch between **block** or **inline** comment style to comment-out the selected code.',
      type: 'boolean',
      default: true
    }
  },

  activate(state)
  {
    this.jsxbinEncoderView = new JsxbinEncoderView(state.jsxbinEncoderViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jsxbinEncoderView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command for JSXBIN encoding
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jsxbin-encoder:encode': () => this.encode()
    }));
    // Register command for block comment
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jsxbin-encoder:comment_block': () => this.comment_block()
    }));
    // Register command block uncomment
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jsxbin-encoder:uncomment_block': () => this.uncomment_block()
    }));
  },

  deactivate()
  {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jsxbinEncoderView.destroy();
  },

  serialize()
  {
    return {
      jsxbinEncoderViewState: this.jsxbinEncoderView.serialize()
    };
  },

  encode()
  {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor())
    {
      let
      selectedCode = editor.getSelectedText(),
      selectedCodeBuffer = editor.getSelectedBufferRange(),
      selectedCodeCleaned = selectedCode.replace(/^[\r\n]*|[\r\n]*$/g, ''),
      selectedCodeArr = selectedCode.split('\n'),
      selectedCodeCleanedArr = selectedCodeCleaned.split('\n'),
      extraLine = selectedCodeArr[selectedCodeArr.length - 1].replace(/\s+/g, '').length === 0 ? '\n' : '',
      selectedCodeCommented = '',
      selectedCodeEncoded = toJSXBIN(selectedCodeCleaned),
      quotes = atom.config.get('jsxbin-encoder.doubleQuotes') ? '"' : '\'',
      insertCode = '',
      firstLineIndent = '',
      lastLineIndent = '';

      firstLineIndent = selectedCodeCleanedArr[0].match(/^\s*/g).join('');
      lastLineIndent = selectedCodeCleanedArr[selectedCodeCleanedArr.length - 1].match(/^\s*/g).join('');

      if (firstLineIndent.length === 0)
      {
        for (var i = 0, iLen = selectedCodeBuffer.start.column; i < iLen; i++) firstLineIndent += ' ';
      }

      if (lastLineIndent.length === 0)
      {
        if (selectedCodeBuffer.start.row === selectedCodeBuffer.end.row) lastLineIndent = firstLineIndent;
        else for (var k = 0, kLen = selectedCodeBuffer.end.column; k < kLen; k++) lastLineIndent += ' ';
      }

      if (atom.config.get('jsxbin-encoder.blockComment'))
      {
        selectedCodeCommented = String(selectedCodeBuffer.start.column === 0 ? firstLineIndent : '') + '/*\n' + String(selectedCodeBuffer.start.column === 0 ? '' : firstLineIndent) + selectedCodeCleaned + '\n' + lastLineIndent + '*/';
      }
      else
      {
        editor.toggleLineCommentsInSelection();
        selectedCodeCommented = editor.getSelectedText().replace(/^[\r\n]*|[\r\n]*$/g, '');
        editor.toggleLineCommentsInSelection();
      }

      if (atom.config.get('jsxbin-encoder.insertUnder'))
      {
        insertCode = selectedCodeCommented + '\n\n' + firstLineIndent + 'eval(' + quotes + selectedCodeEncoded + quotes + ');' + extraLine;
      }
      else
      {
        insertCode = String(selectedCodeBuffer.start.column === 0 ? firstLineIndent : '') + 'eval(' + quotes + selectedCodeEncoded + quotes + ');' + '\n\n' + String(selectedCodeBuffer.start.column === 0 ? '' : firstLineIndent) + selectedCodeCommented + extraLine;
      }

      editor.insertText(insertCode);
    }

    function toJSXBIN (content)
    {
      try
      {
        init();

        let encodedString = exportContentToJSX(exportContentToJSX(content));

        destroy();

        return encodedString;
      }
      catch (e)
      {
        console.log('Encoding failed. ' + e);
        destroy();
      }

      function GetESDInterface ()
      {
        const
        platform = `${process.platform}`,
        platformArch = `${process.arch}`;

        let
        esdcorePath,
        esdinterface;

        if (platform === 'darwin')
        {
          esdcorePath = [__dirname, 'encoder', 'mac', 'esdcorelibinterface.node'].join('/');
        }
        else if (platform === 'win32')
        {
          if (platformArch === 'x64' || platformArch === 'arm64')
          {
            esdcorePath = [__dirname, 'encoder', 'win', 'x64', 'esdcorelibinterface.node'].join('\\');
          }
          else
          {
            esdcorePath = [__dirname, 'encoder', 'win', 'win32', 'esdcorelibinterface.node'].join('\\');
          }
        }

        if (esdcorePath === undefined) console.log(`Platform not supported: ${platform}`);

        esdinterface = require(esdcorePath);

        return esdinterface;
      }

      function fetchLastError ()
      {
        let
        errorInfo = undefined,
        error = GetESDInterface().esdGetLastError();

        if (error.status !== 0)
        {
          if (error.data) errorInfo = error.data;
        }

        if (errorInfo !== undefined)
        {
          console.log('Unable to proceed. Error Info: ' + errorInfo);
          done();
        }
      }

      function init()
      {
        let initData = GetESDInterface().esdInit();

        if (initData.status !== 0)
        {
          console.log('Unable to proceed. Error Code: ' + initData.status);
          fetchLastError();
        }
      }

      function destroy()
      {
        GetESDInterface().esdDestroy();
      }

      function exportContentToJSX (scriptSource)
      {
        let
        compiledSource = "",
        apiData = GetESDInterface().esdCompileToJSXBin(scriptSource, "", "");

        if (apiData.status !== 0)
        {
          console.log('Unable to proceed. Error Code: ' + apiData.status);
          fetchLastError();
        }
        else
        {
          compiledSource = apiData.data;
        }

        return compiledSource.replace(/[\r\n]+/gm, '').replace(/@2\.0@/gm, '@2.1@');
      }
    }
  },

  comment_block()
  {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor())
    {
      let
      selectedCode = editor.getSelectedText().replace(/\/\*+[\s\r\n]+|[\s\r\n]+\*\/+/gm, ''),
      selectedCodeBuffer = editor.getSelectedBufferRange(),
      selectedCodeCleaned = selectedCode.replace(/^[\r\n]*|[\r\n]*$/g, ''),
      selectedCodeCleanedArr = selectedCodeCleaned.split('\n'),
      firstLineIndent = '',
      lastLineIndent = '',
      selectedCodeCommented = '';

      firstLineIndent = selectedCodeCleanedArr[0].match(/^\s*/g).join('');
      lastLineIndent = selectedCodeCleanedArr[selectedCodeCleanedArr.length - 1].match(/^\s*/g).join('');

      if (firstLineIndent.length === 0)
      {
        for (var i = 0, iLen = selectedCodeBuffer.start.column; i < iLen; i++) firstLineIndent += ' ';
      }

      if (lastLineIndent.length === 0)
      {
        if (selectedCodeBuffer.start.row === selectedCodeBuffer.end.row) lastLineIndent = firstLineIndent;
        else for (var k = 0, kLen = selectedCodeBuffer.end.column; k < kLen; k++) lastLineIndent += ' ';
      }
      selectedCodeCommented = String(selectedCodeBuffer.start.column === 0 ? firstLineIndent : '') + '/*\n' + String(selectedCodeBuffer.start.column === 0 ? '' : firstLineIndent) + selectedCodeCleaned + '\n' + lastLineIndent + '*/';

      if (selectedCodeBuffer.end.column === 0) selectedCodeCommented += '\n';

      editor.insertText(selectedCodeCommented);
    }
  },

  uncomment_block()
  {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor())
    {
      editor.insertText(editor.getSelectedText().replace(/\/\*+[\s\r\n]+|[\s\r\n]+\*\/+/gm, ''));
    }
  }
};
