const ffmpegPath = require("@ffmpeg/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

async function convertToMp3(inputFilePath,outputFilePath) {
  return new Promise((resolve,reject) => {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg(inputFilePath)
      .outputOptions("-codec:a libmp3lame")
      .on("error",(err) => {
        console.log(`An error occurred: ${err.message}`);
        reject(err);
      })
      .on("end",() => {
        console.log(`Conversion complete!`);
        resolve(outputFilePath);
      })
      .save(outputFilePath);
  });
}

const inputFile = "input.wav";
const outputFile = "output.mp3";

fs.access(inputFile,fs.constants.F_OK,async (err) => {
  if (err) {
    console.error(`${inputFile} does not exist`);
    return;
  }

  try {
    await convertToMp3(inputFile,outputFile);
  } catch (err) {
    console.error(err);
  }
});
