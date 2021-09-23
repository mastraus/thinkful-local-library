function findAccountById(accounts, id) {
  let findId = accounts.find((account) => account.id === id);
  return findId;
}

//Returns an array
//Array contains account objects sorted alphabetically by last name
//Sort method?
function sortAccountsByLastName(accounts) {
  accounts.sort((a, b) => a.name.last.toUpperCase() >= b.name.last.toUpperCase() ? 1:-1);
  return accounts;
}

// function getTotalNumberOfBorrows(account, books) {}
function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    book.borrows.filter((borrower) => (borrower.id === account.id ? acc++ : false));
    return acc;
  }, 0)
}

//Inputs: account obj, array of all books onbj, array of all authors obj
//Output: array of the book obj with the author obj nested inside for all books currently checked out by the account

//Find which books are checked out by account
//Create book obj w/ author obj for each book checked out

//Create variable for account user's ID
//Search the books for that ID
//If ID found, check if borrows.returned is true or false
//If false, means it is currently checked out by that user and that book obj should be moved to an array
//Once array of books objs created, add author obj nested inside
function getBooksPossessedByAccount(account, books, authors) {
  let user = account.id;
  let booksOutByUser = books.filter((borrowedBooks) => borrowedBooks.borrows[0].id === user && borrowedBooks.borrows[0].returned === false);
  for (let bookItem of booksOutByUser) {
    let match = authors.find((authorList) => authorList.id === bookItem.authorId);
    bookItem.author = match;
  }
  return booksOutByUser;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};