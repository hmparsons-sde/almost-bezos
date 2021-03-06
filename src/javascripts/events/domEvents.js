import firebase from 'firebase/app';
import 'firebase/auth';
import { showBooks } from '../components/books';
import addBookForm from '../components/forms/addBookForm';
import {
  createBook, deleteBook, getSingleBook, updateBook
} from '../helpers/data/bookData';
import addAuthorForm from '../components/forms/addAuthorForm';
import { showAuthors } from '../components/authors';
import editBookForm from '../components/forms/editBookForm';
import formModal from '../components/forms/formModal';
import deleteAuthorBooks, { authorBookInfo } from '../helpers/data/authorBooksData';
import createAuthors from '../helpers/data/authorData';
import authorInfo from '../components/authorInfo';

const domEvents = (uid) => {
  document.querySelector('body').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      if (window.confirm('Want to delete?')) {
        const firebaseKey = e.target.id.split('--')[1];
        deleteBook(firebaseKey).then((booksArray) => showBooks(booksArray));
      }
    }
    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      console.warn('CLICKED ADD BOOK BUTTON', e.target.id);
      addBookForm();
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      console.warn('CLICKED SUBMIT BOOK', e.target.id);
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
        uid: firebase.auth().currentUser.uid
      };

      createBook(bookObject, uid).then((booksArray) => showBooks(booksArray));
    }

    // CLICK EVENT FOR SHOWING MODAL FORM FOR ADDING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('CLICKED EDIT BOOK', e.target.id);
      const firebaseKey = e.target.id.split('--')[1];
      formModal('Edit Book');
      getSingleBook(firebaseKey).then((bookObject) => editBookForm(bookObject));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      console.warn('CLICKED EDIT BOOK', e.target.id);
      const firebaseKey = e.target.id.split('--')[1];
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value
      };
      updateBook(firebaseKey, bookObject).then((booksArray) => showBooks(booksArray));
      $('#formModal').modal('toggle'); // jQuery
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE AUTHOR', e.target.id);
        const authorId = e.target.id.split('--')[1];
        deleteAuthorBooks(authorId, uid).then((authorsArray) => showAuthors(authorsArray));
      }
    }

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('CLICKED ADD AUTHOR BUTTON', e.target.id);
      addAuthorForm();
    }
    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      console.warn('CLICKED SUBMIT AUTHOR BUTTON', e.target.id);
      e.preventDefault();
      const authorObject = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        uid: firebase.auth().currentUser.uid
      };
      createAuthors(authorObject, uid).then((authorArray) => showAuthors(authorArray));
    }

    if (e.target.id.includes('author-name-title')) {
      const authorId = e.target.id.split('--')[1];
      console.warn(authorId);
      authorBookInfo(authorId).then((authorInfoObject) => {
        showBooks(authorInfoObject.books);
        authorInfo(authorInfoObject.author);
      });
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default domEvents;
