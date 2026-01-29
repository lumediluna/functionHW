import 'dotenv/config'

array
export const config = {
  baseURL: 'https://demoqa.com',
  defaultPassword: 'P@ssw0rd123!',
};
=======
// Object.freeze используем, чтобы запретить изменять конфиг,
// конфиг только для чтения
export const baseURL = 'https://bookstore.demoqa.com'
units
