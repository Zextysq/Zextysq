const easyvk = require('easyvk');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const cheerio = require('cheerio');
const childProcess = require('child_process');

const botGroupToken = '0de3a33959f7e507f03e07adcbd37538e370f8d3677a94ee9dd2855c8a835e061c5886e2d2648996fd7a5';
const appToken = '98dad81f98dad81f98dad81f8498a9bba4998da98dad81fc7f542457a8c9067298f8f43';
const groupForCheck = '-24039608';
const peerId = '2000000002';

const mesArr = ['Новый пост в группе, ня!', 'Хей, тут новый пост в группе!', 'Ловите новый пост в группе!'];
const mesArr2 = ['Ловите новую страничку, ня!', 'Пс, тут новая страничка вышла!', 'Пора читать новую страничку!'];
const mesArr3 = ['Я тут', 'Слежу за новыми постами', 'На связи'];
const mesArr4 = ['Спокойной!', 'Спи сладко :3', 'Спокойной ночи, ня!'];
const mesArr5 = ['Доброе утро чатик :3', 'Утреца!', 'Доброе утро!'];
const mesArr6 = ['Ты хочешь приехать ко мне?', 'Мы не так уж близко знакомы'];
const mesArr7 = ['Привет!', 'Ну здравствуй!', 'Хаюшки!', 'Хай!'];
const mesArr8 = ['Я тебе не киска!', 'Не называй меня так!', 'Хватит!', 'Перестань!'];
const mesArr9 = ['Не ругайтесь)', 'Хватит ругаться', 'Не ссорьтесь!', 'Повежливее!'];
const mesArr10 = ['Ой спасибо!)', '*краснеет*', 'Спасибки :3'];
const mesArr11 = ['А если я?', 'У меня зубы поострее будут', 'Хэй, больно же!'];
const mesArr12 = ['А если я?', 'Ай!', 'Больно же!'];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

