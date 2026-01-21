import { test, expect } from '@playwright/test';

import { nameIsValid } from '../src/app.js';
import { fullTrim } from '../src/app.js';
import { getTotal } from '../src/app.js';
import { getScore } from '../src/app.js';


// test.describe('Проверка имени пользователя', () => {
//   test.describe('nameIsValid', () => {

//     test('Имя должно состоять из букв', async () => {
//       const name = 'bob';
//       const result = await nameIsValid(name);
//       expect(result).toBe(true);
//     });

//   });
// });

// test('Имя короче 2 букв — невалидно', async () => {
//   const name = 's';
//   const result = await nameIsValid(name);
//   expect(result).toBe(false);
// });

// test('Имя - цифрами - невалидно', async () => {
//   const name = '77';
//   const result = await nameIsValid(name);
//   expect(result).toBe(false);
// });


// test.describe('Удаление пробелов из строки', () => {
//   test.describe('fullTrim', () => {

//     test('Удаление пробелов из строки', async () => {
//       const text = ' f    g   jjj';
//       const expected = 'fgjjj';
//       const result = await fullTrim(text);
//       expect(result).toBe(expected);
//     });

//   });
// });

// test('Удаление переноса', async () => {
//   const text = '\n';
//   const expected = '';
//   const result = await fullTrim(text);
//   expect(result).toBe(expected);
// });

// test('Пустая строка при text=null', async () => {
//   const text = null;
//   const expected = '';
//   const result = await fullTrim(text);
//   expect(result).toBe(expected);
// });


// test.describe('возможные ошибки в скидке getTotal', () => {

//   test.describe('getTotal %', () => {

//     test.each([
//       ['скидка не число', [{ price: 10, quantity: 1 }], 'оо', 'Скидка должна быть числом'],
//       ['скидка не может быть отрицательной', [{ price: 10, quantity: 1 }], -1, 'Процент скидки должен быть от 0 до 99'],
//       ['скидка больше 99%', [{ price: 10, quantity: 1 }], 100, 'Процент скидки должен быть от 0 до 99'],
//       ])('%s', async (_title, items, discount, errorMessage) => {
//       const result = () => getTotal(items, discount);
//       expect(result).toThrow(errorMessage);
//     });

//   });

// });



test('getScore возвращает сумму всех баллов', () => {
  const scores = {
    Anna: 10,
    Olga: 1,
    Ivan: 5,
  };

  const result = getScore(scores);

  expect(result).toBe(16);
});