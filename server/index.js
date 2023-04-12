const fs = require('fs');
const http = require('http')
const https = require('https');

// URL-адрес MP3-файла для загрузки
const mp3Url = 'https://dl2.mp3party.net/online/10186650.mp3';

// Файловый путь для сохранения MP3-файла на диск
const mp3Path = './audio.mp3';

// Определяем протокол для использования модуля http или https
const protocol = mp3Url.startsWith('https') ? https : http;

// Создаем новый запрос
protocol.get(mp3Url,(res) => {
  // Создаем новый файл на диск и сохраняем в него содержимое MP3-файла
  const fileStream = fs.createWriteStream(mp3Path);
  res.pipe(fileStream);
  fileStream.on('finish',() => {
    // Когда файл сохранен, читаем его содержимое и преобразуем в текстовый формат
    const bytes = fs.readFileSync(mp3Path);
    const text = bytes.toString('utf8');
  });
});

// Вариант 1
// const base64String = 'Jax_02.14_-_Дурак_2WNOL0p.txt';
// const buffer = Buffer.from(base64String,'base64');

// console.log(buffer)

// const headerSize = 10; // Размер заголовка MP3
// const fileSize = headerSize + buffer.length; // Размер всего файла

// const header = Buffer.alloc(headerSize);
// header.write('ID3',0); // ID3
// header.writeUInt16BE(0x0200,3); // Версия ID3
// header.writeUInt32BE(0x00000000,5); // Флаги
// header.writeUInt32BE(fileSize - headerSize,6); // Размер заголовка

// const mp3Data = Buffer.concat([header,buffer]);

// fs.writeFile('output.mp3',mp3Data,(err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('MP3 файл успешно создан!');
// });

// Вариант 2
// const txt = 'Jax_02.14_-_Дурак_2WNOL0p.txt';
// const buffer = Buffer.from(txt,'utf-8')

// //const buffer = Buffer.from(txt,'base64');
// const filename = 'audio.mp3';

// // Создание нового mp3-файла и запись в него байтов
// fs.writeFileSync(filename,buffer);

// // // Чтение mp3-файла в буфер
// const originalMp3 = fs.readFileSync(filename);

// // Объединение оригинального mp3-файла и вставленных данных

