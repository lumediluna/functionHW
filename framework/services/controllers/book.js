import { BaseController } from './base.js';

export class BookStoreController extends BaseController {

  async addBook(token, userId, isbn) {
    return this.post('/BookStore/v1/Books', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        userId,
        collectionOfIsbns: [{ isbn }]
      }
    });
  }

  async updateBook(token, userId, oldIsbn, newIsbn) {
    return this.put(`/BookStore/v1/Books/${oldIsbn}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { userId, isbn: newIsbn }
    });
  }

  async getBook(isbn) {
    return this.get(`/BookStore/v1/Book?ISBN=${isbn}`);
  }

  async deleteBook(token, userId, isbn) {
    return this.delete('/BookStore/v1/Book', {
      headers: { Authorization: `Bearer ${token}` },
      data: { userId, isbn }
    });
  }
}