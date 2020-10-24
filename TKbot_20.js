const easyvk = require('easyvk');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const cheerio = require('cheerio');
const childProcess = require('child_process');
const mysql = require("mysql2");
const { log } = require('console');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const groupForCheck = '-24039608';
const albumID = '239907710';
const appToken = '98dad81f98dad81f98dad81f8498a9bba4998da98dad81fc7f542457a8c9067298f8f43';
const peerId = '2000000001';
const userID = 'id618124000';

const mesArr = ['Новый пост в группе, ня!', 'Хей, тут новый пост в группе!', 'Ловите новый пост в группе!'];
const mesArr2 = ['Ловите новую страничку, ня!', 'Пс, тут новая страничка вышла!', 'Пора читать новую страничку!'];

const mesArr3 = ['Я тут', 'Слежу за новыми постами', 'На связи', 'А?'];
const mesArr4 = ['Привeтик!', '*Пожала руку своей лапкой*', 'Хaюшки!', 'Рада тебя видеть!'];
const mesArr5 = ['Спoкойной!', 'Спи сладко :3', 'Спокoйной ночи, ня!'];
const mesArr6 = ['Дoброе утро чатик :3', 'Утрeца!', 'Дoброе утро!', 'Утро доброе!'];

const mesArr7 = ['Приятно...', '*Краснеет*', 'Ня :3', '*Мурлычет*'];
const mesArr8 = ['*Краснеет*', 'Ня :3', '*Смущённо отвернулась*'];
const mesArr9 = ['*Краснеет*', '*Смущённо отвернулась*'];
const mesArr10 = ['*Краснеет*', '*Смущённо отвернулась*'];
const mesArr11 = ['За что?', '*Плачет*'];
const mesArr12 = ['Xэй?', 'А призраки не горят ;)'];
const mesArr13 = ['Убил призрака? Ахаха', 'Это больно, наверное...'];
const mesArr14 = ['*Краснеет*', '*Смущённо отвернулась*', 'Мне это напоминает о маме... \n Не делай так'];
const mesArr15 = ['Ах ты! А если я?', 'Не, ну это бан!'];
const mesArr16 = ['Нгхх... \n Пусти!', '*Пытается выбраться* \n ОТПУСТИ СЕЙЧАС ЖЕ!!!'];
const mesArr17 = ['За что?', '*Плачет*'];
const mesArr18 = ['За что?', '*Плачет*'];
const mesArr19 = ['А у меня острые зубы!', 'Мои зубы поострее твоих будут ;-)'];
const mesArr20 = ['~Аа-ах! \n Что ты делаешь!', 'Нгх... Да мы даже не знакомы!', '~Аа-ах! Ты в своём уме?', '~Мммм... Нгх'];
const mesArr21 = ['Я тебе не киcка!', 'Не называй меня так!', 'Хватит!', 'Перестань!'];
const mesArr22 = ['Давай!', 'А почему бы и нет?', 'Я только за!'];
const mesArr23 = ['Добрый', 'Всем приятного вечера', 'Ага!'];


const mesArr3_bad = ['Чего тебе надо?', 'Да тут я...', 'Ну что опять?']; //3
const mesArr4_bad = ['Здраcте...', '*Не хочет здороваться*', 'Не пиши мне.', 'Не приставай ко мне.'];
const mesArr5_bad = ['*Раздражённо* \n Сладких... снов', 'Спи уже.']; //2
const mesArr6_bad = ['*Раздражённо* \n Доброе... утро', 'Проснись и пой...']; //2

const mesArr7_bad = ['*Оскалила зубы*', 'Рр-р... Не приставай ко мне!']; //2
const mesArr8_bad = ['*Краснеет*', '...', '*Смущённо отвернулась*']; //3
const mesArr9_bad = ['Ты в своём уме?', 'Фу-фу-фу!']; //2
const mesArr10_bad = ['*Краснеет*', '*Смущённо отвернулась*']; //2
const mesArr11_bad = ['Я тебя ненавижу!', '*Плачет*']; //2
const mesArr12_bad = ['У тебя всё в порядке?', 'Ты в своём уме?']; //2
const mesArr13_bad = ['Убил призрака? Ахаха', 'Ну-ну']; //2
const mesArr14_bad = ['Не, ну это уже нагло!', 'Ты в своём уме?', 'Я что на леденец похожа?']; //3
const mesArr15_bad = ['А если я?', 'Не, ну это бан!']; //2
const mesArr16_bad = ['Отпусти!', '*Пытается выбраться* \n ОТПУСТИ СЕЙЧАС ЖЕ!!!']; //2
const mesArr17_bad = ['*Оскалила зубы*', 'Сама себя не защитишь - никто не защитит']; //2
const mesArr18_bad = ['*Оскалила зубы*', 'Рр-р... Только попробуй!']; //2
const mesArr19_bad = ['А у меня острые зубы!', 'Скоро мои зубы окажутся внутри твоей руки', 'Ну ты сам напросился!']; //3
const mesArr20_bad = ['Ты в своём уме?', 'Нгх... Да я тебя ненавижу! Как ты смеешь?', '*Оскалила зубы* \n Издеваешься?!', 'Это низко.']; //4
const mesArr21_bad = ['Я тебе не киcка! Ты ещё не понял?', 'Рр-р... Издеваешься?!', 'Отвали!'];
const mesArr22_bad = ['После всего что ты мне наговорил? Ну ладно', 'Дай-ка подумать...', 'Предположим я тебя прощаю.']; //3
const mesArr23_bad = ['Вечерочка...', '*Раздражённо* \n Добрый... вечер']; //2


