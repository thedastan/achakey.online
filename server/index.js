const fs = require('fs');
const http = require('http');
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
    // Когда файл сохранен, читаем его содержимое и преобразуем в бинарный формат
    const bytes = fs.readFileSync(mp3Path);

    const fileName = 'new-audio.mp3';

    // Записываем байты в новый MP3-файл
    fs.writeFileSync(fileName,bytes,{ encoding: 'binary' },(err) => {
      if (err) throw err;
      console.log('Файл сохранен');
    });
  });
});

// const protocol = mp3Url.startsWith('https') ? https : http;

// // Создаем новый запрос
// protocol.get(mp3Url,(res) => {
//   // Создаем новый файл на диск и сохраняем в него содержимое MP3-файла
//   const fileStream = fs.createWriteStream(mp3Path);
//   res.pipe(fileStream);
//   fileStream.on('finish',() => {
//     // Когда файл сохранен, читаем его содержимое и преобразуем в текстовый формат
//     const bytes = fs.readFileSync(mp3Path);
//     const text = bytes.toString('utf8');

//     const encode = 'utf8';

//     const byte = Buffer.from(text,encode)

//     const fileName = 'audio.mp3'

//     fs.writeFile(fileName,byte,{ encoding: "binary" },(err) => {
//       if (err) throw err

//       console.log('Файл сохранен!!!')
//     })

//   });
// });

// https://dl2.mp3party.net/online/10186650.mp3

// Вариант 1
// const base64String = 'Jax_02.14_-_Дурак_2WNOL0p.txt';
// const buffer = Buffer.from(base64String,'base64');
// const numbersBytes = Buffer.from(buffer,'base64').toJSON().data

// // Вариант 2
// const encoder = new TextEncoder();
// const bytes = encoder.encode(base64String);

// console.log(new lame.Encoder());

// const encoderMP3 = new lame.Encoder({
//   output: 'file.mp3',
//   bitrate: 192,
//   meta: {
//     artist: 'My Artist',
//     title: 'My Song'
//   }
// });

// const stream = encoderMP3.createWriteStream();
// stream.write(Buffer.from(bytes));
// stream.end();

// encoderMP3.on('finish',function () {
//   console.log('Файл сохранен!');
// });