easyvk({
  token: botGroupToken,
  reauth: true,
  utils: {
    bots: true,
    uploader: true
  }
}).then(async (vk) => {
  const LPB = vk.bots.longpoll;
  const xhr = new XMLHttpRequest();

  var LastTimeStamp = Date.now() / 1000;
  console.log('[V] Подключен!');

  LPB.connect({
    forGetLongPollServer: {},
    forLongPollServer: {}
  }).then((connection) => {
  
    connection.on('message_new', (msg) => {
      DialogTypeTest([msg['message']['text'], msg['message']['peer_id'], msg['message']['reply_message']]);
    });
  
  });
  
  function DialogTypeTest (data) {
    let text = data[0];
    let peer = data[1];
    let reply = data[2];

    vk.call('messages.getConversationsById', {
      peer_ids: peer
    }).then( async (data) => {
      if (data['items'][0]['peer']['type'] == 'user') MsgTest([text, peer, reply, true]);
      else MsgTest([text, peer, reply, false]);
    });
  }

  function MsgTest (data) {
    let text = data[0];
    let peer = data[1];
    let reply = data[2];
    let type = data[3];

    //Если в лс
    if (type == true) {

      if ((text.toLowerCase() == 'willow') || (text.toLowerCase() == 'willow wisp')) MsgSend([mesArr3[getRandomInt(3)], peer]);
      if (((text.toLowerCase().indexOf('привет') > -1) || (text.toLowerCase().indexOf('здраст') > -1) || (text.toLowerCase().indexOf('здравст') > -1) || (text.toLowerCase().indexOf('хэй') > -1) || (text.toLowerCase().indexOf('хай') > -1)) && (text.toLowerCase().indexOf('киска') == -1)) MsgSend([mesArr7[getRandomInt(4)], peer]);
      if (text.toLowerCase().indexOf('киска') > -1) MsgSend([mesArr8[getRandomInt(4)], peer]);
      if (text.toLowerCase() == 'как дела') InfoSend(peer);

    //Если в беседе
    } else {

      if (text.indexOf('@all') > -1) MsgSend(['Опять вы за своё!? Зачем всех звать?', peer]);
      if (text.split(' ')[0].toLowerCase() == 'willow') {
        if ((text.split(' ')[1] == undefined) || (text.split(' ')[1].toLowerCase() == 'wisp')) MsgSend([mesArr3[getRandomInt(3)], peer]);
        if (((text.toLowerCase().indexOf('привет') > -1) || (text.toLowerCase().indexOf('здраст') > -1) || (text.toLowerCase().indexOf('здравст') > -1) || (text.toLowerCase().indexOf('хэй') > -1) || (text.toLowerCase().indexOf('хай') > -1)) && (text.toLowerCase().indexOf('киска') == -1)) MsgSend([mesArr7[getRandomInt(4)], peer]);
        if (text.toLowerCase().indexOf('киска') > -1) MsgSend([mesArr8[getRandomInt(4)], peer]);
      }
      if((text.toLowerCase().indexOf('иди нахер') > -1) || (text.toLowerCase().indexOf('иди нахрен') > -1) || (text.toLowerCase().indexOf('иди в жопу') > -1) || (text.toLowerCase().indexOf('иди на хуй') > -1) || (text.toLowerCase().indexOf('иди нахуй') > -1)) MsgSend([mesArr9[getRandomInt(4)], peer]);
      if((text.toLowerCase().replace(/ё/g,"е").indexOf('пошел нахер') > -1) || (text.toLowerCase().replace(/ё/g,"е").indexOf('пошел нахрен') > -1) || (text.toLowerCase().replace(/ё/g,"е").indexOf('пошел в жопу') > -1) || (text.toLowerCase().replace(/ё/g,"е").indexOf('пошел на хуй') > -1)) MsgSend([mesArr9[getRandomInt(4)], peer]);

    }
    
    //Универсальные
    if ((text.toLowerCase().indexOf('сладких снов') > -1) || (text.toLowerCase().indexOf('добрых снов') > -1) || (text.toLowerCase().indexOf('спокойной ночи') > -1)) MsgSend([mesArr4[getRandomInt(3)], peer]);
    if ((text.toLowerCase().indexOf('доброе утро') > -1) || (text.toLowerCase().indexOf('утрец') > -1)) MsgSend([mesArr5[getRandomInt(3)], peer]);
    if ((text.toLowerCase().indexOf('колумнуть тебя') > -1) || (text.toLowerCase().indexOf('тебя колумнуть') > -1) || (text.toLowerCase().indexOf('колумну тебя') > -1) || (text.toLowerCase().indexOf('тебя колумну') > -1)) MsgSend([mesArr6[getRandomInt(2)], peer]);

    if ((text.toLowerCase().indexOf('обнять') > -1) || (text.toLowerCase().indexOf('поцеловать') > -1) || (text.toLowerCase().indexOf('похвалить') > -1)) {
      if ((reply !== undefined) && (reply['from_id'] == -197840433)) MsgSend([mesArr10[getRandomInt(3)], peer]);
    }
    if ((text.toLowerCase().indexOf('кусь') > -1) || (text.toLowerCase().indexOf('укусить') > -1)) {
      if ((reply !== undefined) && (reply['from_id'] == -197840433)) MsgSend([mesArr11[getRandomInt(3)], peer]);
    }
    if ((text.toLowerCase().indexOf('стукнуть') > -1) || (text.toLowerCase().indexOf('ударить') > -1) || (text.toLowerCase().indexOf('пнуть') > -1) || (text.toLowerCase().replace(/ё/g,"е").indexOf('шлепнуть') > -1)) {
      if ((reply !== undefined) && (reply['from_id'] == -197840433)) MsgSend([mesArr12[getRandomInt(3)], peer]);
    }

    if ((text.charAt(0) == 'Т') && (text.charAt(1) == 'К')) {
      if ((text.length > 2) && (text.match(/\d+/) > 0)) RusStrGet([text, peer]);
      else MsgSend(['Использование команды "ТК" (Русские буквы): \n ТК <номер страницы> \n Возвращает переведённую страницу в виде картинки', peer]);
    }

    if ((text.charAt(0) == 'T') && (text.charAt(1) == 'K')) {
      if ((text.length > 2) && (text.match(/\d+/) > 0)) EngStrGet([text, peer]);
      else MsgSend(['Использование команды "ТК" (Английские буквы): \n ТК <номер страницы> \n Возвращает оригинал страницы в виде картинки', peer]);
    }
  }

  function MsgSend(data) {
    let message = data[0];
    let peer = data[1];
    let attachment = data[2];

    vk.call('messages.send', {
      message: message, 
      token: botGroupToken,
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
      LastTimeStamp = Date.now() / 1000;

    }).catch(error => {
      console.log('[X] Не удаётся опросить вк, ошибка!');
      console.log(error);
    });
  }
  setInterval(postTest, 18000);

}).catch(error => {
  console.log('[X] Не удаётся подключится к вк, ошибка!');
  console.log(error);
});