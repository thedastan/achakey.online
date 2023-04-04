import React from "react";
//@ts-ignore
import * as lamejs from "lamejs";

export function ByteToMp3({ byteData }: { byteData: number[] }) {
  const audioContext = new AudioContext();
  const audioBuffer = audioContext.createBuffer(
    1,
    byteData.length,
    audioContext.sampleRate
  );
  const channelData = audioBuffer.getChannelData(0);
  for (let i = 0; i < byteData.length; i++) {
    channelData[i] = byteData[i] / 255;
  }

  const mp3Encoder = new lamejs.Mp3Encoder(1, audioBuffer.sampleRate, 128);
  const mp3Data = mp3Encoder.encodeBuffer(channelData);
  mp3Encoder.flush();
  const mp3Blob = new Blob([mp3Data], { type: "audio/mp3" });
  const mp3Url = URL.createObjectURL(mp3Blob);

  return mp3Url;
}
