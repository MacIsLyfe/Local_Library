//finds the accounts by the given ID
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id.includes(id));
}

//sorts the accounts by last name
function sortAccountsByLastName(accounts) {
  return accounts.sort((lastA,lastB) => 
    lastA.name.last.toLowerCase() > lastB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  const booksBorrowedByAccount = books.forEach((book) => {
    if (!!book.borrows) {
      book.borrows.forEach((accounts) => {
        if (accounts.id === account.id) {
          result++;
        }
      });
    }
  });
  return result;
}

//Helper function
//Returns author object
function _getAuthor(book, authors) {
  const author = authors.find((author) => author.id === book.authorId);
  return author;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];
  books.forEach((book) => {
    let bookBorrows = book.borrows;
    bookBorrows.forEach((borrow) => {
      if (borrow.id === account.id && !borrow.returned) {
        borrowedBooks.push(book);
      }
    });
  });
  let result = borrowedBooks.map((book) => {
    return { ...book, author: _getAuthor(book, authors) };
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
