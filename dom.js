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
    btn.addEventListener('click', () => playNotes(chord.notes));
    el.appendChild(btn);
}
