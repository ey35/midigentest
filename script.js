const CHORD_FORMULAS = {
  'maj7': [0, 4, 7, 11],
  'm7': [0, 3, 7, 10],
  'min7': [0, 3, 7, 10],
  '9': [0, 4, 7, 10, 14],
  'm9': [0, 3, 7, 10, 14],
  '7': [0, 4, 7, 10],
  'dim7': [0, 3, 6, 9],
  'sus2': [0, 2, 7],
  'sus4': [0, 5, 7],
  '': [0, 4, 7], // major triad
  'm': [0, 3, 7], // minor triad
};

const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

function parseChordName(chordStr) {
  for (let i = 3; i >= 0; i--) {
    const root = chordStr.substring(0, i);
    const type = chordStr.substring(i);
    if (NOTES.includes(root) && CHORD_FORMULAS.hasOwnProperty(type)) {
      return { root, type };
    }
  }
  return null;
}

function getChordNotes(root, type, octave = 4) {
  const rootIndex = NOTES.indexOf(root);
  const semitones = CHORD_FORMULAS[type];
  return semitones.map(semi => NOTES[(rootIndex + semi) % 12] + octave);
}

function toMidiNumber(noteName) {
  // Convert flats to sharps
  const replacements = { 'Bb':'A#', 'Eb':'D#', 'Ab':'G#', 'Db':'C#', 'Gb':'F#' };
  let name = noteName;
  for (const [flat, sharp] of Object.entries(replacements)) {
    if (name.startsWith(flat)) {
      name = sharp + name.slice(flat.length);
      break;
    }
  }
  const octave = parseInt(name.slice(-1));
  const pitch = name.slice(0, -1);
  const noteIdx = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'].indexOf(pitch);
  return 12 * (octave + 1) + noteIdx;
}

function parseChordInput(text) {
  return text.split(',').map(s => s.trim()).map(parseChordName).filter(Boolean);
}

async function playChords() {
  await Tone.start();
  const chords = parseChordInput(document.getElementById('chordInput').value);
  if (!chords.length) {
    alert('No valid chords found!');
    return;
  }
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  let time = 0;
  chords.forEach(chord => {
    const notes = getChordNotes(chord.root, chord.type);
    synth.triggerAttackRelease(notes, '2n', `+${time}`);
    time += 1.5;
  });
}

function downloadMIDI() {
  const chords = parseChordInput(document.getElementById('chordInput').value);
  if (!chords.length) {
    alert('No valid chords found!');
    return;
  }

  const track = new MidiWriter.Track();
  track.setTempo(90);

  chords.forEach(chord => {
    const notes = getChordNotes(chord.root, chord.type);
    const midiNotes = notes.map(n => toMidiNumber(n));
    track.addEvent(new MidiWriter.NoteEvent({
      pitch: midiNotes,
      duration: '2'
    }));
  });

  const writer = new MidiWriter.Writer(track);
  const uint8Array = writer.buildFile();

  const blob = new Blob([uint8Array], { type: 'audio/midi' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'custom_chords.mid';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

document.getElementById('playBtn').addEventListener('click', playChords);
document.getElementById('downloadBtn').addEventListener('click', downloadMIDI);
