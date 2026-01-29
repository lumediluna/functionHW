import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { baseURL } from '../framework/config/configBookstore.js';

test('Создание книги', async ({ request }) => {

  const userName = faker.internet.username();
  const password = 'P@ssw0rd123!';

  // 1. Создание пользователя
  const createUserResponse = await request.post(
    `${baseURL}/Account/v1/User`,
    {
      data: {
        userName,
        password
      }
    }
  );

  expect(createUserResponse.status()).toBe(201);

  const { userID } = await createUserResponse.json();

  // 2. Логин
  const loginResponse = await request.post(
    `${baseURL}/Account/v1/GenerateToken`,
    {
      data: {
        userName,
        password
      }
    }
  );

  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // 3. Добавление книги
  const createResponse = await request.post(
    `${baseURL}/BookStore/v1/Books`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        userId: userID,
        collectionOfIsbns: [
          { isbn: '9781449325862' }
        ]
      }
    }
  );

  expect(createResponse.status()).toBe(201);
});



test('Добавление и обновление книги', async ({ request }) => {

  // ДАНО: новый пользователь
const userName = faker.internet.username();
const password = 'P@ssw0rd123!';

  // 1. Создаём пользователя
  const createUserResponse = await request.post(
    `${baseURL}/Account/v1/User`,
    {
      data: {
        userName,
        password
      }
    }
  );
  expect(createUserResponse.status()).toBe(201);

  const { userID } = await createUserResponse.json();

  // 2. Логинимся
  const loginResponse = await request.post(
    `${baseURL}/Account/v1/GenerateToken`,
    {
      data: {
        userName,
        password
      }
    }
  );
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // 3. Добавляем книгу
  const oldIsbn = '9781449325862';

  const addBookResponse = await request.post(
    `${baseURL}/BookStore/v1/Books`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        userId: userID,
        collectionOfIsbns: [
          { isbn: oldIsbn }
        ]
      }
    }
  );
  expect(addBookResponse.status()).toBe(201);

  // 4. Обновляем книгу
  const newIsbn = '9781449331818';

  const updateBookResponse = await request.put(
    `${baseURL}/BookStore/v1/Books/${oldIsbn}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        userId: userID,
        isbn: newIsbn
      }
    }
  );
  expect(updateBookResponse.status()).toBe(200);
});

test('Добавление, обновление и получение книги (beginner)', async ({ request }) => {

  // ДАНО: новый пользователь
  const userName = faker.internet.username();
  const password = 'P@ssw0rd123!';

  // 1. Создаём пользователя
  const createUserResponse = await request.post(
    `${baseURL}/Account/v1/User`,
    {
      data: {
        userName,
        password
      }
    }
  );
  expect(createUserResponse.status()).toBe(201);

  const { userID } = await createUserResponse.json();

  // 2. Логинимся
  const loginResponse = await request.post(
    `${baseURL}/Account/v1/GenerateToken`,
    {
      data: {
        userName,
        password
      }
    }
  );
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // 3. Добавляем книгу
  const oldIsbn = '9781449325862';

  const addBookResponse = await request.post(
    `${baseURL}/BookStore/v1/Books`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        userId: userID,
        collectionOfIsbns: [
          { isbn: oldIsbn }
        ]
      }
    }
  );
  expect(addBookResponse.status()).toBe(201);

  // 4. Обновляем книгу
  const newIsbn = '9781449331818';

  const updateBookResponse = await request.put(
    `${baseURL}/BookStore/v1/Books/${oldIsbn}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        userId: userID,
        isbn: newIsbn
      }
    }
  );
  expect(updateBookResponse.status()).toBe(200);

  // 5. Получаем информацию о книге
  const getBookResponse = await request.get(
    `${baseURL}/BookStore/v1/Book?ISBN=${newIsbn}`
  );

  expect(getBookResponse.status()).toBe(200);

  const bookInfo = await getBookResponse.json();

  // Минимальные проверки для новичка
  expect(bookInfo.isbn).toBe(newIsbn);
  expect(bookInfo.title).toBeDefined();
  expect(bookInfo.author).toBeDefined();
});


test('Удаление книги (beginner)', async ({ request }) => {

  // ДАНО: новый пользователь
  const userName = faker.internet.username();
  const password = 'P@ssw0rd123!';

  // 1. Создаём пользователя
  const createUserResponse = await request.post(
    `${baseURL}/Account/v1/User`,
    {
      data: {
        userName,
        password
      }
    }
  );
  expect(createUserResponse.status()).toBe(201);

  const { userID } = await createUserResponse.json();

  // 2. Логинимся
  const loginResponse = await request.post(
    `${baseURL}/Account/v1/GenerateToken`,
    {
      data: {
        userName,
        password
      }
    }
  );
  expect(loginResponse.status()).toBe(200);

  const { token } = await loginResponse.json();

  // 3. Добавляем книгу
  const isbn = '9781449325862';

  const addBookResponse = await request.post(
    `${baseURL}/BookStore/v1/Books`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        userId: userID,
        collectionOfIsbns: [
          { isbn }
        ]
      }
    }
  );
  expect(addBookResponse.status()).toBe(201);

  // 4. Удаляем книгу
  const deleteBookResponse = await request.delete(
    `${baseURL}/BookStore/v1/Book`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        userId: userID,
        isbn
      }
    }
  );

  expect(deleteBookResponse.status()).toBe(204);
});
