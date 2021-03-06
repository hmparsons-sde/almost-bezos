import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;

// GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

// DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => getBooks().then((booksArray) => resolve(booksArray)))
    .catch((error) => reject(error));
});

// GET BOOKS ON SALE
const getSaleBooks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="sale"&equalTo=true`)
    .then((response) => {
      const saleBooksArray = Object.values(response.data);
      resolve(saleBooksArray);
    }).catch((error) => reject(error));
});

// CREATE BOOK
// Click add book button (domEvents(uid))
// Add form pops up (addBookForm())
// Submit button event (domEvents(uid))
// Create the Object (domEvents(uid))
// POST to Firebase (createBook(bookObj, uid))
// PATCH to Firebase ("")
// GET from Firebase ("")
// Make the card (showBooks(booksArray))
const createBook = (bookObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, body)
        .then(() => {
          getBooks(uid).then((booksArray) => resolve(booksArray));
        });
      console.warn(response.data.name);
    }).catch((error) => reject(error));
});

// UPDATE BOOK
// Click edit button (domEvents(uid))
// Grab the Firebase Key off Button id
// Add rule in Firebase
// Test in Postman
// Get request to Firebase for specific book
// getSingleBook(firebase key)
// Edit form pops up (editBookForm(bookObj) and selectAuthors())
// Submit button event (domEvents(uid))
// Create the Object (domEvents(uid))
// Patch to Firebase (updateBook(bookObj))
// Get it back from Firebase (updateBook(bookObj))
// Make the card (showBooks(bookArray))
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateBook = (firebaseKey, bookObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${firebaseKey}.json`, bookObject)
    .then(() => {
      getBooks(firebase.auth().currentUser.uid).then((booksArray) => resolve(booksArray))
        .catch((error) => reject(error));
    });
});

// GET ALL AUTHORS BOOKS
const getAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${authorId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
// SEARCH BOOKS

export {
  getBooks, createBook, deleteBook, getSaleBooks, getSingleBook, updateBook, getAuthorBooks
};
