import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { baseURL } from '../framework/config/configBookstore.js';


test('Создание и авторизация пользователя', async ({ request }) => {
  const userName = `olgak_${Date.now()}`;
  const password = 'P@ssw0rd123!';
const createResponse = await request.post(`${baseURL}/Account/v1/User`, {
    data: { userName, password },
  });
  expect(createResponse.status()).toBe(201);
  const authResponse = await request.post(`${baseURL}/Account/v1/Authorized`, {
    data: { userName, password },
  });
  expect(authResponse.status()).toBe(200);
});


test('Создание, получение пользователя', async ({ request }) => {
  const userName = faker.internet.username();
  const password = 'P@ssw0rd123!';

 const createResponse = await request.post(`${baseURL}/Account/v1/User`, {
    data: { userName, password },
  });
  expect(createResponse.status()).toBe(201);

  const createBody = await createResponse.json();
  const userId = createBody.userID;
  expect(userId).toBeTruthy();
  });

test('Создание, удаление пользователя', async ({ request }) => {
  const userName = faker.internet.username();
  const password = 'P@ssw0rd123!';

 const createResponse = await request.post(`${baseURL}/Account/v1/User`, {
    data: { userName, password },
  });
  expect(createResponse.status()).toBe(201);

  const createBody = await createResponse.json();
  const userId = createBody.userID;
  expect(userId).toBeTruthy();

  const tokenResponse = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
    data: { userName, password },
  });
  expect(tokenResponse.status()).toBe(200);

  const tokenBody = await tokenResponse.json();
  const token = tokenBody.token;
  expect(token).toBeTruthy();

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };
  const getResponse = await request.get(`${baseURL}/Account/v1/User/${userId}`, {
    headers: authHeaders,
  });
  expect(getResponse.status()).toBe(200);

  const deleteResponse = await request.delete(`${baseURL}/Account/v1/User/${userId}`, {
    headers: authHeaders,
  });
  expect([200, 204]).toContain(deleteResponse.status());

  if (deleteResponse.status() === 200) {
    const deleteBody = await deleteResponse.json();
    expect(deleteBody.code).toBe(0);
  }
  const getAfterDeleteResponse = await request.get(`${baseURL}/Account/v1/User/${userId}`, {
    headers: authHeaders,
  });
  expect([401, 404]).toContain(getAfterDeleteResponse.status());
});
