function findAuthorById(authors, id) {
  let foundAuthor = authors.find((authorName) => authorName.id === id);
  return foundAuthor;
}

function findBookById(books, id) {
  let foundBook = books.find((bookId) => bookId.id === id);
  return foundBook;
}

//Input array of books, Output array with 2 arrays inside
//First array contains book obj currently checked out
//Second array book obj returned

//Filter: arr 1: borrows.returned= false, returns book obj
//Filter: arr 2: borrows.returned= true, returns book obj
function partitionBooksByBorrowedStatus(books) {
  let booksOut = books.filter((book) => {
    if (book.borrows[0].returned === false) {
      return book;}
  })
  let booksIn = books.filter((book) => {
    if (book.borrows[0].returned === true) {
      return book;}
  })
  let booksByArray = [booksOut, booksIn]
  return booksByArray;
}

//Input: book obj, arr of all account obj
//Output: Arr of 10 or less account objs

//Return an array of 10 or less account objs that borrowed the book AND include their returned status

//Access account IDs by book.borrows; .map to see if book ID matches account ID and if it does, return account obj and returned status
function getBorrowersForBook(book, accounts) {
  let newArr = book.borrows.map((borrowed) => {
    let currentAccount = accounts.find((account) => account.id === borrowed.id);
    let returned = borrowed.returned;
      return {...currentAccount, returned};
    })
    return newArr.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
