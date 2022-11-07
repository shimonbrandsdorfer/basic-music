const NOTES_INFO = getNotesInfo();

function play(e){
    //e.preventDefault();
    //e.stopPropagation();
    let fd = new FormData(document.getElementById('form'));
    let text = fd.get('csv');
    let notes = textToNotes(text);
    playSong(notes);
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