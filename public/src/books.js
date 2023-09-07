function findAuthorById(authors, id) {
  // YOUR SOLUTION HERE
  const foundAuthor = authors.find((author) => author.id === id); // find function to return author infor when the id is supplied
  return foundAuthor;

}

function findBookById(books, id) {
  // YOUR SOLUTION HERE
  
  // leverages the find function to return book info when book id is supplied
  const foundBook = books.find((book) => book.id === id);
  return foundBook;  //returns specific book info


}

// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function partitionBooksByBorrowedStatus(books) {
  return books.reduce(
    (acc, book) => {
      const [borrowed, returned] = acc;
      const recent = book.borrows[0];
      if (recent.returned) {
        returned.push(book);
      } else {
        borrowed.push(book);
      }

      return acc;
    },
    [[], []]
  );
}

function getBorrowersForBook(book, accounts) {
  const accountsById = accounts.reduce((acc, account) => {
    acc[account.id] = account;
    return acc;
  }, {});

  return book.borrows
    .map(({ id, returned }) => ({
      ...accountsById[id],
      returned,
    }))
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
