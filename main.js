let scale = [
    {
        letter: "C",
        isFlat: false,
    },
    {
        letter: "D",
        isFlat: true,
    },
    {
        letter: "D",
        isFlat: false,
    },
    {
        letter: "E",
        isFlat: true,
    },
    {
        letter: "E",
        isFlat: false,
    },
    {
        letter: "F",
        isFlat: false,
    },
    {
        letter: "G",
        isFlat: true,
    },
    {
        letter: "G",
        isFlat: false,
    },
    {
        letter: "A",
        isFlat: true,
    },
    {
        letter: "A",
        isFlat: false,
    },
    {
        letter: "B",
        isFlat: true,
    },
    {
        letter: "B",
        isFlat: false,
    }
]
let keys = [];

for (let octave = 2; octave <= 6; octave++) {


    for (let note of scale) {
        let keyButton = document.createElement("button");
        let color = "white";
        if (note.isFlat) {
            color = "black";
        }
        document.getElementById("key").appendChild(keyButton);
        keyButton.className = color + " key";
        let sample = note.letter;
        if (note.isFlat) {
            sample += "b";

        }
        sample += octave;
        let keyObject = { letter: note.letter, isFlat: note.isFlat, src: sample, keyButton: keyButton }
        keys.push(keyObject);
        keyButton.keyObject = keyObject;

    }

}

//Replace below names with actual names in the html
let cur = document.getElementById("score")
let sequence = []

//C2 to C7 inclusive     
//             0123456789
let symbols = "1!2@34$5%6^78*9(0qQwWeErtTyYuiIoOpPasSdDfgGhHjJklLzZxcCvVbBnm"
let chords = "CbDbEFbGbAbBCbDbEFbGbAbBCbDbEFbGbAbBCbDbEFbGbAbBCbDbEFbGbAbBC"
//number calculation: Math.floor(i/7)+2

let delay = 1300 //2.93 sec is the duration of the files but player migt get inpatient
let min = 100 //0.1 secs, during testing is still intelligible

//plays the piano key corresponding to symbols[i]
function play(i) {
    if (chords[i] == 'b') new Audio('mp3/' + chords[i + 1] + 'b' + (Math.floor(i / 7) + 2) + '.mp3').play()
    new Audio('mp3/' + chords[i] + '' + (Math.floor(i / 7) + 2) + '.mp3').play()
}

//Displays the sequence
// function display() {
//     sequence.push(sequence[Math.floor(Math.random() * symbols.length)])
//     index = 0
//     for (i of sequence) {
//         setTimeout(flash(i), delay) //TODO: Sashrik add function
//     }
// }

function check() {
    if (this.textContent == sequence[index]) {
        flash(symbols.indexOf(sequence[index]))
        index++
    }
}

function keyPress(event) {
    if (event.key == sequence[index]) {
        flash(symbols.indexOf(sequence[index]))
        index++
    }
}

// while (true) {
//     display()

//     score = 0, sequence = 0, delay = 1300
// }

/* Testing index.html code:
<body>
    <script>new Audio('mp3/Ab4.mp3').play()
        setTimeout(function () { new Audio('mp3/Eb6.mp3').play() }, 1300)
    </script>
</body>
*/