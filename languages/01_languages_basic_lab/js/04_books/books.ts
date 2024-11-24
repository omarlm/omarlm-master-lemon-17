interface Book {
    title: string;
    isRead: boolean;
}

export const isBookRead = (books: Book[], title: string): boolean => {
    const book = books.find(book => book.title === title);
    return book ? book.isRead : false;
}