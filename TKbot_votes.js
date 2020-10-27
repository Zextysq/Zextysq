const { resolveTxt } = require('dns');
const easyvk = require('easyvk');
const { fstat } = require('fs');
const mysql = require("mysql2");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const peerId = '2000000001';
const userID = 'id618124000';

const admins = [272914196, 176284236];

const mysqlCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "willow_bd",
  password: "Serbia2005."
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

  const lpSettings = {
    forGetLongPollServer: {},
    forLongPollServer: {}
  }

  console.log('[V] Подключено!');

  vk.longpoll.connect(lpSettings).then((lpcon) => {
    lpcon.on("message", (msg) => {
      msgTest(msg);
    });
  })

  function msgTest(data) {
    let flag = data[2];
    let peer = data[3];
    let time = data[4];
    let text = data[5].toLowerCase();
    let attachments = data[6];
    if (data[3] == peerId) {
      let isadmin = false;
      admins.forEach(function(entry) {
        if (attachments['from'] == entry) isadmin = true;
      });

      if (isadmin == true) {
        
        if (text == '!начать') {
          if (attachments['reply'] !== undefined) {
            let tmp = JSON.parse(attachments['reply']);
            vk.call('messages.getByConversationMessageId', {
              peer_id: peerId,
              conversation_message_ids: tmp['conversation_message_id']
            }).then( async (vkr) => {

              if (vkr['response']['items'][0]['attachments']['length'] !== 0) {

                let attachments = vkr['response']['items'][0]['attachments']
                let array_length = attachments['length'];
                let photos_array = [];

                for (let i = 0; i < array_length; i++) {
                  if (attachments[i]['type'] !== 'photo') {
                    MsgSend(['В сообщении присутствуют не только картинки!\nОтправь "!начать" в ответ(reply) на сообщение с артами', peerId]);
                    break;
                  } else {
                    photos_array[i] = attachments[i]['photo']['sizes'][5]['url'];
                  }
                }

                newVote([photos_array, tmp['conversation_message_id']]);

              } else {
                MsgSend(['Отправь "!начать" в ответ(reply) на сообщение с артами', peerId]);
              }
              
            }).catch(error => {
              console.log('[X] Не удаётся отправить ответ сообщение, ошибка!');
              console.log(error);
            });
          } else {
            MsgSend(['Отправь "!начать" в ответ(reply) на сообщение с артами', peerId]);
          }
        }

        if (text == '!закончить') {
          if (attachments['reply'] !== undefined) {
            let tmp = JSON.parse(attachments['reply']);

            mysqlCon.query('UPDATE willow_vote SET status = false WHERE msgid = ' + tmp['conversation_message_id'], function (err, results) {
              if (err) console.log(err);
              else {
                if (results['affectedRows'] == 0) {
                  MsgSend(['Отправь "!закончить" в ответ(reply) на сообщение участника голосования', peerId]);
                } else {
                  MsgSend(['Голосование окончено!\nПодвожу итоги', peerId]);

                  mysqlCon.query('SELECT * FROM willow_vote WHERE msgid = ' + tmp['conversation_message_id'], function (err, results) {
                    if (err) console.log(err);
                    else {
                      for (let i = 0; i < results['length']; i++) {
                        mysqlCon.query('UPDATE willow_vote SET fin_score = ' + results[i]['score'] / results[i]['votes'] + ' WHERE id = ' + results[i]['id'], function (err, results) {
                          if (err) console.log(err);
                        });
                      }
                      mysqlCon.query('SELECT * FROM willow_vote WHERE msgid = ' + tmp['conversation_message_id'] + ' ORDER BY fin_score DESC', function (err, results) {
                        if (err) console.log(err);
                        else {
                          vk.uploader.getUploadURL('photos.getMessagesUploadServer').then(async (upload_url) => {
                            let fileData = await vk.uploader.uploadFetchedFile(upload_url, results[0]['picture'], 'photo', {});
                            fileData = await vk.post('photos.saveMessagesPhoto', fileData);
                            fileData = fileData[0];
                            let attachment = [`photo${fileData.owner_id}_${fileData.id}_${fileData.access_key}`];
                            MsgSend(['И, набрав ' + results[0]['fin_score'] + ' очков, этот арт получает первое место!', peerId, attachment]);
                          });
                        }
                      });
                    }
                  });
                  
                }
              }
            });

          } else {
            MsgSend(['Отправь "!закончить" в ответ(reply) на сообщение участника голосования', peerId]);
          }
        }

      }

      mysqlCon.query('SELECT * FROM willow_vote WHERE status = true', function (err, results) {
        if (err) console.error(err);
        else {
          if (results['length'] !== 0) {
            
            if (attachments['reply'] !== undefined) {

              let reply = JSON.parse(attachments['reply']);
              mysqlCon.query('SELECT * FROM willow_vote WHERE msgid = ' + reply['conversation_message_id'] + ' AND status = true', function (err, results) {
                if (err) console.error(err);
                else {
                  if (results['length'] !== 0) {
                    if (results['length'] == text.split('<br>')['length']) {
                      
                      let tmp = [];
                      for (let i = 0; i < text.split('<br>')['length']; i++) {
                        tmp[text.split('<br>')[i].split('.')[0] -1] = text.split('<br>')[i].split('.')[1];
                      }
                      let iserror = false;
                      for (let i = 0; i < text.split('<br>')['length']; i++) {
                        if (tmp[i] !== undefined) {
                          if ((tmp[i] > 0) && (tmp[i] < 6)) iserror = false;
                          else {
                            iserror = true;
                            break;
                          }
                        } else {
                          iserror = true;
                          break;
                        }
                      }

                      if (iserror == false) {

                        if (results[0]['vkids'] !== null) {
                          results[0]['vkids'].split(',').forEach(element => {
                            if (element == attachments['from']) iserror = true;
                          });
                        }

                        if (iserror == false) {

                          for (let i = 0; i < results['length']; i++) {
                            let sqlquery = 'UPDATE willow_vote SET score = score +' + tmp[i] + ', votes = votes + 1, vkids = "' + results[0]['vkids'] + attachments['from'] + '," WHERE id =' + results[i]['id'];
                            mysqlCon.query(sqlquery, function (err, results) {
                              if (err) console.log(err);
                            });
                          }
                          MsgSend(['Учла!', peerId]);
                        } else MsgSend(['Ты уже голосовал!', peerId]);
                      } else MsgSend(['Неверный формат! Голос не учтён!', peerId]);
                    } else MsgSend(['Нужно указать оценку для каждого арта!', peerId]);
                  }
                }
              });
            }
          }
        }
      });
    }
  }

  function newVote(data) {
    let photos_array = data[0];
    let votemsg = data[1];

    mysqlCon.query('SELECT * FROM willow_vote WHERE msgid = ' + votemsg, function (err, results) {
      if (err) {
        console.error(err);
        MsgSend(['Не могу обратиться к таблице...', peerId]);
      } else {
        if (results['length'] == 0) {
          
          let tmp = 'INSERT INTO willow_vote(picture, day, status, msgid, score, votes, vkids) VALUES'
          for (let i = 0; i < photos_array['length']; i++) {
            tmp += '("' + photos_array[i] + '", NOW(), true, ' + votemsg + ', 0, 0, "")';
            if (i+1 == photos_array['length']) tmp += ';'
            else tmp += ', '
          }

          mysqlCon.query(tmp, function (err, results) {
            if (err) {
              console.error(err);
              MsgSend(['Не могу записать в таблицу...', peerId]);
            }
            else {
              console.log("[V] Новое голосование, данные добавлены");
              MsgSend(['Голосование объявлено открытым!\n\nПрисылайте в ответ на СООБЩЕНИЕ С АРТАМИ цифры от 1 до 5 в формате:\n1.4\n2.5\nИ так далее', peerId]);
            }
          });

        } else {
          MsgSend(['Это сообщение уже учавствовало в голосовании!\nГолосование не создано!', peerId]);
        }
      }
    });
  }

  function MsgSend(data) {
    let message = data[0];
    let peer = data[1];
    let attachment = data[2];

    vk.call('messages.send', {
      message: message,
      peer_id: peer,
      random_id: easyvk.randomId(),
      attachment: attachment
    }).catch(error => {
      console.log('[X] Не удаётся отправить ответ сообщение, ошибка!');
      console.log(error);
    });
  }
})
