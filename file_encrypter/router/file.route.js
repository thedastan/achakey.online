const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Определение обработчика для маршрута "/myMusics":
router.get("/myMusics", async (req, res) => {
  try {
    const textFileUrl = req.query.textFileUrl; // Получение URL текстового файла
    const fileName = path.basename(textFileUrl); // Получаем имя файла из URL-адреса
    const outputDir = path.join(__dirname, "output");

    // Создание директории для сохранения файлов:
    fs.mkdir(outputDir, { recursive: true }, (mkdirErr) => {
      if (mkdirErr) {
        return res
          .status(500)
          .json({ error: "Error creating output directory" });
      }

      // Получение данных текстового файла с помощью Axios:
      axios(textFileUrl, { responseType: "arraybuffer" }).then((response) => {
        // Сохранение текстового файла в формате base64:
        const data = Buffer.from(response.data, "binary").toString("base64");
        const base64File = path.join(outputDir, `${fileName}.txt`);

        // Сохранение текстового файла в формате base64:
        fs.writeFile(base64File, data, "base64", (writeFileErr) => {
          if (writeFileErr) {
            return res.status(500).json({ error: "Error saving base64 file" });
          }

          console.log("Base64 file saved");

          // Асинхронное чтение файла для получения base64 данных
          fs.readFile(base64File, "utf-8", (readFileErr, base64Data) => {
            if (readFileErr) {
              return res
                .status(500)
                .json({ error: "Error reading base64 file" });
            }

            const mp3Data = Buffer.from(base64Data, "base64");
            const mp3File = path.join(outputDir, `${fileName}.mp3`);

            fs.writeFile(mp3File, mp3Data, (writeMp3Err) => {
              if (writeMp3Err) {
                return res.status(500).json({ error: "Error saving MP3 file" });
              }

              console.log("Conversion completed. MP3 file saved.");

              // Извлечение длительности аудио с помощью ffprobe
              // ffmpeg.setFfprobePath(ffprobePath);
              // ffmpeg.ffprobe(mp3File, (ffprobeErr, metadata) => {
              //   if (ffprobeErr) {
              //     return res
              //       .status(500)
              //       .json({ error: "Error getting audio duration" });
              //   }

              const fileData = fs.readFileSync(mp3File, {
                encoding: "base64",
              });

              const fileResponse = {
                mp3Data: `data:audio/mpeg;base64,${fileData}`,
              };

              // Удаление файлов после заданного времени
              const durationInMinutes = 5;
              const durationInMillis = durationInMinutes * 60 * 1000;

              setTimeout(() => {
                fs.unlink(mp3File, (unlinkMp3Err) => {
                  if (unlinkMp3Err) {
                    console.log("Error deleting MP3 file", unlinkMp3Err);
                  }
                });
                fs.unlink(base64File, (unlinkBase64Err) => {
                  if (unlinkBase64Err) {
                    console.log("Error deleting base64 file", unlinkBase64Err);
                  }
                });
                console.log(
                  "Files deleted after",
                  durationInMinutes,
                  "minutes"
                );
              }, durationInMillis);

              // Возвращение объекта fileResponse в качестве ответа
              return res.status(200).json(fileResponse);
              // });
            });
          });
        });
      });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "External server error" });
  }
});

module.exports = router;
