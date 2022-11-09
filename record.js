async function recordSong(notes) {
  const audioCtx = new AudioContext();
  const stream = audioCtx.createMediaStreamDestination();
  for (let n of notes) {
    console.log(`Playing Frequency: ${n.freq} Duration : ${n.duration}`);
    await playFreq(n.freq, n.duration, audioCtx, stream);
  }
  const rec = new MediaRecorder(stream.stream);

  console.log(rec)

  rec.ondataavailable = function (e) {
    var audioURL = window.URL.createObjectURL(e.data);
    console.log(audioURL);
  };
}