const mesArr3_good = ['Слушаю', 'Что?', 'Что-то хочешь, ня?', 'Я здесь']; //4
const mesArr4_good = ['Привeтик!', 'Ох, приветствую тебя!', 'О, а вот и ты)', 'Рада тебя видеть!']; //4
const mesArr5_good = ['Спoкойной!', 'Спи сладко :3', 'Спокoйной ночи, ня!']; //3
const mesArr6_good = ['Дoброе утро чатик :3', 'Утрeца!', 'Дoброе утро!', 'Пожать руку']; //4

const mesArr7_good = ['Приятно...', '*Мурлычет*', 'Ня :3', 'Обнять']; //4
const mesArr8_good = ['Обнимашки!', 'Ня :3', 'Поцеловать']; //3
const mesArr9_good = ['*Краснеет*', '*Растеряно посмотрела прямо в глаза*', '&#128536;']; //3
const mesArr10_good = ['Всегда пожалуйста!', 'Рада стараться']; //2
const mesArr11_good = ['За что?', '*Плачет*', 'Мы же были друзьями?!']; //3
const mesArr12_good = ['Пусть всё горит... Но не я)', 'А призраки не горят ;)']; //2
const mesArr13_good = ['Ух какой злой...', 'Это больно, наверное...']; //2
const mesArr14_good = ['*Краснеет*', '*Смущённо отвернулась*', 'Мне это напоминает о маме... \n Не делай так']; //3
const mesArr15_good = ['Ах ты! А если я?', 'Не, ну это бан!', 'Бомба на Б)']; //3
const mesArr16_good = ['Няя...\nПусти!', '*Пытается выбраться*\nОТПУСТИ СЕЙЧАС ЖЕ!!!', 'Ты же не собираешься делать ничего плохого?']; //3
const mesArr17_good = ['За что?', '*Плачет*', 'Мы же были друзьями?!']; //3
const mesArr18_good = ['За что?', '*Плачет*', 'Мы же были друзьями?!']; //3
const mesArr19_good = ['*Оскалилась в улыбке*', 'Мои зубы поострее твоих будут ;-)', 'А если я?']; //3
const mesArr20_good = ['А спросить? Я не готова на такое!', 'Ищь чего удумал! Я не готова на такое!', 'Ты в своём уме? Сейчас?', 'Ва-а? Ты чего так неожиданно?']; //4
const mesArr21_good = ['Я тебе не киcка!', 'Хей! Не называй меня так!', 'Хватит!', 'Хэй, перестань!']; //4
const mesArr22_good = ['Мы и так друзья, глупенький!', 'Разве мы это уже не прошли?', 'Мы уже больше, чем друзья!']; //3
const mesArr23_good = ['Добрый!', 'Всем приятного вечера!', 'И тебе приятного вечерочка!']; //3

const mysqlCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "willow_bd",
  password: "serbia2005."
});
mysqlCon.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

