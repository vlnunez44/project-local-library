function getTotalBooksCount(books) {
  // YOUR SOLUTION HERE

  let total = 0; // initialize counter

  //loop over books array and count each record
  for (let i = 0; i < books.length; i++){
    total = total + 1;
  }
  return total; //returns total count

}

function getTotalAccountsCount(accounts) {
  // YOUR SOLUTION HERE

  let total = 0; // initialize counter

  //loop over accounts array and count each record
  for(let i = 0; i < accounts.length; i++){
    total = total + 1;
  }
  return total; //returns total count

}

function getBooksBorrowedCount(books) {
  // YOUR SOLUTION HERE

  let totalCount = 0; // initialize counter

  //loop over books array and count each record where the book is borrowed out
  books.forEach((book) => {if (book.borrows[0].returned === false) totalCount = totalCount + 1;});
  return totalCount; //returns total count

  // Hint: You can use the [`filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method here. 
  // If you get stuck, feel free to take a look at this repl.it: https://replit.com/@thinkful/getBooksBorrowedCount#index.js
}

// Tbis is a helper function that's called by other functions inside this file. You don't have to edit it.
function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }

    return acc;
  }, {});

  const sorted = _sortObjectByValues(count);
  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});

  const sorted = _sortObjectByValues(groupById);
  return sorted
    .map((id) => {
      const { title: name } = books.find(({ id: bookId }) => bookId === id);
      return { name, count: groupById[id] };
    })
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }

    return acc;
  }, {});

  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }

  const sorted = _sortObjectByValues(count);
  return sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      const name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
