const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const router = express.Router();

router.get('/myMusics', async (req, res) => {
    try {
        const textFileUrl = req.query.textFileUrl;

        const fileName = path.basename(textFileUrl); // Получаем имя файла из URL-адреса

        // Создаем отдельную директорию для сохранения файлов
        const outputDir = path.join(__dirname, 'output');
        fs.mkdirSync(outputDir, { recursive: true });

        axios
            .get(textFileUrl, { responseType: 'arraybuffer' })
            .then((response) => {
                const data = Buffer.from(response.data, 'binary').toString('base64');

                // Save the base64 file
                const base64File = path.join(outputDir, `${fileName}.txt`);
                fs.writeFile(base64File, data, 'base64', (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error saving base64 file' });
                    }

                    console.log('Base64 file saved');

                    // Read the base64 data
                    const base64Data = fs.readFileSync(base64File, 'utf-8');
                    const mp3Data = Buffer.from(base64Data, 'base64');

                    // Save the MP3 file
                    const mp3File = path.join(outputDir, `${fileName}.mp3`);
                    fs.writeFile(mp3File, mp3Data, (err) => {
                        if (err) {
                            return res.status(500).json({ error: 'Error saving MP3 file' });
                        }
                        console.log('Conversion completed. MP3 file saved.');

                        ffmpeg.ffprobe(mp3File, (err, metadata) => {
                          if (err) {
                            console.error('Error reading MP3 file:', err);
                            return;
                          }

                            const durationInMinutes = 1;
                            const durationInMillis = durationInMinutes * 60 * 100;

                            setTimeout(() => {
                                fs.unlinkSync(mp3File);
                                fs.unlinkSync(base64File);
                                console.log('Files deleted after', durationInMinutes, 'minutes');
                            }, durationInMillis);

                        });

                        return res.status(200).sendFile(mp3File);
                    });
                });
            });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'External server error' });
    }
});

module.exports = router;
