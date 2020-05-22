const Alice = require('yandex-dialogs-sdk')

const { button, reply } = Alice

const url = 'https://{host}/webapi-2.1/accounts/{accountId}/statement?format={format}&from={from}&to={to}';
const fetch = require('node-fetch');

const events = [];
fetch(url).then(res => res.json()).then(json => events.push(...json.values));

const moment = require('moment');
moment.locale('ru');

alice.welcome(ctx => {
    const replyMsg = reply({
        text: 'Привет! Я голосовой помощник банка Открытие. Тебе нужна помощь?',
        buttons: [button('Состояние счета в банке открытие'), button('Движение средств по карте открытие')]
    })
    ctx.reply(replyMsg)
})

alice.command('Состояние счета в банке открытие', ctx => {
    ctx.reply('А волшебное слово?');
    alice.command('Пожалуйста', ctx => {
        ctx.reply('Ну раз вы просите');
        const message = 'Ваш баланс по карте открытие составляет {number} рублей'
        ctx.reply(message);
    })
})

alice.command('Движение средств по карте открытие', ctx => {
    ctx.reply('По вашему счету были следующие операции')
    const invoice = moment(events[0].statement).format('DD MMMM, dddd, HH:mm');
    ctx.reply(invoice);
})

alice.any(ctx => {
    ctx.reply('Вы вводите не используете команды, вам нужна помощь или нет?')
})

const port = 3000
alice.listen('/', port, callback => console.log(port))