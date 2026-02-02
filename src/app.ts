/**
 * Проверка имени пользователя
 */
export const nameIsValid = (name: unknown): boolean =>
  typeof name === 'string' &&
  name.length >= 2 &&
  /^[a-z]+$/.test(name);

/**
 * Удаление пробелов из строки
 */
export const fullTrim = (text?: string | null): string =>
  (text ?? '').replace(/\s+/g, '');

/**
 * Подсчёт суммы заказа
 */
type OrderItem = {
  quantity: number;
  price: number;
  name?: string;
};

export const getTotal = (
  items: OrderItem[] = [],
  discount: number = 0
): number => {
  if (typeof discount !== 'number') {
    throw new Error('Скидка должна быть числом');
  }

  if (discount < 0 || discount >= 100) {
    throw new Error('Процент скидки должен быть от 0 до 99');
  }

  const total = items.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );

  return total * (1 - discount / 100);
};