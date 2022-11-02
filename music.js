const notes = [440, 460, 480, 500];

const CHORDS = [{
    name : 'A Minor',
    notes,
}];

const audioCtx = new AudioContext();


function playNote(frequency, duration){
    return playFreq(frequency, duration);
    
}

function playNotes(notes, duration){
    return Promise.all(notes.map(n => playNote(n, duration)))
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