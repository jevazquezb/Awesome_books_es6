/* eslint-disable max-classes-per-file */

// Extracted function from lesson
function storageAvailable(type) {
  let storage;
  try {
    const x = '__storage_test__';
    storage = window[type];
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
                // everything except Firefox
                && (e.code === 22
                // Firefox
                || e.code === 1014
                // test name field too, because code might not be present
                // everything except Firefox
                || e.name === 'QuotaExceededError'
                // Firefox
                || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
                // acknowledge QuotaExceededError only if there's something already stored
                && storage
                && storage.length !== 0
    );
  }
}

const bookContainer = document.querySelector('.list-cont');
const bookName = document.getElementById('name');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add');
let books;

// Menu links
const menuBtns = document.querySelectorAll('.link-item');
const dispList = document.querySelector('#disp-list');
const dispForm = document.querySelector('#disp-form');
const dispContact = document.querySelector('#disp-contact');
// Sections
const booksSection = document.querySelector('.book-list');
const form = document.querySelector('.form');
const contact = document.querySelector('.contact');

class Book {
  constructor(title = null, author = null, id = null) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class BookManager {
  constructor() {
    this.bookList = null;
  }

  getBooks() {
    this.bookList = JSON.parse(localStorage.getItem('bookList')) || [];
    return this.bookList;
  }

  saveBooks() {
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
  }

  addBook(title, author) {
    const bookId = Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 5);
    const newBook = new Book(title, author, bookId);
    this.bookList.push(newBook);
    return bookId;
  }

  removeBook(e) {
    // Remove from localStorage
    this.bookList = JSON.parse(localStorage.getItem('bookList'));
    const bookId = e.target.id;
    const filteredBooks = this.bookList.filter((book) => book.id !== bookId);
    localStorage.setItem('bookList', JSON.stringify(filteredBooks));

    // Remove from the Interface (DOM)
    e.target.parentElement.remove();

    if (this.bookList.length === 1) {      
      bookContainer.style.display = 'none';
    }
  }
}

const library = new BookManager();

function displayBook(title, author, id) {
  // Book container
  const bkdiv = document.createElement('div');
  bkdiv.classList.add('book-cont'); 

  // Title of the book
  const bookData = document.createElement('h2');
  bookData.textContent = `"${title}" by ${author}`;
  bookData.classList.add('book-info');
  bkdiv.appendChild(bookData);  

  // Remove Button
  const rmBtn = document.createElement('button');
  rmBtn.textContent = 'Remove';
  rmBtn.classList.add('rmbtn');
  rmBtn.id = id;
  rmBtn.addEventListener('click', library.removeBook);
  bkdiv.appendChild(rmBtn);  

  bookContainer.appendChild(bkdiv);
}

function resetInput() {
  bookName.value = '';
  bookAuthor.value = '';
}

function displaySection(e) {
  if (e.target.id === 'disp-list') {
    dispList.classList.add('visited');
    dispForm.classList.remove('visited');
    dispContact.classList.remove('visited');
    booksSection.classList.add('display');
    form.classList.remove('display');
    contact.classList.remove('display');
  } else if (e.target.id === 'disp-form') {
    dispList.classList.remove('visited');
    dispForm.classList.add('visited');
    dispContact.classList.remove('visited');
    booksSection.classList.remove('display');
    form.classList.add('display');
    contact.classList.remove('display');
  } else {
    dispList.classList.remove('visited');
    dispForm.classList.remove('visited');
    dispContact.classList.add('visited');
    booksSection.classList.remove('display');
    form.classList.remove('display');
    contact.classList.add('display');
  }
}

menuBtns.forEach((btn) => {
  btn.addEventListener('click', displaySection);
});

if (storageAvailable('localStorage')) {
  window.addEventListener('load', () => {
    dispForm.classList.add('visited');
    form.classList.add('display');
    books = library.getBooks();
    if (books.length === 0) {
      bookContainer.style.display = 'none';
    } else {
      bookContainer.style.display = 'block';
      books.forEach((book) => displayBook(book.title, book.author, book.id));
    }
  });
  addBtn.addEventListener('click', () => {
    if (bookContainer.style.display === 'none') {
      bookContainer.style.display = 'block';
    }
    library.getBooks();
    const bookId = library.addBook(bookName.value, bookAuthor.value);
    library.saveBooks();
    displayBook(bookName.value, bookAuthor.value, bookId);  
    resetInput();    
  });
}

// Date

