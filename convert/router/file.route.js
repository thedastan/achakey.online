const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Output file paths
const base64File = path.join(__dirname, 'output.txt');
const mp3File = path.join(__dirname, 'output.mp3');

router.get('/myMusics', async (req, res) => {
    try {
        const textFileUrl = req.query.textFileUrl;

        axios
            .get(textFileUrl, { responseType: 'arraybuffer'})
            .then((response) => {
                const data = Buffer.from(response.data, 'binary').toString('base64');

                // Save the base64 file
                fs.writeFile(base64File, data, 'base64', (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error saving base64 file' });
                    }

                    console.log('Base64 file saved');

                    // Read the base64 data
                    const base64Data = fs.readFileSync(base64File, 'utf-8');
                    const mp3Data = Buffer.from(base64Data, 'base64');

                    // Save the MP3 file
                    fs.writeFile(mp3File, mp3Data, (err) => {
                        if (err) {
                            return res.status(500).json({ error: 'Error saving MP3 file' });
                        }
                        console.log('Conversion completed. MP3 file saved.');

                        return res.status(200).json({ file: mp3Data });
                    });
                });
            });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'External server error' });
    }
});

module.exports = router;
