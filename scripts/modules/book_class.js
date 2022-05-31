export { Book as default };

const Book = class {
  constructor(title = null, author = null, id = null) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
};
