const NOTES_INFO = getNotesInfo();


function playNotes(notes){
    return Promise.all(notes.map(n => playFreq(n.freq, n.duration)))
}


//plays a list of notes subsequently
async function playSong(notes){
    const audioCtx = new AudioContext();
    for(let n of notes){
        console.log(`Playing Frequency: ${n.freq} Duration : ${n.duration}`);
        await playFreq(n.freq, n.duration, audioCtx, audioCtx.destination)
    }
}


/**
 * 
 * @param {Number} frequency 
 * @param {Number} duration 
 * @returns 
 */
function playFreq(frequency, duration = 500, audioCtx, destination){
    if(frequency === 'SILENCE') playSilence(duration);
    return new Promise((resolve, reject) => {
        try{
            
            // create Oscillator node
            const oscillator = audioCtx.createOscillator();
            oscillator.type = "square";
            oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // value in hertz
            oscillator.connect(destination);
            oscillator.start();
            setTimeout(() => {
                oscillator.stop();
                resolve()
            }, duration)
        }catch(e){reject(e)}
    })
}

function playSilence(duration){
    return new Promise((resolve, reject) => {
        try{
            setTimeout(() => {
                resolve()
            }, duration)
        }catch(e){reject(e)}
    })
}

function getFreqPerNote(note){
    return NOTES_INFO.find(({name}) => name == note)?.freq;
}

function getNotesInfo(){
    const DICT_KEYS = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
    const DICT_OCTAVES =[0,1,2,3,4,5,6,7,8]
    let FREQ = 25.95654359874657 //starting point for G#-1
    let KEYNB = 0      //sarting point for A0
    return DICT_OCTAVES.map(function(v){
        return DICT_KEYS.map(function(v2){
            KEYNB++
            FREQ = FREQ * Math.pow(2, 1/12)
            return {
                  "keynb": KEYNB
                , "freq": FREQ
                , "name": v2+v
            }
        });
    }).flat();
}


function textToNotes(text){
    let notes;
    try{
        text = text.trim();
        let arr = text.split('\n');
        notes = arr.map(line => {
            line = line.split(',');
            let note = line[0].trim();
            let freq;
            if(!note) freq = 'SILENCE';
            else freq = isNaN(note) ? getFreqPerNote(note) : note;
    
            return {
                freq,
                 duration : Number(line[1].trim())
                }
        });
    }catch(e){
        console.log('BAD DATA')
    }
    return notes;
}
