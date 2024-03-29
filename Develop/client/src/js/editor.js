// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: header,
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available,
    // set the value to header.
    // Added error handling for debugging 
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor', data);
  
      // declare data[0] and its properties
      const content = data.length > 0 && 'content' in data[0] ? data[0].content : header;
      this.editor.setValue(content);
    }).catch(errror => {
      console.error('Failed to load data from IndexedDb:',errror);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      const currentConent = this.editor.getValue();
      putDb(currentConent);
    });
  }
}
