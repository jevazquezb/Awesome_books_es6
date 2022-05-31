import { bookName, bookAuthor } from '../index.js';
export { resetInput as default };

const resetInput = () => {
  bookName.value = '';
  bookAuthor.value = '';
};