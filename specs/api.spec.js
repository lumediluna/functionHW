describe ("Создание пользователя"), () => {
test(' Успешное создание пользователя', async () => {
  const res = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: 'string',
      password: 'string',
    }),
  });

  expect(res.status).toBe(201); // или тот код, который ждёшь
 const body = await res.json();
  // дальше проверки по ответу
  expect(body.userID).toBeDefined();
});
};