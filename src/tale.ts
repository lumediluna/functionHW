// без switch
// function kolobok(name) {
//   if (name === 'дедушка') {
//     return 'Я от дедушки ушёл';
//   }

//   if (name === 'заяц') {
//     return 'Я от зайца ушёл';
//   }

//   if (name === 'лиса') {
//     return 'Меня съели';
//   }

//   else
//   return 'А я то тут причем?';
// }
// console.log(kolobok('дедушка'));
// console.log(kolobok('заяц'));
// console.log(kolobok('лиса'));
// console.log(kolobok('кошка'));

//с swith
function kolobok(name) {
  switch (name) {
    case 'дедушка':
      return 'Я от дедушки ушёл'
    case 'заяц':
      return 'Я от зайца ушёл'
    case 'лиса':
      return 'Меня съели'
    default:
      return 'И причем тут я?'
  }
}

console.log(kolobok('дедушка'))
console.log(kolobok('заяц'))
console.log(kolobok('лиса'))
console.log(kolobok('мышка'))

// Без шаблонных строк
// function newYear(name) {
//     if (name == 'Снегурочка') {
//         return 'Снегурочка! Снегурочка! Снегурочка!';
//     }
//     else
//         return 'Дед Мороз! Дед Мороз! Дед Мороз!';

// }
// console.log(newYear('Снегурочка'));
// console.log(newYear('Дед Мороз'))

//с шаблонными строками
function newYear(name) {
  switch (name) {
    case 'Дед Мороз':
      return `${name}! ${name}! ${name}!`

    case 'Снегурочка':
      return `${name}! ${name}! ${name}!`
  }
}
console.log(newYear('Снегурочка'))
console.log(newYear('Дед Мороз'))
