import { BaseController } from './base.js';

export class BookStoreController extends BaseController {

  async addBook(token: string, userId: number, isbn: string): Promise<any> {
    return this.post('/BookStore/v1/Books', {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        userId,
        collectionOfIsbns: [{ isbn }]
      }
    });
  }

  async updateBook(token: string, userId: number, oldIsbn: string, newIsbn: string): Promise<any> {
    return this.put(`/BookStore/v1/Books/${oldIsbn}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { userId, isbn: newIsbn }
    });
  }

  async getBook(isbn: string): Promise<any> {
    return this.get(`/BookStore/v1/Book?ISBN=${isbn}`);
  }

  async deleteBook(token: string, userId: number, isbn: string): Promise<any> {
    return this.delete('/BookStore/v1/Book', {
      headers: { Authorization: `Bearer ${token}` },
      data: { userId, isbn }
    });
  }
}