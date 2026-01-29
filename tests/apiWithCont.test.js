import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { config } from '../framework/config/configBookstore.js';
import { AccountController } from '../framework/services/controllers/account.js';
import { BookStoreController } from '../framework/services/controllers/book.js';

test('Создание книги', async ({ request }) => {

  const account = new AccountController(request, config.baseURL);
  const bookstore = new BookStoreController(request, config.baseURL);

  const userName = faker.internet.username();
  const password = config.defaultPassword;

  
  const createUser = await account.createUser(userName, password);
  expect(createUser.status()).toBe(201);
  const { userID } = await createUser.json();
  const login = await account.generateToken(userName, password);
  expect(login.status()).toBe(200);
  const { token } = await login.json();
  const addBook = await bookstore.addBook(
    token,
    userID,
    '9781449325862'
  );
  expect(addBook.status()).toBe(201);
});


test('Добавление и обновление книги', async ({ request }) => {
  const account = new AccountController(request, config.baseURL);
  const bookstore = new BookStoreController(request, config.baseURL);
  const userName = faker.internet.username();
  const password = config.defaultPassword;
  const createUser = await account.createUser(userName, password);
  expect(createUser.status()).toBe(201);
  const { userID } = await createUser.json();
  const login = await account.generateToken(userName, password);
  expect(login.status()).toBe(200);
  const { token } = await login.json();
  const oldIsbn = '9781449325862';
  const addBook = await bookstore.addBook(token, userID, oldIsbn);
  expect(addBook.status()).toBe(201);
  const newIsbn = '9781449331818';
  const updateBook = await bookstore.updateBook(
    token,
    userID,
    oldIsbn,
    newIsbn
  );
 expect(updateBook.status()).toBe(200);
});


test('Добавление, обновление и получение книги', async ({ request }) => {
  const account = new AccountController(request, config.baseURL);
  const bookstore = new BookStoreController(request, config.baseURL);
  const userName = faker.internet.username();
  const password = config.defaultPassword;
  const createUser = await account.createUser(userName, password);
  expect(createUser.status()).toBe(201);
  const { userID } = await createUser.json();
  const login = await account.generateToken(userName, password);
  expect(login.status()).toBe(200);
  const { token } = await login.json();
  const oldIsbn = '9781449325862';
  const addBook = await bookstore.addBook(token, userID, oldIsbn);
  expect(addBook.status()).toBe(201);
  const newIsbn = '9781449331818';
  const updateBook = await bookstore.updateBook(
    token,
    userID,
    oldIsbn,
    newIsbn
  );
  expect(updateBook.status()).toBe(200);
  const getBook = await bookstore.getBook(newIsbn);
  expect(getBook.status()).toBe(200);
  const bookInfo = await getBook.json();
  expect(bookInfo.isbn).toBe(newIsbn);
  expect(bookInfo.title).toBeDefined();
  expect(bookInfo.author).toBeDefined();
});


test('Удаление книги', async ({ request }) => {
  const account = new AccountController(request, config.baseURL);
  const bookstore = new BookStoreController(request, config.baseURL);
  const userName = faker.internet.username();
  const password = config.defaultPassword;
  const createUser = await account.createUser(userName, password);
  expect(createUser.status()).toBe(201);
  const { userID } = await createUser.json();
  const login = await account.generateToken(userName, password);
  expect(login.status()).toBe(200);
  const { token } = await login.json();
  const isbn = '9781449325862';
  const addBook = await bookstore.addBook(token, userID, isbn);
  expect(addBook.status()).toBe(201);
  const deleteBook = await bookstore.deleteBook(
    token,
    userID,
    isbn
  );
  expect(deleteBook.status()).toBe(204);
});
