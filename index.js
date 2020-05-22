const { Alice, Reply, Markup } = require('yandex-dialogs-sdk')
const alice = new Alice();

const M = Markup;
const name = 'Вася Пупкин';
const number = '115 986';
const pending = '1';
const operations = {
     "Последняя": '20.11.2020 16:11. Перевод 12 500 рублей на карту Открытие. Статус: в обработке. ',
     "Предыдущая": '20.11.2020 15:28. Оплата ООО «Скартел» на сумму 50 000 рублей. Статус: оплачено. ',
}
// const number = 'https://localhost/webapi-2.1/accounts/data/content/73475/currencyCode="RUB"/amount/';	
// const operations = 'https://localhost/webapi-2.1/accounts/73475/statement?format="JSON"&from="2020-05-20"&to="2020-05-21"';

alice.command(
  ['Показать меню', 'Алиса', 'Мой счет'],
  ctx => {
    return {
      text: `Привет, я голосовой помощник Банка Открытие, тебе нужна помощь`,
      buttons: [M.button('Алиса, баланс моего рублевого счета'), M.button('Мои 2 последние операции по рублевому счету')],
    };
  },
);

alice.command('Алиса, баланс моего рублевого счета', ctx => {
        const message = `${name}, баланс вашего счета составляет ${number} рублей`
        return Reply.text(message);
})

alice.command('Мои 2 последние операции по рублевому счету', ctx => {
    const invoice = JSON.stringify(operations, null, 2)
    return Reply.text(invoice);
})

alice.command(
['Скажи, сколько транзакций на счету имеют статус «В обработке»?', 'Алиса, сколько транзакций на счету имеют статус «В обработке»?', 'транзакций в обработке'],
ctx => {
  return {
    text: `В статусе обработки в данный момент находится ${pending} транзакция. Желаете с ней ознакомиться?`,
    buttons: [M.button('Да'), M.button('Нет')],
  };
},
);

alice.command('Да', ctx => {
  const answer_yes = `20.11.2020 16:11. Перевод 12 500 рублей на карту Открытие. Статус: в обработке.`
  return Reply.text(answer_yes);
})

alice.command('Нет', ctx => {
  const answer_no = `Вы Отменили Операцию`
  return Reply.text(answer_no);
})

alice.any(ctx => {
    return Reply.text('Вы вводите не используете команды, вам нужна помощь или нет?');
})

//Сервер
const port = 3001
alice.listen(port, '/', callback => console.log(port))