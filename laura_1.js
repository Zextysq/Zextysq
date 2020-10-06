const easyvk = require('easyvk');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const cheerio = require('cheerio');
const childProcess = require('child_process');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const groupForCheck = '-24039608';
const appToken = '98dad81f98dad81f98dad81f8498a9bba4998da98dad81fc7f542457a8c9067298f8f43';
const peerId = '2000000004';

const mesArr = ['Тут новый пост в группе!', 'Хей, тут новый пост в группе!', 'Ловите новый пост в группе!'];
const mesArr2 = ['Ловите новую страничку, ня!', 'Пс, тут новая страничка вышла!', 'Пора читать новую страничку!'];
const mesArr3 = ['А?', 'Я тут', 'На минуту отошла, а вы уже потеряли!?', 'Что хотели?'];
const mesArr4 = ['Приветик!', '*Пожала руку своей лапкой*', 'Хаюшки!', 'Рада тебя видеть!'];
const mesArr5 = ['Слaдких снов!', 'Спoкойной нoчки :3', 'Спи сладкo, ня!'];
const mesArr6 = ['Доброе утро чатик :3', 'Утреца!', 'Доброе утро!', 'Желаю хорошего дня!'];

// РП
const mesArr7 = ['Приятно...', '*Краснеет*', 'Ня :3', 'Приятно... Давай ещё)'];
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

