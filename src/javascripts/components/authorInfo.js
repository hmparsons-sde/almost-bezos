const authorInfo = (authorObject) => {
  document.querySelector('#add-button').innerHTML += `<h2>${authorObject.first_name} ${authorObject.last_name}'s Titles</h2>`;
};

export default authorInfo;
