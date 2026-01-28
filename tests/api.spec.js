import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { baseURL } from '../framework/config/configBookstore.js'

test('Неуспешное создание пользователя — логин уже используется', async ({ request }) => {
  const response = await request.post(`${baseURL}/Account/v1/User`, {
    data: {
      userName: 'string',
      password: 'string'
    }
  })

  expect(response.status()).toBe(400)

  const body = await response.json()
  expect(body.message).toBeDefined()
})

test('Успешное создание пользователя', async ({ request }) => {
  const response = await request.post(`${baseURL}/Account/v1/User`, {
    data: {
      userName: faker.internet.username(),
      password: 'P@ssw0rd123!'
    }
  })

  expect(response.status()).toBe(201)

  const body = await response.json()
  expect(body.userID).toBeDefined()
})






test('Неуспешное создание пользователя — пароль не подходит', async ({ request }) => {
  const response = await request.post(`${baseURL}/Account/v1/User`, {
    data: {
      userName: 'Olga_6464664644',
      password: '456'
    }
  })

  expect(response.status()).toBe(400)

  const body = await response.json()
  expect(body.message).toBeDefined()
})

test('Успешная генерация токена', async ({ request }) => {
  const response = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
    data: {
      userName: 'Olga_6464664644',
      password: 'P@ssw0rd123!'
    }
  })

  expect(response.status()).toBe(200)

  const body = await response.json()
  expect(body.token).toBeDefined()
})

test('Неуспешная генерация токена', async ({ request }) => {
  const response = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
    data: {
      userName: 'string',
      password: 'string'
    }
  })

  expect(response.status()).toBe(200)

  const body = await response.json()
  expect(body.status).toBe('Failed')
  expect(body.result).toBe('User authorization failed.')
})
