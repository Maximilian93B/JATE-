import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// function updates and ass content in the jate db
export const putDb = async (content) => {
  //log for debug 
console.log('PUT to the database', content);

//We open a connection to the DB 
const db = await openDB('jate',1);
// Starts a transaction with rw perms to be able to write data 
const tx = db.transaction('jate', 'readwrite');
// Get jate object store 
const store = tx.objectStore('jate');
// Use put metod to save (content)
// If record with id 1 exists will be updated if not will create new record
const request = store.put({ id: 1, value: content });
// wait for result to complete store 
const result  = await request; 
// log success 
console.log('🚀- data saved to db', result);
}; 


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
// Log for debug 
console.log('GET from db');
//We open a connection to the DB 
const db = await openDB('jate', 1);
// Start transaction wiht readonly perms as we only need to read data
const tx = db.transaction('jate', 'readonly');
//Get jate object store
const store = tx.objectStore('jate')  
// Use GET method to fetch record 
const request = store.getAll();
// Wait for request to complete and store result
const results = await request; 
// Log fetched results for debug 
console.log('🚀 - all data fetched from the database', results);
// Return the results 
return results
};


initdb();