easyvk({
  password: "Op.cont.2020!",
  username: "89603982199",
  utils: {
    longpoll: true
  }
}).then(vk => {
  const xhr = new XMLHttpRequest();

  const lpSettings = {
    forGetLongPollServer: {},
    forLongPollServer: {}
  }

  var LastTimeStamp = Date.now() / 1000;
  var LastTimeStamp2 = Date.now() / 1000;
  console.log('[V] Подключено!');

  vk.longpoll.connect(lpSettings).then((lpcon) => {
    lpcon.on("message", (msg) => {
      msgTest(msg);
    });
  })

  function msgTest(data) {
    let type;
    if (data[3] - 2000000000 > 0) type = true;
    else type = false;
    let attachments = data[6];
    let vkid;
    if ((type == true) && (attachments['from'] !== undefined)) vkid = attachments['from'];
    else vkid = data[3];

    mysqlCon.query("SELECT * FROM willow_tab WHERE vkid = " + vkid,
      function (err, results) {
        if (err) console.log(err);
        else {
          if (results.length == 0) userAdd(vkid);
          else msgResearch([type, vkid, data[2], data[3], data[4], data[5], attachments, results[0]['reputation']]);
        }
      }
    );
  }

  function msgResearch(data) {
    let type = data[0];
    let vkid = data[1];
    let flag = data[2];
    let peer = data[3];
    let time = data[4];
    let text = data[5].toLowerCase();
    let attachments = data[6];
    let reputation = data[7];
    console.log(reputation);

    
    if ((text.charAt(0) == 'Т') && (text.charAt(1) == 'К')) {
      if ((text.length > 2) && (text.match(/\d+/) > 0)) RusStrGet([text, peer]);
      else MsgSend(['Использование команды "ТК" (Русские буквы): \n ТК <номер страницы> \n Возвращает переведённую страницу в виде картинки', peer]);
    }
    if ((text.charAt(0) == 'T') && (text.charAt(1) == 'K')) {
      if ((text.length > 2) && (text.match(/\d+/) > 0)) EngStrGet([text, peer]);
      else MsgSend(['Использование команды "ТК" (Английские буквы): \n ТК <номер страницы> \n Возвращает оригинал страницы в виде картинки', peer]);
    }

    // СРЕДНЯЯ РЕПУТАЦИЯ -25 до 25
    if ((reputation < 25) && (reputation > -25)) {

      // Сообщение в БЕСЕДЕ
      if (type == true) {

        if ((text.indexOf('@all') > -1) || (text.indexOf('@online') > -1)) MsgSend(['Что за сбор?', peer]);
        
      }
  
      // Сообщение в ЛС
      if (type == false) {
  
        if ((text.indexOf('киска') > -1) || (text.indexOf('киса') > -1)) { MsgSend([mesArr21[getRandomInt(4)], peer]); repDown([vkid, 5]); }
        if ((text.indexOf('привет') > -1) || (text.indexOf('здраст') > -1) || (text.indexOf('здравст') > -1) || (text.indexOf('хэй') > -1) || (text.indexOf('хай') > -1)) MsgSend([mesArr4[getRandomInt(4)], peer]);
        if ((text.indexOf('как дела') > -1) || (text.indexOf('как самочувствие') > -1) || (text.indexOf('как жизнь') > -1)) InfoSend(peer);
        if ((text.indexOf('давай дружить') > -1) || (text.indexOf('будь моим другом') > -1)) { MsgSend([mesArr22[getRandomInt(3)], peer]); repUp(vkid); }
  
      }
  
      // Универсальные
      if ((text.split(' ')[0] == 'willow') || (text.split(' ')[0] == 'виллоу')) {
        if ((text.split(' ')[1] == undefined) || (text.split(' ')[1] == 'wisp')) MsgSend([mesArr3[getRandomInt(4)], peer]);
        if ((text.indexOf('киска') > -1) || (text.indexOf('киса') > -1)) { MsgSend([mesArr21[getRandomInt(4)], peer]); repDown([vkid, 5]); }
        if ((text.indexOf('привет') > -1) || (text.indexOf('здраст') > -1) || (text.indexOf('здравст') > -1) || (text.indexOf('хэй') > -1) || (text.indexOf('хай') > -1)) MsgSend([mesArr4[getRandomInt(4)], peer]);
        if ((text.indexOf('как дела') > -1) || (text.indexOf('как самочувствие') > -1) || (text.indexOf('как жизнь') > -1)) InfoSend(peer);
      }
      if ((text.indexOf('сладких снов') > -1) || (text.indexOf('добрых снов') > -1) || (text.indexOf('спокойной ночи') > -1)) { MsgSend([mesArr5[getRandomInt(3)], peer]); repUp(parseInt(text.match(/\d+/))); }
      if ((text.indexOf('доброе утро') > -1) || (text.indexOf('утрец') > -1)) { MsgSend([mesArr6[getRandomInt(4)], peer]); repUp(parseInt(text.match(/\d+/))); }
      if ((text.indexOf('добрый вечер') > -1) || (text.indexOf('вечер добрый') > -1)) { MsgSend([mesArr23[getRandomInt(3)], peer]); repUp(parseInt(text.match(/\d+/))); }
  
      if (vkid == '-174105461') {
        if ((text.indexOf('погладил [' + userID) > -1) || (text.indexOf('погладила [' + userID) > -1)) { MsgSend([mesArr7[getRandomInt(4)], peer]); repUp(parseInt(text.match(/\d+/))); }
        if ((text.indexOf('обнял [' + userID) > -1) || (text.indexOf('обняла [' + userID) > -1)) { MsgSend([mesArr8[getRandomInt(3)], peer]); repUp(parseInt(text.match(/\d+/))); }
        if ((text.indexOf('поцеловал [' + userID) > -1) || (text.indexOf('поцеловала [' + userID) > -1)) { MsgSend([mesArr9[getRandomInt(2)], peer]); repUp(parseInt(text.match(/\d+/))); }
        if ((text.indexOf('похвалил [' + userID) > -1) || (text.indexOf('похвалила [' + userID) > -1)) { MsgSend([mesArr10[getRandomInt(2)], peer]); repUp(parseInt(text.match(/\d+/))); }
        if ((text.indexOf('пнул [' + userID) > -1) || (text.indexOf('пнула [' + userID) > -1)) { MsgSend([mesArr11[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 5]); }
        if ((text.indexOf('сжёг [' + userID) > -1) || (text.indexOf('сожгла [' + userID) > -1)) { MsgSend([mesArr12[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('убил [' + userID) > -1) || (text.indexOf('убила [' + userID) > -1)) { MsgSend([mesArr13[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('лизнул [' + userID) > -1) || (text.indexOf('лизнула [' + userID) > -1)) MsgSend([mesArr14[getRandomInt(3)], peer]);
        if ((text.indexOf('взорвал [' + userID) > -1) || (text.indexOf('взорвала [' + userID) > -1)) { MsgSend([mesArr15[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('связал [' + userID) > -1) || (text.indexOf('связала [' + userID) > -1)) { MsgSend([mesArr16[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 2]); }
        if ((text.indexOf('ударил [' + userID) > -1) || (text.indexOf('ударила [' + userID) > -1)) { MsgSend([mesArr17[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('шлёпнул [' + userID) > -1) || (text.indexOf('шлёпнула [' + userID) > -1)) { MsgSend([mesArr18[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('кусьнул [' + userID) > -1) || (text.indexOf('укусил [' + userID) > -1) || (text.indexOf('кусьнула [' + userID) > -1) || (text.indexOf('укусила [' + userID) > -1)) { MsgSend([mesArr19[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if (text.indexOf('интиму [' + userID) > -1) { MsgSend([mesArr20[getRandomInt(4)], peer]); repDown([parseInt(text.match(/\d+/)), 5]); }
        if ((text.indexOf('дал пять [' + userID) > -1) || (text.indexOf('дала пять [' + userID) > -1)) {
          MsgSend(['Дать пять @id' + parseInt(text.match(/\d+/)), peer]);
          repUp(parseInt(text.match(/\d+/)));
        }
        if ((text.indexOf('пожал руку [' + userID) > -1) || (text.indexOf('пожала руку [' + userID) > -1)) {
          MsgSend(['Пожать руку @id' + parseInt(text.match(/\d+/)), peer]);
          repUp(parseInt(text.match(/\d+/)));
        }
      }
    }

    // ПЛОХАЯ РЕПУТАЦИЯ ниже -25
    if (reputation < -25) {

      // Сообщение в БЕСЕДЕ
      if (type == true) {

        if ((text.indexOf('@all') > -1) || (text.indexOf('@online') > -1)) MsgSend(['Что за сбор?', peer]);
        
      }
  
      // Сообщение в ЛС
      if (type == false) {
  
        if ((text.indexOf('киска') > -1) || (text.indexOf('киса') > -1)) { MsgSend([mesArr21_bad[getRandomInt(3)], peer]); repDown([vkid, 5]); }
        if ((text.indexOf('привет') > -1) || (text.indexOf('здраст') > -1) || (text.indexOf('здравст') > -1) || (text.indexOf('хэй') > -1) || (text.indexOf('хай') > -1)) MsgSend([mesArr4_bad[getRandomInt(4)], peer]);
        if ((text.indexOf('как дела') > -1) || (text.indexOf('как самочувствие') > -1) || (text.indexOf('как жизнь') > -1)) InfoSend(peer);
        if ((text.indexOf('давай дружить') > -1) || (text.indexOf('будь моим другом') > -1)) { MsgSend([mesArr22_bad[getRandomInt(3)], peer]); repUp(vkid); }
        if ((text.indexOf('прости') > -1) || (text.indexOf('прошу прощения') > -1)) { MsgSend(['Предположим прощаю', peer]); repUp(vkid); }
  
      }
  
      // Универсальные
      if ((text.split(' ')[0] == 'willow') || (text.split(' ')[0] == 'виллоу')) {
        if ((text.split(' ')[1] == undefined) || (text.split(' ')[1] == 'wisp')) MsgSend([mesArr3_bad[getRandomInt(3)], peer]);
        if ((text.indexOf('киска') > -1) || (text.indexOf('киса') > -1)) { MsgSend([mesArr21_bad[getRandomInt(3)], peer]); repDown([vkid, 5]); }
        if ((text.indexOf('привет') > -1) || (text.indexOf('здраст') > -1) || (text.indexOf('здравст') > -1) || (text.indexOf('хэй') > -1) || (text.indexOf('хай') > -1)) MsgSend([mesArr4_bad[getRandomInt(4)], peer]);
        if ((text.indexOf('как дела') > -1) || (text.indexOf('как самочувствие') > -1) || (text.indexOf('как жизнь') > -1)) InfoSend(peer);
      }
      if ((text.indexOf('сладких снов') > -1) || (text.indexOf('добрых снов') > -1) || (text.indexOf('спокойной ночи') > -1)) { MsgSend([mesArr5_bad[getRandomInt(2)], peer]); repUp(parseInt(text.match(/\d+/))); }
      if ((text.indexOf('доброе утро') > -1) || (text.indexOf('утрец') > -1)) { MsgSend([mesArr6_bad[getRandomInt(2)], peer]); repUp(parseInt(text.match(/\d+/))); }
      if ((text.indexOf('добрый вечер') > -1) || (text.indexOf('вечер добрый') > -1)) { MsgSend([mesArr23_bad[getRandomInt(2)], peer]); repUp(parseInt(text.match(/\d+/))); }
  
      if (vkid == '-174105461') {
        if ((text.indexOf('погладил [' + userID) > -1) || (text.indexOf('погладила [' + userID) > -1)) { MsgSend([mesArr7_bad[getRandomInt(2)], peer]); repUp(parseInt(text.match(/\d+/))); }
        if ((text.indexOf('обнял [' + userID) > -1) || (text.indexOf('обняла [' + userID) > -1)) { MsgSend([mesArr8_bad[getRandomInt(3)], peer]); repUp(parseInt(text.match(/\d+/))); }
        if ((text.indexOf('поцеловал [' + userID) > -1) || (text.indexOf('поцеловала [' + userID) > -1)) { MsgSend([mesArr9_bad[getRandomInt(2)], peer]); repUp(parseInt(text.match(/\d+/))); }
        if ((text.indexOf('похвалил [' + userID) > -1) || (text.indexOf('похвалила [' + userID) > -1)) { MsgSend([mesArr10_bad[getRandomInt(2)], peer]); repUp(parseInt(text.match(/\d+/))); }
        if ((text.indexOf('пнул [' + userID) > -1) || (text.indexOf('пнула [' + userID) > -1)) { MsgSend([mesArr11_bad[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 5]); }
        if ((text.indexOf('сжёг [' + userID) > -1) || (text.indexOf('сожгла [' + userID) > -1)) { MsgSend([mesArr12_bad[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('убил [' + userID) > -1) || (text.indexOf('убила [' + userID) > -1)) { MsgSend([mesArr13_bad[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('лизнул [' + userID) > -1) || (text.indexOf('лизнула [' + userID) > -1)) MsgSend([mesArr14_bad[getRandomInt(3)], peer]);
        if ((text.indexOf('взорвал [' + userID) > -1) || (text.indexOf('взорвала [' + userID) > -1)) { MsgSend([mesArr15_bad[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('связал [' + userID) > -1) || (text.indexOf('связала [' + userID) > -1)) { MsgSend([mesArr16_bad[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 2]); }
        if ((text.indexOf('ударил [' + userID) > -1) || (text.indexOf('ударила [' + userID) > -1)) {
          let tmp = mesArr17_bad[getRandomInt(2)];
          if (tmp == 'Сама себя не защитишь - никто не защитит') {
            MsgSend(['Ударить @id' + match(/\d+/) + '\n' + tmp, peer]);
            repDown([parseInt(text.match(/\d+/)), 1]);
          } else {
            MsgSend([tmp, peer]);
            repDown([parseInt(text.match(/\d+/)), 1]);
          }
        }
        if ((text.indexOf('шлёпнул [' + userID) > -1) || (text.indexOf('шлёпнула [' + userID) > -1)) { MsgSend([mesArr18_bad[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('кусьнул [' + userID) > -1) || (text.indexOf('укусил [' + userID) > -1) || (text.indexOf('кусьнула [' + userID) > -1) || (text.indexOf('укусила [' + userID) > -1)) {
          let tmp = mesArr19_bad[getRandomInt(2)];
          if (tmp == 'Ну ты сам напросился!') {
            MsgSend(['Укусить @id' + match(/\d+/) + '\n' + tmp, peer]);
            repDown([parseInt(text.match(/\d+/)), 1]);
          } else {
            MsgSend([tmp, peer]);
            repDown([parseInt(text.match(/\d+/)), 1]);
          }
        }
        if (text.indexOf('интиму [' + userID) > -1) { MsgSend([mesArr20_bad[getRandomInt(4)], peer]); repDown([parseInt(text.match(/\d+/)), 10]); }
      }
    }

    // ОТЛИЧНАЯ РЕПУТАЦИЯ более 25
    if (reputation > 25) {

      // Сообщение в БЕСЕДЕ
      if (type == true) {

        if ((text.indexOf('@all') > -1) || (text.indexOf('@online') > -1)) MsgSend(['Зачем всех собрал?', peer]);
        
      }
  
      // Сообщение в ЛС
      if (type == false) {
  
        if ((text.indexOf('киска') > -1) || (text.indexOf('киса') > -1)) { MsgSend([mesArr21_good[getRandomInt(4)], peer]); repDown([vkid, 2]); }
        if ((text.indexOf('привет') > -1) || (text.indexOf('здраст') > -1) || (text.indexOf('здравст') > -1) || (text.indexOf('хэй') > -1) || (text.indexOf('хай') > -1)) MsgSend([mesArr4_good[getRandomInt(4)], peer]);
        if ((text.indexOf('как дела') > -1) || (text.indexOf('как самочувствие') > -1) || (text.indexOf('как жизнь') > -1)) InfoSend(peer);
        if ((text.indexOf('давай дружить') > -1) || (text.indexOf('будь моим другом') > -1)) MsgSend([mesArr22_good[getRandomInt(3)], peer]);
  
      }
  
      // Универсальные
      if ((text.split(' ')[0] == 'willow') || (text.split(' ')[0] == 'виллоу')) {
        if ((text.split(' ')[1] == undefined) || (text.split(' ')[1] == 'wisp')) MsgSend([mesArr3_good[getRandomInt(4)], peer]);
        if ((text.indexOf('киска') > -1) || (text.indexOf('киса') > -1)) { MsgSend([mesArr21_good[getRandomInt(4)], peer]); repDown([vkid, 2]); }
        if ((text.indexOf('привет') > -1) || (text.indexOf('здраст') > -1) || (text.indexOf('здравст') > -1) || (text.indexOf('хэй') > -1) || (text.indexOf('хай') > -1)) MsgSend([mesArr4_good[getRandomInt(4)], peer]);
        if ((text.indexOf('как дела') > -1) || (text.indexOf('как самочувствие') > -1) || (text.indexOf('как жизнь') > -1)) InfoSend(peer);
      }
      if ((text.indexOf('сладких снов') > -1) || (text.indexOf('добрых снов') > -1) || (text.indexOf('спокойной ночи') > -1)) MsgSend([mesArr5_good[getRandomInt(3)], peer]);
      if ((text.indexOf('доброе утро') > -1) || (text.indexOf('утрец') > -1)) {
        let tmp = mesArr6_good[getRandomInt(4)];
        if (tmp == 'Пожать руку') {
          MsgSend([tmp + ' @id' + match(/\d+/), peer]);
          repUp([parseInt(text.match(/\d+/)), 1]);
        } else {
          MsgSend([tmp, peer]);
          repUp([parseInt(text.match(/\d+/)), 1]);
        }
      }
      if ((text.indexOf('добрый вечер') > -1) || (text.indexOf('вечер добрый') > -1)) { MsgSend([mesArr23_good[getRandomInt(3)], peer]); repUp(parseInt(text.match(/\d+/))); }
  
      if (vkid == '-174105461') {
        if ((text.indexOf('погладил [' + userID) > -1) || (text.indexOf('погладила [' + userID) > -1)) {
          let tmp = mesArr7_good[getRandomInt(4)];
          if (tmp == 'Обнять') {
            MsgSend([tmp + ' @id' + match(/\d+/), peer]);
            repUp([parseInt(text.match(/\d+/)), 2]);
          } else {
            MsgSend([tmp, peer]);
            repUp([parseInt(text.match(/\d+/)), 2]);
          }
        }
        if ((text.indexOf('обнял [' + userID) > -1) || (text.indexOf('обняла [' + userID) > -1)) {
          let tmp = mesArr8_good[getRandomInt(3)];
          if (tmp == 'Поцеловать') {
            MsgSend([tmp + ' @id' + match(/\d+/), peer]);
            repUp([parseInt(text.match(/\d+/)), 2]);
          } else {
            MsgSend([tmp, peer]);
            repUp([parseInt(text.match(/\d+/)), 2]);
          }
        }
        if ((text.indexOf('поцеловал [' + userID) > -1) || (text.indexOf('поцеловала [' + userID) > -1)) { MsgSend([mesArr9_good[getRandomInt(3)], peer]); repUp(parseInt(text.match(/\d+/))); }
        if ((text.indexOf('похвалил [' + userID) > -1) || (text.indexOf('похвалила [' + userID) > -1)) { MsgSend([mesArr10_good[getRandomInt(2)], peer]); repUp(parseInt(text.match(/\d+/))); }
        if ((text.indexOf('пнул [' + userID) > -1) || (text.indexOf('пнула [' + userID) > -1)) { MsgSend([mesArr11_good[getRandomInt(3)], peer]); repDown([parseInt(text.match(/\d+/)), 5]); }
        if ((text.indexOf('сжёг [' + userID) > -1) || (text.indexOf('сожгла [' + userID) > -1)) { MsgSend([mesArr12_good[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('убил [' + userID) > -1) || (text.indexOf('убила [' + userID) > -1)) { MsgSend([mesArr13_good[getRandomInt(2)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('лизнул [' + userID) > -1) || (text.indexOf('лизнула [' + userID) > -1)) MsgSend([mesArr14_good[getRandomInt(3)], peer]);
        if ((text.indexOf('взорвал [' + userID) > -1) || (text.indexOf('взорвала [' + userID) > -1)) { MsgSend([mesArr15_good[getRandomInt(3)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('связал [' + userID) > -1) || (text.indexOf('связала [' + userID) > -1)) { MsgSend([mesArr16_good[getRandomInt(3)], peer]); repDown([parseInt(text.match(/\d+/)), 2]); }
        if ((text.indexOf('ударил [' + userID) > -1) || (text.indexOf('ударила [' + userID) > -1)) { MsgSend([mesArr17_good[getRandomInt(3)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('шлёпнул [' + userID) > -1) || (text.indexOf('шлёпнула [' + userID) > -1)) { MsgSend([mesArr18_good[getRandomInt(3)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if ((text.indexOf('кусьнул [' + userID) > -1) || (text.indexOf('укусил [' + userID) > -1) || (text.indexOf('кусьнула [' + userID) > -1) || (text.indexOf('укусила [' + userID) > -1)) { MsgSend([mesArr19_good[getRandomInt(3)], peer]); repDown([parseInt(text.match(/\d+/)), 1]); }
        if (text.indexOf('интиму [' + userID) > -1) { MsgSend([mesArr20_good[getRandomInt(4)], peer]); repDown([parseInt(text.match(/\d+/)), 10]); }
        if ((text.indexOf('дал пять [' + userID) > -1) || (text.indexOf('дала пять [' + userID) > -1)) {
          MsgSend(['Дать пять @id' + parseInt(text.match(/\d+/)), peer]);
          repUp(parseInt(text.match(/\d+/)));
        }
        if ((text.indexOf('пожал руку [' + userID) > -1) || (text.indexOf('пожала руку [' + userID) > -1)) {
          MsgSend(['Пожать руку @id' + parseInt(text.match(/\d+/)), peer]);
          repUp(parseInt(text.match(/\d+/)));
        }
      }
    }
  }

  function MsgSend(data) {
    let message = data[0];
    let peer = data[1];
    let attachment = data[2];

    vk.call('messages.send', {
      message: message,
      peer_id: peer,
      random_id: easyvk.randomId(),
      attachment: attachment,
    }).catch(error => {
      console.log('[X] Не удаётся отправить ответ сообщение, ошибка!');
      console.log(error);
    });
  }

  function InfoSend(data) {
    let peer = data;
    let commandResult = childProcess.execSync('sensors').toString();
    MsgSend([commandResult, peer]);
  }

  function userAdd(data) {
    let vkid = data;
    let tmp = [vkid, 0];
    mysqlCon.query("INSERT INTO willow_tab(vkid, reputation) VALUES(?, ?)", tmp, function (err, results) {
      if (err) console.log(err);
      else console.log("Данные добавлены");
    });
  }

  function repDown(data) {
    let vkid = data[0];
    let reputation = data[1];
    let tmp = "UPDATE willow_tab SET reputation = reputation - " + reputation + " WHERE vkid = " + vkid;

    mysqlCon.query("SELECT *, UNIX_TIMESTAMP(lastact) as `unixtime` FROM willow_tab WHERE vkid = " + vkid,
      function (err, results) {
        if (err) console.log(err);
        else {
          if (results.length > 0) {

            let lastact = results[0]['timestamp'];
            mysqlCon.query(tmp, function (err, results) {
              if (err) console.log(err);
              else console.log("Репутация " + vkid + " изменена");
            });

          } else {
            console.log("[X] Бд вернула пустой результат!");
          }
        }
      }
    );
  }

  function repUp(data) {
    let vkid = data;
    let now = + new Date() / 1000 | 0;
    let tmp = "UPDATE willow_tab SET reputation = reputation + 1, lastact = now() WHERE vkid = " + vkid;

    mysqlCon.query("SELECT *, UNIX_TIMESTAMP(lastact) as `unixtime` FROM willow_tab WHERE vkid = " + vkid,
      function (err, results) {
        if (err) console.log(err);
        else {
          if (results.length > 0) {

            let lastact = results[0]['unixtime'];
            if ((lastact + 600 < now) || (lastact == null)) {
              mysqlCon.query(tmp, function (err, results) {
                if (err) console.log(err);
                else console.log("Репутация " + vkid + " изменена");
              });
            } else console.log('С последнего изменения репутации ещё не прошло 10 мин');

          } else {
            console.log("[X] Бд вернула пустой результат!");
          }
        }
      }
    );
  }

  function EngStrGet(data) {
    let text = data[0];
    let peer = data[1];
    let pageNum = text.match(/\d+/);

    console.log(pageNum[0]);

    xhr.open('GET', 'http://twokinds.keenspot.com/comic/' + pageNum);
    xhr.send();
    xhr.onload = function () {
      if (xhr.status != 200) {
        console.log(`Ошибка сервера ${xhr.status}: ${xhr.statusText}`);
        MsgSend(['Страница не существует или Keenspot временно недоступен', peer]);
      } else {
        let $ = cheerio.load(xhr.responseText);
        let imgSrc = $('img[alt="Comic Page"]').attr('src');
        console.log(imgSrc);

        return vk.uploader.getUploadURL('photos.getMessagesUploadServer').then(async (upload_url) => {
          let fileData = await vk.uploader.uploadFetchedFile(upload_url, imgSrc, 'photo', {});
          fileData = await vk.post('photos.saveMessagesPhoto', fileData);
          fileData = fileData[0];
          let attachment = [`photo${fileData.owner_id}_${fileData.id}_${fileData.access_key}`];
          MsgSend(['Страница № ' + pageNum, peer, attachment]);
        });
      }
    };
  }

  function RusStrGet(data) {
    let text = data[0];
    let peer = data[1];
    let pageNum = text.match(/\d+/);

    console.log(pageNum[0]);

    xhr.open('GET', 'https://acomics.ru/~TwoKinds/' + pageNum);
    xhr.send();
    xhr.onload = function () {
      if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        console.log(`Ошибка сервера ${xhr.status}: ${xhr.statusText}`);
        MsgSend(['Страница не существует или acomics временно недоступен', peer]);
      } else {
        let $ = cheerio.load(xhr.responseText);
        let imgSrc = 'https://acomics.ru' + $('#mainImage').attr('src');
        console.log(imgSrc);

        return vk.uploader.getUploadURL('photos.getMessagesUploadServer').then(async (upload_url) => {
          let fileData = await vk.uploader.uploadFetchedFile(upload_url, imgSrc, 'photo', {});
          fileData = await vk.post('photos.saveMessagesPhoto', fileData);
          fileData = fileData[0];
          let attachment = [`photo${fileData.owner_id}_${fileData.id}_${fileData.access_key}`];
          MsgSend(['Страница № ' + pageNum, peer, attachment]);
        });
      }
    };
  }

  function postTest() {
    vk.call('wall.get', {
      owner_id: groupForCheck,
      count: 2,
      extended: 0,
      access_token: appToken
    }).then( async (vkr) => {

      for (let i = 0; i < 2; i++) {

        if (vkr['response']['items'][i]['date'] > Math.trunc(LastTimeStamp)) {

          let messageTxt;
          if (vkr['response']['items'][i]['text'].codePointAt(0) == 91) {
            messageTxt = mesArr2[getRandomInt(3)];
          } else {
            messageTxt = mesArr[getRandomInt(3)];
          }
          MsgSend([messageTxt, peerId, 'wall' + groupForCheck + '_' + vkr['response']['items'][i]['id']]);
        }
      }
      LastTimeStamp = Date.now() / 1000;

    }).catch(error => {
      console.log('[X] Не удаётся опросить вк, ошибка!');
      console.log(error);
    });
  }
  setInterval(postTest, 18000);

  function memeTest() {
    vk.call('photos.get', {
      owner_id: groupForCheck,
      count: 10,
      album_id: albumID,
      rev: 1,
      access_token: appToken
    }).then( async (vkr) => {

      for (let i = 0; i < 10; i++) {

        if (vkr['response']['items'][i]['date'] > Math.trunc(LastTimeStamp2)) {

          messageTxt = 'Новый мем из предложки \n' + vkr['response']['items'][i]['text'];
          MsgSend([messageTxt, peerId, 'photo' + groupForCheck + '_' + vkr['response']['items'][i]['id']]);

        }
      }
      LastTimeStamp2 = Date.now() / 1000;

    }).catch(error => {
      console.log('[X] Не удаётся опросить вк, ошибка!');
      console.log(error);
    });
  }
  setInterval(memeTest, 18000);

  onlineMark();
  function onlineMark () {
    vk.call('account.setOnline').catch(error => {
      console.log('[X] Не удаётся отправить статус, ошибка!');
      console.log(error);
    });
  }
  setInterval(onlineMark, 240000);

})