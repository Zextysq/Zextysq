const easyvk = require("easyvk");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cheerio = require('cheerio');

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
      let msgTxt = msg['message']['text'];
      let msgPeerID = msg['message']['peer_id'];

      if ((msgTxt == 'Willow') || (msgTxt == 'willow') || (msgTxt == 'Willow Wisp') || (msgTxt == 'willow wisp') || (msgTxt == 'Willow wisp') || (msgTxt == 'willow Wisp') || (msgTxt == '[public197762661|@willow_wisp]')) MsgSend([mesArr3[getRandomInt(3)], msgPeerID]);

      if (msgTxt.indexOf('@all') > -1) MsgSend(['Опять вы за своё!? Зачем всех звать?', msgPeerID]);

      if ((msgTxt.charAt(0) == 'Т') && (msgTxt.charAt(1) == 'К')) {
        if ((msgTxt.length > 2) && (msgTxt.match(/\d+/) > 0)) RusStrGet([msgTxt, msgPeerID]);
        else MsgSend(['Использование команды "ТК" (Русские буквы): \n ТК <номер страницы> \n Возвращает переведённую страницу в виде картинки', msgPeerID]);
      }

      if ((msgTxt.charAt(0) == 'T') && (msgTxt.charAt(1) == 'K')) {
        if ((msgTxt.length > 2) && (msgTxt.match(/\d+/) > 0)) EngStrGet([msgTxt, msgPeerID]);
        else MsgSend(['Использование команды "ТК" (Английские буквы): \n ТК <номер страницы> \n Возвращает оригинал страницы в виде картинки', msgPeerID]);
      }
      
      if ((msgTxt.indexOf('Спокойной ночи') > -1) || (msgTxt.indexOf('спокойной ночи') > -1)) MsgSend([mesArr4[getRandomInt(3)], msgPeerID]);

      if ((msgTxt.indexOf('Доброе утро') > -1) || (msgTxt.indexOf('доброе утро') > -1) || (msgTxt.indexOf('Утрец') > -1) || (msgTxt.indexOf('утрец') > -1)) MsgSend([mesArr5[getRandomInt(3)], msgPeerID]);

      if ((msgTxt.indexOf('Колумнуть тебя') > -1) || (msgTxt.indexOf('колумнуть тебя') > -1) || (msgTxt.indexOf('тебя колумнуть') > -1) || (msgTxt.indexOf('Колумну тебя') > -1) || (msgTxt.indexOf('колумну тебя') > -1) || (msgTxt.indexOf('тебя колумну') > -1)) MsgSend([mesArr6[getRandomInt(2)], msgPeerID]);

      if (msgTxt == '0x16') MsgSend(['Да, теперь я живу у Андрюхи! &#127881; &#10024;', peerId]);
    });
  
  });

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

  function EngStrGet(data) {
    let msgTxt = data[0];
    let msgPeerID = data[1];
    let pageNum = msgTxt.match(/\d+/);

    console.log(pageNum[0]);

    xhr.open('GET', 'http://twokinds.keenspot.com/comic/'+pageNum);
    xhr.send();
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log(`Ошибка сервера ${xhr.status}: ${xhr.statusText}`);
        MsgSend(['Страница не существует или Keenspot временно недоступен', msgPeerID]);
      } else {
        let $ = cheerio.load(xhr.responseText);
        let imgSrc = $('img[alt="Comic Page"]').attr('src');
        console.log(imgSrc);

        return vk.uploader.getUploadURL('photos.getMessagesUploadServer').then(async (upload_url) => {
          let fileData = await vk.uploader.uploadFetchedFile(upload_url, imgSrc, 'photo', {});
          fileData = await vk.post('photos.saveMessagesPhoto', fileData);
          fileData = fileData[0];
          let attachment = [ `photo${fileData.owner_id}_${fileData.id}_${fileData.access_key}` ];
          MsgSend(['Страница № ' + pageNum, msgPeerID, attachment]);
        });
      }
    };
  }

  function RusStrGet(data) {
    let msgTxt = data[0];
    let msgPeerID = data[1];
    let pageNum = msgTxt.match(/\d+/);

    console.log(pageNum[0]);

    xhr.open('GET', 'https://acomics.ru/~TwoKinds/'+pageNum);
    xhr.send();
    xhr.onload = function() {
      if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        console.log(`Ошибка сервера ${xhr.status}: ${xhr.statusText}`);
        MsgSend(['Страница не существует или acomics временно недоступен', msgPeerID]);
      } else {
        let $ = cheerio.load(xhr.responseText);
        let imgSrc = 'https://acomics.ru' + $('#mainImage').attr('src');
        console.log(imgSrc);

        return vk.uploader.getUploadURL('photos.getMessagesUploadServer').then(async (upload_url) => {
          let fileData = await vk.uploader.uploadFetchedFile(upload_url, imgSrc, 'photo', {});
          fileData = await vk.post('photos.saveMessagesPhoto', fileData);
          fileData = fileData[0];
          let attachment = [ `photo${fileData.owner_id}_${fileData.id}_${fileData.access_key}` ];
          MsgSend(['Страница № ' + pageNum, msgPeerID, attachment]);
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