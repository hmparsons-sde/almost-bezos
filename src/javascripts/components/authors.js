const showAuthors = (array) => {
  document.querySelector('#store').innerHTML = '';
  document.querySelector('#form-container').innerHTML = '';
  // CREATE A BUTTON TO ADD BOOKS
  document.querySelector('#add-button').innerHTML = '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>';
  array.forEach((item) => {
    // FIXME: STUDENTS create cards for your authors
    document.querySelector('#store').innerHTML += `
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
    <p class="card-text">${item.first_name} is an independent artist.</p>
    <button class="btn btn-info" data-toggle="modal" data-target="#formModal" id="edit-author-btn--${item.firebaseKey}">Edit Author</button>
    <button class="btn btn-danger" id="delete-author--${item.firebaseKey}">Delete Author</button>
  </div>
</div>`;
  });
};

const emptyAuthors = () => {
  document.querySelector('#store').innerHTML = '<h1>No Authors</h1>';
};

export { showAuthors, emptyAuthors };
