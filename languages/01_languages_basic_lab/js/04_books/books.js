export const isBookRead = (books, title) => {
    const book = books.find(book => book.title === title);
    return book ? book.isRead : false;
}