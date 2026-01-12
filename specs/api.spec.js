describe('Создание пользователя', () => {
  test("Неуспешное создание пользователя, логин уже используется", async () => {
    const result = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
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

    expect(result.status).toBe(400); 
    const body = await result.json();
    expect(body.message).toBeDefined();
  });

  test("Успешное создание пользователя", async () => {
  const result = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: 'Olga1_64646464644' , 
      password: 'P@ssw0rd123!',       
    }),
  });

  const body = await result.json();
  expect(result.status).toBe(201);
  expect(body.userID).toBeDefined();
});



  test("Неуспешное создание пользователя, пароль не подходит", async () => {
    const result = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'Olga_6464664644',
        password: '456',
      }),
    });

    expect(result.status).toBe(400); 
    const body = await result.json();
    expect(body.message).toBeDefined();
  });
});

test ("Успешная генерация токена", async () => {
const result = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      userName: 'Olga_6464664644' , 
      password: 'P@ssw0rd123!',   
      }),
    });

    expect(result.status).toBe(200);
  const body = await result.json();
  expect(body.token).toBeDefined();
  });

  test ("Неуспешная генерация токена", async () => {
const result = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
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
  const body = await result.json();  
  expect(result.status).toBe(200);
  expect(body.status).toBe('Failed'); 
  expect(body.result).toBe('User authorization failed.');
  });






