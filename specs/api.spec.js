describe('Создание пользователя', () => {
  test('Неуспешное создание пользователя, логин уже используется', async () => {
    const res = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'string',
        password: 'string',
      }),
    });

    expect(res.status).toBe(400); 
    const body = await res.json();
    expect(body.message).toBeDefined();
  });
});