const createAuthorForm = () => {
  document.querySelector('#store').innerHTML = '';
  document.querySelector('#add-button').innerHTML = '';
  document.querySelector('#form-container').innerHTML = `
    <form id="create-author-form" class="mb-4">
      <div class="form-group">
        <label for="title">Author Name</label>
        <input type="text" class="form-control" id="firstName" aria-describedby="firstName" placeholder="Enter First Name" required>
        <input type="text" class="form-control" id="lastName" aria-describedby="lastName" placeholder="Enter Last Name" required>
      </div>
      <div class="form-group">
        <label for="title">Email</label>
        <input type="text" class="form-control" id="email" aria-describedby="email" placeholder="Enter Email Address">
      </div>
      <button type="submit" id="submit-author" class="btn btn-primary">Submit Author</button>
    </form>`;
};

export default createAuthorForm;
