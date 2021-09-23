function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

//Returns # of books currently checked out
//You know if a book is checked out based on if returned: false
//Find this from borrows.returned
function getBooksBorrowedCount(books) {
  let totalBooksOut = books.reduce((acc, item) => {
    if (item.borrows[0].returned === false) {
      acc++;
    } return acc;
  }, 0)
  return totalBooksOut;
}

//Returns array of onbjects, 5 OR LESS (since its the most common, so like top 5)
//Array represents most common occurring genres ordered most common to least
//Each obj in new array has 2 keys: name (name of genre) and count (# of times genre occurs)

//Use reduce method and set initial value to 0
//First, find the most common genres (5 or less) in the whole library. Accumulate the genres and the times they occur usding reduce.
//Sort method to find which ones occur the most.
//Push into empty object the top 5 or less w/ 2 keys
function getMostCommonGenres(books) {
  let genres = books.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = 1;
    }
    else {
      acc[book.genre]++;
    }
    return acc;
  }, {});
  return Object.entries(genres)
  .map(([name, count]) => {
    return {name, count};
  })
  .sort((a,b) => b.count - a.count)
  .slice(0,5);
}

//Input: arr of book obj
//Output: arr containing 5 book obj or fewer
//Helper function located here
function getMostPopularBooks(books) {
  let sortBooks = sortedBooks(books);
  let popBooks = sortBooks.map(book => {
    return {name: book.title, count: book.borrows.length}
  });
  return popBooks.slice(0, 5);
}

function sortedBooks (arr) {
  arr.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);
  return arr;
}

//Input: array of book obj, array of author obj
//Output: Arr of five obj or less representing most popular authors (books that were checked out the most)

//Each of the 5 obj in returned array should 2 keys: name: "author first and last name", count: # of total times all books checked out
function getMostPopularAuthors (books, authors) {
  //output needs to be an array
  //each obj in output arr needs 2 keys: author's name and count
  //for each author, match it's author obj with the book author id
  //once matched, increase count by length of borrows array
  //finally, sort by count and slice top 5
let mostPopularAuthors = [];
authors.forEach((author) => {
  let eachAuthor = {
    name: `${author.name.first} ${author.name.last}`,
    count: 0
  }
  books.forEach((book) => {
    if (book.authorId === author.id) {
      eachAuthor.count += book.borrows.length;
    }
  })
mostPopularAuthors.push(eachAuthor);
mostPopularAuthors.sort((a, b) => b.count - a.count);
})
return mostPopularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
}
