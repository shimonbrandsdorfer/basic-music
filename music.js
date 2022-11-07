function playNotes(notes){
    return Promise.all(notes.map(n => playFreq(n.freq, n.duration)))
}


//plays a list of notes subsequently
async function playSong(notes){
    for(let n of notes){
        await playFreq(n.freq, n.duration)
    }
}


/**
 * 
 * @param {Number} frequency 
 * @param {Number} duration 
 * @returns 
 */
function playFreq(frequency, duration = 500){
    return new Promise((resolve, reject) => {
        try{
            const audioCtx = new AudioContext();
            // create Oscillator node
            const oscillator = audioCtx.createOscillator();
            oscillator.type = "square";
            oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // value in hertz
            oscillator.connect(audioCtx.destination);
            oscillator.start();
            setTimeout(() => {
                oscillator.stop();
                resolve()
            }, duration)
        }catch(e){reject(e)}
    })
}