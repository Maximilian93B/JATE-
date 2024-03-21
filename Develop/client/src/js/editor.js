// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class Editor {
  constructor() {
    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }
    // Initialize CodeMirror with a placeholder value
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '', // Set an initial empty value; it will be updated asynchronously when the user inputs values into the editor 
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Load data from IndexedDB or fallbacks
    this.loadData();

    // Save changes to localStorage and IndexedDB
    this.handleChanges();
  }


  // load data from DB 
  async loadData() {
    try {
      const data = await getDb();
      const content = data.length > 0 && 'content' in data[0] ? data[0].content : localStorage.getItem('content') || header;
      this.editor.setValue(content);
      console.info('Content loaded and set in editor.');
    } catch (error) {
      console.error('Failed to load data from IndexedDB:', error);
      this.editor.setValue(localStorage.getItem('content') || header);
    }
  }

// Handle changes in editor when adding new inputs 
  handleChanges() {
    this.editor.on('change', () => {
      const currentContent = this.editor.getValue();
      localStorage.setItem('content', currentContent); // Save current content to localStorage
    });

    // Handle on blue event listener to save new content to DB when input into editor 
    this.editor.on('blur', () => {
      const currentContent = this.editor.getValue();
      putDb({ content: currentContent }); 
      console.log('Content saved to IndexedDB.');
    });
  }
}


