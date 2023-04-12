import React from "react";
// export async function ByteToMp(byteNumbers: Uint8Array) {
//   const sampleRate = 44100; // assume your audio data has a sample rate of 44.1 kHz
//   const numChannels = 2;

//   // create a new ffmpeg instance
//   const ffmpegInstance = createFFmpeg({ log: true });

//   // load the ffmpeg-core.js file
//   await ffmpegInstance.load();

//   // create a new audio encoder
//   const audioEncoder = ffmpegInstance.FS<any>("NODE").codec("libmp3lame");

//   // write the audio data to a file in memory
//   (ffmpegInstance.FS as any).writeFile("input.raw", byteNumbers);

//   // run the ffmpeg command to encode the audio data to MP3
//   await ffmpegInstance.run(
//     "-i",

//     "input.raw",
//     "-ac",
//     numChannels.toString(),
//     "-ar",
//     sampleRate.toString(),
//     "-codec:a",
//     "libmp3lame",
//     "-qscale:a",
//     "2",
//     "output.mp3"
//   );

//   // read the encoded MP3 data from memory
//   const mp3Data = ffmpegInstance.FS<any>("NODE").readFile("output.mp3");

//   // create a blob with the mp3 data and return its URL
//   const mp3Blob = new Blob([mp3Data.buffer], { type: "audio/mp3" });
//   const mp3Url = URL.createObjectURL(mp3Blob);

//   return mp3Url;
// }
