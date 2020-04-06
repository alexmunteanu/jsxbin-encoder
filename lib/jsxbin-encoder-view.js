'use babel';

export default class JsxbinEncoderView {

  constructor(serializedState)
  {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('jsxbin-encoder');
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
