const notes = ['A4', 'B4', 'C4', 'C#4'];

const CHORDS = [{
    name : 'A Minor',
    notes : ['A4', 'C4', 'E4']
}]

document.addEventListener('DOMContentLoaded', function(){
    let cntEl = document.getElementById('container');
    notes.forEach(n => addButton(cntEl, n));
});

document.addEventListener('DOMContentLoaded', function(){
    let cntEl = document.getElementById('chord-container');
    CHORDS.forEach(n => addChordButton(cntEl, n));
});

function addButton(el, note){
    let btn = document.createElement('button');
    btn.innerText = note;
    btn.addEventListener('click', () => playNote(note));
    el.appendChild(btn);
}

function addChordButton(el, chord){
    let btn = document.createElement('button');
    btn.innerText = chord.name;
    btn.addEventListener('click', () => playChord(chord.notes));
    el.appendChild(btn);
}

function playNote(note){
    np.buildFromName(note).play();
}

function playChord(chord){
    chord.forEach(n => playNote(n));
}