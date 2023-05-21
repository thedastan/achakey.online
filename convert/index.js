// const fs = require('file-system');
// const base64 = require('base64-js');

// function convertBase64ToMP3(base64Content, outputFilePath) {
//   const decodedContent = base64.toByteArray(base64Content);
//   fs.writeFileSync(outputFilePath, decodedContent);
// }

// const base64FilePath = 'yoasobi_G930rjy.txt';
// const outputFilePath = 'output.mp3';

// const base64Content = fs.readFileSync(base64FilePath, 'utf-8');
// convertBase64ToMP3(base64Content, outputFilePath);

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// URL of the text file
const textFileUrl = 'https://api.achakey.online/media/yoasobi_G930rjy.txt';

// Output file paths
const base64File = path.join(__dirname, 'output.txt');
const mp3File = path.join(__dirname, 'output.mp3');

axios
  .get(textFileUrl, { responseType: 'arraybuffer' })
  .then((response) => {
    const data = Buffer.from(response.data, 'binary').toString('base64');

    // Save the base64 data to a file
    fs.writeFile(base64File, data, 'base64', (err) => {
      if (err) {
        console.error('Error saving base64 file:', err);
        return;
      }

      console.log('Base64 file saved.');

      // Convert base64 to MP3
      const base64Data = fs.readFileSync(base64File, 'utf-8');
      const mp3Data = Buffer.from(base64Data, 'base64');

      // Save the MP3 file
      fs.writeFile(mp3File, mp3Data, (err) => {
        if (err) {
          console.error('Error saving MP3 file:', err);
          return;
        }

        console.log('Conversion completed. MP3 file saved.');
      });
    });
  })
  .catch((error) => {
    console.error('Error retrieving text file:', error);
  });

