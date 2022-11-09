

function play(e){
    let fd = new FormData(document.getElementById('form'));
    let text = fd.get('csv');
    let notes = textToNotes(text);
    playSong(notes);
}

function genarateAudio(e){
    let fd = new FormData(document.getElementById('form'));
    let text = fd.get('csv');
    let notes = textToNotes(text);
    recordSong(notes);
}