const express = require('express')
const app = express()
const router = require('./router/file.route')
const fs = require('fs')
const request = require('request')
const url = 'https://api.achakey.online/media/';

const http = require('http')


const PORT=8080
app.use('/api', router)

app.listen(PORT, () => console.log(`Server started on port ... ${PORT}`))

// app.get('/get_music/', async (req, res) => {
//     try {
//        // res request.get(url + 'jax-0214-sebelep.txt')
//        //      .on('response', (response) => {
//        //          const data = response.json()
//        //          const fileStream = fs.createWriteStream('temporary.mp3');
//        //          response.pipe(fileStream);
//        //          fileStream.on('finish', () => {
//        //              fileStream.close();
//        //              res.end('ok');
//        //          });
//        //      })
//        //      .on('error', (err) => {
//        //          res.end(err.message);
//        //      });
//
//         let res = await fetch(url + 'jax-0214-sebelep.txt');
//
//         const data = await res.json();
//         const buff = new Buffer.from(data, 'base64');
//         fs.writeFileSync('temporary.mp3', buff.toString());
//         res.end('ok')
//     } catch(e) {
//         return res.end(e.message)
//     }
// })

app.get('/get_music/', (req, res) => {
    // const url = 'https://api.achakey.online/media/jax-0214-sebelep.txt';
    // const url = req.headers['x-request-url']
    // const url = req.query.url
    const encodedUrl = req.query.url; // Получение значения параметра url
    const decodedUrl = decodeURIComponent(encodedUrl); // Декодирование значения параметра url

    http.get(decodedUrl, async (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const buff = Buffer.from(data, 'base64');
                fs.writeFileSync('temporary.mp3', buff);
                res.end('ok');
            } catch (e) {
                res.end(e.message);
            }
        });
    }).on('error', (err) => {
        res.end(err.message);
    });
});
