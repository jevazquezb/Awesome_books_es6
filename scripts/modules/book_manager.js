import Book from './book_class.js';
import { bookContainer } from '../index.js';
export { BookManager as default };

const BookManager = class {
  constructor() {
    this.bookList = null;
  }

  getBooks = () => {
    this.bookList = JSON.parse(localStorage.getItem('bookList')) || [];
    return this.bookList;
  };

  saveBooks = () => {
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
  };

  addBook = (title, author) => {
    const bookId = Math.random().toString(36).replace(/[^a-z]+/g, '').slice(2, 5);
    const newBook = new Book(title, author, bookId);
    this.bookList.push(newBook);
    return bookId;
  };

  removeBook = (e) => {
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
  };

  displayBook = (title, author, id) => {
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
    rmBtn.addEventListener('click', this.removeBook);
    bkdiv.appendChild(rmBtn);  
  
    bookContainer.appendChild(bkdiv);
  };
};