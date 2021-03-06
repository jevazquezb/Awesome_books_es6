import BookManager from './modules/book_manager.js';
import resetInput from './modules/reset_input.js';
import storageAvailable from './modules/storage_available.js';
import { DateTime } from './modules/luxon.js';

// Book list container
const bookContainer = document.querySelector('.list-cont');
// Input elements
const bookName = document.getElementById('name');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add');
// Book list initialization;
let books;
// Menu links
const menuBtns = document.querySelectorAll('.link-item');
const dispList = document.querySelector('#disp-list');
const dispForm = document.querySelector('#disp-form');
const dispContact = document.querySelector('#disp-contact');
// Sections
const booksSection = document.querySelector('.book-list');
const form = document.querySelector('.form');
const contact = document.querySelector('#contact');
// Date
const dateContainer = document.querySelector('.date');

// Book manager call
const library = new BookManager();

const displaySection = (e) => {
  if (e.target.id === 'disp-list') {
    dispList.classList.add('visited');
    dispForm.classList.remove('visited');
    dispContact.classList.remove('visited');
    booksSection.style.display = 'flex';
    form.style.display = 'none';
    contact.style.display = 'none';
  } else if (e.target.id === 'disp-form') {
    dispList.classList.remove('visited');
    dispForm.classList.add('visited');
    dispContact.classList.remove('visited');
    booksSection.style.display = 'none';
    form.style.display = 'flex';
    contact.style.display = 'none';
  } else {
    dispList.classList.remove('visited');
    dispForm.classList.remove('visited');
    dispContact.classList.add('visited');
    booksSection.style.display = 'none';
    form.style.display = 'none';
    contact.style.display = 'flex';
  }
};

menuBtns.forEach((btn) => {
  btn.addEventListener('click', displaySection);
});

if (storageAvailable('localStorage')) {
  window.addEventListener('load', () => {
    dispForm.classList.add('visited');
    books = library.getBooks();
    if (books.length === 0) {
      bookContainer.style.display = 'none';
    } else {
      bookContainer.style.display = 'block';
      books.forEach((book) => library.displayBook(book.title, book.author, book.id));
    }
  });
  addBtn.addEventListener('click', () => {
    if (bookContainer.style.display === 'none') {
      bookContainer.style.display = 'block';
    }
    library.getBooks();
    const bookId = library.addBook(bookName.value, bookAuthor.value);
    library.saveBooks();
    library.displayBook(bookName.value, bookAuthor.value, bookId);
    resetInput();
  });
}

// Adding date
setInterval(() => {
  dateContainer.textContent = `${DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}`;
}, 1000);
