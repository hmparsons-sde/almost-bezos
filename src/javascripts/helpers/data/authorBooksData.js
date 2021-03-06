import { deleteAuthor, getSingleAuthor } from './authorData';
import { deleteBook, getAuthorBooks } from './bookData';

// DELETE AUTHOR AND ALL OF THEIR BOOKS
const deleteAuthorBooks = (authorId, uid) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((authorBooksArray) => {
    const deleteBooks = authorBooksArray.map((book) => deleteBook(book.firebaseKey));
    console.warn(deleteBooks);

    Promise.all(deleteBooks).then(() => resolve(deleteAuthor(authorId, uid)));
  }).catch((error) => reject(error));
});

const authorBookInfo = (authorId) => new Promise((resolve, reject) => {
  const author = getSingleAuthor(authorId);
  const authorBooks = getAuthorBooks(authorId);
  console.warn(author, authorBooks);
  Promise.all([author, authorBooks])
    .then(([authorResponse, authorBooksResponse]) => resolve({ author: authorResponse, books: authorBooksResponse }))
    .catch((error) => reject(error));
});
// .map means "apply to every item in this array"
// .all takes in an array
export { deleteAuthorBooks, authorBookInfo };
