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
      selectedCode = editor.getSelectedText().replace(/[\s\r\n]+$/gm, ''),
      selectedCodeCommented = atom.config.get('jsxbin-encoder.blockComment') ? '/*\n' + selectedCode + '\n*/' : selectedCode.replace(/^/gm, '// '),
      selectedCodeEncoded = toJSXBIN(selectedCode),
      quotes = atom.config.get('jsxbin-encoder.doubleQuotes') ? '"' : '\'',
      insertCode = '';


      if (atom.config.get('jsxbin-encoder.insertUnder'))
      {
        insertCode = selectedCodeCommented + '\n\n' + 'eval(' + quotes + selectedCodeEncoded + quotes + ');';
      }
      else
      {
        insertCode = 'eval(' + quotes + selectedCodeEncoded + quotes + ');' + '\n\n' + selectedCodeCommented;
      }

      editor.insertText(insertCode);
    }

    function toJSXBIN (content)
    {
      try
      {
        init();

        var encodedString = exportContentToJSX(exportContentToJSX(content));

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

        var
        esdcoreBasePath = path.join(__dirname, 'encoder'),
        esdcorePath,
        esdinterface;

        if (platform === 'darwin')
        {
          esdcorePath = path.join(esdcoreBasePath, 'mac', 'esdcorelibinterface.node');
        }
        else if (platform === 'win32')
        {
          if (platformArch === 'x64' || platformArch === 'arm64')
          {
            esdcorePath = path.join(esdcoreBasePath, 'win', 'x64', 'esdcorelibinterface.node');
          }
          else
          {
            esdcorePath = path.join(esdcoreBasePath, 'win', 'win32', 'esdcorelibinterface.node');
          }
        }

        if (esdcorePath === undefined) console.log(`Platform not supported: ${platform}`);

        esdinterface = require(esdcorePath);

        return esdinterface;
      }

      function fetchLastError ()
      {
        var errorInfo = undefined;
        var error = GetESDInterface().esdGetLastError();

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
        var initData = GetESDInterface().esdInit();

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
        var compiledSource = "";
        var apiData = GetESDInterface().esdCompileToJSXBin(scriptSource, "", "");

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
      let selectedCode = editor.getSelectedText();

      editor.insertText(selectedCode
        .replace(/^[/*\s\r\n]+/g, '')
        .replace(/[/*\s\r\n]+$/g, '')
        .replace(/^/g, '/*\n')
        .replace(/$/g, '\n*/'));
    }
  },

  uncomment_block()
  {
    let editor;

    if (editor = atom.workspace.getActiveTextEditor())
    {
      let selectedCode = editor.getSelectedText();

      editor.insertText(selectedCode.replace(/^[/*\s\r\n]+/g, '').replace(/[/*\s\r\n]+$/g, ''));
    }
  }
};
