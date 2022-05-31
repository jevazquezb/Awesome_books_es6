const bookName = document.getElementById('name');
const bookAuthor = document.getElementById('author');

const resetInput = () => {
  bookName.value = '';
  bookAuthor.value = '';
};

export { resetInput as default };