easyvk({
  password: "Op.cont.2020!",
  username: "89082687193",
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
  console.log('[V] Подключено!');

  vk.longpoll.connect(lpSettings).then((lpcon) => {
    lpcon.on("message", (msg) => {
      msgTest(msg);
    });
  })

  function msgTest(data) {
    console.log(data);
    let type;
    if (data[3]-2000000000 > 0) type = true;
    else type = false;
  
    let flag = data[2];
    let peer = data[3];
    let time = data[4];
    let text = data[5];
    let attachments = data[6];

    // Сообщение в беседе
    if (type == true) {

      if ((text.toLowerCase().indexOf('@all') > -1) || (text.toLowerCase().indexOf('@online') > -1)) MsgSend(['Что за сбор?', peer]);
      
    }

    // Сообщение в ЛС
    else if (type == false) {

      if (((text.toLowerCase().indexOf('привет') > -1) || (text.toLowerCase().indexOf('здраст') > -1) || (text.toLowerCase().indexOf('здравст') > -1) || (text.toLowerCase().indexOf('хэй') > -1) || (text.toLowerCase().indexOf('хай') > -1)) && (text.indexOf('Приветик!') < 0)) MsgSend([mesArr4[getRandomInt(4)], peer]);
      else if ((text.toLowerCase().indexOf('как дела') > -1) || (text.toLowerCase().indexOf('как самочувствие') > -1) || (text.toLowerCase().indexOf('как жизнь') > -1)) InfoSend(peer);

    }

    // Универсальные

    if ((text.split(' ')[0].toLowerCase() == 'laura') || (text.split(' ')[0].toLowerCase() == 'лаура')) {
      if (text.split(' ')[1] == undefined) MsgSend([mesArr3[getRandomInt(4)], peer]);
      else if (((text.toLowerCase().indexOf('привет') > -1) || (text.toLowerCase().indexOf('здраст') > -1) || (text.toLowerCase().indexOf('здравст') > -1) || (text.toLowerCase().indexOf('хэй') > -1) || (text.toLowerCase().indexOf('хай') > -1)) && (text.indexOf('Приветик!') < 0)) MsgSend([mesArr4[getRandomInt(4)], peer]);
      else if ((text.toLowerCase().indexOf('как дела') > -1) || (text.toLowerCase().indexOf('как самочувствие') > -1) || (text.toLowerCase().indexOf('как жизнь') > -1)) InfoSend(peer);
    }
    if ((text.charAt(0) == 'Т') && (text.charAt(1) == 'К')) {
      if ((text.length > 2) && (text.match(/\d+/) > 0)) RusStrGet([text, peer]);
      else MsgSend(['Использование команды "ТК" (Русские буквы): \n ТК <номер страницы> \n Возвращает переведённую страницу в виде картинки', peer]);
    }
    if ((text.charAt(0) == 'T') && (text.charAt(1) == 'K')) {
      if ((text.length > 2) && (text.match(/\d+/) > 0)) EngStrGet([text, peer]);
      else MsgSend(['Использование команды "ТК" (Английские буквы): \n ТК <номер страницы> \n Возвращает оригинал страницы в виде картинки', peer]);
    }
    if ((text.toLowerCase().indexOf('сладких снов') > -1) || (text.toLowerCase().indexOf('добрых снов') > -1) || (text.toLowerCase().indexOf('спокойной ночи') > -1)) MsgSend([mesArr5[getRandomInt(3)], peer]);
    if ((text.toLowerCase().indexOf('доброе утро') > -1) || (text.toLowerCase().indexOf('утрец') > -1)) MsgSend([mesArr6[getRandomInt(4)], peer]);

    if (text.indexOf('погладил [id617699718') > -1) MsgSend([mesArr7[getRandomInt(4)], peer]);
    if (text.indexOf('обнял [id617699718') > -1) MsgSend([mesArr8[getRandomInt(3)], peer]);
    if (text.indexOf('поцеловал [id617699718') > -1) MsgSend([mesArr9[getRandomInt(2)], peer]);
    if (text.indexOf('похвалил [id617699718') > -1) MsgSend([mesArr10[getRandomInt(2)], peer]);
    if (text.indexOf('пнул [id617699718') > -1) MsgSend([mesArr11[getRandomInt(2)], peer]);
    if (text.indexOf('сжёг [id617699718') > -1) MsgSend([mesArr12[getRandomInt(2)], peer]);
    if (text.indexOf('убил [id617699718') > -1) MsgSend([mesArr13[getRandomInt(2)], peer]);
    if (text.indexOf('лизнул [id617699718') > -1) MsgSend([mesArr14[getRandomInt(3)], peer]);
    if (text.indexOf('взорвал [id617699718') > -1) MsgSend([mesArr15[getRandomInt(2)], peer]);
    if (text.indexOf('связал [id617699718') > -1) MsgSend([mesArr16[getRandomInt(2)], peer]);
    if (text.indexOf('ударил [id617699718') > -1) MsgSend([mesArr17[getRandomInt(2)], peer]);
    if (text.indexOf('шлёпнул [id617699718') > -1) MsgSend([mesArr18[getRandomInt(2)], peer]);
    if ((text.indexOf('кусьнул [id617699718') > -1) || (text.indexOf('укусил [id617699718') > -1)) MsgSend([mesArr19[getRandomInt(2)], peer]);
    if (text.indexOf('интиму [id617699718') > -1) MsgSend([mesArr20[getRandomInt(4)], peer]);

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
    let commandResult = childProcess.execSync('sensors').toString().split(' ')[2];
    MsgSend([commandResult, peer]);
  }

  function EngStrGet(data) {
    let text = data[0];
    let peer = data[1];
    let pageNum = text.match(/\d+/);

    console.log(pageNum[0]);

    xhr.open('GET', 'http://twokinds.keenspot.com/comic/'+pageNum);
    xhr.send();
    xhr.onload = function() {
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
          let attachment = [ `photo${fileData.owner_id}_${fileData.id}_${fileData.access_key}` ];
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

    xhr.open('GET', 'https://acomics.ru/~TwoKinds/'+pageNum);
    xhr.send();
    xhr.onload = function() {
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
          let attachment = [ `photo${fileData.owner_id}_${fileData.id}_${fileData.access_key}` ];
          MsgSend(['Страница № ' + pageNum, peer, attachment]);
        });
      }
    };
  }

  function postTest () {
    vk.call('wall.get', {
      owner_id: groupForCheck,
      count: 2,
      extended: 0,
      access_token: appToken
    }).then( async (vkr) => {

      for (let i = 0; i < 2; i++) {

        if (vkr['response']['items'][i]['date']>LastTimeStamp) {

          let messageTxt;
          if (vkr['response']['items'][i]['text'].codePointAt(0) == 91) {
            messageTxt = mesArr2[getRandomInt(3)];
          } else {
            messageTxt = mesArr[getRandomInt(3)];
          }
          MsgSend([messageTxt, peerId, 'wall' + groupForCheck + '_' + vkr['response']['items'][i]['id']]);
        }
      }

    }).catch(error => {
      console.log('[X] Не удаётся опросить вк, ошибка!');
      console.log(error);
      postTest();
    });

    LastTimeStamp = Date.now() / 1000;
  }
  setInterval(postTest, 18000);

})