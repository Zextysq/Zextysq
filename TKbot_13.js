const easyvk = require('easyvk');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const cheerio = require('cheerio');
const childProcess = require('child_process');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const groupForCheck = '-24039608';
const appToken = '98dad81f98dad81f98dad81f8498a9bba4998da98dad81fc7f542457a8c9067298f8f43';
const peerId = '2000000001';
const userID = 'id618124000'

const mesArr = ['Новый пост в группе, ня!', 'Хей, тут новый пост в группе!', 'Ловите новый пост в группе!'];
const mesArr2 = ['Ловите новую страничку, ня!', 'Пс, тут новая страничка вышла!', 'Пора читать новую страничку!'];
const mesArr3 = ['Я тут', 'Слежу за новыми постами', 'На связи'];
const mesArr4 = ['Привeтик!', '*Пожала руку своей лапкой*', 'Хaюшки!', 'Рада тебя видеть!'];
const mesArr5 = ['Спoкойной!', 'Спи сладко :3', 'Спокoйной ночи, ня!'];
const mesArr6 = ['Дoброе утро чатик :3', 'Утрeца!', 'Дoброе утро!', 'Пожать руку'];

// РП
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
  console.log('[V] Подключено!');

  vk.longpoll.connect(lpSettings).then((lpcon) => {
    lpcon.on("message", (msg) => {
      msgTest(msg);
    });
  })

  function msgTest(data) {
    let type;
    if (data[3]-2000000000 > 0) type = true;
    else type = false;
  
    let flag = data[2];
    let peer = data[3];
    let time = data[4];
    let text = data[5];
    let attachments = data[6];

    if (attachments['from'] !== '618124000') {

      // Сообщение в беседе
      if (type == true) {

        if ((text.toLowerCase().indexOf('@all') > -1) || (text.toLowerCase().indexOf('@online') > -1)) MsgSend(['Что за сбор?', peer]);
        
      }

      // Сообщение в ЛС
      if (type == false) {

        if ((text.toLowerCase().indexOf('киска') > -1) || (text.toLowerCase().indexOf('киса') > -1)) MsgSend([mesArr21[getRandomInt(4)], peer]);
        if (((text.toLowerCase().indexOf('привет') > -1) || (text.toLowerCase().indexOf('здраст') > -1) || (text.toLowerCase().indexOf('здравст') > -1) || (text.toLowerCase().indexOf('хэй') > -1) || (text.toLowerCase().indexOf('хай') > -1)) && (text.indexOf('Приветик!') < 0)) MsgSend([mesArr4[getRandomInt(4)], peer]);
        if ((text.toLowerCase().indexOf('как дела') > -1) || (text.toLowerCase().indexOf('как самочувствие') > -1) || (text.toLowerCase().indexOf('как жизнь') > -1)) InfoSend(peer);

      }

      // Универсальные

      if ((text.split(' ')[0].toLowerCase() == 'willow') || (text.split(' ')[0].toLowerCase() == 'виллоу')) {
        if ((text.split(' ')[1] == undefined) || (text.split(' ')[1].toLowerCase() == 'wisp')) MsgSend([mesArr3[getRandomInt(4)], peer]);
        if ((text.toLowerCase().indexOf('киска') > -1) || (text.toLowerCase().indexOf('киса') > -1)) MsgSend([mesArr21[getRandomInt(4)], peer]);
        if (((text.toLowerCase().indexOf('привет') > -1) || (text.toLowerCase().indexOf('здраст') > -1) || (text.toLowerCase().indexOf('здравст') > -1) || (text.toLowerCase().indexOf('хэй') > -1) || (text.toLowerCase().indexOf('хай') > -1)) && (text.indexOf('Приветик!') < 0)) MsgSend([mesArr4[getRandomInt(4)], peer]);
        if ((text.toLowerCase().indexOf('как дела') > -1) || (text.toLowerCase().indexOf('как самочувствие') > -1) || (text.toLowerCase().indexOf('как жизнь') > -1)) InfoSend(peer);
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

      if (attachments['from'] == '-174105461') {
        if ((text.indexOf('погладил [' + userID) > -1) || (text.indexOf('погладила [' + userID) > -1)) MsgSend([mesArr7[getRandomInt(4)], peer]);
        if ((text.indexOf('обнял [' + userID) > -1) || (text.indexOf('обняла [' + userID) > -1)) MsgSend([mesArr8[getRandomInt(3)], peer]);
        if ((text.indexOf('поцеловал [' + userID) > -1) || (text.indexOf('поцеловала [' + userID) > -1)) MsgSend([mesArr9[getRandomInt(2)], peer]);
        if ((text.indexOf('похвалил [' + userID) > -1) || (text.indexOf('похвалила [' + userID) > -1)) MsgSend([mesArr10[getRandomInt(2)], peer]);
        if ((text.indexOf('пнул [' + userID) > -1) || (text.indexOf('пнула [' + userID) > -1)) MsgSend([mesArr11[getRandomInt(2)], peer]);
        if ((text.indexOf('сжёг [' + userID) > -1) || (text.indexOf('сожгла [' + userID) > -1)) MsgSend([mesArr12[getRandomInt(2)], peer]);
        if ((text.indexOf('убил [' + userID) > -1) || (text.indexOf('убила [' + userID) > -1)) MsgSend([mesArr13[getRandomInt(2)], peer]);
        if ((text.indexOf('лизнул [' + userID) > -1) || (text.indexOf('лизнула [' + userID) > -1)) MsgSend([mesArr14[getRandomInt(3)], peer]);
        if ((text.indexOf('взорвал [' + userID) > -1) || (text.indexOf('взорвала [' + userID) > -1)) MsgSend([mesArr15[getRandomInt(2)], peer]);
        if ((text.indexOf('связал [' + userID) > -1) || (text.indexOf('связала [' + userID) > -1)) MsgSend([mesArr16[getRandomInt(2)], peer]);
        if ((text.indexOf('ударил [' + userID) > -1) || (text.indexOf('ударила [' + userID) > -1)) MsgSend([mesArr17[getRandomInt(2)], peer]);
        if ((text.indexOf('шлёпнул [' + userID) > -1) || (text.indexOf('шлёпнула [' + userID) > -1)) MsgSend([mesArr18[getRandomInt(2)], peer]);
        if ((text.indexOf('кусьнул [' + userID) > -1) || (text.indexOf('укусил [' + userID) > -1) || (text.indexOf('кусьнула [' + userID) > -1) || (text.indexOf('укусила [' + userID) > -1)) MsgSend([mesArr19[getRandomInt(2)], peer]);
        if (text.indexOf('интиму [' + userID) > -1) MsgSend([mesArr20[getRandomInt(4)], peer]);
        if ((text.indexOf('дал пять [' + userID) > -1) || (text.indexOf('дала пять [' + userID) > -1)) {
          MsgSend(['Дать пять @id' + parseInt(text.match(/\d+/)), peer]);
        }
        if ((text.indexOf('пожал руку [' + userID) > -1) || (text.indexOf('пожала руку [' + userID) > -1)) {
          MsgSend(['Пожать руку @id' + parseInt(text.match(/\d+/)), peer]);
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

        if (vkr['response']['items'][i]['date']>Math.trunc(LastTimeStamp)) {

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

})